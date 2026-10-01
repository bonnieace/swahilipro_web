import { NextRequest } from 'next/server';
import { pollAttempt } from '@/lib/auth/client-grants';
import { firestoreStore } from '@/lib/platform/firestore';
import { body, handle } from '@/lib/platform/http';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) { return handle(async () => {
  const input = await body(req);
  return pollAttempt(firestoreStore(), String(input.attemptId || ''), String(input.pollingSecret || ''));
}); }
