'use client';
import { useState } from 'react';
export default function SignOut() {
  const [error, setError] = useState('');
  return <div><button className="rounded-xl border px-4 py-2" onClick={async () => { try { const response = await fetch('/api/auth/session', { method: 'DELETE' }); if (!response.ok) throw new Error(); window.location.assign('/sign-in'); } catch { setError('Could not sign out. Please retry.'); } }}>Sign out</button>{error && <p role="alert">{error}</p>}</div>;
}
