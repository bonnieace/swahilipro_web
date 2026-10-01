import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { grantCredits } from '@/lib/credits/ledger';
import { firestoreStore } from '@/lib/platform/firestore';
import { body, handle, webUser } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
export async function POST(req: NextRequest) { return handle(async () => {
  const user = await webUser(req, true);
  // Fetch current authoritative claims; don't rely on a stale cookie claim.
  const actor = await adminAuth().getUser(user.uid); requireValue(actor.customClaims?.admin === true, 'forbidden', 403);
  const input = await body(req);
  requireValue(typeof input.uid === 'string' && input.uid.length <= 128 && !input.uid.includes('/'), 'invalid_user');
  await adminAuth().getUser(input.uid);
  return grantCredits(firestoreStore(), input.uid, input.amount as number, String(input.operationKey || ''), user.uid, String(input.reason || ''));
}); }
