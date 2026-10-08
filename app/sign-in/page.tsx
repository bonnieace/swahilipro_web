'use client';
import { useEffect, useState } from 'react';
import { GithubAuthProvider, inMemoryPersistence, setPersistence, signInWithPopup, signOut } from 'firebase/auth';
import { browserAuth } from '@/lib/firebase/client';
import Navbar from '@/components/navbar';
import { resumeSession, signInDestination } from '@/lib/auth/policy';
export default function SignInPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [existingSession, setExistingSession] = useState(false);
  useEffect(() => {
    let active = true;
    async function checkSession() {
      const query = new URLSearchParams(window.location.search);
      const destination = signInDestination(query.get('next'));
      try {
        const response = await fetch('/api/auth/session', { cache: 'no-store' });
        if (!response.ok) return;
        const session = await response.json();
        if (!active || !session.signedIn) return;
        setExistingSession(true);
        if (resumeSession(destination, session.recentSignIn === true, query.get('reauth') === '1')) window.location.replace(destination);
      } catch { /* Keep sign-in available if the session check fails. */ }
    }
    void checkSession();
    window.addEventListener('focus', checkSession);
    return () => { active = false; window.removeEventListener('focus', checkSession); };
  }, []);
  async function login() {
    setBusy(true); setError('');
    try {
      const auth = browserAuth();
      await setPersistence(auth, inMemoryPersistence);
      const result = await signInWithPopup(auth, new GithubAuthProvider());
      try {
        const response = await fetch('/api/auth/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: await result.user.getIdToken() }) });
        if (!response.ok) throw new Error('Could not establish your session. Please try again.');
      } finally { await signOut(auth); }
      const next = new URLSearchParams(window.location.search).get('next') || '';
      window.location.assign(signInDestination(next));
    } catch (problem) { setError(problem instanceof Error ? problem.message : 'Sign-in failed.'); setBusy(false); }
  }
  return <div className="min-h-screen bg-[#fffaf5]"><Navbar /><main className="mx-auto max-w-lg px-6 py-20"><h1 className="text-4xl font-black">Welcome to SwahiliPro</h1><p className="mt-4 text-stone-600">{existingSession ? 'You are already signed in. Confirm your account with GitHub to continue or choose another account.' : 'Sign in to manage your developer account.'}</p><p className="mt-3 text-sm text-stone-600">GitHub opens in a popup. If it does not appear, check your browser’s popup indicator.</p><button onClick={login} disabled={busy} className="mt-8 rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white disabled:opacity-60">{busy ? 'Complete sign-in in the GitHub popup…' : 'Continue with GitHub'}</button>{error && <p role="alert" className="mt-4 text-rose-700">{error}</p>}<p className="mt-6 text-sm text-stone-600">Your first sign-in creates your account.</p></main></div>;
}
