export const SESSION_COOKIE = 'swahilipro_session';
export const SESSION_SECONDS = 60 * 60 * 24 * 5;
export const SESSION_SAME_SITE = 'lax' as const;
export function signInDestination(next: string | null): string {
  return next && /^\/authorize-client\?attempt=[A-Za-z0-9_-]{43}$/.test(next) ? next : '/account';
}
export function resumeSession(destination: string, recent: boolean, reauthenticate: boolean): boolean {
  return !reauthenticate && (destination === '/account' || recent);
}
export function trustedOrigin(origin: string | null, configured: string | undefined): boolean {
  if (!origin || !configured) return false;
  try { return origin === new URL(configured).origin; } catch { return false; }
}
export function recentSignIn(authTime: number, now: number): boolean {
  return Number.isFinite(authTime) && authTime <= now + 30 && now - authTime <= 300;
}
