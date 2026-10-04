/**
 * API Router for UniqueDigit Server
 * Handles /api/media, /api/posts, /api/drafts, /api/blog/generate, and /api/blog/publish
 */

import { searchWikimediaCommons } from './wikimediaService.js';
import { fetchTopicSources } from './sourcesService.js';
import { generateGroundedDraft } from './geminiService.js';
import { getPublishedArticles, getDrafts, saveDraft, publishDraft } from './storageService.js';

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

    return sendJson(res, 404, { error: 'NOT_FOUND', message: `Endpoint ${pathname} not found` });
  } catch (err) {
    console.error(`[API Error] ${method} ${pathname}:`, err.message);
    return sendJson(res, 500, { error: 'SERVER_ERROR', message: err.message });
  }
}
