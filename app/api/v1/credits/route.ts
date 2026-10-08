import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { apiUser, handle } from '@/lib/platform/http';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) { return handle(async () => {
  const user = await apiUser(req, 'credits:read');
  const row = (await adminDb().doc(`creditAccounts/${user.uid}`).get()).data();
  const balance = row?.balance ?? 0, reserved = row?.reserved ?? 0;
  return { balance, reserved, available: balance - reserved, unit: 'microcredits' };
}); }
