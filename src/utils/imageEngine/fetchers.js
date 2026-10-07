import { getCuratedMedia } from '../../data/curatedMedia';

const CURATED_TOPIC_FALLBACKS = [
  {
    regex: /(gta|gaming|pc build|rig|rtx|gpu|steam|playstation|xbox)/i,
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
  },
  {
    regex: /(iphone|smartphone|galaxy|s24|oneplus|mobile|phone)/i,
    url: 'https://m.media-amazon.com/images/I/71ZDY57y6QL._SX679_.jpg',
  },
  {
    regex: /(macbook|laptop|headphones|audio|sony|anc)/i,
    url: 'https://m.media-amazon.com/images/I/71ItMeqpN3L._SX679_.jpg',
  },
  {
    regex: /(gold|bullion|silver|24k|22k|karat|sohna|sarrafa)/i,
    url: 'https://m.media-amazon.com/images/I/71ZDY57y6QL._SX679_.jpg',
  },
  {
    regex: /(ai|chatgpt|gemini|deepseek|claude|copilot|llm|coding|prompt)/i,
    url: 'https://m.media-amazon.com/images/I/71ItMeqpN3L._SX679_.jpg',
  },
];

/**
 * Get curated topic image with enhanced fallbacks
 */
export function getCuratedTopicImage(keyword, niche) {
  // 1. Check exact curated high-res media registry first
  const exactCurated = getCuratedMedia(keyword);
  if (exactCurated) return exactCurated;

  // 2. Generic high-res category match
  const target = `${keyword || ''} ${niche || ''}`.trim();
  for (const item of CURATED_TOPIC_FALLBACKS) {
    if (item.regex.test(target)) {
      return item.url;
    }
  }
  
  // 3. Enhanced fallback: Try to get any image from curated media as last resort
  const fallbackImages = Object.values(getCuratedMedia.__esModule ? getCuratedMedia.default : getCuratedMedia);
  if (fallbackImages && fallbackImages.length > 0) {
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }
  
  return null;
}

/**
 * Fetch from edge proxy with better error handling
 */
export async function fetchFromEdgeProxy(keyword, niche, proxyUrl) {
  if (!proxyUrl) {
    console.warn('[ImageFetch] No proxy URL configured');
    return null;
  }

  try {
    const endpoint = `${proxyUrl}?q=${encodeURIComponent(keyword)}&niche=${encodeURIComponent(niche)}`;
    const res = await fetch(endpoint, { 
      headers: { Accept: 'application/json' },
      timeout: 5000 // 5 second timeout
    });
    
    if (!res.ok) {
      console.warn(`[ImageFetch] Edge proxy failed: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    return data.url || null;
  } catch (err) {
    console.warn(`[ImageFetch] Edge proxy error:`, err.message);
    return null;
  }
}

/**
 * Fetch from RAWG with better error handling
 */
export async function fetchFromRAWG(keyword, apiKey) {
  if (!apiKey || apiKey === 'FREE_KEY') {
    console.warn('[ImageFetch] RAWG API key not configured');
    return null;
  }

  try {
    const url = `https://api.rawg.io/api/games?key=${encodeURIComponent(apiKey)}&search=${encodeURIComponent(keyword)}&page_size=1`;
    const res = await fetch(url, { 
      headers: { Accept: 'application/json' },
      timeout: 5000 // 5 second timeout
    });
    
    if (!res.ok) {
      console.warn(`[ImageFetch] RAWG API failed: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    return data.results?.[0]?.background_image || null;
  } catch (err) {
    console.warn(`[ImageFetch] RAWG error:`, err.message);
    return null;
  }
}

/**
 * Fetch from Wikimedia Commons with better error handling and fallbacks
 */
export async function fetchFromWikimedia(keyword) {
  try {
    const clean = keyword.replace(/\s+in\s+.*$/i, '').replace(/[^\w\s-]/gi, ' ').trim();
    
    // 1. Direct title search
    try {
      const endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=800&titles=${encodeURIComponent(clean)}&redirects=1&origin=*`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const pages = data.query?.pages;
        if (pages) {
          for (const pid in pages) {
            const p = pages[pid];
            if (p?.original?.source || p?.thumbnail?.source) {
              return p.original?.source || p.thumbnail?.source;
            }
          }
        }
      }
    } catch (e) {
      // Direct search failed, continue to fallback
    }

    // 2. Search generator fallback
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(clean)}&gsrlimit=3&prop=pageimages&piprop=original|thumbnail&pithumbsize=800&format=json&origin=*`;
      const searchRes = await fetch(searchUrl);
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const searchPages = searchData.query?.pages;
        if (searchPages) {
          for (const pid in searchPages) {
            const p = searchPages[pid];
            if (p?.original?.source || p?.thumbnail?.source) {
              return p.original?.source || p.thumbnail?.source;
            }
          }
        }
      }
    } catch (e) {
      // Fallback search failed
    }

  } catch (err) {
    console.warn(`[ImageFetch] Wikimedia error:`, err.message);
  }
  return null;
}

/**
 * Fetch from Openverse with better error handling
 */
export async function fetchFromOpenverse(keyword) {
  try {
    const clean = keyword.replace(/\s+in\s+.*$/i, '').replace(/[^\w\s-]/gi, ' ').trim();
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(clean)}&page_size=1&license_type=all`;
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // Increased timeout
    const res = await fetch(url, { 
      signal: controller.signal, 
      headers: { Accept: 'application/json' },
      timeout: 8000
    });
    clearTimeout(timeout);
    
    if (!res.ok) {
      console.warn(`[ImageFetch] Openverse API failed: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].url || data.results[0].thumbnail || null;
    }
    
    // Try with broader search if no results
    const broadUrl = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(clean.split(' ')[0])}&page_size=1&license_type=all`;
    const broadRes = await fetch(broadUrl, { 
      signal: controller.signal, 
      headers: { Accept: 'application/json' },
      timeout: 5000
    });
    
    if (broadRes.ok) {
      const broadData = await broadRes.json();
      if (broadData.results && broadData.results.length > 0) {
        return broadData.results[0].url || broadData.results[0].thumbnail || null;
      }
    }
  } catch (err) {
    console.warn(`[ImageFetch] Openverse error:`, err.message);
  }
  
  return null;
}