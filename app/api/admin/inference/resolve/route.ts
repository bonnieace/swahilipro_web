import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { settleCredits } from '@/lib/credits/ledger';
import { getRequest } from '@/lib/inference/engine';
import { firestoreStore } from '@/lib/platform/firestore';
import { body, handle, webUser } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
export async function POST(req: NextRequest) { return handle(async () => {
  const user = await webUser(req, true);
  const actor = await adminAuth().getUser(user.uid);
  requireValue(actor.customClaims?.admin === true && !actor.disabled, 'forbidden', 403);
  const input = await body(req);
  requireValue(typeof input.uid === 'string' && typeof input.requestId === 'string' && typeof input.reason === 'string', 'invalid_review');
  const store = firestoreStore(); await getRequest(store, input.uid, input.requestId);
  // Operator must verify the provider cost independently. No automatic refund
  // follows an interrupted stream; review is restricted to expired unknown calls.
  return settleCredits(store, input.uid, input.requestId, input.actual as number, Date.now(), 'unknown', { actor: user.uid, reason: input.reason });
}); }
