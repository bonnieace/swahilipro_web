import { NextRequest } from 'next/server';
import { refreshGrant, verifyAccess, revokeGrant } from '@/lib/auth/client-grants';
import { adminAuth } from '@/lib/firebase/admin';
import { firestoreStore } from '@/lib/platform/firestore';
import { body, handle } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) { return handle(async () => {
  const input = await body(req);
  const result = await refreshGrant(firestoreStore(), String(input.refreshToken || ''));
  const identity = await verifyAccess(firestoreStore(), result.accessToken);
  const user = await adminAuth().getUser(identity.uid);
  if (user.disabled) { await revokeGrant(firestoreStore(), identity.uid, identity.grantId); requireValue(false, 'authorization_revoked', 401); }
  return result;
}); }
