import { NextRequest } from 'next/server';
import { apiUser, handle } from '@/lib/platform/http';
import { modelPolicies } from '@/lib/inference/config';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) { return handle(async () => {
  await apiUser(req, 'profile:read');
  return { enabled: process.env.BEDROCK_ENABLED === 'true', models: modelPolicies().map((p) => ({ id: p.id, name: p.name, maxInputTokens: p.maxInputTokens, maxOutputTokens: p.maxOutputTokens, supportsTools: false, api: p.api, prices: { inputMicrocreditsPerToken: p.inputMicrocreditsPerToken, outputMicrocreditsPerToken: p.outputMicrocreditsPerToken } })) };
}); }
