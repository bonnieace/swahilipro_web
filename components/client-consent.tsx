'use client';
import { useState } from 'react';
export default function ClientConsent({ attemptId, label, clientType, confirmationCode, account }: { attemptId: string; label: string; clientType: string; confirmationCode: string; account: string }) {
  const [busy, setBusy] = useState(false), [message, setMessage] = useState(''), [matched, setMatched] = useState(false);
  async function decide(approve: boolean) {
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/v1/auth/client/decision', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ attemptId, approve, confirmationCode }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error === 'recent_sign_in_required' ? 'Please sign in again, then return to this authorization page.' : 'This request could not be authorized. Restart login in your client.');
      setMessage(approve ? 'Approved. Return to your client to finish signing in.' : 'Denied. No client credentials were issued.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Request failed.'); setBusy(false); }
  }
  return <section className="rounded-2xl border bg-white p-6"><h1 className="text-3xl font-black">Connect {clientType === 'cli' ? 'SwahiliPro CLI' : 'SwahiliPro for VS Code'}</h1><p className="mt-4">Client label: <strong>{label}</strong></p><p className="mt-2">Account: {account}</p><p className="mt-4 text-stone-600">This client can view your profile and credits and request AI responses using your allowance. Only approve a login you started.</p><p className="my-5 font-mono text-2xl tracking-widest">{confirmationCode}</p><label className="flex gap-3"><input type="checkbox" checked={matched} onChange={(event) => setMatched(event.target.checked)} />This code matches the code shown in my client.</label><div className="mt-6 flex gap-3"><button disabled={busy || !matched} onClick={() => decide(true)} className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white disabled:opacity-50">Approve</button><button disabled={busy} onClick={() => decide(false)} className="rounded-xl border px-5 py-3">Deny</button></div>{message && <p role="status" className="mt-5">{message}</p>}<a className="mt-4 block underline" href={`/sign-in?reauth=1&next=${encodeURIComponent(`/authorize-client?attempt=${attemptId}`)}`}>Sign in again or change account</a></section>;
}
