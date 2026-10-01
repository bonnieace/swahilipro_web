import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth/session';
import Navbar from '@/components/navbar';
import SignOut from '@/components/sign-out';
export const dynamic = 'force-dynamic';
export default async function AccountPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  return <div className="min-h-screen bg-[#fffaf5]"><Navbar /><main className="mx-auto max-w-3xl px-6 py-14"><h1 className="text-4xl font-black">Your SwahiliPro account</h1><p className="mt-4 text-stone-600">Signed in as {user.email || user.name || user.uid}</p><section className="my-8 rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">Developer tools</h2><p className="mt-3 text-stone-600">CLI and editor authorization will be available in the next milestone. Your learning progress and AI credit allowance are separate.</p></section><a href="/lms" className="mr-6 text-emerald-800 underline">Continue learning</a><div className="mt-6"><SignOut /></div></main></div>;
}
