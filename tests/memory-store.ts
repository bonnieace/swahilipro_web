import { RecordData, Store, StoreTransaction } from '../lib/platform/store';
// Serializable transactional test double. Emulator integration requires a separate run;
// this double exercises domain invariants without credentials.
export class MemoryStore implements Store {
  records = new Map<string, RecordData>();
  private queue: Promise<unknown> = Promise.resolve();
  transaction<T>(work: (tx: StoreTransaction) => Promise<T>): Promise<T> {
    const run = this.queue.then(async () => {
      const writes = new Map<string, RecordData>(); let wrote = false;
      const result = await work({
        get: async (path) => { if (wrote) throw new Error('Read after write is invalid for Firestore transactions'); return structuredClone(this.records.get(path) || null); },
        set: (path, data) => { wrote = true; writes.set(path, structuredClone(data)); },
      });
      writes.forEach((value, key) => this.records.set(key, value)); return result;
    });
    this.queue = run.catch(() => undefined); return run;
  }
}
