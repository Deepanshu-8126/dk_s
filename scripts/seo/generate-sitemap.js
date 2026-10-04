import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.VITE_SITE_URL || 'https://uniquedigit.in';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

const CORE_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'daily', title: 'UniqueDigit - India Daily Intelligence & Utility Hub' },
  { path: '/gold-rate', priority: '0.95', changefreq: 'daily', title: 'Today 24K and 22K Gold Rates India' },
  { path: '/gaming', priority: '0.90', changefreq: 'daily', title: 'GTA 6 PC Specs & Gaming Benchmark India' },
  { path: '/ai-tools', priority: '0.90', changefreq: 'weekly', title: 'Top AI Tools & Productivity Directory 2026' },
  { path: '/sarkari', priority: '0.90', changefreq: 'daily', title: 'Sarkari Results & Government Job Notifications' },
];

const CITIES = [
  { city: 'mumbai', name: 'Mumbai' },
  { city: 'delhi', name: 'Delhi' },
  { city: 'bengaluru', name: 'Bengaluru' },
  { city: 'chennai', name: 'Chennai' },
  { city: 'hyderabad', name: 'Hyderabad' },
  { city: 'kolkata', name: 'Kolkata' },
  { city: 'ahmedabad', name: 'Ahmedabad' },
  { city: 'pune', name: 'Pune' },
  { city: 'jaipur', name: 'Jaipur' },
  { city: 'lucknow', name: 'Lucknow' },
];

const GAMING_SLUGS = [
  { slug: 'gta-6-pc', title: 'Grand Theft Auto VI PC Benchmark & Price' },
  { slug: 'gta-5-premium', title: 'GTA V Steam Live Deal & FiveM Specs' },
  { slug: 'pc-builds-1080p-4k', title: 'Gaming PC Builds India Price Guide' },
  { slug: 'valorant-india', title: 'Valorant India Server Benchmark' },
  { slug: 'black-myth-wukong', title: 'Black Myth Wukong India Benchmark' },
  { slug: 'cyberpunk-2077', title: 'Cyberpunk 2077 Ray Tracing Guide' },
];

const AI_TOOL_SLUGS = [
  { slug: 'gemini-ultra', title: 'Google Gemini Ultra 2.0 Review' },
  { slug: 'chatgpt-plus', title: 'ChatGPT Plus GPT-4o India Guide' },
  { slug: 'perplexity-pro', title: 'Perplexity AI Search Review' },
  { slug: 'cursor-ide', title: 'Cursor AI Coding Editor Review' },
  { slug: 'midjourney-v7', title: 'Midjourney V7 Generative AI' },
  { slug: 'claude-sonnet', title: 'Claude Sonnet 3.7 India Pricing' },
  { slug: 'suno-music-ai', title: 'Suno AI Music Generator' },
  { slug: 'notion-ai', title: 'Notion AI Workspace Guide' },
];

export function generateSitemap() {
  const entries = [];

  // 1. Core Pages
  for (const r of CORE_ROUTES) {
    entries.push({
      loc: `${BASE_URL}${r.path}`,
      lastmod: CURRENT_DATE,
      changefreq: r.changefreq,
      priority: r.priority,
      title: r.title,
    });
  }

  // 2. City Gold Rates
  for (const c of CITIES) {
    entries.push({
      loc: `${BASE_URL}/gold-rate/${c.city}`,
      lastmod: CURRENT_DATE,
      changefreq: 'daily',
      priority: '0.85',
      title: `24K and 22K Gold Rate Today in ${c.name}`,
    });
  }

  // 3. Gaming Detail Pages
  for (const g of GAMING_SLUGS) {
    entries.push({
      loc: `${BASE_URL}/gaming/${g.slug}`,
      lastmod: CURRENT_DATE,
      changefreq: 'weekly',
      priority: '0.80',
      title: g.title,
    });
  }

  // 4. AI Tools Detail Pages
  for (const a of AI_TOOL_SLUGS) {
    entries.push({
      loc: `${BASE_URL}/ai-tools/${a.slug}`,
      lastmod: CURRENT_DATE,
      changefreq: 'weekly',
      priority: '0.80',
      title: a.title,
    });
  }

  // 5. Published EEAT Guide Articles from data
  const articlesFile = path.resolve(__dirname, '../../src/data/articles/published.json');
  const legacyArticlesFile = path.resolve(__dirname, '../../src/data/publishedArticles.json');
  const targetArticlesFile = fs.existsSync(articlesFile) ? articlesFile : legacyArticlesFile;

  if (fs.existsSync(targetArticlesFile)) {
    try {
      const articles = JSON.parse(fs.readFileSync(targetArticlesFile, 'utf-8'));
      for (const art of articles) {
        entries.push({
          loc: `${BASE_URL}/guide/${art.slug}`,
          lastmod: art.updatedAt ? art.updatedAt.split('T')[0] : CURRENT_DATE,
          changefreq: 'weekly',
          priority: '0.85',
          image: art.imageUrl,
          title: art.title,
        });
      }
    } catch (e) {}
  }

  const outDir = path.resolve(__dirname, '../../public');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const renderUrl = (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>${e.image ? `
    <image:image>
      <image:loc>${e.image}</image:loc>
      <image:title>${(e.title || '').replace(/&/g, '&amp;')}</image:title>
    </image:image>` : ''}
  </url>`;

  // Rule 7: Sitemap Index scaling if URLs > 100
  if (entries.length > 100) {
    const CHUNK_SIZE = 100;
    const chunkCount = Math.ceil(entries.length / CHUNK_SIZE);
    const indexEntries = [];

    for (let i = 0; i < chunkCount; i++) {
      const chunk = entries.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      const filename = `sitemap-${i}.xml`;
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${chunk.map(renderUrl).join('\n')}
</urlset>`;
      fs.writeFileSync(path.join(outDir, filename), xml, 'utf-8');
      indexEntries.push(`  <sitemap>
    <loc>${BASE_URL}/${filename}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>`);
    }

    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexEntries.join('\n')}
</sitemapindex>`;
    fs.writeFileSync(path.join(outDir, 'sitemap-index.xml'), indexXml, 'utf-8');
    console.log(`[Auto-SEO] Generated sitemap index with ${chunkCount} parts for ${entries.length} URLs.`);
  } else {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(renderUrl).join('\n')}
</urlset>`;
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf-8');
    console.log(`[Auto-SEO] Generated sitemap.xml with ${entries.length} verified URLs at: ${path.join(outDir, 'sitemap.xml')}`);
  }

  // Update robots.txt
  const robotsPath = path.join(outDir, 'robots.txt');
  const sitemapTarget = entries.length > 100 ? `${BASE_URL}/sitemap-index.xml` : `${BASE_URL}/sitemap.xml`;
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${sitemapTarget}
`;
  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
}

generateSitemap();
