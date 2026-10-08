import 'server-only';
import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseProject } from './project';

function adminApp() {
  const existing = getApps().find((app) => app.name === 'swahilipro');
  if (existing) return existing;
  const projectId = process.env.FIREBASE_PROJECT_ID || firebaseProject.projectId;
  if (!projectId) throw new Error('Firebase server configuration is missing');
  const email = process.env.FIREBASE_CLIENT_EMAIL;
  const key = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (Boolean(email) !== Boolean(key)) throw new Error('Incomplete Firebase server credentials');
  return initializeApp({ projectId, credential: email && key ? cert({ projectId, clientEmail: email, privateKey: key }) : applicationDefault() }, 'swahilipro');
}
export const adminAuth = () => getAuth(adminApp());
export const adminDb = () => getFirestore(adminApp());
