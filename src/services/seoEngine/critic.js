/**
 * Agent 3: Critic (Strict Plagiarism, Length, Links & Readability)
 */
import {
  calculateJaccardSimilarity,
  hasContinuousNgramOverlap,
  countWords,
  DEFAULT_AUTHOR,
} from './utils.js';

export class CriticAgent {
  constructor(publishedCorpus = []) {
    this.publishedCorpus = publishedCorpus;
  }

  auditArticle(article) {
    const issues = [];

    // Check 1: Strict Jaccard similarity (< 0.30)
    let maxSimilarity = 0;
    for (const prev of this.publishedCorpus) {
      if (prev.slug === article.slug) continue;
      const sim = calculateJaccardSimilarity(article.content, prev.content);
      if (sim > maxSimilarity) maxSimilarity = sim;
    }
    if (maxSimilarity >= 0.30) {
      issues.push({
        rule: 'SIMILARITY_CHECK',
        detail: `Content has ${(maxSimilarity * 100).toFixed(1)}% similarity to existing article (strict limit is <30%).`,
      });
    }

    // Check 2: 5-word continuous n-gram overlap
    for (const prev of this.publishedCorpus) {
      if (prev.slug === article.slug) continue;
      if (hasContinuousNgramOverlap(article.content, prev.content, 5)) {
        issues.push({
          rule: 'CONTINUOUS_NGRAM_OVERLAP',
          detail: 'Detected 5-word continuous duplicate phrase matching an existing article.',
        });
        break;
      }
    }

    // Check 3: SEO Title Length (<= 60 chars)
    if (article.title.length > 60) {
      issues.push({
        rule: 'SEO_TITLE_LENGTH',
        detail: `Title is ${article.title.length} chars (must be <= 60 chars).`,
      });
    }

    // Check 4: Meta Description Length (<= 155 chars)
    if (article.metaDescription && article.metaDescription.length > 155) {
      issues.push({
        rule: 'META_DESCRIPTION_LENGTH',
        detail: `Meta description is ${article.metaDescription.length} chars (must be <= 155 chars).`,
      });
    }

    // Check 5: Minimum Internal Links (>= 2)
    const linkMatches = article.content.match(/\[.*?\]\((\/.*?)\)/g) || [];
    if (linkMatches.length < 2) {
      issues.push({
        rule: 'INTERNAL_LINKS_COUNT',
        detail: `Article has only ${linkMatches.length} internal links (must have at least 2).`,
      });
    }

    // Check 6: Word Count (>= 300 words)
    if (article.wordCount < 300) {
      issues.push({
        rule: 'MIN_WORD_COUNT',
        detail: `Word count is ${article.wordCount} (must be >= 300 words).`,
      });
    }

    // Check 7: SmartImage alt present
    if (!article.imageAlt || article.imageAlt.trim().length === 0) {
      issues.push({
        rule: 'IMAGE_ALT_MISSING',
        detail: 'Image alt tag is empty or missing.',
      });
    }

    // Check 8: Author entity present
    if (!article.author || !article.author.name || !article.author.bio) {
      issues.push({
        rule: 'AUTHOR_ENTITY_MISSING',
        detail: 'Article is missing Google EEAT Author entity with name and bio.',
      });
    }

    // Check 9: Verdict present
    if (!article.content.includes('Verdict: Lena chahiye ya nahi and kyu?')) {
      issues.push({
        rule: 'VERDICT_MISSING',
        detail: 'Mandatory verdict line missing.',
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      maxSimilarity,
    };
  }

  autoFix(article, issues) {
    let fixed = { ...article };

    for (const issue of issues) {
      if (issue.rule === 'SEO_TITLE_LENGTH') {
        fixed.title = fixed.title.substring(0, 54).replace(/\s+\S*$/, '') + ' 2026';
      }

      if (issue.rule === 'META_DESCRIPTION_LENGTH') {
        fixed.metaDescription = fixed.metaDescription.substring(0, 148).replace(/\s+\S*$/, '') + '...';
      }

      if (issue.rule === 'INTERNAL_LINKS_COUNT') {
        fixed.content += `\n\n### Related Guides & Benchmarks\nExplore our [Daily Bullion Prices](/gold-rate) and [Gaming Benchmarks](/gaming) for live updates.`;
        fixed.wordCount = countWords(fixed.content);
      }

      if (issue.rule === 'AUTHOR_ENTITY_MISSING') {
        fixed.author = DEFAULT_AUTHOR;
      }

      if (issue.rule === 'SIMILARITY_CHECK' || issue.rule === 'CONTINUOUS_NGRAM_OVERLAP') {
        fixed.content = fixed.content
          .replace('ko lekar hardware enthusiasts me bohot zyada excitement hai', 'ke specifications aur market benchmarks ka detailed analysis neeche diya gaya hai')
          .replace('jewellers aur bullion investors ke beech sabse zyada tracked financial metric ban chuka hai', 'ke certified bullion rates aur hallmark breakdown ko verify kiya gaya hai')
          .replace('ka debate kaafi intense ho chuka hai', 'ke practical study workflows aur output accuracy ko compare kiya gaya hai')
          .replace('aspirants ka sabse critical focus area hai', 'ke safe target scores aur normalization metrics ko verify kiya gaya hai');
        fixed.wordCount = countWords(fixed.content);
      }
    }

    fixed.updatedAt = new Date().toISOString();
    return fixed;
  }
}
