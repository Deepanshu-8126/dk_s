/**
 * Real Grounded Sources Service
 * Fetches and normalizes verifiable source excerpts for Gemini generation.
 * Zero fact fabrication: Gemini is only permitted to synthesize supplied excerpts.
 */

function cleanText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

export async function fetchTopicSources(topic, userSuppliedSources = []) {
  const normalizedSources = [];
  let sourceIndex = 1;

  // 1. Process and validate any user-supplied sources
  if (Array.isArray(userSuppliedSources) && userSuppliedSources.length > 0) {
    for (const src of userSuppliedSources) {
      if (src && src.excerpt && src.url) {
        normalizedSources.push({
          id: src.id || `src-${sourceIndex++}`,
          title: cleanText(src.title) || 'User-Provided Reference',
          url: src.url.trim(),
          excerpt: cleanText(src.excerpt).slice(0, 1500)
        });
      }
    }
  }

  // 2. If topic is present, fetch primary encyclopedia reference from Wikipedia REST API
  if (topic && topic.trim()) {
    try {
      const searchEndpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(topic.trim())}&limit=2&namespace=0&format=json`;
      const searchRes = await fetch(searchEndpoint, {
        headers: { 'User-Agent': 'UniqueDigit-Editorial/1.0 (editorial@uniquedigit.in)' }
      });

      if (searchRes.ok) {
        const [, titles, descriptions, urls] = await searchRes.json();
        if (titles && titles.length > 0) {
          for (let i = 0; i < titles.length; i++) {
            const pageTitle = titles[i];
            const pageUrl = urls[i];
            const desc = descriptions[i];

            // Fetch richer summary extract
            const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
            const sumRes = await fetch(summaryUrl, {
              headers: { 'User-Agent': 'UniqueDigit-Editorial/1.0 (editorial@uniquedigit.in)' }
            });

            if (sumRes.ok) {
              const sumData = await sumRes.json();
              if (sumData.extract) {
                normalizedSources.push({
                  id: `src-${sourceIndex++}`,
                  title: sumData.title || pageTitle,
                  url: pageUrl || sumData.content_urls?.desktop?.page,
                  excerpt: cleanText(sumData.extract)
                });
              }
            } else if (desc && desc.length > 30) {
              normalizedSources.push({
                id: `src-${sourceIndex++}`,
                title: pageTitle,
                url: pageUrl,
                excerpt: cleanText(desc)
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn('[SourcesService] Wikipedia lookup skipped:', e.message);
    }
  }

  return normalizedSources;
}
