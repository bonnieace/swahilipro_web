export const SESSION_COOKIE = 'swahilipro_session';
export const SESSION_SECONDS = 60 * 60 * 24 * 5;
export function trustedOrigin(origin: string | null, configured: string | undefined): boolean {
  if (!origin || !configured) return false;
  try { return origin === new URL(configured).origin; } catch { return false; }
}
export function recentSignIn(authTime: number, now: number): boolean {
  return Number.isFinite(authTime) && authTime <= now + 30 && now - authTime <= 300;
}
