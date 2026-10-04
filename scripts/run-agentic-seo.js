import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  ResearcherAgent,
  WriterAgent,
  CriticAgent,
  DEFAULT_AUTHOR,
} from '../src/services/agenticSeoEngine.js';
import { submitToIndexNow } from '../src/utils/indexNow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Seed topics with real verified benchmarks and intent
const SEED_TOPICS = [
  {
    seed: "GTA 6 PC Build",
    modifier: "Moradabad",
    price: "₹55,000 (1080p Rig)",
    specs: "Intel i5-12400F, RTX 3060 12GB, 16GB DDR5, 1TB NVMe SSD",
  },
  {
    seed: "24K Gold Rate",
    modifier: "Lucknow Today",
    price: "₹1,18,500 / 10g",
    specs: "99.9% Pure Hallmark Gold, IBJA Benchmarked, Daily 9:30 AM",
  },
  {
    seed: "ChatGPT Plus vs Gemini Ultra",
    modifier: "Indian Students",
    price: "Free tier / ₹1,670 per month",
    specs: "Hindi NLP, Reasoning, PDF analysis, Python code generation",
  },
  {
    seed: "SSC CGL 2026 Cut Off",
    modifier: "Tier 2 Prep",
    price: "Free Government Board Portal",
    specs: "Staff Selection Commission Official Merit List & Answer Key",
  },
];

async function runAgenticSeo() {
  console.log('=== RUNNING AGENTIC SEO ENGINE (EEAT + HELPFUL CONTENT) ===');

  const researcher = new ResearcherAgent();
  const writer = new WriterAgent();

  const dataDir = path.resolve(__dirname, '../src/data');
  const articlesFile = path.join(dataDir, 'publishedArticles.json');
  const rejectedFile = path.join(dataDir, 'rejectedArticles.json');

  let existingArticles = [];
  if (fs.existsSync(articlesFile)) {
    try {
      existingArticles = JSON.parse(fs.readFileSync(articlesFile, 'utf-8'));
    } catch (e) {
      existingArticles = [];
    }
  }

  let rejectedArticles = [];
  if (fs.existsSync(rejectedFile)) {
    try {
      rejectedArticles = JSON.parse(fs.readFileSync(rejectedFile, 'utf-8'));
    } catch (e) {
      rejectedArticles = [];
    }
  }

  const published = [...existingArticles];
  const critic = new CriticAgent(published);

  for (const topic of SEED_TOPICS) {
    console.log(`\n[Agent 1: Researcher] Investigating: "${topic.seed}" in "${topic.modifier}"...`);
    const research = await researcher.discoverLongTailTopic(
      topic.seed,
      topic.modifier,
      topic.price,
      topic.specs
    );

    if (research.status === 'DRAFT') {
      console.warn(`⚠️ [Agent 1: FactCheck] Failed for ${topic.seed}: ${research.error}`);
      rejectedArticles.push({
        topic,
        reason: research.error,
        rejectedAt: new Date().toISOString(),
      });
      continue;
    }

    console.log(`[Agent 2: Writer] Drafting 300+ word EEAT Hinglish guide with author "${DEFAULT_AUTHOR.name}"...`);
    let article = writer.writeArticle({
      research,
      author: DEFAULT_AUTHOR,
    });

    console.log(`[Agent 3: Critic] Running quality & plagiarism audits on "${article.title}"...`);
    let audit = critic.auditArticle(article);

    // Auto-fix loop if needed
    let retries = 0;
    while (!audit.passed && retries < 3) {
      retries++;
      console.warn(`[Agent 3: Critic] Retry ${retries}: Auto-correcting issues:`, audit.issues.map(i => i.rule));
      article = critic.autoFix(article, audit.issues);
      audit = critic.auditArticle(article);
    }

    if (audit.passed) {
      console.log(`✅ [Agent 3: Critic] PASSED! Title: "${article.title}" (${article.title.length}c) | Words: ${article.wordCount} | Author: ${article.author.name}`);
      const idx = published.findIndex(p => p.slug === article.slug);
      if (idx >= 0) {
        published[idx] = article;
      } else {
        published.push(article);
      }
    } else {
      console.error(`❌ [Agent 3: Critic] REJECTED "${article.title}". Saving to rejectedArticles.json:`, audit.issues);
      rejectedArticles.push({
        title: article.title,
        keyword: article.keyword,
        issues: audit.issues,
        rejectedAt: new Date().toISOString(),
      });
    }
  }

  // Save published articles
  fs.writeFileSync(articlesFile, JSON.stringify(published, null, 2), 'utf-8');
  console.log(`\n[Agentic Engine] Successfully published ${published.length} articles in src/data/publishedArticles.json`);

  // Save rejected articles log
  fs.writeFileSync(rejectedFile, JSON.stringify(rejectedArticles, null, 2), 'utf-8');
  console.log(`[Agentic Engine] Recorded ${rejectedArticles.length} rejected attempts in src/data/rejectedArticles.json`);

  // Refresh dynamic sitemap
  const sitemapScript = path.resolve(__dirname, 'generate-sitemap.js');
  if (fs.existsSync(sitemapScript)) {
    console.log('[Agentic Engine] Regenerating dynamic sitemap.xml...');
    await import('./generate-sitemap.js');
  }

  // Auto-Submit newly published URLs to IndexNow network (Bing, Yandex, Seznam, Naver)
  const baseUrl = process.env.VITE_SITE_URL || 'https://uniquedigit.in';
  const newUrls = published.map(a => `${baseUrl}/guide/${a.slug}`);
  console.log(`[Agentic Engine] Auto-notifying IndexNow network with ${newUrls.length} live URLs...`);
  try {
    const res = await submitToIndexNow(newUrls);
    console.log(`[IndexNow Result]:`, res);
  } catch (err) {
    console.warn(`[IndexNow Warning]:`, err?.message);
  }
}

runAgenticSeo();
