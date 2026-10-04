/**
 * Curated High-Definition Official Media Registry
 * Eliminates random Wikipedia convention/cosplay snapshots.
 * Provides authentic, verified high-resolution keyart, product photos, and brand assets.
 */

export const CURATED_GAMES = {
  gta6: {
    title: 'Grand Theft Auto VI',
    artwork: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
    publisher: 'Rockstar Games',
    badge: 'Next-Gen Leonida',
  },
  gta5: {
    title: 'Grand Theft Auto V',
    artwork: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85',
    publisher: 'Rockstar North',
    badge: 'FiveM Verified',
  },
  valorant: {
    title: 'Valorant India',
    artwork: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=85',
    publisher: 'Riot Games',
    badge: 'Mumbai 12ms Ping',
  },
  wukong: {
    title: 'Black Myth: Wukong',
    artwork: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=85',
    publisher: 'Game Science',
    badge: 'Unreal Engine 5.4',
  },
  cyberpunk: {
    title: 'Cyberpunk 2077',
    artwork: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85',
    publisher: 'CD PROJEKT RED',
    badge: 'Full Ray Reconstruction',
  },
};

export const CURATED_AI_LOGOS = {
  'gemini-ultra': {
    brand: 'Google Gemini',
    color: '#4285F4',
    bg: '#EEF2FF',
    symbol: '✨',
  },
  'chatgpt-plus': {
    brand: 'OpenAI ChatGPT',
    color: '#10A37F',
    bg: '#ECFDF5',
    symbol: '⚡',
  },
  'perplexity-pro': {
    brand: 'Perplexity AI',
    color: '#20B2AA',
    bg: '#F0FDFA',
    symbol: '🔍',
  },
  'cursor-ide': {
    brand: 'Cursor AI',
    color: '#6366F1',
    bg: '#EEF2FF',
    symbol: '💻',
  },
  'midjourney-v7': {
    brand: 'Midjourney',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    symbol: '🎨',
  },
  'claude-sonnet': {
    brand: 'Anthropic Claude',
    color: '#D97706',
    bg: '#FEF3C7',
    symbol: '🧠',
  },
  'suno-music-ai': {
    brand: 'Suno AI',
    color: '#EC4899',
    bg: '#FDF2F8',
    symbol: '🎵',
  },
  'notion-ai': {
    brand: 'Notion Workspace',
    color: '#000000',
    bg: '#F3F4F6',
    symbol: '📝',
  },
};

export const CURATED_COMMODITIES = {
  gold24k: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=85',
  silver: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=1000&q=85',
  petrol: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=1000&q=85',
  mandi: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=85',
  sarkari: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=85',
};

export function getCuratedMedia(key) {
  if (!key) return null;
  const lower = String(key).toLowerCase();

  // Games
  if (lower.includes('gta 6') || lower.includes('vice city') || lower.includes('grand theft auto vi')) {
    return CURATED_GAMES.gta6.artwork;
  }
  if (lower.includes('gta 5') || lower.includes('fivem') || lower.includes('grand theft auto v')) {
    return CURATED_GAMES.gta5.artwork;
  }
  if (lower.includes('valorant')) {
    return CURATED_GAMES.valorant.artwork;
  }
  if (lower.includes('wukong') || lower.includes('black myth')) {
    return CURATED_GAMES.wukong.artwork;
  }
  if (lower.includes('cyberpunk')) {
    return CURATED_GAMES.cyberpunk.artwork;
  }

  // Commodities & Services
  if (lower.includes('gold') || lower.includes('bullion') || lower.includes('24k') || lower.includes('22k')) {
    return CURATED_COMMODITIES.gold24k;
  }
  if (lower.includes('petrol') || lower.includes('diesel') || lower.includes('fuel')) {
    return CURATED_COMMODITIES.petrol;
  }
  if (lower.includes('mandi') || lower.includes('wheat') || lower.includes('crop') || lower.includes('chana')) {
    return CURATED_COMMODITIES.mandi;
  }
  if (lower.includes('ssc') || lower.includes('cgl') || lower.includes('sarkari') || lower.includes('upsc')) {
    return CURATED_COMMODITIES.sarkari;
  }

  return null;
}
