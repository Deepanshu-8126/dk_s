/**
 * DYNAMIC AFFILIATE LINK GENERATOR (Frontend & Server)
 * Generates verified Amazon Associates, EarnKaro, and Wishlink URLs
 */

export const AFFILIATE_CONFIG = {
  amazonTag: 'deepanshu210d-20',
  earnkaroId: '3360368',
  wishlinkHandle: 'aestheticoutfits',
};

/**
 * Generate Amazon India Affiliate Search / Direct Link
 * @param {string} query - Product or search keyword (e.g., 'rtx 4070 super gaming pc')
 * @param {string} [customTag] - Optional override tag
 */
export function buildAmazonAffiliateUrl(query, customTag = null) {
  const tag = customTag || AFFILIATE_CONFIG.amazonTag;
  const clean = (query || '').trim();
  if (!clean) return `https://www.amazon.in/?tag=${tag}`;

  // Direct ASIN check (10 chars, alphanumeric)
  if (clean.length === 10 && /^[A-Z0-9]{10}$/.test(clean)) {
    return `https://www.amazon.in/dp/${clean}?tag=${tag}`;
  }

  const encoded = encodeURIComponent(clean);
  return `https://www.amazon.in/s?k=${encoded}&tag=${tag}`;
}

/**
 * Generate EarnKaro Smart Affiliate Link
 */
export function buildEarnKaroUrl(targetUrl, customUserId = null) {
  const uid = customUserId || AFFILIATE_CONFIG.earnkaroId;
  const encoded = encodeURIComponent((targetUrl || '').trim());
  return `https://earnkaro.com/deals?r=${uid}&url=${encoded}`;
}

/**
 * Generate Wishlink Product or Storefront URL
 */
export function buildWishlinkUrl(slug = '', customHandle = null) {
  const handle = customHandle || AFFILIATE_CONFIG.wishlinkHandle;
  const cleanSlug = (slug || '').trim().replace(/^\//, '');
  return `https://www.wishlink.com/${handle}/${cleanSlug}`;
}
