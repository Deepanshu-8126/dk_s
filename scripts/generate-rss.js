import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publishedArticlesPath = path.resolve(__dirname, '../src/data/articles/published.json');
const outputPath = path.resolve(__dirname, '../public/rss.xml');

function generateRSS() {
  let articles = [];
  try {
    if (fs.existsSync(publishedArticlesPath)) {
      const data = fs.readFileSync(publishedArticlesPath, 'utf8');
      articles = JSON.parse(data);
    }
  } catch (err) {
    console.warn('[RSS] Could not read published.json, using defaults');
  }

  const siteUrl = 'https://dk-s.uniquedigit-hub.workers.dev';
  const buildDate = new Date().toUTCString();

  const itemsXml = articles.map(art => {
    const slug = art.slug || art.id || '';
    const itemUrl = slug ? `${siteUrl}/guide/${slug}` : siteUrl;
    const desc = art.metaDescription || art.description || art.summary || (art.content ? art.content.slice(0, 160) + '...' : '');
    const pubDate = art.publishedAt || art.date || buildDate;

    return `    <item>
      <title><![CDATA[${art.title || ''}]]></title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
      <description><![CDATA[${desc}]]></description>
      <category>${art.category || 'Tech'}</category>
    </item>`;
  }).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>UniqueDigit - Tech, PC Builds &amp; Live Rates</title>
    <link>${siteUrl}</link>
    <description>The Next-Gen Tech Media &amp; Pricing Portal for Indian Geeks</description>
    <language>en-in</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  fs.writeFileSync(outputPath, rssXml.trim(), 'utf8');
  console.log(`[RSS Generator] Successfully generated rss.xml with ${articles.length} items at: ${outputPath}`);
}

generateRSS();
