import { NextRequest } from 'next/server';
import { revokeGrant } from '@/lib/auth/client-grants';
import { firestoreStore } from '@/lib/platform/firestore';
import { handle, webUser } from '@/lib/platform/http';
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) { return handle(async () => {
  const user = await webUser(req, true); await revokeGrant(firestoreStore(), user.uid, (await context.params).id); return { ok: true };
}); }
