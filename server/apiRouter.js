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

    return sendJson(res, 404, { error: 'NOT_FOUND', message: `Endpoint ${pathname} not found` });
  } catch (err) {
    console.error(`[API Error] ${method} ${pathname}:`, err.message);
    return sendJson(res, 500, { error: 'SERVER_ERROR', message: err.message });
  }
}
