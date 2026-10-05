/**
 * DYNAMIC AFFILIATE LINK GENERATOR (Frontend & Server)
 * Generates verified Amazon Associates, Cloaked /go/:slug URLs, and Multi-Vendor Fallbacks.
 */

export const AFFILIATE_CONFIG = {
  getAmazonTag: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ud_amazon_tag');
      if (stored) return stored.trim();
    }
    return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_AMAZON_ASSOCIATE_TAG)
      ? import.meta.env.VITE_AMAZON_ASSOCIATE_TAG
      : 'uniquedigi0c6-21';
  },
  earnkaroId: '3360368',
  wishlinkHandle: 'aestheticoutfits',
};

/**
 * Generate Clean Cloaked /go/:slug URL routed through Cloudflare Pages Function
 * @param {string} slug
 * @param {string|null} customTag
 * @returns {string} Clean cloaked URL
 */
export function buildCloakedUrl(slug, customTag = null) {
  const cleanSlug = (slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  const tag = (customTag !== null ? customTag : AFFILIATE_CONFIG.getAmazonTag()).trim();
  return `/go/${cleanSlug}?tag=${encodeURIComponent(tag)}`;
}

/**
 * Generate Amazon India Affiliate Search / Direct Link
 */
export function buildAmazonAffiliateUrl(query, customTag = null) {
  const tag = (customTag !== null ? customTag : AFFILIATE_CONFIG.getAmazonTag()).trim();
  const clean = (query || '').trim();

  if (!clean) return tag ? `https://www.amazon.in/?tag=${encodeURIComponent(tag)}` : 'https://www.amazon.in/';

  // Clean title for search: remove brackets and noise words
  const cleanKeywords = clean.replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
  const encoded = encodeURIComponent(cleanKeywords);
  return tag
    ? `https://www.amazon.in/s?k=${encoded}&tag=${encodeURIComponent(tag)}`
    : `https://www.amazon.in/s?k=${encoded}`;
}

/**
 * Multi-Vendor Out-of-Stock Fallback Routing
 * If Amazon is out of stock, routes to Flipkart via EarnKaro
 */
export function buildMultiVendorUrl(productTitle, inStockOnAmazon = true) {
  if (inStockOnAmazon) {
    return {
      primary: buildAmazonAffiliateUrl(productTitle),
      vendor: 'Amazon.in',
      badge: 'In Stock'
    };
  }
  
  const encoded = encodeURIComponent(productTitle);
  const flipkartSearch = `https://www.flipkart.com/search?q=${encoded}`;
  return {
    primary: `https://earnkaro.com/deals?r=${AFFILIATE_CONFIG.earnkaroId}&url=${encodeURIComponent(flipkartSearch)}`,
    vendor: 'Flipkart Verified',
    badge: 'Alternative Deal'
  };
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
