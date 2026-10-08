'use client';
import { useState } from 'react';
type Device = { id: string; label: string; clientType: string; revoked: boolean; expiresAt: number };
export default function DeviceList({ devices }: { devices: Device[] }) {
  const [rows, setRows] = useState(devices), [error, setError] = useState(''), [busy, setBusy] = useState('');
  async function revoke(id: string) {
    setBusy(id); setError('');
    try { const response = await fetch(`/api/v1/devices/${id}`, { method: 'DELETE' }); if (!response.ok) throw new Error(); setRows((items) => items.map((d) => d.id === id ? { ...d, revoked: true } : d)); }
    catch { setError('Could not revoke this device. Please retry.'); } finally { setBusy(''); }
  }
  async function revokeAll() {
    if (!window.confirm('Revoke all developer clients and sign out all website sessions?')) return;
    setBusy('all'); setError('');
    try { const response = await fetch('/api/v1/devices', { method: 'DELETE' }); if (!response.ok) throw new Error(); window.location.assign('/sign-in'); }
    catch { setError('Could not finish signing out everywhere. Please retry.'); setBusy(''); }
  }
  return <div>{rows.length === 0 && <p>No developer clients connected yet.</p>}{rows.map((d) => <article key={d.id} className="mb-4 flex items-center justify-between gap-4 rounded-xl border bg-white p-5"><div><strong>{d.label}</strong><p className="text-sm text-stone-600">{d.clientType} · {d.revoked ? 'Revoked' : d.expiresAt <= Date.now() ? 'Expired' : 'Connected'}</p></div><button disabled={Boolean(busy) || d.revoked} onClick={() => revoke(d.id)} className="rounded-lg border px-4 py-2 disabled:opacity-50">Revoke</button></article>)}<button disabled={Boolean(busy)} onClick={revokeAll} className="mt-5 rounded-lg border px-4 py-2">Sign out everywhere</button>{error && <p role="alert" className="mt-4 text-rose-700">{error}</p>}</div>;
}
