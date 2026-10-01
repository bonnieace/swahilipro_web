import { NextRequest } from 'next/server';
import { decideAttempt } from '@/lib/auth/client-grants';
import { recentSignIn } from '@/lib/auth/policy';
import { firestoreStore } from '@/lib/platform/firestore';
import { body, handle, webUser } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) { return handle(async () => {
  const user = await webUser(req, true);
  requireValue(recentSignIn(user.auth_time, Date.now() / 1000), 'recent_sign_in_required', 401);
  const input = await body(req); requireValue(typeof input.approve === 'boolean', 'invalid_decision');
  await decideAttempt(firestoreStore(), String(input.attemptId || ''), user.uid, input.approve, String(input.confirmationCode || ''));
  return { ok: true };
}); }
