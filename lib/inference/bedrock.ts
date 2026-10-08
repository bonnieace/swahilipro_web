import 'server-only';
import { countingModelId, bedrockClientOptions } from './bedrock-client';
import { BedrockRuntimeClient, ConverseStreamCommand, CountTokensCommand } from '@aws-sdk/client-bedrock-runtime';
import { Provider, InferenceInput, ModelPolicy } from './types';
import { PlatformError } from '@/lib/platform/store';
function conversation(input: InferenceInput) {
  return { messages: input.messages.map((message) => ({ role: message.role, content: [{ text: message.content }] })), ...(input.system ? { system: [{ text: input.system }] } : {}) };
}
export const bedrockProvider: Provider = {
  async count(policy: ModelPolicy, input: InferenceInput, signal: AbortSignal) {
    const client = new BedrockRuntimeClient(bedrockClientOptions(policy.region));
    try {
      const result = await client.send(new CountTokensCommand({ modelId: countingModelId(policy), input: { converse: conversation(input) } }), { abortSignal: signal });
      if (!Number.isSafeInteger(result.inputTokens)) throw new PlatformError('token_count_unavailable', 503);
      return result.inputTokens!;
    } finally { client.destroy(); }
  },
  async *stream(policy: ModelPolicy, input: InferenceInput, signal: AbortSignal) {
    // No SDK auto-retry of paid invocation: ambiguous transport failure is tracked.
    const client = new BedrockRuntimeClient(bedrockClientOptions(policy.region));
    try {
      const result = await client.send(new ConverseStreamCommand({ modelId: policy.id, ...conversation(input), inferenceConfig: { maxTokens: input.maxOutputTokens } }), { abortSignal: signal });
      if (!result.stream) throw new PlatformError('provider_stream_missing', 503);
      for await (const event of result.stream) {
        if (event.contentBlockDelta?.delta?.text !== undefined) yield { type: 'text', text: event.contentBlockDelta.delta.text };
        else if (event.contentBlockDelta?.delta) throw new PlatformError('unsupported_provider_content', 503);
        if (event.contentBlockStart?.start?.toolUse) throw new PlatformError('unsupported_provider_content', 503);
        if (event.metadata?.usage) {
          const usage = event.metadata.usage;
          // Caching/reasoning/additional billable modes are not enabled in v1.
          if (usage.cacheReadInputTokens || usage.cacheWriteInputTokens || usage.inputTokens === undefined || usage.outputTokens === undefined) throw new PlatformError('unsupported_provider_usage', 503);
          yield { type: 'usage', inputTokens: usage.inputTokens, outputTokens: usage.outputTokens };
        }
        if (event.internalServerException || event.modelStreamErrorException || event.serviceUnavailableException || event.throttlingException || event.validationException) throw new PlatformError('provider_stream_failed', 503);
      }
    } finally { client.destroy(); }
  },
};
