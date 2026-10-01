import type { Firestore } from 'firebase-admin/firestore';
import type { Store } from './store';
export function adaptFirestore(db: Firestore): Store {
  return {
    transaction: (work) => db.runTransaction((tx) => work({
      get: async (path) => { const snap = await tx.get(db.doc(path)); return snap.exists ? snap.data()! : null; },
      set: (path, data) => { tx.set(db.doc(path), data); },
    })),
  };
}
