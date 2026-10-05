// Outbound Affiliate Click Telemetry Engine for UniqueDigit
// Privacy-first, lightweight click-tracking with local metrics and zero latency impact.

const STORAGE_KEY = 'ud_affiliate_clicks';

/**
 * Tracks an outbound affiliate click event
 * @param {string} productTitle
 * @param {string} targetUrl
 * @param {string} category
 */
export function trackAffiliateClick(productTitle, targetUrl, category = 'deals') {
  try {
    const timestamp = new Date().toISOString();
    const eventData = {
      title: productTitle || 'Unknown Product',
      category: category || 'general',
      url: targetUrl || '',
      time: timestamp,
    };

    // 1. Local storage buffer for client analytics
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(eventData);
    // Keep max 50 recent events
    if (existing.length > 50) existing.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    // 2. Non-blocking navigator beacon if endpoint available
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
      navigator.sendBeacon('/api/telemetry/click', blob);
    }
  } catch {
    // Fail silently without disrupting user navigation
  }
}

/**
 * Gets summary of top clicked categories and products
 */
export function getClickMetrics() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
