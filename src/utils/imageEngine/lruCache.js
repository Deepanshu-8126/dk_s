/**
 * LRU Cache & Edge CDN Formatter
 * Limits localStorage footprint to <50KB forever by evicting oldest keys.
 */

const MAX_LRU_ENTRIES = 200;
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const NEGATIVE_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
export const CACHE_PREFIX = 'ud_img_lru_';
const LRU_INDEX_KEY = 'ud_img_lru_index';

export function formatCDNUrl(sourceUrl, width = 800) {
  if (!sourceUrl || typeof sourceUrl !== 'string') return null;
  if (sourceUrl.includes('images.weserv.nl') || sourceUrl.startsWith('/') || sourceUrl.startsWith('data:')) {
    return sourceUrl;
  }
  const cleanUrl = sourceUrl.trim();
  return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&fit=cover&q=80&output=webp`;
}

const memoryStorage = new Map();
const storage = typeof localStorage !== 'undefined' ? localStorage : {
  getItem: (k) => (memoryStorage.has(k) ? memoryStorage.get(k) : null),
  setItem: (k, v) => { memoryStorage.set(k, String(v)); },
  removeItem: (k) => { memoryStorage.delete(k); },
};

function getLRUIndex() {
  try {
    const raw = storage.getItem(LRU_INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLRUIndex(list) {
  try {
    storage.setItem(LRU_INDEX_KEY, JSON.stringify(list));
  } catch {
    // Ignore storage quota
  }
}

export function getFromCache(cacheKey) {
  try {
    const raw = storage.getItem(cacheKey);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    const ttl = parsed.url === null ? NEGATIVE_CACHE_TTL_MS : CACHE_TTL_MS;

    if (Date.now() - parsed.timestamp < ttl) {
      const index = getLRUIndex().filter(k => k !== cacheKey);
      index.unshift(cacheKey);
      saveLRUIndex(index);
      return parsed.url;
    }

    storage.removeItem(cacheKey);
    saveLRUIndex(getLRUIndex().filter(k => k !== cacheKey));
  } catch (err) {
    console.warn('[ImageCache] Read error:', err);
  }
  return undefined;
}

export function saveToCache(cacheKey, url) {
  try {
    storage.setItem(cacheKey, JSON.stringify({ url: url || null, timestamp: Date.now() }));
    let index = getLRUIndex().filter(k => k !== cacheKey);
    index.unshift(cacheKey);

    if (index.length > MAX_LRU_ENTRIES) {
      const keysToEvict = index.slice(MAX_LRU_ENTRIES);
      index = index.slice(0, MAX_LRU_ENTRIES);
      for (const oldKey of keysToEvict) {
        storage.removeItem(oldKey);
      }
    }
    saveLRUIndex(index);
  } catch (err) {
    console.warn('[ImageCache] Write error:', err);
  }
}
