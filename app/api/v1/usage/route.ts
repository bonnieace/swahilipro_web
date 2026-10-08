import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { apiUser, handle } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) { return handle(async () => {
  const user = await apiUser(req, 'credits:read'), db = adminDb();
  let query = db.collection('creditLedger').where('uid', '==', user.uid).orderBy('createdAt', 'desc').limit(50);
  const cursor = req.nextUrl.searchParams.get('cursor');
  if (cursor) {
    requireValue(/^[a-f0-9]{64}$/.test(cursor), 'invalid_cursor');
    const row = await db.doc(`creditLedger/${cursor}`).get();
    requireValue(row.exists && row.data()?.uid === user.uid, 'invalid_cursor');
    query = query.startAfter(row);
  }
  const result = await query.get();
  return { entries: result.docs.map((doc) => { const d = doc.data(); return { id: doc.id, kind: d.kind, amount: d.amount, createdAt: d.createdAt }; }), nextCursor: result.size === 50 ? result.docs[result.size - 1].id : null };
}); }
