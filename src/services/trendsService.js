/**
 * Trends Service for fetching live trend data from various sources
 * Supports Google Trends, DeepTrend, Product Trends, and simulated fallbacks
 */

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache
const cache = new Map();

/**
 * Get cached data if available and not expired
 */
function getFromCache(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }
  return null;
}

/**
 * Save data to cache
 */
function saveToCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

/**
 * Fetch trends from DeepTrend feed if configured
 */
async function fetchFromDeepTrend() {
  const feedUrl = import.meta.env?.VITE_DEEPTREND_FEED_URL || 
                 (typeof DEEPTREND_FEED_URL !== 'undefined' ? DEEPTREND_FEED_URL : '');
  
  if (!feedUrl) {
    return null;
  }

  try {
    const res = await fetch(feedUrl, {
      headers: { 'Accept': 'application/json' },
      timeout: 8000
    });
    
    if (!res.ok) {
      console.warn(`[TrendsService] DeepTrend feed failed: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    // Normalize DeepTrend data to our format
    if (Array.isArray(data)) {
      return data.slice(0, 10).map((item, index) => ({
        label: item.title || item.topic || `Trend ${index + 1}`,
        tag: item.category || 'Trending',
        tab: determineTabFromCategory(item.category || ''),
        score: item.score || item.value || 100 - index * 5
      }));
    } else if (data.trends && Array.isArray(data.trends)) {
      return data.trends.slice(0, 10).map((item, index) => ({
        label: item.title || item.topic || `Trend ${index + 1}`,
        tag: item.category || 'Trending',
        tab: determineTabFromCategory(item.category || ''),
        score: item.score || item.value || 100 - index * 5
      }));
    }
    
    return null;
  } catch (err) {
    console.warn(`[TrendsService] DeepTrend error:`, err.message);
    return null;
  }
}

/**
 * Fetch trends from Product Trends feed if configured
 */
async function fetchFromProductTrends() {
  const feedUrl = import.meta.env?.VITE_PRODUCT_TREND_FEED_URL || 
                 (typeof PRODUCT_TREND_FEED_URL !== 'undefined' ? PRODUCT_TREND_FEED_URL : '');
  
  if (!feedUrl) {
    return null;
  }

  try {
    const res = await fetch(feedUrl, {
      headers: { 'Accept': 'application/json' },
      timeout: 8000
    });
    
    if (!res.ok) {
      console.warn(`[TrendsService] Product Trends feed failed: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    // Normalize product trends data
    if (Array.isArray(data)) {
      return data.slice(0, 10).map((item, index) => ({
        label: item.product_name || item.title || `Product Trend ${index + 1}`,
        tag: item.category || 'Hot Deal',
        tab: 'products',
        score: item.discount || item.score || 90 - index * 3
      }));
    } else if (data.products && Array.isArray(data.products)) {
      return data.products.slice(0, 10).map((item, index) => ({
        label: item.product_name || item.title || `Product Trend ${index + 1}`,
        tag: item.category || 'Hot Deal',
        tab: 'products',
        score: item.discount || item.score || 90 - index * 3
      }));
    }
    
    return null;
  } catch (err) {
    console.warn(`[TrendsService] Product Trends error:`, err.message);
    return null;
  }
}

/**
 * Determine tab based on category/category
 */
function determineTabFromCategory(category) {
  const lower = category.toLowerCase();
  if (lower.includes('gold') || lower.includes('bullion') || lower.includes('silver') || 
      lower.includes('finance') || lower.includes('market')) {
    return 'gold';
  } else if (lower.includes('gaming') || lower.includes('game') || 
             lower.includes('gta') || lower.includes('steam') || 
             lower.includes('rtx') || lower.includes('gpu')) {
    return 'gaming';
  } else if (lower.includes('ai') || lower.includes('artificial') || 
             lower.includes('gemini') || lower.includes('chatgpt')) {
    return 'ai';
  } else if (lower.includes('sarkari') || lower.includes('job') || 
             lower.includes('recruitment') || lower.includes('exam') ||
             lower.includes('ssc') || lower.includes('upsc') || 
             lower.includes('rrb')) {
    return 'sarkari';
  } else {
    return 'products'; // default tab
  }
}

/**
 * Generate simulated trends data as fallback
 */
function generateSimulatedTrends() {
  const trendsPool = [
    { label: 'iPhone 16 Pro Deals', tag: 'Verified Deal', tab: 'products', baseScore: 95 },
    { label: 'GTA 6 PC Specs', tag: 'Craze', tab: 'gaming', baseScore: 92 },
    { label: 'RTX 4070 Super Rig', tag: 'Hardware', tab: 'products', baseScore: 89 },
    { label: 'Gold Rate Today', tag: 'Live MCX', tab: 'gold', baseScore: 87 },
    { label: 'GTA V Steam Deal', tag: '₹999', tab: 'gaming', baseScore: 85 },
    { label: 'Google Gemini 2.0', tag: '+154%', tab: 'ai', baseScore: 93 },
    { label: 'SSC CGL Result 2026', tag: 'Live', tab: 'sarkari', baseScore: 91 },
    { label: 'MacBook Air M3', tag: 'Best Laptop', tab: 'products', baseScore: 88 },
    { label: 'Gaming PC ₹55k Build', tag: 'Hot', tab: 'gaming', baseScore: 86 },
    { label: 'Railway NTPC 11,558 Posts', tag: 'New', tab: 'sarkari', baseScore: 84 },
    { label: 'Sony XM5 Headphones', tag: '23% OFF', tab: 'products', baseScore: 82 },
    { label: 'Nifty 50 Record High', tag: 'Finance', tab: 'gold', baseScore: 90 },
    { label: 'Samsung Galaxy S24', tag: '5G Ready', tab: 'products', baseScore: 83 },
    { label: 'PlayStation 5 Stock', tag: 'Available', tab: 'gaming', baseScore: 80 },
    { label: 'UPSC Prelims 2026', tag: 'Exam Date', tab: 'sarkari', baseScore: 88 },
    { label: 'RTX 4090 Gaming Rig', tag: 'Ultimate', tab: 'gaming', baseScore: 94 },
    { label: 'Silver Rate Today', tag: 'MCX Live', tab: 'gold', baseScore: 85 },
    { label: 'ChatGPT Plus Update', tag: 'New Features', tab: 'ai', baseScore: 91 },
    { label: 'IBPS PO Notification', tag: 'Banking Job', tab: 'sarkari', baseScore: 83 },
    { label: 'Amazon Great Indian Sale', tag: 'Live Now', tab: 'products', baseScore: 96 }
  ];

  // Shuffle and select 8-12 trends
  const shuffled = [...trendsPool].sort(() => 0.5 - Math.random());
  const count = 8 + Math.floor(Math.random() * 5); // 8-12 trends
  
  return shuffled.slice(0, count).map((trend, index) => ({
    ...trend,
    score: Math.max(50, trend.baseScore - Math.floor(Math.random() * 15) - index * 2),
    id: `simulated-trend-${index}-${Date.now()}`
  }));
}

/**
 * Fetch live trends data with fallback hierarchy
 */
export async function fetchLiveTrends() {
  // Check cache first
  const cached = getFromCache('live_trends');
  if (cached) {
    console.log('[TrendsService] Using cached trends data');
    return cached;
  }

  try {
    // Try DeepTrend feed first
    let trends = await fetchFromDeepTrend();
    if (trends && trends.length > 0) {
      console.log('[TrendsService] Fetched trends from DeepTrend feed');
      saveToCache('live_trends', trends);
      return trends;
    }

    // Try Product Trends feed
    trends = await fetchFromProductTrends();
    if (trends && trends.length > 0) {
      console.log('[TrendsService] Fetched trends from Product Trends feed');
      saveToCache('live_trends', trends);
      return trends;
    }

    // Fallback to simulated trends
    console.log('[TrendsService] Using simulated trends data (fallback)');
    const simulated = generateSimulatedTrends();
    saveToCache('live_trends', simulated);
    return simulated;
  } catch (err) {
    console.error('[TrendsService] Error fetching trends:', err);
    // Return simulated trends as final fallback
    const simulated = generateSimulatedTrends();
    saveToCache('live_trends', simulated);
    return simulated;
  }
}

/**
 * Clear trends cache (useful for manual refresh)
 */
export function clearTrendsCache() {
  cache.delete('live_trends');
  console.log('[TrendsService] Trends cache cleared');
}