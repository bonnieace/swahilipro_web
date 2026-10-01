'use client';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export function browserAuth() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  if (Object.values(config).some((value) => !value)) throw new Error('Sign-in is not configured yet.');
  const app = getApps().find((candidate) => candidate.name === 'swahilipro-web') || initializeApp(config, 'swahilipro-web');
  return getAuth(app);
}
