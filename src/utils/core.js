/**
 * ⚡ ANTI-GRAVITY CORE UTILITY ENGINE (UniqueDigit)
 * Single source of truth for pricing math, EMI, affiliate auto-tagging,
 * priority weight sorting, and micro-markdown parsing.
 */

// 1. Math & Financial Calculations (Zero Hallucination)
export function calculateDiscount(mrp, offerPrice) {
  const m = Number(mrp) || 0;
  const p = Number(offerPrice) || 0;
  if (m <= 0 || p <= 0 || m <= p) return 0;
  return Math.round(((m - p) / m) * 100);
}

export function calculateEmi(principal, months = 6, annualRate = 14) {
  const p = Number(principal) || 0;
  if (p <= 0 || months <= 0) return 0;
  const monthlyRate = annualRate / (12 * 100);
  const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

export function formatINR(val) {
  const num = Number(val) || 0;
  return `₹${num.toLocaleString('en-IN')}`;
}

// 2. Zero-Code Affiliate Tagging & Out-of-Stock Resolver
export const DEFAULT_AMAZON_TAG = 'uniquedigi0c6-21';

export function getAffiliateTag() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('ud_amazon_tag');
      if (stored) return stored.trim();
    } catch {}
  }
  return DEFAULT_AMAZON_TAG;
}

export function buildAffiliateUrl(queryOrUrl, customTag = null, inStock = true) {
  const tag = customTag || getAffiliateTag();
  const clean = (queryOrUrl || '').trim();

  // If out of stock on Amazon, fallback to Flipkart search
  if (!inStock) {
    return `https://www.flipkart.com/search?q=${encodeURIComponent(clean)}`;
  }

  if (!clean) return `https://www.amazon.in/?tag=${encodeURIComponent(tag)}`;

  if (clean.startsWith('http')) {
    try {
      const u = new URL(clean);
      u.searchParams.set('tag', tag);
      return u.toString();
    } catch {
      return clean;
    }
  }

  return `https://www.amazon.in/s?k=${encodeURIComponent(clean)}&tag=${encodeURIComponent(tag)}`;
}

export const getAffiliateLink = buildAffiliateUrl;

// 3. Priority Weight Sorting Engine
export function sortByPriority(items = [], key = 'priorityWeight') {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const wA = Number(a[key] ?? a.priority ?? 0);
    const wB = Number(b[key] ?? b.priority ?? 0);
    return wB - wA; // Highest priority first
  });
}

// 4. Universal Micro-Markdown & Spec Parser
export function parseMicroMarkdown(text = '') {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono text-[11px]">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline">$1</a>');
}
