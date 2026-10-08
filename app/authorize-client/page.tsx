import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';
import ClientConsent from '@/components/client-consent';
import { identifier } from '@/lib/auth/client-grants';
import { currentUser } from '@/lib/auth/session';
import { recentSignIn } from '@/lib/auth/policy';
import { adminDb } from '@/lib/firebase/admin';
export const dynamic = 'force-dynamic';
export default async function AuthorizeClient({ searchParams }: { searchParams: Promise<{ attempt?: string }> }) {
  const id = (await searchParams).attempt;
  if (!identifier(id)) return <main className="p-10">Invalid authorization link. Restart login in your client.</main>;
  const user = await currentUser();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(`/authorize-client?attempt=${id}`)}`);
  const row = (await adminDb().doc(`loginAttempts/${id}`).get()).data();
  const valid = row && row.state === 'pending' && row.expiresAt > Date.now();
  if (valid && !recentSignIn(user.auth_time, Date.now() / 1000)) redirect(`/sign-in?reauth=1&next=${encodeURIComponent(`/authorize-client?attempt=${id}`)}`);
  const message = row?.state === 'consumed' ? 'This client login is complete. Return to your client.' : row?.state === 'approved' && row.expiresAt > Date.now() ? 'Approved. Return to your client to finish signing in.' : row?.state === 'denied' ? 'This login request was denied. Restart login in your client if you want to connect.' : 'This login request has expired. Restart login in your client.';
  return <div className="min-h-screen bg-[#fffaf5]"><Navbar /><main className="mx-auto max-w-xl px-6 py-14">{valid ? <ClientConsent attemptId={id!} label={row.label} clientType={row.clientType} confirmationCode={row.confirmationCode} account={user.email || user.uid} /> : <p>{message}</p>}</main></div>;
}
