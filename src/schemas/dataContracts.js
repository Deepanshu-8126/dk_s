/**
 * @file dataContracts.js
 * @description Pure structural contracts and schemas for the UniqueDigit portal.
 * All real items and media are hydrated dynamically from online live APIs.
 */

/**
 * Niche Category Blueprint Schema
 */
export const NicheCategorySchema = {
  id: '',
  name: '',
  tag: '',
  icon: '',
  color: '',
  apiQuery: '',
  topics: [] // Dynamic query topics to fetch from live online API
};

/**
 * Product Item Contract
 */
export const ProductContract = {
  id: '',
  title: '',
  category: '',
  asin: '',
  affiliateUrl: '',
  specs: {},
  pros: [],
  cons: [],
  verdict: '',
  rating: 0
};

/**
 * Article & Guide Contract
 */
export const ArticleContract = {
  slug: '',
  title: '',
  category: '',
  readTime: '',
  publishedAt: '',
  summary: '',
  sections: [],
  faqs: []
};

/**
 * Live Market Ticker Contract
 */
export const MarketTickerContract = {
  symbol: '',
  name: '',
  price: 0,
  change: 0,
  unit: '',
  source: '',
  lastUpdated: ''
};
