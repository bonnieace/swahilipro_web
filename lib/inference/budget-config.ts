import { requireValue } from '@/lib/platform/store';
export function providerBudgetConfig(env: Record<string, string | undefined>, now = Date.now()) {
  const expiresAt = Date.parse(env.BEDROCK_CREDIT_EXPIRES_AT || '');
  requireValue(Number.isFinite(expiresAt) && now < expiresAt, 'credit_expired_or_unverified', 503);
  const totalUsdCap = Number(env.BEDROCK_TOTAL_USD_CAP);
  requireValue(totalUsdCap > 0 && totalUsdCap <= 300 && Number.isSafeInteger(totalUsdCap * 1e9), 'invalid_total_budget', 503);
  return totalUsdCap * 1e9;
}
