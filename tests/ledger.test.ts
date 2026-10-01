import test from 'node:test';
import assert from 'node:assert/strict';
import { grantCredits, reserveCredits, settleCredits } from '../lib/credits/ledger';
import { MemoryStore } from './memory-store';
const payloadHash = 'a'.repeat(64);
test('concurrent reservations cannot overspend the account', async () => {
  const store = new MemoryStore();
  await grantCredits(store, 'alice', 100, 'grant_key_00000001', 'admin', 'Beta grant');
  const result = await Promise.allSettled(['request_key_000001', 'request_key_000002'].map((key) => reserveCredits(store, 'alice', 75, key, payloadHash)));
  assert.equal(result.filter((r) => r.status === 'fulfilled').length, 1);
  assert.deepEqual(store.records.get('creditAccounts/alice'), { balance: 100, reserved: 75 });
});
test('idempotent grants, reservations and settlements charge exactly once', async () => {
  const store = new MemoryStore();
  await grantCredits(store, 'alice', 100, 'grant_key_00000001', 'admin', 'Beta grant');
  await grantCredits(store, 'alice', 100, 'grant_key_00000001', 'admin', 'Beta grant');
  const r = await reserveCredits(store, 'alice', 80, 'request_key_000001', payloadHash);
  assert.equal((await reserveCredits(store, 'alice', 80, 'request_key_000001', payloadHash)).duplicate, true);
  await assert.rejects(reserveCredits(store, 'alice', 80, 'request_key_000001', 'b'.repeat(64)), /idempotency_conflict/);
  await settleCredits(store, 'alice', r.id, 30);
  await settleCredits(store, 'alice', r.id, 30);
  assert.deepEqual(store.records.get('creditAccounts/alice'), { balance: 70, reserved: 0 });
  await assert.rejects(settleCredits(store, 'alice', r.id, 40), /settlement_conflict/);
});
test('invalid or cross-user settlements roll back; charges cannot exceed reservation', async () => {
  const store = new MemoryStore();
  await grantCredits(store, 'alice', 100, 'grant_key_00000001', 'admin', 'Beta grant');
  const r = await reserveCredits(store, 'alice', 50, 'request_key_000001', payloadHash);
  await assert.rejects(settleCredits(store, 'bob', r.id, 10), /not_found/);
  await assert.rejects(settleCredits(store, 'alice', r.id, 51), /invalid_settlement/);
  assert.deepEqual(store.records.get('creditAccounts/alice'), { balance: 100, reserved: 50 });
  await assert.rejects(grantCredits(store, 'alice', 0.5, 'grant_key_00000002', 'admin', 'Bad amount'), /invalid_amount/);
});
