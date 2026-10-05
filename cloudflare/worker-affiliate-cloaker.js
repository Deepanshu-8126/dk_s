/**
 * Cloudflare Worker: Affiliate Link Cloaker
 * Routes `/go/:slug` to target affiliate destination with tagging
 */

const AFFILIATE_MAPPINGS = {
  'rtx4070super': 'https://www.amazon.in/dp/B0CS351187?tag=uniquedigitoct-21',
  'ryzen7600': 'https://www.amazon.in/dp/B0BMQJWBDM?tag=uniquedigitoct-21',
  's24ultra': 'https://www.amazon.in/dp/B0CS619S11?tag=uniquedigitoct-21',
  'iphone16pro': 'https://www.amazon.in/dp/B0DGH18CVD?tag=uniquedigitoct-21',
  'default': 'https://www.amazon.in/?tag=uniquedigitoct-21'
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    if (pathParts[0] === 'go' && pathParts[1]) {
      const slug = pathParts[1].toLowerCase();
      const targetUrl = AFFILIATE_MAPPINGS[slug] || AFFILIATE_MAPPINGS['default'];
      
      return Response.redirect(targetUrl, 302);
    }

    return fetch(request);
  }
};
