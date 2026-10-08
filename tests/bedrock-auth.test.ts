import test from 'node:test';
import assert from 'node:assert/strict';
import { BedrockRuntimeClient, CountTokensCommand, ConverseStreamCommand } from '@aws-sdk/client-bedrock-runtime';
import { countingModelId, bedrockClientOptions } from '../lib/inference/bedrock-client';

test('API-key SDK sends bearer auth for counting and streaming without IAM credentials or retries', async () => {
  const seen: string[] = [];
  const client = new BedrockRuntimeClient({ ...bedrockClientOptions('us-east-1', ' test-key '),
    credentials: async () => { throw new Error('IAM credentials must not be requested'); },
    requestHandler: { async handle(request: { headers: Record<string, string>; path: string }) {
      assert.equal(Object.entries(request.headers).find(([name]) => name.toLowerCase() === 'authorization')?.[1], 'Bearer test-key'); seen.push(request.path);
      return { response: { statusCode: 200, headers: { 'content-type': 'application/json' }, body: Buffer.from('{"inputTokens":5}') } };
    } },
  });
  try {
    assert.equal((await client.send(new CountTokensCommand({ modelId: 'fake', input: { converse: { messages: [{ role: 'user', content: [{ text: 'Hello' }] }] } } }))).inputTokens, 5);
    // Deliberately invalid event-stream body; transport still verifies auth selection.
    await client.send(new ConverseStreamCommand({ modelId: 'fake', messages: [{ role: 'user', content: [{ text: 'Hello' }] }] })).catch(() => {});
    assert.equal(seen.length, 2); assert.ok(seen[0].endsWith('/count-tokens')); assert.ok(seen[1].endsWith('/converse-stream'));
    assert.equal(await client.config.maxAttempts(), 1);
    assert.equal(bedrockClientOptions('us-east-1', '').token, undefined);
  } finally { client.destroy(); }
});

import { providerBudgetConfig } from '../lib/inference/budget-config';
test('provider budget rejects missing/expired credits and ceilings over 300 USD', () => {
  const env = { BEDROCK_CREDIT_EXPIRES_AT: '2026-12-01T00:00:00Z', BEDROCK_TOTAL_USD_CAP: '300' };
  const now = Date.parse('2026-10-08T00:00:00Z');
  assert.equal(providerBudgetConfig(env, now), 300e9);
  assert.throws(() => providerBudgetConfig({ ...env, BEDROCK_TOTAL_USD_CAP: '301' }, now), /invalid_total_budget/);
  assert.throws(() => providerBudgetConfig({ ...env, BEDROCK_CREDIT_EXPIRES_AT: '' }, now), /credit_expired_or_unverified/);
  assert.throws(() => providerBudgetConfig(env, Date.parse(env.BEDROCK_CREDIT_EXPIRES_AT)), /credit_expired_or_unverified/);
});

test('counting uses configured underlying model while inference retains profile ID', () => {
  const policy = { id: 'us.anthropic.claude-sonnet-4-6', countModelId: 'anthropic.claude-sonnet-4-6' };
  assert.equal(countingModelId(policy), 'anthropic.claude-sonnet-4-6');
  assert.equal(policy.id, 'us.anthropic.claude-sonnet-4-6');
  assert.equal(countingModelId({ id: 'fake' }), 'fake');
});
