import crypto from 'node:crypto';

interface CacheEntry<T> {
  value: T;
  createdAt: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CacheEntry<unknown>>();

export const makeCacheKey = (task: string, payload: unknown): string => {
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex');
  return `${task}:${hash}`;
};

export const getFromCache = <T>(key: string): T | null => {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.createdAt > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.value as T;
};

export const setInCache = <T>(key: string, value: T): void => {
  cache.set(key, { value, createdAt: Date.now() });
};


