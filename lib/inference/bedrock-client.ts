import { BedrockRuntimeClientConfig } from '@aws-sdk/client-bedrock-runtime';
// Called only by the server provider; credentials are never returned by APIs.
export function bedrockClientOptions(region: string, key = process.env.AWS_BEARER_TOKEN_BEDROCK): BedrockRuntimeClientConfig {
  const token = key?.trim();
  return { region, maxAttempts: 1, ...(token ? { token: { token }, authSchemePreference: ['httpBearerAuth'] } : {}) };
}

export function countingModelId(policy: { id: string; countModelId?: string }) {
  return policy.countModelId ?? policy.id;
}
