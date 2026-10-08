import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth/session';
import { adminDb } from '@/lib/firebase/admin';
import Navbar from '@/components/navbar';
export const dynamic = 'force-dynamic';
export default async function UsagePage() {
  const user = await currentUser(); if (!user) redirect('/sign-in');
  const rows = await adminDb().collection('creditLedger').where('uid', '==', user.uid).orderBy('createdAt', 'desc').limit(50).get();
  return <div className="min-h-screen bg-[#fffaf5]"><Navbar /><main className="mx-auto max-w-3xl px-6 py-14"><h1 className="text-3xl font-black">Credit history</h1><p className="my-4 text-stone-600">Your 50 most recent ledger entries, in microcredits.</p>{rows.empty ? <p>No credit activity yet.</p> : <table className="w-full text-left"><thead><tr><th className="py-3">Date</th><th>Activity</th><th>Amount</th></tr></thead><tbody>{rows.docs.map((doc) => { const d = doc.data(); return <tr key={doc.id} className="border-t"><td className="py-3">{new Date(d.createdAt).toISOString().slice(0, 10)}</td><td>{d.kind}</td><td>{Number(d.amount).toLocaleString()}</td></tr>; })}</tbody></table>}</main></div>;
}
