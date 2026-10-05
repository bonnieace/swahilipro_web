import { NextRequest, NextResponse } from 'next/server';
import { apiUser, body, handle, json, webUser } from '@/lib/platform/http';
import { firestoreStore } from '@/lib/platform/firestore';
import { gatewayConfig } from '@/lib/inference/config';
import { parseInput } from '@/lib/inference/policy';
import { prepare, invoke } from '@/lib/inference/engine';
import { bedrockProvider } from '@/lib/inference/bedrock';
import { StreamEvent } from '@/lib/inference/types';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
  // Establish reservation before constructing the stream so rejection is a normal
  // HTTP error. SSE stream events carry their own terminal failure state.
  let ready: Awaited<ReturnType<typeof prepare>>;
  let parsed: ReturnType<typeof parseInput>;
  let uid: string;
  const store = firestoreStore;
  try {
    if (!req.headers.has('authorization')) await webUser(req, true);
    const identity = await apiUser(req, 'inference:invoke'); uid = identity.uid;
    const config = gatewayConfig();
    parsed = parseInput(await body(req, 65536), config.policies);
    ready = await prepare(store(), bedrockProvider, uid, identity.grantId, req.headers.get('idempotency-key') || '', parsed.input, parsed.policy, config.dailyCap, req.signal);
    if (ready.duplicate) return json({ duplicate: true, request: { id: ready.id, state: ready.row.state, actual: ready.row.actual ?? null, responseRetained: false } }, 202);
  } catch (error) { return handle(async () => { throw error; }); }
  const controller = new AbortController(); const abort = () => controller.abort();
  req.signal.addEventListener('abort', abort, { once: true });
  if (req.signal.aborted) abort();
  const timer = setTimeout(abort, 90000);
  let cancelled = false;
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(output) {
      const emit = (event: StreamEvent) => {
        if (cancelled) return;
        try { output.enqueue(encoder.encode(`data: ${JSON.stringify({ version: 1, ...event })}\n\n`)); }
        catch { cancelled = true; controller.abort(); }
      };
      try { await invoke(store(), bedrockProvider, uid, ready.id, parsed.input, parsed.policy, controller.signal, emit); }
      catch { emit({ type: 'request.failed', requestId: ready.id, error: 'service_unavailable', reconciliationRequired: true }); }
      finally {
        clearTimeout(timer); req.signal.removeEventListener('abort', abort);
        if (!cancelled) { try { output.close(); } catch { /* Reader disconnected. */ } }
      }
    },
    cancel() { cancelled = true; controller.abort(); },
  });
  return new NextResponse(stream, { headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store, no-transform', 'X-Accel-Buffering': 'no' } });
}
