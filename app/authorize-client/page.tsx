import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';
import ClientConsent from '@/components/client-consent';
import { identifier } from '@/lib/auth/client-grants';
import { currentUser } from '@/lib/auth/session';
import { adminDb } from '@/lib/firebase/admin';
export const dynamic = 'force-dynamic';
export default async function AuthorizeClient({ searchParams }: { searchParams: Promise<{ attempt?: string }> }) {
  const id = (await searchParams).attempt;
  if (!identifier(id)) return <main className="p-10">Invalid authorization link. Restart login in your client.</main>;
  const user = await currentUser();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(`/authorize-client?attempt=${id}`)}`);
  const row = (await adminDb().doc(`loginAttempts/${id}`).get()).data();
  const valid = row && row.state === 'pending' && row.expiresAt > Date.now();
  return <div className="min-h-screen bg-[#fffaf5]"><Navbar /><main className="mx-auto max-w-xl px-6 py-14">{valid ? <ClientConsent attemptId={id!} label={row.label} clientType={row.clientType} confirmationCode={row.confirmationCode} account={user.email || user.uid} /> : <p>This login request has expired or was already handled. Restart login in your client.</p>}</main></div>;
}
