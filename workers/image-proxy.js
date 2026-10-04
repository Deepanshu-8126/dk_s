/**
 * Cloudflare Worker: Image Proxy with Edge Caching & Rate-Limit Shield
 * 
 * Deploy this on Cloudflare Workers (Free Tier - 100,000 req/day):
 * 1. Go to dash.cloudflare.com -> Workers & Pages -> Create Worker
 * 2. Paste this code and click Deploy.
 * 3. Add the worker URL to your project as VITE_IMAGE_PROXY_URL
 * 
 * Features:
 * - Edge Cache for 7 days (s-maxage=604800): 1 API call serves 10,000+ users!
 * - CORS headers enabled for all origins.
 * - Proxies Openverse API queries safely.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const niche = url.searchParams.get('niche') || 'general';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    if (!query) {
      return new Response(JSON.stringify({ error: 'Missing query param q' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Check Cloudflare Edge Cache
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    let response = await cache.match(cacheKey);

    if (response) {
      return response;
    }

    // Query upstream Openverse API
    try {
      const clean = query.replace(/[^\w\s-]/gi, ' ').trim();
      const openverseUrl = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(clean)}&page_size=1&license_type=all`;
      
      const upstreamRes = await fetch(openverseUrl, {
        headers: {
          'User-Agent': 'UniqueDigit-Portal-Edge/1.0',
          'Accept': 'application/json',
        },
      });

      let imageUrl = null;
      if (upstreamRes.ok) {
        const data = await upstreamRes.json();
        if (data.results && data.results.length > 0) {
          imageUrl = data.results[0].url || data.results[0].thumbnail || null;
        }
      }

      const body = JSON.stringify({ query, niche, url: imageUrl });
      response = new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=604800, s-maxage=604800', // 7 days edge cache
        },
      });

      // Save to Cloudflare Edge Cache
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message, url: null }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
