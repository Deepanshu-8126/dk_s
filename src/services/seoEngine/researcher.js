/**
 * Agent 1: Researcher (FactCheck verification, long-tail intent discovery, real image binding)
 */
import { getRealImage } from '../../utils/getRealImage.js';

export class ResearcherAgent {
  async discoverLongTailTopic(seed, modifier, verifiedPrice, specs) {
    const longTailQuery = `${seed} in ${modifier}`;

    // Step 1: FactCheck & Sanity Audit
    if (!verifiedPrice || verifiedPrice.includes('fake') || verifiedPrice === '₹0') {
      return {
        status: 'DRAFT',
        error: `FactCheck verification failed for "${longTailQuery}": price "${verifiedPrice}" is invalid.`,
      };
    }

    if (!specs || specs.length < 10) {
      return {
        status: 'DRAFT',
        error: `FactCheck failed: specifications too sparse (${specs}) for "${longTailQuery}".`,
      };
    }

    // Step 2: Bind high-relevance WebP image asset
    let imageUrl = null;
    let niche = 'general';

    const lower = seed.toLowerCase();
    if (lower.includes('gta') || lower.includes('pc') || lower.includes('gaming')) {
      niche = 'gaming';
    } else if (lower.includes('gold') || lower.includes('rate') || lower.includes('bullion')) {
      niche = 'finance';
    } else if (lower.includes('ai') || lower.includes('chatgpt') || lower.includes('gemini')) {
      niche = 'tech';
    } else if (lower.includes('ssc') || lower.includes('sarkari') || lower.includes('cgl')) {
      niche = 'education';
    }

    try {
      imageUrl = await getRealImage(longTailQuery, niche);
    } catch (err) {
      console.warn(`[ResearcherAgent] Image search warning:`, err?.message);
    }

    return {
      status: 'VERIFIED',
      seed,
      modifier,
      longTailQuery,
      verifiedPrice,
      specs,
      imageUrl,
      niche,
    };
  }
}
