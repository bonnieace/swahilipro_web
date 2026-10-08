import { hash } from '@/lib/auth/client-grants';
import { reserveCredits, settleCredits } from '@/lib/credits/ledger';
import { PlatformError, requireValue, Store } from '@/lib/platform/store';
import { cost, providerCost } from './policy';
import { InferenceInput, ModelPolicy, Provider, StreamEvent } from './types';
export const requestId = (uid: string, key: string) => hash(`${uid}:inference:${key}`);
export const inputHash = (input: InferenceInput) => hash(JSON.stringify(input));
export async function getRequest(store: Store, uid: string, id: string) {
  requireValue(/^[a-f0-9]{64}$/.test(id), 'invalid_request_id');
  return store.transaction(async (tx) => {
    const row = await tx.get(`inferenceRequests/${id}`); requireValue(row && row.uid === uid, 'not_found', 404); return row;
  });
}
export function publicRequest(id: string, row: Record<string, unknown>) {
  return { id, state: row.state, model: row.model, reservation: row.reservation, actual: row.actual ?? null, createdAt: row.createdAt, outcome: row.outcome ?? null, responseRetained: false };
}
export async function prepare(store: Store, provider: Provider, uid: string, grantId: string | null, key: string, input: InferenceInput, policy: ModelPolicy, dailyCap: number, signal: AbortSignal, totalCap?: number) {
  requireValue(/^[A-Za-z0-9_-]{16,128}$/.test(key), 'invalid_idempotency_key');
  const id = requestId(uid, key), fingerprint = inputHash(input);
  const existing = await store.transaction((tx) => tx.get(`inferenceRequests/${id}`));
  if (existing) { requireValue(existing.uid === uid && existing.requestHash === fingerprint, 'idempotency_conflict', 409); return { id, duplicate: true, row: existing }; }
  requireValue(!signal.aborted, 'cancelled', 499);
  const controller = new AbortController(); const abort = () => controller.abort(); signal.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(abort, 10000);
  let inputTokens: number;
  try { inputTokens = await provider.count(policy, input, controller.signal); }
  finally { clearTimeout(timer); signal.removeEventListener('abort', abort); }
  requireValue(!signal.aborted && !controller.signal.aborted, 'token_count_timeout', 503);
  requireValue(Number.isSafeInteger(inputTokens) && inputTokens >= 0 && inputTokens <= policy.maxInputTokens, 'context_limit_exceeded');
  const reservation = cost(policy, inputTokens, input.maxOutputTokens);
  const result = await reserveCredits(store, uid, reservation, key, fingerprint, Date.now(), { model: policy.id, prices: { input: policy.inputMicrocreditsPerToken, output: policy.outputMicrocreditsPerToken }, inputTokens, maxOutputTokens: input.maxOutputTokens, dailyCap, grantId, ...(totalCap === undefined ? {} : { providerBudget: { cap: totalCap, reservation: providerCost(policy, inputTokens, input.maxOutputTokens), prices: { input: policy.inputNanodollarsPerToken, output: policy.outputNanodollarsPerToken } } }) });
  // Parallel contenders may both count, but only one can own paid invocation.
  return { id, duplicate: result.duplicate, row: await getRequest(store, uid, id) };
}
async function patchState(store: Store, id: string, changes: Record<string, unknown>) {
  await store.transaction(async (tx) => {
    const row = await tx.get(`inferenceRequests/${id}`); requireValue(row, 'not_found', 404);
    if (row.state === 'settled') return;
    tx.set(`inferenceRequests/${id}`, { ...row, ...changes });
  });
}
export async function invoke(store: Store, provider: Provider, uid: string, id: string, input: InferenceInput, policy: ModelPolicy, signal: AbortSignal, emit: (event: StreamEvent) => void) {
  const row = await store.transaction(async (tx) => {
    const current = await tx.get(`inferenceRequests/${id}`);
    requireValue(current && current.uid === uid && current.state === 'reserved', 'request_already_started', 409);
    tx.set(`inferenceRequests/${id}`, { ...current, state: 'invoking', invokedAt: Date.now() }); return current;
  });
  emit({ type: 'request.started', requestId: id, reservation: row.reservation });
  if (signal.aborted) { if (row.providerReservation !== undefined) await patchState(store, id, { confirmedNanodollars: 0 }); await settleCredits(store, uid, id, 0); emit({ type: 'request.failed', requestId: id, error: 'cancelled_before_invocation' }); return; }
  let usage: { inputTokens: number; outputTokens: number } | undefined;
  let actual: number | undefined;
  let outputBytes = 0;
  try {
    for await (const event of provider.stream(policy, input, signal)) {
      if (event.type === 'text') {
        outputBytes += Buffer.byteLength(event.text);
        requireValue(outputBytes <= 1024 * 1024, 'provider_output_limit', 503);
        emit({ type: 'text.delta', requestId: id, text: event.text });
      } else {
        requireValue(!usage, 'duplicate_provider_usage', 503);
        requireValue(event.inputTokens <= Number(row.inputTokens) && event.outputTokens <= input.maxOutputTokens, 'usage_exceeds_reservation', 503);
        const prices = row.prices as { input: number; output: number };
        actual = cost({ ...policy, inputMicrocreditsPerToken: prices.input, outputMicrocreditsPerToken: prices.output }, event.inputTokens, event.outputTokens);
        usage = { inputTokens: event.inputTokens, outputTokens: event.outputTokens };
        // Persist exact final usage before settling; reconciliation can finish if
        // the process exits between these commits. Never persist response text.
        await patchState(store, id, { confirmedUsage: usage, confirmedActual: actual, ...(row.providerPrices ? { confirmedNanodollars: providerCost({ ...policy, inputNanodollarsPerToken: (row.providerPrices as { input: number }).input, outputNanodollarsPerToken: (row.providerPrices as { output: number }).output }, event.inputTokens, event.outputTokens) } : {}) });
        emit({ type: 'usage', requestId: id, ...usage, actual });
      }
    }
    requireValue(usage && actual !== undefined, 'provider_usage_missing', 503);
    await settleCredits(store, uid, id, actual);
    emit({ type: 'request.completed', requestId: id, actual, ...usage });
  } catch (error) {
    const code = error instanceof PlatformError ? error.code : signal.aborted ? 'cancelled' : 'provider_failed';
    // Once invocation may have reached AWS, absence of usage is not proof of zero
    // cost. Preserve wallet/budget holds rather than retrying a paid call.
    try {
      if (actual !== undefined && usage) await settleCredits(store, uid, id, actual);
      else await patchState(store, id, { state: 'unknown', outcome: code, interruptedAt: Date.now() });
    } catch { /* Durable reservation/confirmed usage remains for reconciliation. */ }
    emit({ type: 'request.failed', requestId: id, error: code, reconciliationRequired: actual === undefined });
  }
}
export async function reconcileRequest(store: Store, id: string, now = Date.now()) {
  const row = await store.transaction((tx) => tx.get(`inferenceRequests/${id}`));
  requireValue(row, 'not_found', 404);
  if (row.state === 'settled') return 'settled';
  if (row.confirmedActual !== undefined) { await settleCredits(store, String(row.uid), id, Number(row.confirmedActual)); return 'settled'; }
  if (Number(row.leaseUntil) > now) return 'active';
  if (row.state === 'reserved') {
    // Claim and release happen in the same transaction as wallet settlement:
    // no inference is allowed to start after this reservation has been released.
    await settleCredits(store, String(row.uid), id, 0, now, 'reserved'); return 'released';
  }
  await patchState(store, id, { state: 'unknown', outcome: 'lease_expired' }); return 'unknown';
}
