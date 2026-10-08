import { NextRequest } from 'next/server';
import { apiUser, handle } from '@/lib/platform/http';
import { adminAuth } from '@/lib/firebase/admin';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) { return handle(async () => {
  const identity = await apiUser(req, 'profile:read'); const user = await adminAuth().getUser(identity.uid);
  return { uid: user.uid, email: user.email || null, name: user.displayName || null, grantId: identity.grantId };
}); }
