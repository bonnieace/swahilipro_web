import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { currentUser } from '@/lib/auth/session';
import { trustedOrigin } from '@/lib/auth/policy';
import { verifyAccess } from '@/lib/auth/client-grants';
import { firestoreStore } from './firestore';
import { PlatformError, requireValue } from './store';
export const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '5' } : {}) } });
export async function handle(work: () => Promise<unknown>) {
  try { return json(await work()); } catch (error) {
    if (error instanceof PlatformError) return json({ error: error.code }, error.status);
    // Do not expose SDK errors, identifiers or credentials.
    return json({ error: 'service_unavailable' }, 503);
  }
}
export async function body(req: NextRequest) {
  requireValue(req.headers.get('content-type')?.startsWith('application/json'), 'invalid_content_type', 415);
  const reader = req.body?.getReader(); requireValue(reader, 'invalid_request');
  const chunks: Uint8Array[] = []; let size = 0;
  for (;;) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > 4096) { await reader.cancel(); throw new PlatformError('request_too_large', 413); } chunks.push(value); }
  try { const result = JSON.parse(Buffer.concat(chunks).toString('utf8')); requireValue(result && typeof result === 'object' && !Array.isArray(result), 'invalid_request'); return result as Record<string, unknown>; } catch { throw new PlatformError('invalid_request'); }
}
export async function webUser(req: NextRequest, mutation = false) {
  if (mutation) requireValue(trustedOrigin(req.headers.get('origin'), process.env.APP_ORIGIN), 'forbidden', 403);
  const user = await currentUser(); requireValue(user, 'unauthenticated', 401); return user;
}
export async function apiUser(req: NextRequest, permission: string) {
  const header = req.headers.get('authorization');
  if (!header) { const user = await webUser(req); return { uid: user.uid, grantId: null }; }
  requireValue(header.startsWith('Bearer '), 'unauthenticated', 401);
  const user = await verifyAccess(firestoreStore(), header.slice(7));
  requireValue(user.permissions.includes(permission), 'forbidden', 403);
  const identity = await adminAuth().getUser(user.uid);
  requireValue(!identity.disabled, 'authorization_revoked', 401);
  return user;
}
