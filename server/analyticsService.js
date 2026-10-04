/**
 * Real-Time Analytics & Click Tracking Engine
 * Records authentic reader page views and clicks for Telegram live digests.
 */

const statsMap = new Map();

export function recordAnalyticsEvent(slug, eventType = 'view') {
  if (!slug) return null;
  const cleanSlug = String(slug).trim().toLowerCase();
  const current = statsMap.get(cleanSlug) || {
    slug: cleanSlug,
    views: 0,
    clicks: 0,
    firstSeen: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };

  if (eventType === 'click') {
    current.clicks += 1;
  } else {
    current.views += 1;
  }
  current.lastUpdated = new Date().toISOString();
  statsMap.set(cleanSlug, current);
  return current;
}

export function getAnalyticsStats(slug = null) {
  if (slug) {
    const cleanSlug = String(slug).trim().toLowerCase();
    return statsMap.get(cleanSlug) || {
      slug: cleanSlug,
      views: 0,
      clicks: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  // Aggregate all articles
  const all = Array.from(statsMap.values());
  const totalViews = all.reduce((sum, item) => sum + item.views, 0);
  const totalClicks = all.reduce((sum, item) => sum + item.clicks, 0);

  const topArticles = [...all]
    .sort((a, b) => (b.views + b.clicks * 2) - (a.views + a.clicks * 2))
    .slice(0, 5);

  return {
    totalArticlesTracked: all.length,
    totalViews,
    totalClicks,
    topArticles,
    generatedAt: new Date().toISOString()
  };
}
