/**
 * DYNAMIC AFFILIATE LINK GENERATOR (Frontend & Server)
 * Generates verified Amazon Associates, EarnKaro, and Wishlink URLs
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
 * Generate Amazon India Affiliate Search / Direct Link
 * If tag is provided or saved in settings, attaches ?tag=...
 * If no tag is configured yet, generates clean direct Amazon link.
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
