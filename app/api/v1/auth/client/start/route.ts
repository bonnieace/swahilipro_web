import { NextRequest } from 'next/server';
import { startAttempt } from '@/lib/auth/client-grants';
import { firestoreStore } from '@/lib/platform/firestore';
import { body, handle } from '@/lib/platform/http';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) { return handle(async () => {
  const input = await body(req);
  const origin = process.env.APP_ORIGIN;
  if (!origin) throw new Error('Missing origin');
  const result = await startAttempt(firestoreStore(), { clientType: input.clientType, label: input.label, challenge: input.challenge });
  return { ...result, verificationUrl: `${new URL(origin).origin}/authorize-client?attempt=${result.attemptId}` };
}); }
