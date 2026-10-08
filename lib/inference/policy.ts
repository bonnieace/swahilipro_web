import { requireValue } from '@/lib/platform/store';
import { amountValid } from '@/lib/credits/ledger';
import { InferenceInput, ModelPolicy } from './types';
export function policies(raw: string | undefined): ModelPolicy[] {
  if (!raw) return [];
  let rows: unknown; try { rows = JSON.parse(raw); } catch { throw new Error('Invalid model policy configuration'); }
  requireValue(Array.isArray(rows) && rows.length <= 10, 'invalid_model_configuration', 503);
  const ids = new Set<string>();
  for (const row of rows) {
    requireValue(row && typeof row === 'object', 'invalid_model_configuration', 503);
    requireValue(typeof row.id === 'string' && row.id.length > 0 && row.id.length <= 250 && !ids.has(row.id), 'invalid_model_configuration', 503);
    ids.add(row.id);
    // Counting must use the same underlying model, never a cheaper tokenizer.
    requireValue(row.countModelId === undefined || row.countModelId === row.id.replace(/^(us|eu|au|jp|in|apac|global)\./, ''), 'invalid_count_model', 503);
    requireValue(typeof row.name === 'string' && row.name.length <= 100 && /^[a-z]{2}-[a-z]+-\d+$/.test(row.region), 'invalid_model_configuration', 503);
    requireValue(row.api === 'converse' && row.billingVerified === true, 'unsupported_model', 503);
    requireValue(amountValid(row.inputMicrocreditsPerToken) && amountValid(row.outputMicrocreditsPerToken), 'invalid_model_price', 503);
    requireValue(amountValid(row.inputNanodollarsPerToken) && amountValid(row.outputNanodollarsPerToken), 'invalid_provider_price', 503);
    requireValue(Number.isSafeInteger(row.maxInputTokens * row.inputNanodollarsPerToken + row.maxOutputTokens * row.outputNanodollarsPerToken), 'invalid_provider_price', 503);
    requireValue(amountValid(row.maxInputTokens) && row.maxInputTokens <= 100000 && amountValid(row.maxOutputTokens) && row.maxOutputTokens <= 8192, 'invalid_model_limit', 503);
    requireValue(Number.isSafeInteger(row.maxInputTokens * row.inputMicrocreditsPerToken + row.maxOutputTokens * row.outputMicrocreditsPerToken), 'invalid_model_price', 503);
  }
  return rows as ModelPolicy[];
}
export function parseInput(value: Record<string, unknown>, modelPolicies: ModelPolicy[]): { input: InferenceInput; policy: ModelPolicy } {
  requireValue(Object.keys(value).every((key) => ['model', 'messages', 'system', 'maxOutputTokens'].includes(key)), 'unsupported_input');
  const policy = modelPolicies.find((p) => p.id === value.model); requireValue(policy, 'model_unavailable', 403);
  requireValue(Array.isArray(value.messages) && value.messages.length > 0 && value.messages.length <= 30, 'invalid_messages');
  const messages = value.messages.map((row) => {
    requireValue(row && typeof row === 'object' && Object.keys(row).every((key) => ['role', 'content'].includes(key)), 'invalid_message');
    requireValue((row.role === 'user' || row.role === 'assistant') && typeof row.content === 'string' && row.content.length > 0 && row.content.length <= 30000, 'invalid_message');
    return { role: row.role, content: row.content };
  });
  requireValue(messages[0].role === 'user' && messages[messages.length - 1].role === 'user', 'invalid_message_order');
  requireValue(value.system === undefined || (typeof value.system === 'string' && value.system.length <= 4000), 'invalid_system');
  requireValue(typeof value.maxOutputTokens === 'number' && Number.isSafeInteger(value.maxOutputTokens) && value.maxOutputTokens > 0 && value.maxOutputTokens <= policy.maxOutputTokens, 'invalid_output_limit');
  return { input: { model: policy.id, messages, ...(value.system === undefined ? {} : { system: value.system as string }), maxOutputTokens: value.maxOutputTokens }, policy };
}
export function cost(policy: ModelPolicy, inputTokens: number, outputTokens: number) {
  requireValue(Number.isSafeInteger(inputTokens) && inputTokens >= 0 && Number.isSafeInteger(outputTokens) && outputTokens >= 0, 'invalid_provider_usage', 503);
  const amount = inputTokens * policy.inputMicrocreditsPerToken + outputTokens * policy.outputMicrocreditsPerToken;
  requireValue(Number.isSafeInteger(amount) && amount >= 0, 'invalid_provider_usage', 503); return amount;
}

// Integer nanodollars keep provider spending independent of wallet pricing.
export function providerCost(policy: ModelPolicy, inputTokens: number, outputTokens: number) {
  return cost({ ...policy, inputMicrocreditsPerToken: policy.inputNanodollarsPerToken, outputMicrocreditsPerToken: policy.outputNanodollarsPerToken }, inputTokens, outputTokens);
}
