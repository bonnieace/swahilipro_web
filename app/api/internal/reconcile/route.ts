import { NextRequest } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { adminDb } from '@/lib/firebase/admin';
import { handle } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
import { firestoreStore } from '@/lib/platform/firestore';
import { reconcileRequest } from '@/lib/inference/engine';
export async function POST(req: NextRequest) { return handle(async () => {
  const expected = process.env.INTERNAL_JOB_TOKEN || '', supplied = req.headers.get('authorization')?.replace(/^Bearer /, '') || '';
  requireValue(expected.length >= 32 && expected.length === supplied.length && timingSafeEqual(Buffer.from(expected), Buffer.from(supplied)), 'forbidden', 403);
  const rows = await adminDb().collection('inferenceRequests').where('leaseUntil', '<=', Date.now()).where('state', 'in', ['reserved', 'invoking']).limit(50).get();
  const confirmed = await adminDb().collection('inferenceRequests').where('state', '==', 'unknown').where('confirmedActual', '>=', 0).limit(50).get();
  const results = [];
  for (const row of [...rows.docs, ...confirmed.docs]) {
    try { results.push({ id: row.id, result: await reconcileRequest(firestoreStore(), row.id) }); }
    catch { results.push({ id: row.id, result: 'retry_required' }); }
  }
  return { results };
}); }
