import test from 'node:test';
import assert from 'node:assert/strict';
import { MemoryStore } from './memory-store';
import { grantCredits } from '../lib/credits/ledger';
import { prepare, invoke, reconcileRequest } from '../lib/inference/engine';
import { policies, parseInput } from '../lib/inference/policy';
import { ModelPolicy, InferenceInput, Provider } from '../lib/inference/types';
export const policy: ModelPolicy = { id: 'fake', name: 'Fake', region: 'us-east-1', api: 'converse', billingVerified: true, inputNanodollarsPerToken: 2000, outputNanodollarsPerToken: 3000, inputMicrocreditsPerToken: 2, outputMicrocreditsPerToken: 3, maxInputTokens: 1000, maxOutputTokens: 100 };
export const input: InferenceInput = { model: 'fake', messages: [{ role: 'user', content: 'Hello' }], maxOutputTokens: 10 };
const signal = () => new AbortController().signal;
async function setup() { const store = new MemoryStore(); await grantCredits(store, 'alice', 10000, 'grant_key_00000001', 'admin', 'test'); return store; }
const success: Provider = { count: async () => 5, async *stream() { yield { type: 'text', text: 'Hi' }; yield { type: 'usage', inputTokens: 5, outputTokens: 2 }; } };
test('model policy rejects unverified billing, unknown models and tool input', () => {
  assert.throws(() => policies(JSON.stringify([{ ...policy, billingVerified: false }])), /unsupported_model/);
  assert.throws(() => policies(JSON.stringify([{ ...policy, inputMicrocreditsPerToken: 0 }])), /invalid_model_price/);
  assert.throws(() => parseInput({ ...input, model: 'other' }, [policy]), /model_unavailable/);
  assert.throws(() => parseInput({ ...input, tools: [] }, [policy]), /unsupported_input/);
});
test('concurrent duplicate requests invoke once and settle wallet and global budget once', async () => {
  const store = await setup(); let calls = 0;
  const provider: Provider = { ...success, async *stream(...args) { calls++; yield* success.stream(...args); } };
  const rows = await Promise.all([1, 2].map(() => prepare(store, provider, 'alice', null, 'request_key_000001', input, policy, 1000, signal())));
  assert.equal(rows.filter((r) => !r.duplicate).length, 1);
  const attempts = await Promise.allSettled(rows.map((row) => invoke(store, provider, 'alice', row.id, input, policy, signal(), () => {})));
  assert.equal(attempts.filter((r) => r.status === 'fulfilled').length, 1); assert.equal(calls, 1);
  assert.deepEqual(store.records.get('creditAccounts/alice'), { balance: 9984, reserved: 0, activeRequests: 0 });
  const budget = Array.from(store.records.entries()).find(([p]) => p.startsWith('inferenceBudgets/'))![1];
  assert.deepEqual(budget, { held: 0, spent: 16, count: 1 });
  assert.equal((await prepare(store, provider, 'alice', null, 'request_key_000001', input, policy, 1000, signal())).duplicate, true);
  await assert.rejects(prepare(store, provider, 'alice', null, 'request_key_000001', { ...input, system: 'different' }, policy, 1000, signal()), /idempotency_conflict/);
});
test('missing final usage preserves holds and cannot be retried as a new invocation', async () => {
  const store = await setup(); const provider: Provider = { count: success.count, async *stream() { yield { type: 'text', text: 'partial' }; throw new Error('disconnected'); } };
  const ready = await prepare(store, provider, 'alice', null, 'request_key_000001', input, policy, 1000, signal());
  await invoke(store, provider, 'alice', ready.id, input, policy, signal(), () => {});
  assert.equal(store.records.get(`inferenceRequests/${ready.id}`)!.state, 'unknown');
  assert.equal(store.records.get('creditAccounts/alice')!.reserved, 40);
  await assert.rejects(invoke(store, provider, 'alice', ready.id, input, policy, signal(), () => {}), /request_already_started/);
});
test('reconciliation releases unstarted reservations but retains uncertain paid calls', async () => {
  const store = await setup();
  const a = await prepare(store, success, 'alice', null, 'request_key_000001', input, policy, 1000, signal());
  assert.equal(await reconcileRequest(store, a.id, Date.now() + 200000), 'released');
  const b = await prepare(store, success, 'alice', null, 'request_key_000002', input, policy, 1000, signal());
  store.records.get(`inferenceRequests/${b.id}`)!.state = 'invoking';
  assert.equal(await reconcileRequest(store, b.id, Date.now() + 200000), 'unknown');
  assert.equal(store.records.get('creditAccounts/alice')!.reserved, 40);
  Object.assign(store.records.get(`inferenceRequests/${b.id}`)!, { confirmedActual: 16, confirmedUsage: { inputTokens: 5, outputTokens: 2 } });
  assert.equal(await reconcileRequest(store, b.id), 'settled');
  assert.equal(store.records.get('creditAccounts/alice')!.balance, 9984);
});
test('count failure, daily budget and concurrency caps prevent paid invocation', async () => {
  const store = await setup();
  await assert.rejects(prepare(store, { ...success, count: async () => { throw new Error('count unavailable'); } }, 'alice', null, 'request_key_000001', input, policy, 1000, signal()));
  assert.equal(store.records.get('creditAccounts/alice')!.reserved, 0);
  await assert.rejects(prepare(store, success, 'alice', null, 'request_key_000001', input, policy, 39, signal()), /daily_budget_exceeded/);
  await prepare(store, success, 'alice', null, 'request_key_000001', input, policy, 1000, signal());
  await prepare(store, success, 'alice', null, 'request_key_000002', input, policy, 1000, signal());
  await assert.rejects(prepare(store, success, 'alice', null, 'request_key_000003', input, policy, 1000, signal()), /rate_limited/);
});
test('abort before provider invocation releases all held credits', async () => {
  const store = await setup(); const ready = await prepare(store, success, 'alice', null, 'request_key_000001', input, policy, 1000, signal());
  const controller = new AbortController(); controller.abort();
  await invoke(store, { ...success, async *stream() { throw new Error('must not invoke'); } }, 'alice', ready.id, input, policy, controller.signal, () => {});
  assert.equal(store.records.get('creditAccounts/alice')!.reserved, 0);
  assert.equal(store.records.get('creditAccounts/alice')!.balance, 10000);
});
test('operator resolution requires expired unknown state and records evidence', async () => {
  const { settleCredits } = await import('../lib/credits/ledger');
  const store = await setup();
  const ready = await prepare(store, success, 'alice', null, 'request_key_000001', input, policy, 1000, signal());
  await assert.rejects(settleCredits(store, 'alice', ready.id, 0, Date.now(), 'unknown', { actor: 'admin', reason: 'AWS verified no charge' }), /request_state_changed/);
  Object.assign(store.records.get(`inferenceRequests/${ready.id}`)!, { state: 'unknown', leaseUntil: Date.now() - 1 });
  await settleCredits(store, 'alice', ready.id, 16, Date.now(), 'unknown', { actor: 'admin', reason: 'AWS usage record verified' });
  assert.equal(store.records.get(`creditLedger/${ready.id}`)!.reviewed, true);
  assert.equal(store.records.get('creditAccounts/alice')!.balance, 9984);
});

