import 'server-only';
import { providerBudgetConfig } from './budget-config';
import { policies } from './policy';
import { requireValue } from '@/lib/platform/store';
export const modelPolicies = () => policies(process.env.BEDROCK_MODELS_JSON);
export function gatewayConfig() {
  requireValue(process.env.BEDROCK_ENABLED === 'true', 'inference_disabled', 503);
  const dailyCap = Number(process.env.BEDROCK_DAILY_MICROCREDIT_CAP);
  requireValue(Number.isSafeInteger(dailyCap) && dailyCap > 0, 'invalid_daily_budget', 503);
  return { dailyCap, totalCap: providerBudgetConfig(process.env), policies: modelPolicies() };
}
