import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth/session';
import Navbar from '@/components/navbar';
import { adminDb } from '@/lib/firebase/admin';
import SignOut from '@/components/sign-out';
export const dynamic = 'force-dynamic';
export default async function AccountPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const credit = (await adminDb().doc(`creditAccounts/${user.uid}`).get()).data();
  const available = (credit?.balance ?? 0) - (credit?.reserved ?? 0);
  return <div className="min-h-screen bg-[#fffaf5]"><Navbar /><main className="mx-auto max-w-3xl px-6 py-14"><h1 className="text-4xl font-black">Your SwahiliPro account</h1><p className="mt-4 text-stone-600">Signed in as {user.email || user.name || user.uid}</p><section className="my-8 rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">Developer tools</h2><p className="mt-3 text-stone-600">Available allowance: {available.toLocaleString()} microcredits. Your learning progress and AI credits are separate.</p></section><a href="/account/usage" className="mr-6 text-emerald-800 underline">Credit history</a><a href="/account/devices" className="mr-6 text-emerald-800 underline">Manage devices</a><a href="/lms" className="mr-6 text-emerald-800 underline">Continue learning</a><div className="mt-6"><SignOut /></div></main></div>;
}
