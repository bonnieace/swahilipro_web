import test from 'node:test';
import assert from 'node:assert/strict';
import { startAttempt, challenge, decideAttempt, pollAttempt, completeAttempt, verifyAccess, refreshGrant, revokeGrant, revokeAllGrants, hash } from '../lib/auth/client-grants';
import { MemoryStore } from './memory-store';
const verifier = 'v'.repeat(64), now = 1000000;
async function login(store: MemoryStore) {
  const attempt = await startAttempt(store, { clientType: 'cli', label: 'My terminal', challenge: challenge(verifier) }, now);
  await decideAttempt(store, attempt.attemptId, 'alice', true, attempt.confirmationCode, now + 10);
  const pair = await completeAttempt(store, attempt.attemptId, attempt.pollingSecret, verifier, now + 20);
  return { attempt, pair };
}
test('browser approval does not issue credentials without client proof; completion is single-use', async () => {
  const store = new MemoryStore();
  const attempt = await startAttempt(store, { clientType: 'vscode', label: 'Laptop', challenge: challenge(verifier) }, now);
  await assert.rejects(completeAttempt(store, attempt.attemptId, attempt.pollingSecret, verifier, now + 10), /authorization_pending/);
  await decideAttempt(store, attempt.attemptId, 'alice', true, attempt.confirmationCode, now + 20);
  await assert.rejects(completeAttempt(store, attempt.attemptId, 'x'.repeat(43), verifier, now + 30), /invalid_attempt/);
  await assert.rejects(completeAttempt(store, attempt.attemptId, attempt.pollingSecret, 'x'.repeat(64), now + 30), /invalid_verifier/);
  const results = await Promise.allSettled([1, 2].map(() => completeAttempt(store, attempt.attemptId, attempt.pollingSecret, verifier, now + 40)));
  assert.equal(results.filter((r) => r.status === 'fulfilled').length, 1);
});
test('denied and expired attempts cannot complete; polling respects interval', async () => {
  const store = new MemoryStore();
  const attempt = await startAttempt(store, { clientType: 'cli', label: 'Terminal', challenge: challenge(verifier) }, now);
  await pollAttempt(store, attempt.attemptId, attempt.pollingSecret, now + 10);
  await assert.rejects(pollAttempt(store, attempt.attemptId, attempt.pollingSecret, now + 20), /slow_down/);
  await decideAttempt(store, attempt.attemptId, 'alice', false, attempt.confirmationCode, now + 30);
  await assert.rejects(completeAttempt(store, attempt.attemptId, attempt.pollingSecret, verifier, now + 6000), /authorization_denied/);
  const other = await startAttempt(store, { clientType: 'cli', label: 'Terminal', challenge: challenge(verifier) }, now);
  await assert.rejects(completeAttempt(store, other.attemptId, other.pollingSecret, verifier, now + 600001), /attempt_expired/);
});
test('refresh reuse commits revocation and blocks already-issued access tokens', async () => {
  const store = new MemoryStore(); const { pair } = await login(store);
  const next = await refreshGrant(store, pair.refreshToken, now + 100);
  assert.equal((await verifyAccess(store, next.accessToken, now + 200)).uid, 'alice');
  await assert.rejects(refreshGrant(store, pair.refreshToken, now + 300), /refresh_reused/);
  await assert.rejects(verifyAccess(store, next.accessToken, now + 400), /authorization_revoked/);
  assert.equal(store.records.get(`clientGrants/${pair.grantId}`)?.revoked, true);
  assert.equal(store.records.get(`clientTokens/${hash(next.accessToken)}`)?.accessToken, undefined);
});
test('cross-user revoke is denied and account epoch invalidates all old grants', async () => {
  const store = new MemoryStore(); const { pair } = await login(store);
  await assert.rejects(revokeGrant(store, 'bob', pair.grantId, now + 100), /not_found/);
  assert.equal((await verifyAccess(store, pair.accessToken, now + 100)).uid, 'alice');
  await revokeAllGrants(store, 'alice');
  await assert.rejects(verifyAccess(store, pair.accessToken, now + 200), /authorization_revoked/);
  await assert.rejects(refreshGrant(store, pair.refreshToken, now + 200), /authorization_revoked/);
});
test('login starts are capped transactionally', async () => {
  const store = new MemoryStore();
  const results = await Promise.allSettled(Array.from({ length: 25 }, () => startAttempt(store, { clientType: 'cli', label: 'Terminal', challenge: challenge(verifier) }, now)));
  assert.equal(results.filter((r) => r.status === 'fulfilled').length, 20);
});
