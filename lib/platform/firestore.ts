import 'server-only';
import { adminDb } from '@/lib/firebase/admin';
import { adaptFirestore } from './firestore-adapter';
export const firestoreStore = () => adaptFirestore(adminDb());
