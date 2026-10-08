import test from 'node:test';
import assert from 'node:assert/strict';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { adaptFirestore } from '../lib/platform/firestore-adapter';
import { grantCredits, reserveCredits, settleCredits } from '../lib/credits/ledger';
import { startAttempt, challenge, decideAttempt, completeAttempt, refreshGrant, verifyAccess } from '../lib/auth/client-grants';
const projectId = 'demo-swahilipro';
// Refuse to fall back to a live service. This suite never accepts production config.
assert.ok(process.env.FIRESTORE_EMULATOR_HOST, 'Firestore emulator required');
const db = getFirestore(initializeApp({ projectId }, 'ledger-integration'));
const store = adaptFirestore(db);
test('real Firestore serializes competing wallet writes and settles exactly once', async () => {
  const uid = `test-${Date.now()}`;
  await grantCredits(store, uid, 100, 'grant_key_00000001', 'test-admin', 'Emulator beta');
  const rows = await Promise.allSettled(['request_key_000001', 'request_key_000002'].map((key) => reserveCredits(store, uid, 75, key, 'a'.repeat(64))));
  const winner = rows.find((r) => r.status === 'fulfilled');
  assert.equal(rows.filter((r) => r.status === 'fulfilled').length, 1);
  assert.ok(winner && winner.status === 'fulfilled');
  await Promise.all([settleCredits(store, uid, winner.value.id, 30), settleCredits(store, uid, winner.value.id, 30)]);
  assert.deepEqual((await db.doc(`creditAccounts/${uid}`).get()).data(), { balance: 70, reserved: 0 });
});
test('real Firestore consumes approved attempt once and commits refresh-reuse revocation', async () => {
  const now = Date.now(), verifier = 'v'.repeat(64);
  const attempt = await startAttempt(store, { clientType: 'cli', label: 'Emulator terminal', challenge: challenge(verifier) }, now);
  await decideAttempt(store, attempt.attemptId, 'emulator-alice', true, attempt.confirmationCode, now + 1);
  const rows = await Promise.allSettled([1, 2].map(() => completeAttempt(store, attempt.attemptId, attempt.pollingSecret, verifier, now + 2)));
  const winner = rows.find((r) => r.status === 'fulfilled');
  assert.equal(rows.filter((r) => r.status === 'fulfilled').length, 1);
  assert.ok(winner && winner.status === 'fulfilled');
  const next = await refreshGrant(store, winner.value.refreshToken, now + 3);
  await assert.rejects(refreshGrant(store, winner.value.refreshToken, now + 4), /refresh_reused/);
  await assert.rejects(verifyAccess(store, next.accessToken, now + 5), /authorization_revoked/);
});
test('Firestore client API cannot read or write a financial document', async () => {
  const host = process.env.FIRESTORE_EMULATOR_HOST!;
  const url = `http://${host}/v1/projects/${projectId}/databases/(default)/documents/creditAccounts/forbidden`;
  const read = await fetch(url);
  assert.equal(read.status, 403);
  const write = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: { balance: { integerValue: '99999' } } }) });
  assert.equal(write.status, 403);
});
test.after(async () => { await db.terminate(); });
