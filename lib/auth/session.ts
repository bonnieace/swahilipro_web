import 'server-only';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { SESSION_COOKIE } from './policy';
export async function currentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  // Infrastructure/configuration failures must not masquerade as a valid session.
  try { return await adminAuth().verifySessionCookie(token, true); } catch { return null; }
}
