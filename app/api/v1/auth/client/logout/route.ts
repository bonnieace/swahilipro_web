import { NextRequest } from 'next/server';
import { revokeGrant } from '@/lib/auth/client-grants';
import { firestoreStore } from '@/lib/platform/firestore';
import { apiUser, handle } from '@/lib/platform/http';
import { requireValue } from '@/lib/platform/store';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) { return handle(async () => {
  const user = await apiUser(req, 'profile:read'); requireValue(user.grantId, 'client_token_required', 401);
  await revokeGrant(firestoreStore(), user.uid, user.grantId); return { ok: true };
}); }
