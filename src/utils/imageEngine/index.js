import { CACHE_PREFIX, formatCDNUrl, getFromCache, saveToCache } from './lruCache';
import { getCuratedMedia } from '../../data/curatedMedia';
import {
  fetchFromEdgeProxy,
  fetchFromRAWG,
  fetchFromWikimedia,
  fetchFromOpenverse,
  getCuratedTopicImage,
} from './fetchers';

export { formatCDNUrl } from './lruCache';

export async function getRealImage(keyword, niche = 'general', options = {}) {
  if (!keyword || typeof keyword !== 'string' || !keyword.trim()) {
    return null;
  }

  const normalizedKeyword = keyword.trim().toLowerCase();
  const cacheKey = `${CACHE_PREFIX}${niche}_${normalizedKeyword.replace(/[\s\W]+/g, '_')}`;

  // 1. LRU Cache
  if (!options.bypassCache) {
    const cachedUrl = getFromCache(cacheKey);
    if (cachedUrl !== undefined) {
      return cachedUrl;
    }
  }

  let rawImageUrl = null;

  // 2. Tier 0: Direct Curated Media Registry (Guarantees Official Artwork)
  rawImageUrl = getCuratedMedia(keyword);

  // 3. Tier 1: Cloudflare Edge Proxy
  if (!rawImageUrl) {
    const proxyUrl = import.meta.env?.VITE_IMAGE_PROXY_URL;
    if (proxyUrl) {
      rawImageUrl = await fetchFromEdgeProxy(keyword, niche, proxyUrl);
    }
  }

  // 4. Gaming Niche RAWG
  if (!rawImageUrl && niche === 'gaming') {
    const rawgApiKey = import.meta.env?.VITE_RAWG_API_KEY;
    if (rawgApiKey && rawgApiKey !== 'FREE_KEY') {
      rawImageUrl = await fetchFromRAWG(keyword, rawgApiKey);
    }
  }

  // 5. Tier 2: Wikimedia Commons / Wikipedia API
  if (!rawImageUrl) {
    rawImageUrl = await fetchFromWikimedia(keyword);
  }

  // 5. Tier 3: Openverse API
  if (!rawImageUrl) {
    rawImageUrl = await fetchFromOpenverse(keyword);
  }

  // 6. Tier 4: Curated High-Res Unsplash Topic Visual
  if (!rawImageUrl) {
    rawImageUrl = getCuratedTopicImage(keyword, niche);
  }

  // 7. Format CDN WebP URL
  let finalUrl = null;
  if (rawImageUrl) {
    finalUrl = formatCDNUrl(rawImageUrl, options.width || 800);
  }

  // 8. Store in LRU Cache
  saveToCache(cacheKey, finalUrl);

  return finalUrl;
}
