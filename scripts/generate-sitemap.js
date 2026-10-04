import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic domain resolution from environment or fallback
const BASE_URL = process.env.VITE_SITE_URL || 'https://uniquedigit.in';
const CURRENT_DATE = new Date().toISOString();

// Core static routes with priorities and change frequencies
const CORE_ROUTES = [
  {
    path: '',
    changefreq: 'daily',
    priority: '1.0',
    title: 'UniqueDigit - India Daily Intelligence & Utility Hub',
    image: `${BASE_URL}/favicon.svg`
  },
  {
    path: 'gold-rate',
    changefreq: 'daily',
    priority: '0.9',
    title: 'Today 24K and 22K Gold Rates India',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Gold_bullion_2.jpg'
  },
  {
    path: 'gaming',
    changefreq: 'daily',
    priority: '0.9',
    title: 'GTA 6 PC Specs & Gaming Benchmark India',
    image: 'https://live.staticflickr.com/7707/17141232126_bfdff1bf20_b.jpg'
  },
  {
    path: 'ai-tools',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Top AI Tools & Productivity Directory 2026',
    image: `${BASE_URL}/favicon.svg`
  },
  {
    path: 'sarkari',
    changefreq: 'daily',
    priority: '0.9',
    title: 'Sarkari Results & Government Job Notifications',
    image: `${BASE_URL}/favicon.svg`
  },
];

// Major Indian cities for Gold SEO landing pages
const GOLD_CITIES = [
  { city: 'mumbai', name: 'Mumbai' },
  { city: 'delhi', name: 'Delhi' },
  { city: 'bengaluru', name: 'Bengaluru' },
  { city: 'chennai', name: 'Chennai' },
  { city: 'hyderabad', name: 'Hyderabad' },
  { city: 'kolkata', name: 'Kolkata' },
  { city: 'ahmedabad', name: 'Ahmedabad' },
  { city: 'pune', name: 'Pune' },
  { city: 'jaipur', name: 'Jaipur' },
  { city: 'lucknow', name: 'Lucknow' }
];

// Gaming detail pages
const GAMING_SLUGS = [
  { slug: 'gta-6-pc', title: 'Grand Theft Auto VI PC Benchmark & Price' },
  { slug: 'gta-5-premium', title: 'GTA V Steam Live Deal & FiveM Specs' },
  { slug: 'pc-builds-1080p-4k', title: 'Gaming PC Builds India Price Guide' },
  { slug: 'valorant-india', title: 'Valorant India Server Benchmark' },
  { slug: 'black-myth-wukong', title: 'Black Myth Wukong India Benchmark' },
  { slug: 'cyberpunk-2077', title: 'Cyberpunk 2077 Ray Tracing Guide' },
];

// AI Tool detail pages
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

function generateDynamicSitemap() {
  const urls = [];

  // 1. Core Routes with Image Sitemap Tags
  for (const route of CORE_ROUTES) {
    const loc = route.path ? `${BASE_URL}/${route.path}` : BASE_URL;
    urls.push(`
  <url>
    <loc>${loc}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    ${route.image ? `
    <image:image>
      <image:loc>${route.image}</image:loc>
      <image:title><![CDATA[${route.title}]]></image:title>
    </image:image>` : ''}
  </url>`);
  }

  // 2. City Gold Rate Pages (<changefreq>daily</changefreq>)
  for (const c of GOLD_CITIES) {
    urls.push(`
  <url>
    <loc>${BASE_URL}/gold-rate/${c.city}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>https://upload.wikimedia.org/wikipedia/commons/c/c6/Gold_bullion_2.jpg</image:loc>
      <image:title><![CDATA[24K and 22K Gold Rate Today in ${c.name}]]></image:title>
    </image:image>
  </url>`);
  }

  // 3. Gaming Detail Pages
  for (const g of GAMING_SLUGS) {
    urls.push(`
  <url>
    <loc>${BASE_URL}/gaming/${g.slug}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
    <image:image>
      <image:loc>https://live.staticflickr.com/7707/17141232126_bfdff1bf20_b.jpg</image:loc>
      <image:title><![CDATA[${g.title}]]></image:title>
    </image:image>
  </url>`);
  }

  // 4. AI Tool Detail Pages
  for (const t of AI_TOOL_SLUGS) {
    urls.push(`
  <url>
    <loc>${BASE_URL}/ai-tools/${t.slug}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
    <image:image>
      <image:loc>${BASE_URL}/favicon.svg</image:loc>
      <image:title><![CDATA[${t.title}]]></image:title>
    </image:image>
  </url>`);
  }

  // 5. Published EEAT Long-Tail Articles
  const articlesPath = path.resolve(__dirname, '../src/data/publishedArticles.json');
  if (fs.existsSync(articlesPath)) {
    try {
      const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
      for (const article of articles) {
        urls.push(`
  <url>
    <loc>${BASE_URL}/guide/${article.slug}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    ${article.imageUrl ? `
    <image:image>
      <image:loc>${article.imageUrl}</image:loc>
      <image:title><![CDATA[${article.title}]]></image:title>
    </image:image>` : ''}
  </url>`);
      }
    } catch (e) {
      console.warn('[Sitemap] Could not parse published articles:', e.message);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('')}
</urlset>`;

  const outDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const sitemapPath = path.join(outDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml.trim(), 'utf-8');
  console.log(`[Auto-SEO] Dynamic sitemap.xml generated with ${urls.length} verified URLs at: ${sitemapPath}`);
}

generateDynamicSitemap();
