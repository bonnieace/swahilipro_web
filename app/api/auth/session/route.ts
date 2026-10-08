import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { recentSignIn, SESSION_COOKIE, SESSION_SECONDS, SESSION_SAME_SITE, trustedOrigin } from '@/lib/auth/policy';
import { sessionStatusResponse } from '@/lib/auth/session-status';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function allowed(req: NextRequest) { return trustedOrigin(req.headers.get('origin'), process.env.APP_ORIGIN); }
export async function GET(req: NextRequest) {
  return sessionStatusResponse(req.cookies.get(SESSION_COOKIE)?.value, (token) => adminAuth().verifySessionCookie(token, true));
}
export async function POST(req: NextRequest) {
  if (!allowed(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (!req.headers.get('content-type')?.startsWith('application/json')) return NextResponse.json({ error: 'invalid_request' }, { status: 415 });
  const body = await req.text();
  if (body.length > 12000) return NextResponse.json({ error: 'invalid_request' }, { status: 413 });
  let idToken: unknown;
  try { idToken = JSON.parse(body).idToken; } catch { return NextResponse.json({ error: 'invalid_request' }, { status: 400 }); }
  if (typeof idToken !== 'string' || idToken.length > 10000) return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  try {
    const auth = adminAuth();
    const identity = await auth.verifyIdToken(idToken, true);
    if (!recentSignIn(identity.auth_time, Date.now() / 1000)) return NextResponse.json({ error: 'recent_sign_in_required' }, { status: 401 });
    const token = await auth.createSessionCookie(idToken, { expiresIn: SESSION_SECONDS * 1000 });
    const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
    response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: SESSION_SAME_SITE, path: '/', maxAge: SESSION_SECONDS });
    return response;
  } catch { return NextResponse.json({ error: 'sign_in_failed' }, { status: 401 }); }
}
export async function DELETE(req: NextRequest) {
  if (!allowed(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: SESSION_SAME_SITE, path: '/', maxAge: 0 });
  return response;
}
