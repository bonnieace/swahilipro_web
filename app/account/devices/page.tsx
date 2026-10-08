import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth/session';
import { adminDb } from '@/lib/firebase/admin';
import DeviceList from '@/components/device-list';
import Navbar from '@/components/navbar';
export const dynamic = 'force-dynamic';
export default async function DevicesPage() {
  const user = await currentUser(); if (!user) redirect('/sign-in');
  const db = adminDb();
  const [rows, security] = await Promise.all([db.collection('clientGrants').where('uid', '==', user.uid).limit(100).get(), db.doc(`accountSecurity/${user.uid}`).get()]);
  const epoch = security.data()?.epoch ?? 0;
  const devices = rows.docs.map((doc) => { const d = doc.data(); return { id: doc.id, label: String(d.label), clientType: String(d.clientType), revoked: Boolean(d.revoked || d.epoch !== epoch), expiresAt: Number(d.expiresAt) }; });
  return <div className="min-h-screen bg-[#fffaf5]"><Navbar /><main className="mx-auto max-w-3xl px-6 py-14"><h1 className="mb-6 text-3xl font-black">Connected devices</h1><DeviceList devices={devices} /><p className="mt-8 text-sm text-stone-600">Showing up to 100 connections. Revocation blocks subsequent API requests; already-running commands on a device cannot be stopped remotely.</p></main></div>;
}
