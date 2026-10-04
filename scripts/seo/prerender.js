import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.VITE_SITE_URL || 'https://uniquedigit.in';
const distDir = path.resolve(__dirname, '../../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

const CITIES = [
  'mumbai', 'delhi', 'kolkata', 'chennai', 'bengaluru',
  'hyderabad', 'ahmedabad', 'pune', 'lucknow', 'jaipur',
];

const GAMING_SLUGS = [
  { slug: 'gta-6-pc', title: 'Grand Theft Auto VI PC Benchmark & Price 2026' },
  { slug: 'gta-5-premium', title: 'GTA V Steam Live Deal & FiveM Specs India' },
  { slug: 'pc-builds-1080p-4k', title: 'Gaming PC Builds India Price Guide 2026' },
  { slug: 'valorant-india', title: 'Valorant India Server Benchmark & 144Hz Guide' },
  { slug: 'black-myth-wukong', title: 'Black Myth Wukong India Benchmark & Specs' },
  { slug: 'cyberpunk-2077', title: 'Cyberpunk 2077 Ray Tracing Guide & RT Specs' },
];

const AI_TOOL_SLUGS = [
  { slug: 'gemini-ultra', title: 'Google Gemini Ultra 2.0 Review & Student Features' },
  { slug: 'chatgpt-plus', title: 'ChatGPT Plus GPT-4o India Guide & Pro Subscription' },
  { slug: 'perplexity-pro', title: 'Perplexity AI Search Review & Student Discounts' },
  { slug: 'cursor-ide', title: 'Cursor AI Coding Editor Review & Pricing 2026' },
  { slug: 'midjourney-v7', title: 'Midjourney V7 Generative AI Pricing India' },
  { slug: 'claude-sonnet', title: 'Claude Sonnet 3.7 India Pricing & Coding Benchmarks' },
  { slug: 'suno-music-ai', title: 'Suno AI Music Generator & Commercial Rights' },
  { slug: 'notion-ai', title: 'Notion AI Workspace Guide & Student Free Tier' },
];

export function prerenderRoutes() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.warn('[Prerender] dist/index.html not found, skipping prerender.');
    return;
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Load published articles
  let articles = [];
  const articlesFile = path.resolve(__dirname, '../../src/data/articles/published.json');
  const legacyArticlesFile = path.resolve(__dirname, '../../src/data/publishedArticles.json');
  const targetArticlesFile = fs.existsSync(articlesFile) ? articlesFile : legacyArticlesFile;

  if (fs.existsSync(targetArticlesFile)) {
    try {
      articles = JSON.parse(fs.readFileSync(targetArticlesFile, 'utf-8'));
    } catch (e) {}
  }

  const routes = [
    {
      path: 'gold-rate',
      title: 'Gold Rate Today: 24K & 22K Live MCX Prices India',
      description: 'Live 24 Carat and 22 Carat gold rates across Mumbai, Delhi, Bengaluru, and Indian metros. Verified IBJA bullion prices.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name: '24K & 22K Gold Rate Index India',
        category: 'Bullion Spot Commodity',
      },
    },
    {
      path: 'gaming',
      title: 'GTA 6 PC Specs & Benchmark 2026: Steam Deals',
      description: 'Complete PC system requirements, FPS benchmarks, and Steam deals for GTA 6 and custom gaming PC builds.',
    },
    {
      path: 'ai-tools',
      title: 'Top AI Tools Directory 2026: Gemini, ChatGPT, Claude',
      description: 'Handpicked high-utility AI tools for students and professionals. Benchmark comparison and verified pricing.',
    },
    {
      path: 'sarkari',
      title: 'Sarkari Result 2026: Latest Government Job Alerts',
      description: 'Official notifications, admit cards, merit lists for SSC CGL, Railway RRB, and State government recruitment boards.',
    },
  ];

  // City gold routes (10)
  for (const c of CITIES) {
    const cityName = c.charAt(0).toUpperCase() + c.slice(1);
    routes.push({
      path: `gold-rate/${c}`,
      title: `Gold Rate in ${cityName} Today: 24K & 22K Verified Price`,
      description: `Today live 24 Karat and 22 Karat gold prices in ${cityName}. Local sarrafa bazar rates benchmarked against IBJA.`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name: `24K Gold Rate in ${cityName}`,
      },
    });
  }

  // Gaming routes (6)
  for (const g of GAMING_SLUGS) {
    routes.push({
      path: `gaming/${g.slug}`,
      title: g.title,
      description: `Complete technical specifications, system performance, and price benchmarks for ${g.title}.`,
    });
  }

  // AI tool routes (8)
  for (const a of AI_TOOL_SLUGS) {
    routes.push({
      path: `ai-tools/${a.slug}`,
      title: a.title,
      description: `Detailed comparison, benchmark scores, and INR pricing guide for ${a.title}.`,
    });
  }

  // Guide Article routes (4)
  for (const art of articles) {
    routes.push({
      path: `guide/${art.slug}`,
      title: art.title,
      description: art.metaDescription,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: art.title,
        description: art.metaDescription,
        datePublished: art.publishedAt,
        dateModified: art.updatedAt,
        author: {
          '@type': 'Person',
          name: art.author?.name || 'Vikramaditya Rathore',
        },
      },
    });
  }

  console.log(`\n=== PRERENDERING STATIC HTML (${routes.length} Routes) ===`);

  for (const r of routes) {
    const targetDir = path.join(distDir, r.path);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const canonicalUrl = `${BASE_URL}/${r.path}`;
    let html = template;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${r.title}</title>`);

    // Build SEO head injection tags
    let seoTags = `
    <meta name="description" content="${r.description}">
    <link rel="canonical" href="${canonicalUrl}">
    <link rel="alternate" hreflang="hi" href="${canonicalUrl}">
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}">
    <meta property="og:title" content="${r.title}">
    <meta property="og:description" content="${r.description}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta name="twitter:title" content="${r.title}">
    <meta name="twitter:description" content="${r.description}">`;

    if (r.schema) {
      seoTags += `
    <script type="application/ld+json">
${JSON.stringify(r.schema, null, 2)}
    </script>`;
    }

    html = html.replace('</head>', `${seoTags}\n  </head>`);

    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
  }

  console.log(`✅ [Prerender] Successfully generated static HTML files for ${routes.length} routes in dist/!`);
}

prerenderRoutes();
