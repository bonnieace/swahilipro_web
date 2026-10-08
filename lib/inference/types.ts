export type ModelPolicy = {
  id: string; name: string; region: string; api: 'converse';
  inputMicrocreditsPerToken: number; outputMicrocreditsPerToken: number;
  inputNanodollarsPerToken: number; outputNanodollarsPerToken: number;
  maxInputTokens: number; maxOutputTokens: number; billingVerified: true;
};
export type InferenceInput = {
  model: string; messages: { role: 'user' | 'assistant'; content: string }[];
  system?: string; maxOutputTokens: number;
};
export type ProviderEvent = { type: 'text'; text: string } | { type: 'usage'; inputTokens: number; outputTokens: number };
export interface Provider {
  count(policy: ModelPolicy, input: InferenceInput, signal: AbortSignal): Promise<number>;
  stream(policy: ModelPolicy, input: InferenceInput, signal: AbortSignal): AsyncIterable<ProviderEvent>;
}
export type StreamEvent = { type: string; [key: string]: unknown };
