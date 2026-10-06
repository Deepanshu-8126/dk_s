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

/**
 * Automatic Real Image Engine with Multi-Tier Failover & LRU Caching
 * Enhanced version with better error handling and fallbacks
 */
export async function getRealImage(keyword, niche = 'general', options = {}) {
  if (!keyword || typeof keyword !== 'string' || !keyword.trim()) {
    console.warn('[ImageFetch] Invalid keyword provided:', keyword);
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
  const attempts = [];

  // 2. Tier 0: Direct Curated Media Registry (Guarantees Official Artwork)
  try {
    rawImageUrl = getCuratedMedia(keyword);
    if (rawImageUrl) {
      attempts.push('curated_media');
    }
  } catch (err) {
    console.warn('[ImageFetch] Curated media error:', err.message);
  }

  // 3. Tier 1: Cloudflare Edge Proxy
  if (!rawImageUrl) {
    try {
      const proxyUrl = import.meta.env?.VITE_IMAGE_PROXY_URL;
      if (proxyUrl) {
        rawImageUrl = await fetchFromEdgeProxy(keyword, niche, proxyUrl);
        if (rawImageUrl) attempts.push('edge_proxy');
      }
    } catch (err) {
      console.warn('[ImageFetch] Edge proxy error:', err.message);
    }
  }

  // 4. Gaming Niche RAWG
  if (!rawImageUrl && niche === 'gaming') {
    try {
      const rawgApiKey = import.meta.env?.VITE_RAWG_API_KEY;
      if (rawgApiKey && rawgApiKey !== 'FREE_KEY') {
        rawImageUrl = await fetchFromRAWG(keyword, rawgApiKey);
        if (rawImageUrl) attempts.push('rawg');
      }
    } catch (err) {
      console.warn('[ImageFetch] RAWG error:', err.message);
    }
  }

  // 5. Tier 2: Wikimedia Commons / Wikipedia API
  if (!rawImageUrl) {
    try {
      rawImageUrl = await fetchFromWikimedia(keyword);
      if (rawImageUrl) attempts.push('wikimedia');
    } catch (err) {
      console.warn('[ImageFetch] Wikimedia error:', err.message);
    }
  }

  // 6. Tier 3: Openverse API
  if (!rawImageUrl) {
    try {
      rawImageUrl = await fetchFromOpenverse(keyword);
      if (rawImageUrl) attempts.push('openverse');
    } catch (err) {
      console.warn('[ImageFetch] Openverse error:', err.message);
    }
  }

  // 7. Tier 4: Curated High-Res Topic Visual Fallbacks
  if (!rawImageUrl) {
    try {
      rawImageUrl = getCuratedTopicImage(keyword, niche);
      if (rawImageUrl) attempts.push('curated_topic');
    } catch (err) {
      console.warn('[ImageFetch] Curated topic error:', err.message);
    }
  }

  // 8. Final Fallback: Generate a deterministic placeholder based on keyword hash
  if (!rawImageUrl) {
    // Create a deterministic fallback URL based on keyword hash
    const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const fallbackColor = Math.abs(hash) % 360; // Hue 0-359
    rawImageUrl = `https://via.placeholder.com/800x450/${fallbackColor.toString(16).padStart(6, '0')}/ffffff?text=${encodeURIComponent(keyword)}`;
    attempts.push('placeholder');
    console.warn('[ImageFetch] Using placeholder image for:', keyword);
  }

  // 7. Format CDN WebP URL
  let finalUrl = null;
  if (rawImageUrl) {
    try {
      finalUrl = formatCDNUrl(rawImageUrl, options.width || 800);
    } catch (err) {
      console.warn('[ImageFetch] CDN formatting error:', err.message);
      finalUrl = rawImageUrl; // Use raw URL if formatting fails
    }
  }

  // 8. Store in LRU Cache
  try {
    saveToCache(cacheKey, finalUrl);
  } catch (err) {
    console.warn('[ImageFetch] Cache storage error:', err.message);
  }

  // Log the attempt chain for debugging
  if (attempts.length > 0) {
    console.log(`[ImageFetch] Successfully fetched image for "${keyword}" via: ${attempts.join(' -> ')}`);
  }

  return finalUrl;
}