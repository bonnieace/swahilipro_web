import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { completeAttempt } from '@/lib/auth/client-grants';
import { firestoreStore } from '@/lib/platform/firestore';
import { body, handle } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) { return handle(async () => {
  const input = await body(req);
  const result = await completeAttempt(firestoreStore(), String(input.attemptId || ''), String(input.pollingSecret || ''), String(input.verifier || ''));
  // Resolve owner via access validation and check Firebase account before delivering.
  const { verifyAccess, revokeGrant } = await import('@/lib/auth/client-grants');
  const identity = await verifyAccess(firestoreStore(), result.accessToken);
  const user = await adminAuth().getUser(identity.uid);
  if (user.disabled) { await revokeGrant(firestoreStore(), identity.uid, identity.grantId); requireValue(false, 'authorization_revoked', 401); }
  return result;
}); }
