import { hash } from '@/lib/auth/client-grants';
import { requireValue, Store } from '@/lib/platform/store';
export function amountValid(value: unknown): value is number { return typeof value === 'number' && Number.isSafeInteger(value) && value > 0; }
function keyValid(value: string) { requireValue(/^[A-Za-z0-9_-]{16,128}$/.test(value), 'invalid_operation_key'); }
function wallet(row: Record<string, unknown> | null) {
  const balance = Number(row?.balance ?? 0), reserved = Number(row?.reserved ?? 0);
  requireValue(Number.isSafeInteger(balance) && Number.isSafeInteger(reserved) && balance >= reserved && reserved >= 0, 'invalid_wallet', 503);
  return { balance, reserved };
}
export async function grantCredits(store: Store, uid: string, amount: number, operationKey: string, actor: string, reason: string, now = Date.now()) {
  requireValue(amountValid(amount), 'invalid_amount'); keyValid(operationKey);
  requireValue(reason.trim().length > 0 && reason.length <= 200, 'invalid_reason');
  const id = hash(`${uid}:grant:${operationKey}`), fingerprint = hash(JSON.stringify({ uid, amount, actor, reason }));
  return store.transaction(async (tx) => {
    const old = await tx.get(`creditLedger/${id}`);
    const row = wallet(await tx.get(`creditAccounts/${uid}`));
    if (old) { requireValue(old.fingerprint === fingerprint, 'idempotency_conflict', 409); return { ...row, available: row.balance - row.reserved, duplicate: true }; }
    requireValue(Number.isSafeInteger(row.balance + amount), 'amount_overflow');
    row.balance += amount;
    tx.set(`creditAccounts/${uid}`, row);
    tx.set(`creditLedger/${id}`, { uid, amount, actor, reason, fingerprint, kind: 'grant', createdAt: now });
    return { ...row, available: row.balance - row.reserved, duplicate: false };
  });
}
// Internal functions: no public reservation endpoint. Gateway must authenticate,
// calculate price/output bounds, then reserve before invoking any paid provider.
export async function reserveCredits(store: Store, uid: string, amount: number, operationKey: string, requestHash: string, now = Date.now()) {
  requireValue(amountValid(amount), 'invalid_amount'); keyValid(operationKey);
  requireValue(/^[a-f0-9]{64}$/.test(requestHash), 'invalid_request_hash');
  const id = hash(`${uid}:inference:${operationKey}`);
  return store.transaction(async (tx) => {
    const existing = await tx.get(`inferenceRequests/${id}`);
    const row = wallet(await tx.get(`creditAccounts/${uid}`));
    if (existing) { requireValue(existing.requestHash === requestHash && existing.reservation === amount, 'idempotency_conflict', 409); return { id, duplicate: true, state: existing.state }; }
    requireValue(row.balance - row.reserved >= amount, 'insufficient_credits', 402);
    row.reserved += amount;
    tx.set(`creditAccounts/${uid}`, row);
    tx.set(`inferenceRequests/${id}`, { uid, requestHash, reservation: amount, state: 'reserved', createdAt: now });
    return { id, duplicate: false, state: 'reserved' };
  });
}
export async function settleCredits(store: Store, uid: string, id: string, actual: number, now = Date.now()) {
  requireValue(/^[a-f0-9]{64}$/.test(id) && Number.isSafeInteger(actual) && actual >= 0, 'invalid_settlement');
  return store.transaction(async (tx) => {
    const request = await tx.get(`inferenceRequests/${id}`);
    const row = wallet(await tx.get(`creditAccounts/${uid}`));
    requireValue(request && request.uid === uid, 'not_found', 404);
    if (request.state === 'settled') { requireValue(request.actual === actual, 'settlement_conflict', 409); return { duplicate: true }; }
    requireValue(actual <= Number(request.reservation) && row.reserved >= Number(request.reservation), 'invalid_settlement');
    row.reserved -= Number(request.reservation); row.balance -= actual;
    tx.set(`creditAccounts/${uid}`, row);
    tx.set(`inferenceRequests/${id}`, { ...request, state: 'settled', actual, settledAt: now });
    tx.set(`creditLedger/${id}`, { uid, amount: -actual, kind: 'charge', createdAt: now });
    return { duplicate: false };
  });
}