test('cumulative provider budget serializes different accounts and survives day changes', async () => {
  const { reserveCredits, settleCredits } = await import('../lib/credits/ledger');
  const store = await setup(); await grantCredits(store, 'bob', 10000, 'grant_key_00000001', 'admin', 'test');
  const options = { model: 'fake', prices: { input: 2, output: 3 }, inputTokens: 5, maxOutputTokens: 10, dailyCap: 1000, grantId: null, providerBudget: { cap: 60000, reservation: 40000, prices: { input: 2000, output: 3000 } } };
  const rows = await Promise.allSettled(['alice', 'bob'].map((uid) => reserveCredits(store, uid, 40, 'request_key_000001', 'a'.repeat(64), 86400000, options)));
  assert.equal(rows.filter((r) => r.status === 'fulfilled').length, 1);
  assert.match(String((rows.find((r) => r.status === 'rejected') as PromiseRejectedResult).reason), /total_budget_exceeded/);
  const ready = (rows[0] as PromiseFulfilledResult<{ id: string }>).value;
  Object.assign(store.records.get(`inferenceRequests/${ready.id}`)!, { state: 'invoking', confirmedNanodollars: 16000 });
  await settleCredits(store, 'alice', ready.id, 16);
  await settleCredits(store, 'alice', ready.id, 16);
  assert.deepEqual(store.records.get('inferenceProviderBudgets/lifetime'), { held: 0, spent: 16000 });
  const next = await reserveCredits(store, 'alice', 40, 'request_key_000002', 'a'.repeat(64), 86400000 * 2, options);
  await assert.rejects(reserveCredits(store, 'bob', 40, 'request_key_000002', 'a'.repeat(64), 86400000 * 3, options), /total_budget_exceeded/);
  Object.assign(store.records.get(`inferenceRequests/${next.id}`)!, { state: 'unknown', leaseUntil: 0 });
  await settleCredits(store, 'alice', next.id, 0, Date.now(), 'unknown', { actor: 'admin', reason: 'Wallet refund without confirmed AWS token usage' });
  assert.deepEqual(store.records.get('inferenceProviderBudgets/lifetime'), { held: 0, spent: 56000 });
});

test('confirmed usage settles provider price snapshot; unknown calls retain dollar holds', async () => {
  const store = await setup();
  const a = await prepare(store, success, 'alice', null, 'request_key_000001', input, policy, 1000, signal(), 100000);
  await invoke(store, success, 'alice', a.id, input, { ...policy, inputNanodollarsPerToken: 9999 }, signal(), () => {});
  assert.deepEqual(store.records.get('inferenceProviderBudgets/lifetime'), { held: 0, spent: 16000 });
  const b = await prepare(store, success, 'alice', null, 'request_key_000002', input, policy, 1000, signal(), 100000);
  await invoke(store, { ...success, async *stream() { throw new Error('disconnected'); } }, 'alice', b.id, input, policy, signal(), () => {});
  assert.deepEqual(store.records.get('inferenceProviderBudgets/lifetime'), { held: 40000, spent: 16000 });
  const c = await prepare(store, success, 'alice', null, 'request_key_000003', input, policy, 1000, signal(), 100000);
  await reconcileRequest(store, c.id, Date.now() + 200000);
  assert.deepEqual(store.records.get('inferenceProviderBudgets/lifetime'), { held: 40000, spent: 16000 });
});
