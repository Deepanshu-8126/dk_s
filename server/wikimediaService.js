/**
 * Wikimedia Commons MediaWiki API Integration Service
 * Fetches real, licensed media with full author and license attribution.
 */

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

function sanitizeText(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'")
    .trim();
}

export async function searchWikimediaCommons(query, limit = 12) {
  const cleanQuery = (query || '').trim();
  if (!cleanQuery) {
    return { results: [], total: 0 };
  }

  const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 24);
  const cacheKey = `${cleanQuery.toLowerCase()}_${safeLimit}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const endpoint = new URL('https://commons.wikimedia.org/w/api.php');
  endpoint.searchParams.set('action', 'query');
  endpoint.searchParams.set('generator', 'search');
  endpoint.searchParams.set('gsrnamespace', '6'); // File namespace
  endpoint.searchParams.set('gsrlimit', String(safeLimit));
  endpoint.searchParams.set('gsrsearch', cleanQuery);
  endpoint.searchParams.set('prop', 'imageinfo');
  endpoint.searchParams.set('iiprop', 'url|extmetadata|dimensions');
  endpoint.searchParams.set('iiurlwidth', '1200');
  endpoint.searchParams.set('format', 'json');
  endpoint.searchParams.set('formatversion', '2');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(endpoint.toString(), {
      headers: {
        'User-Agent': 'UniqueDigit-Portal/1.0 (https://uniquedigit.in; editorial@uniquedigit.in)',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Wikimedia API responded with status ${res.status}`);
    }

    const data = await res.json();
    const rawPages = data.query?.pages || [];

    const results = rawPages
      .filter(p => p.imageinfo && p.imageinfo[0] && (p.imageinfo[0].thumburl || p.imageinfo[0].url))
      .map(p => {
        const info = p.imageinfo[0];
        const meta = info.extmetadata || {};

        const artistRaw = meta.Artist?.value || meta.Credit?.value || '';
        const author = sanitizeText(artistRaw) || 'Wikimedia Commons Contributor';

        const licenseRaw = meta.LicenseShortName?.value || meta.UsageTerms?.value || 'CC / Public Domain';
        const license = sanitizeText(licenseRaw);

        const descRaw = meta.ImageDescription?.value || '';
        const description = sanitizeText(descRaw) || p.title.replace(/^File:/i, '');

        const licenseUrl = meta.LicenseUrl?.value || null;
        const pageTitle = p.title || '';
        const pageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`;

        return {
          id: p.pageid ? String(p.pageid) : pageTitle,
          title: pageTitle.replace(/^File:/i, '').replace(/\.[^/.]+$/, ''),
          thumbUrl: info.thumburl || info.url,
          originalUrl: info.url,
          pageUrl,
          author,
          license,
          licenseUrl,
          description: description.slice(0, 280),
          width: info.width || 1200,
          height: info.height || 800,
          source: 'Wikimedia Commons'
        };
      });

    const output = { results, total: results.length };
    cache.set(cacheKey, { timestamp: Date.now(), data: output });
    return output;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Wikimedia API request timed out (8s limit exceeded)');
    }
    throw err;
  }
}
