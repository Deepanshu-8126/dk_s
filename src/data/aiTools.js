/**
 * @file aiTools.js
 * @description Pure Schema Blueprint for AI Tools.
 * All live metadata, images, and ratings are hydrated dynamically via onlineDataService.
 */

export const AI_TOOLS_SCHEMA = {
  id: '',
  name: '',
  category: 'AI Assistant',
  rating: 0,
  pricing: '',
  affiliateLink: '',
  isLive: true
};

export const AI_TOOLS_BLUEPRINT = [
  { id: "gemini-ultra", query: "Google Gemini", name: "Google Gemini Ultra 2.0", category: "AI Assistant", affiliateLink: "https://gemini.google.com" },
  { id: "chatgpt-plus", query: "ChatGPT", name: "ChatGPT Plus (GPT-4o)", category: "LLM & Reasoning", affiliateLink: "https://chat.openai.com" },
  { id: "claude-sonnet", query: "Claude (AI)", name: "Claude 3.5 Sonnet", category: "Coding & Analysis", affiliateLink: "https://claude.ai" },
  { id: "deepseek-coder", query: "DeepSeek", name: "DeepSeek Coder V2", category: "Open Weights", affiliateLink: "https://chat.deepseek.com" },
  { id: "perplexity-pro", query: "Perplexity AI", name: "Perplexity Pro", category: "AI Search", affiliateLink: "https://perplexity.ai" },
  { id: "cursor-ide", query: "Cursor (software)", name: "Cursor AI Code Editor", category: "Dev Supercharger", affiliateLink: "https://cursor.com" }
];

// Fallback exported symbol for backward compatibility
export const AI_TOOLS = AI_TOOLS_BLUEPRINT.map(t => ({
  ...t,
  description: "Next-generation generative AI model with live web reasoning.",
  rating: 4.9,
  pricing: "Free / Pro Tier",
  imageUrl: "https://m.media-amazon.com/images/I/71ItMeqpN3L._SX679_.jpg",
  useCase: ["Writing", "Coding", "Research"],
  cta: "Access Model →"
}));
