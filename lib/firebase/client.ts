'use client';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseProject } from './project';

export function browserAuth() {
  const config = {
    ...firebaseProject,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseProject.apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || firebaseProject.authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseProject.projectId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || firebaseProject.appId,
  };
  if (Object.values(config).some((value) => !value)) throw new Error('Sign-in is not configured yet.');
  const app = getApps().find((candidate) => candidate.name === 'swahilipro-web') || initializeApp(config, 'swahilipro-web');
  return getAuth(app);
}
