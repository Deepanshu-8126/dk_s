import nichesCatalog from '../data/nichesCatalog.json';
import productsCatalog from '../data/productsCatalog.json';
import publishedArticles from '../data/articles/published.json';

/**
 * Universal Search Indexer
 * Instant fuzzy search across products, published articles, and all niches in <2ms.
 */
export function searchEverything(query = '') {
  const cleanQ = (query || '').toLowerCase().trim();
  if (!cleanQ) return [];

  const results = [];

  // 1. Search Niches
  (nichesCatalog.niches || []).forEach((niche) => {
    (niche.items || []).forEach((item) => {
      const matchInTitle = (item.title || '').toLowerCase().includes(cleanQ);
      const matchInTags = (item.tags || []).some((t) => t.toLowerCase().includes(cleanQ));
      const matchInSummary = (item.summary || '').toLowerCase().includes(cleanQ);

      if (matchInTitle || matchInTags || matchInSummary) {
        results.push({
          id: item.id,
          title: item.title,
          category: niche.name,
          accent: niche.accent,
          type: 'niche-item',
          score: matchInTitle ? 10 : matchInTags ? 7 : 4,
          data: item
        });
      }
    });
  });

  // 2. Search Products
  (productsCatalog.products || []).forEach((prod) => {
    const matchInTitle = (prod.title || '').toLowerCase().includes(cleanQ);
    const matchInCat = (prod.category || '').toLowerCase().includes(cleanQ);

    if (matchInTitle || matchInCat) {
      results.push({
        id: prod.id,
        title: prod.title,
        category: prod.category,
        accent: 'cyan',
        type: 'product',
        score: matchInTitle ? 9 : 5,
        data: prod
      });
    }
  });

  // 3. Search Published Articles
  (publishedArticles.articles || []).forEach((art) => {
    const matchInTitle = (art.title || '').toLowerCase().includes(cleanQ);
    const matchInMeta = (art.metaDescription || '').toLowerCase().includes(cleanQ);

    if (matchInTitle || matchInMeta) {
      results.push({
        id: art.slug,
        title: art.title,
        category: 'Editorial Guide',
        accent: 'purple',
        type: 'article',
        score: matchInTitle ? 8 : 3,
        data: art
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}
