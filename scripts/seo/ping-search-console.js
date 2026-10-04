import { submitToIndexNow } from '../../src/utils/indexNow.js';

const BASE_URL = process.env.VITE_SITE_URL || 'https://uniquedigit.in';

/**
 * Pings Google Search Console / Bing IndexNow after sitemap generation
 */
export async function pingSearchConsole(sitemapUrl = `${BASE_URL}/sitemap.xml`) {
  console.log(`[SEO Ping] Notifying Search Engines of sitemap: ${sitemapUrl}`);

  // 1. Google Search Console sitemap ping endpoint
  const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  try {
    const gRes = await fetch(googlePingUrl);
    console.log(`[Google Ping Status]: ${gRes.status}`);
  } catch (err) {
    console.log(`[Google Ping Note]: Direct ping deprecated by Google; submit via Search Console UI/API.`);
  }

  // 2. Bing & IndexNow network ping
  try {
    const bRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log(`[Bing Ping Status]: ${bRes.status}`);
  } catch (e) {}

  // 3. IndexNow direct batch ping
  try {
    await submitToIndexNow([BASE_URL, `${BASE_URL}/gold-rate`, `${BASE_URL}/gaming`, `${BASE_URL}/ai-tools`]);
    console.log('[IndexNow]: Fresh core URLs submitted.');
  } catch (e) {}
}

pingSearchConsole();
