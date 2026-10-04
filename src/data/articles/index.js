import publishedArticles from './published.json' with { type: 'json' };

/**
 * Article Data Layer with Pagination & Lazy Lookup
 * Avoids loading thousands of articles into frontend DOM simultaneously.
 */

export function getAllArticleSlugs() {
  return (publishedArticles || []).map(a => a.slug);
}

export function getArticleBySlug(slug) {
  if (!slug) return null;
  return (publishedArticles || []).find(a => a.slug === slug) || null;
}

export function getArticlesPage(page = 1, limit = 6) {
  const articles = publishedArticles || [];
  const total = articles.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));
  const start = (validPage - 1) * limit;
  const end = start + limit;

  return {
    articles: articles.slice(start, end),
    page: validPage,
    limit,
    total,
    totalPages,
    hasNext: validPage < totalPages,
    hasPrev: validPage > 1,
  };
}

export default publishedArticles;
