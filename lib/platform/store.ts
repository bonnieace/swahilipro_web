export type RecordData = Record<string, unknown>;
export interface StoreTransaction {
  get(path: string): Promise<RecordData | null>;
  set(path: string, data: RecordData): void;
}
export interface Store {
  transaction<T>(work: (tx: StoreTransaction) => Promise<T>): Promise<T>;
}
export class PlatformError extends Error {
  constructor(public code: string, public status = 400) { super(code); }
}
export function requireValue(condition: unknown, code: string, status = 400): asserts condition {
  if (!condition) throw new PlatformError(code, status);
}
