import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { PlatformError, requireValue, Store, StoreTransaction } from '@/lib/platform/store';
export const ACCESS_MS = 15 * 60 * 1000;
export const REFRESH_MS = 30 * 24 * 60 * 60 * 1000;
export const ATTEMPT_MS = 10 * 60 * 1000;
export const POLL_MS = 5000;
const secret = () => randomBytes(32).toString('base64url');
export const hash = (value: string) => createHash('sha256').update(value).digest('hex');
export const challenge = (value: string) => createHash('sha256').update(value).digest('base64url');
const equal = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
export const identifier = (value: unknown) => typeof value === 'string' && /^[A-Za-z0-9_-]{43}$/.test(value);
export function verifierValid(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9._~-]{43,128}$/.test(value);
}
async function accountEpoch(tx: StoreTransaction, uid: string): Promise<number> {
  const row = await tx.get(`accountSecurity/${uid}`);
  return row ? Number(row.epoch) : 0;
}
async function attempt(tx: StoreTransaction, id: string, pollSecret: string, now: number) {
  requireValue(identifier(id) && identifier(pollSecret), 'invalid_request');
  const row = await tx.get(`loginAttempts/${id}`);
  requireValue(row && equal(String(row.pollHash), hash(pollSecret)), 'invalid_attempt', 401);
  requireValue(Number(row.expiresAt) > now, 'attempt_expired', 410);
  requireValue(row.state !== 'consumed', 'attempt_consumed', 409);
  requireValue(row.state !== 'denied', 'authorization_denied', 403);
  requireValue(now - Number(row.lastPolledAt || 0) >= POLL_MS, 'slow_down', 429);
  return row;
}
function tokens(uid: string, grantId: string, now: number, epoch: number) {
  const accessToken = secret(); const refreshToken = secret();
  return {
    response: { tokenType: 'Bearer', accessToken, refreshToken, expiresIn: ACCESS_MS / 1000, grantId },
    access: { uid, grantId, epoch, expiresAt: now + ACCESS_MS, kind: 'access' },
    refresh: { uid, grantId, epoch, expiresAt: now + REFRESH_MS, kind: 'refresh', used: false },
    accessHash: hash(accessToken), refreshHash: hash(refreshToken),
  };
}
export async function startAttempt(store: Store, input: { clientType: unknown; label: unknown; challenge: unknown }, now = Date.now()) {
  requireValue(input.clientType === 'cli' || input.clientType === 'vscode', 'invalid_client');
  requireValue(typeof input.label === 'string' && input.label.trim().length >= 1 && input.label.length <= 80 && !/[\x00-\x1f]/.test(input.label), 'invalid_label');
  requireValue(identifier(input.challenge), 'invalid_challenge');
  const id = secret(); const pollingSecret = secret();
  const confirmationCode = randomBytes(4).toString('hex').toUpperCase();
  await store.transaction(async (tx) => {
    // A global bounded beta gate prevents unlimited anonymous attempt writes.
    // Firestore retries this reservation without any external side effects.
    const limits = await tx.get('platformLimits/loginStarts');
    const minute = Math.floor(now / 60000), day = Math.floor(now / 86400000);
    const minuteCount = limits?.minute === minute ? Number(limits.minuteCount) : 0;
    const dayCount = limits?.day === day ? Number(limits.dayCount) : 0;
    requireValue(minuteCount < 20 && dayCount < 100, 'rate_limited', 429);
    tx.set('platformLimits/loginStarts', { minute, day, minuteCount: minuteCount + 1, dayCount: dayCount + 1 });
    tx.set(`loginAttempts/${id}`, { clientType: input.clientType, label: (input.label as string).trim(), challenge: input.challenge, pollHash: hash(pollingSecret), confirmationCode, state: 'pending', createdAt: now, expiresAt: now + ATTEMPT_MS, lastPolledAt: 0 });
  });
  return { attemptId: id, pollingSecret, confirmationCode, interval: POLL_MS / 1000, expiresIn: ATTEMPT_MS / 1000 };
}
export async function decideAttempt(store: Store, id: string, uid: string, approve: boolean, confirmationCode: string, now = Date.now()) {
  requireValue(identifier(id), 'invalid_request');
  await store.transaction(async (tx) => {
    const row = await tx.get(`loginAttempts/${id}`);
    requireValue(row && row.state === 'pending' && Number(row.expiresAt) > now, 'attempt_unavailable', 409);
    requireValue(equal(String(row.confirmationCode), confirmationCode.toUpperCase()), 'confirmation_mismatch');
    const epoch = await accountEpoch(tx, uid);
    tx.set(`loginAttempts/${id}`, { ...row, uid, epoch, state: approve ? 'approved' : 'denied', decidedAt: now });
  });
}
export async function pollAttempt(store: Store, id: string, pollingSecret: string, now = Date.now()) {
  return store.transaction(async (tx) => {
    const row = await attempt(tx, id, pollingSecret, now);
    tx.set(`loginAttempts/${id}`, { ...row, lastPolledAt: now });
    return { state: row.state };
  });
}
export async function completeAttempt(store: Store, id: string, pollingSecret: string, verifier: string, now = Date.now()) {
  requireValue(verifierValid(verifier), 'invalid_verifier');
  // Generate grant identifier outside retries; return credentials only after commit.
  const grantId = secret();
  return store.transaction(async (tx) => {
    const row = await attempt(tx, id, pollingSecret, now);
    requireValue(row.state === 'approved', 'authorization_pending', 409);
    requireValue(equal(String(row.challenge), challenge(verifier)), 'invalid_verifier', 401);
    const uid = String(row.uid), epoch = await accountEpoch(tx, uid);
    requireValue(epoch === row.epoch, 'authorization_revoked', 401);
    const pair = tokens(uid, grantId, now, epoch);
    tx.set(`loginAttempts/${id}`, { ...row, state: 'consumed', consumedAt: now });
    tx.set(`clientGrants/${grantId}`, { uid, epoch, label: row.label, clientType: row.clientType, permissions: ['profile:read', 'credits:read', 'inference:invoke'], createdAt: now, expiresAt: now + REFRESH_MS, revoked: false });
    tx.set(`clientTokens/${pair.accessHash}`, pair.access);
    tx.set(`clientTokens/${pair.refreshHash}`, pair.refresh);
    return pair.response;
  });
}
async function credential(tx: StoreTransaction, raw: string, kind: string, now: number) {
  requireValue(identifier(raw), 'unauthenticated', 401);
  const token = await tx.get(`clientTokens/${hash(raw)}`);
  requireValue(token && token.kind === kind && Number(token.expiresAt) > now, 'unauthenticated', 401);
  const grant = await tx.get(`clientGrants/${token.grantId}`);
  const epoch = await accountEpoch(tx, String(token.uid));
  requireValue(grant && grant.uid === token.uid && !grant.revoked && Number(grant.expiresAt) > now && token.epoch === epoch && grant.epoch === epoch, 'authorization_revoked', 401);
  return { token, grant };
}
export async function verifyAccess(store: Store, raw: string, now = Date.now()) {
  return store.transaction(async (tx) => {
    const { token, grant } = await credential(tx, raw, 'access', now);
    return { uid: String(token.uid), grantId: String(token.grantId), permissions: grant.permissions as string[] };
  });
}
export async function refreshGrant(store: Store, raw: string, now = Date.now()) {
  const result = await store.transaction(async (tx) => {
    const { token, grant } = await credential(tx, raw, 'refresh', now);
    if (token.used) {
      tx.set(`clientGrants/${token.grantId}`, { ...grant, revoked: true, revokedAt: now });
      return null; // Commit revocation, then report failure outside the transaction.
    }
    const pair = tokens(String(token.uid), String(token.grantId), now, Number(token.epoch));
    pair.refresh.expiresAt = Number(grant.expiresAt); // No indefinite sliding refresh lifetime.
    tx.set(`clientTokens/${hash(raw)}`, { ...token, used: true, usedAt: now });
    tx.set(`clientTokens/${pair.accessHash}`, pair.access);
    tx.set(`clientTokens/${pair.refreshHash}`, pair.refresh);
    return pair.response;
  });
  if (!result) throw new PlatformError('refresh_reused', 401);
  return result;
}
export async function revokeGrant(store: Store, uid: string, id: string, now = Date.now()) {
  requireValue(identifier(id), 'invalid_request');
  await store.transaction(async (tx) => {
    const row = await tx.get(`clientGrants/${id}`);
    requireValue(row && row.uid === uid, 'not_found', 404);
    tx.set(`clientGrants/${id}`, { ...row, revoked: true, revokedAt: now });
  });
}
export async function revokeAllGrants(store: Store, uid: string) {
  await store.transaction(async (tx) => {
    const epoch = await accountEpoch(tx, uid);
    tx.set(`accountSecurity/${uid}`, { epoch: epoch + 1 });
  });
}
