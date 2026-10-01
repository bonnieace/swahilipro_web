import { NextRequest } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { adminDb } from '@/lib/firebase/admin';
import { handle } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) { return handle(async () => {
  const configured = process.env.INTERNAL_JOB_TOKEN || '';
  const supplied = req.headers.get('authorization')?.replace(/^Bearer /, '') || '';
  requireValue(configured.length >= 32 && supplied.length === configured.length && timingSafeEqual(Buffer.from(configured), Buffer.from(supplied)), 'forbidden', 403);
  const db = adminDb(), counts: Record<string, number> = {};
  // Bounded cleanup, no paid TTL or Cloud Functions required. Refresh records stay
  // until expiry so reuse detection cannot be bypassed by early deletion.
  for (const collection of ['loginAttempts', 'clientTokens', 'clientGrants']) {
    const rows = await db.collection(collection).where('expiresAt', '<=', Date.now()).limit(100).get();
    if (!rows.empty) { const batch = db.batch(); rows.docs.forEach((doc) => batch.delete(doc.ref)); await batch.commit(); }
    counts[collection] = rows.size;
  }
  return { deleted: counts };
}); }
