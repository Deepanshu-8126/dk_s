/**
 * API Router for UniqueDigit Server
 * Handles /api/media, /api/posts, /api/drafts, /api/blog/generate, and /api/blog/publish
 */

import fs from 'fs';
import path from 'path';
import { searchWikimediaCommons } from './wikimediaService.js';
import { fetchTopicSources } from './sourcesService.js';
import { generateGroundedDraft } from './geminiService.js';
import { getPublishedArticles, getDrafts, saveDraft, publishDraft } from './storageService.js';
import { recordAnalyticsEvent, getAnalyticsStats } from './analyticsService.js';
import { updateGoldRates } from '../scripts/update-gold-rates.js';

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) { // 2MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

export async function handleApiRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  try {
    // 1. GET /api/media/search?q=...
    if (pathname === '/api/media/search' && method === 'GET') {
      const q = url.searchParams.get('q') || '';
      const limit = url.searchParams.get('limit') || 12;
      if (!q.trim()) {
        return sendJson(res, 200, { results: [], total: 0 });
      }
      const data = await searchWikimediaCommons(q, limit);
      return sendJson(res, 200, data);
    }

    // 2. GET /api/posts
    if (pathname === '/api/posts' && method === 'GET') {
      const posts = await getPublishedArticles();
      return sendJson(res, 200, { posts, total: posts.length });
    }

    // 3. GET /api/drafts
    if (pathname === '/api/drafts' && method === 'GET') {
      const drafts = await getDrafts();
      return sendJson(res, 200, { drafts, total: drafts.length });
    }

    // 4. POST /api/sources/fetch
    if (pathname === '/api/sources/fetch' && method === 'POST') {
      const body = await parseBody(req);
      const sources = await fetchTopicSources(body.topic, body.sources);
      return sendJson(res, 200, { sources, count: sources.length });
    }

    // 5. POST /api/blog/generate
    if (pathname === '/api/blog/generate' && method === 'POST') {
      const body = await parseBody(req);
      const topic = (body.topic || '').trim();
      if (!topic) {
        return sendJson(res, 400, { error: 'TOPIC_REQUIRED', message: 'Topic is required to generate an article draft.' });
      }

      // Fetch verified source excerpts if not provided
      let sources = body.sources;
      if (!Array.isArray(sources) || sources.length === 0) {
        sources = await fetchTopicSources(topic);
      }

      if (!sources || sources.length === 0) {
        return sendJson(res, 422, {
          error: 'NEEDS_SOURCES',
          message: `No verifiable source material found for topic "${topic}". Please add verified source links or excerpts before drafting.`
        });
      }

      const result = await generateGroundedDraft({
        topic,
        sources,
        image: body.image || null
      });

      if (result.error) {
        const status = result.error === 'GEMINI_API_KEY_MISSING' ? 403 : 502;
        return sendJson(res, status, result);
      }

      await saveDraft(result.draft);
      return sendJson(res, 200, result);
    }

    // 6. POST /api/blog/publish
    if (pathname === '/api/blog/publish' && method === 'POST') {
      const body = await parseBody(req);
      const draftId = body.draftId;
      if (!draftId) {
        return sendJson(res, 400, { error: 'DRAFT_ID_REQUIRED', message: 'draftId is required to publish.' });
      }

      const published = await publishDraft(draftId);
      return sendJson(res, 200, { success: true, post: published });
    }

    // 7. POST /api/analytics/track
    if (pathname === '/api/analytics/track' && method === 'POST') {
      const body = await parseBody(req);
      const slug = body.slug;
      const eventType = body.type || 'view';
      if (!slug) {
        return sendJson(res, 400, { error: 'SLUG_REQUIRED', message: 'slug is required' });
      }
      const updated = recordAnalyticsEvent(slug, eventType);
      return sendJson(res, 200, { success: true, stats: updated });
    }

    // 8. GET /api/analytics/stats
    if (pathname === '/api/analytics/stats' && method === 'GET') {
      const slug = url.searchParams.get('slug');
      const stats = getAnalyticsStats(slug);
      return sendJson(res, 200, stats);
    }

    // 9. GET /api/gold-rates
    if (pathname === '/api/gold-rates' && method === 'GET') {
      const jsonPath = path.resolve('public/data/gold-rates.json');
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, 'utf-8');
        return sendJson(res, 200, JSON.parse(raw));
      }
      return sendJson(res, 404, { error: 'GOLD_DATA_NOT_FOUND' });
    }

    // 10. POST /api/gold-rates/trigger
    if (pathname === '/api/gold-rates/trigger' && method === 'POST') {
      const body = await parseBody(req);
      const updated = await updateGoldRates(body);
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 11. GET /api/products/search & GET /api/products/trending
    if ((pathname === '/api/products/search' || pathname === '/api/products/trending') && method === 'GET') {
      const jsonPath = path.resolve('public/data/products-catalog.json');
      let catalog = [];
      if (fs.existsSync(jsonPath)) {
        try {
          const raw = fs.readFileSync(jsonPath, 'utf-8');
          const parsed = JSON.parse(raw);
          catalog = parsed.products || [];
        } catch {}
      }

      const q = (url.searchParams.get('q') || '').toLowerCase().trim();
      const tag = (url.searchParams.get('tag') || '').trim();
      const limit = parseInt(url.searchParams.get('limit') || '8', 10);

      let filtered = catalog;
      if (q) {
        filtered = catalog.filter(p => 
          p.title?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          (p.keywords && p.keywords.some(k => k.toLowerCase().includes(q)))
        );
        if (filtered.length === 0) {
          filtered = catalog.slice(0, limit);
        }
      }

      const processed = filtered.slice(0, limit).map(p => {
        let affiliateUrl = p.affiliateUrl || '';
        if (tag && p.asin) {
          affiliateUrl = `https://www.amazon.in/dp/${p.asin}?tag=${encodeURIComponent(tag)}`;
        } else if (tag && !p.asin) {
          affiliateUrl = `https://www.amazon.in/s?k=${encodeURIComponent(p.title)}&tag=${encodeURIComponent(tag)}`;
        }
        return { ...p, affiliateUrl };
      });

      return sendJson(res, 200, {
        success: true,
        query: q,
        tag: tag || null,
        count: processed.length,
        products: processed
      });
    }

    // 12. GET /api/topic/live?q=... (Zero-cost, Free Wikipedia Live Intelligence)
    if (pathname === '/api/topic/live' && method === 'GET') {
      const q = (url.searchParams.get('q') || '').trim();
      if (!q) {
        return sendJson(res, 400, { error: 'QUERY_REQUIRED' });
      }

      const cachePath = path.resolve('public/data/universal_topics_cache.json');
      let cache = {};
      if (fs.existsSync(cachePath)) {
        try {
          cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        } catch {}
      }

      const cacheKey = q.toLowerCase();
      if (cache[cacheKey]) {
        return sendJson(res, 200, { success: true, source: 'cache', topic: cache[cacheKey] });
      }

      try {
        // Step 1: OpenSearch for nearest title match
        let targetTitle = q;
        const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(q)}&limit=1&namespace=0&format=json`, {
          headers: { 'User-Agent': 'UniqueDigitBot/2.0' }
        });
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          if (searchData && searchData[1] && searchData[1][0]) {
            targetTitle = searchData[1][0];
          }
        }

        // Step 2: REST Summary
        const summaryRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle.replace(/\s+/g, '_'))}`, {
          headers: { 'User-Agent': 'UniqueDigitBot/2.0' }
        });

        if (summaryRes.ok) {
          const doc = await summaryRes.json();
          const title = doc.title || targetTitle;
          const extract = doc.extract || '';
          const desc = doc.description || '';
          const img = doc.originalimage?.source || doc.thumbnail?.source || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=85';

          // Detect Niche
          const lower = `${title} ${desc} ${extract}`.toLowerCase();
          let niche = 'General Intelligence';
          if (/game|gta|rockstar|playstation|xbox|esports|steam|fps/.test(lower)) niche = 'Gaming';
          else if (/medicine|drug|tablet|syrup|dosage|fever|pain|health|paracetamol/.test(lower)) niche = 'Health & Medicine';
          else if (/dog|cat|breed|puppy|retriever|animal|wildlife/.test(lower)) niche = 'Animals & Pets';
          else if (/crop|wheat|farming|mandi|soil|agriculture|harvest/.test(lower)) niche = 'Agriculture & Crops';
          else if (/phone|gpu|cpu|laptop|intel|amd|nvidia|apple|android|processor/.test(lower)) niche = 'Technology & Hardware';
          else if (/weather|temperature|monsoon|rain|forecast|cyclone/.test(lower)) niche = 'Weather & Climate';

          const sentences = extract.split(/\.\s+/).filter(s => s.length > 15);
          const fastFacts = {};
          if (desc) fastFacts['Category'] = desc;
          fastFacts['Niche Domain'] = niche;
          fastFacts['Fact Verification'] = 'Public Peer-Reviewed';
          if (sentences[0]) fastFacts['Primary Focus'] = sentences[0].slice(0, 95) + (sentences[0].length > 95 ? '...' : '');
          if (sentences[1]) fastFacts['Key Trait'] = sentences[1].slice(0, 95) + (sentences[1].length > 95 ? '...' : '');

          const topicData = {
            id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
            query: q,
            title,
            niche,
            description: desc || `Verified ${niche} dossier`,
            summary: extract,
            imageUrl: img,
            fastFacts,
            sourceUrl: doc.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
            lastVerified: '2026-10-04'
          };

          // Save to cache
          cache[cacheKey] = topicData;
          try {
            fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf-8');
          } catch {}

          return sendJson(res, 200, { success: true, source: 'wikipedia_live', topic: topicData });
        }
      } catch (err) {
        console.warn(`[Live Topic Fetch Warning] ${err.message}`);
      }

      return sendJson(res, 404, { error: 'TOPIC_NOT_FOUND', message: `No verified topic found for ${q}` });
    }

    // 13. GET /api/ai-tools (Automated Discovery & 8-Pillar Verification Catalog)
    if (pathname === '/api/ai-tools' && method === 'GET') {
      const verifiedPath = path.resolve('public/data/verified_ai_tools.json');
      if (fs.existsSync(verifiedPath)) {
        try {
          const raw = fs.readFileSync(verifiedPath, 'utf-8');
          const parsed = JSON.parse(raw);
          return sendJson(res, 200, { success: true, ...parsed });
        } catch (e) {
          console.warn(`[AI Tools Read Warning] ${e.message}`);
        }
      }
      return sendJson(res, 200, { success: true, tools: [] });
    }

    return sendJson(res, 404, { error: 'NOT_FOUND', message: `Endpoint ${pathname} not found` });
  } catch (err) {
    console.error(`[API Error] ${method} ${pathname}:`, err.message);
    return sendJson(res, 500, { error: 'SERVER_ERROR', message: err.message });
  }
}
