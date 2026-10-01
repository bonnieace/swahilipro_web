import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth/session';
export const dynamic = 'force-dynamic';
export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'unauthenticated' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  return NextResponse.json({ uid: user.uid, email: user.email || null, name: user.name || null }, { headers: { 'Cache-Control': 'no-store' } });
}
