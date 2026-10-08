import { NextResponse } from 'next/server';
import { recentSignIn } from './policy';

// Session probes are read-only: a delayed probe must never restore an old cookie
// after a fresh login, an account change, or logout in another tab.
export async function sessionStatusResponse(token: string | undefined, verify: (token: string) => Promise<{ auth_time: number }>, now = Date.now() / 1000) {
  let signedIn = false, recent = false;
  if (token) {
    try {
      const identity = await verify(token);
      signedIn = true;
      recent = recentSignIn(identity.auth_time, now);
    } catch { /* Invalid or revoked sessions must sign in again. */ }
  }
  return NextResponse.json({ signedIn, recentSignIn: recent }, { headers: { 'Cache-Control': 'no-store' } });
}
