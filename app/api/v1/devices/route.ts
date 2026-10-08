import { NextRequest } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { revokeAllGrants } from '@/lib/auth/client-grants';
import { firestoreStore } from '@/lib/platform/firestore';
import { handle, webUser } from '@/lib/platform/http';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) { return handle(async () => {
  const user = await webUser(req);
  const db = adminDb();
  const [rows, security] = await Promise.all([db.collection('clientGrants').where('uid', '==', user.uid).limit(100).get(), db.doc(`accountSecurity/${user.uid}`).get()]);
  const epoch = security.data()?.epoch ?? 0;
  return { devices: rows.docs.map((doc) => { const d = doc.data(); return { id: doc.id, label: d.label, clientType: d.clientType, createdAt: d.createdAt, expiresAt: d.expiresAt, revoked: Boolean(d.revoked || d.epoch !== epoch) }; }) };
}); }
export async function DELETE(req: NextRequest) { return handle(async () => {
  const user = await webUser(req, true);
  await revokeAllGrants(firestoreStore(), user.uid);
  await adminAuth().revokeRefreshTokens(user.uid);
  return { ok: true };
}); }
