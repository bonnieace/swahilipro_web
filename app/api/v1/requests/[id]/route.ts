import { NextRequest } from 'next/server';
import { apiUser, handle } from '@/lib/platform/http';
import { firestoreStore } from '@/lib/platform/firestore';
import { getRequest, publicRequest } from '@/lib/inference/engine';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) { return handle(async () => {
  const user = await apiUser(req, 'inference:invoke'), id = (await context.params).id;
  return { request: publicRequest(id, await getRequest(firestoreStore(), user.uid, id)) };
}); }
