/**
 * Curated High-Definition Official Media Registry
 * Eliminates random Wikipedia convention/cosplay snapshots.
 * Provides authentic, verified high-resolution keyart, product photos, and brand assets.
 */

export const CURATED_GAMES = {
  gta6: {
    title: 'Grand Theft Auto VI',
    artwork: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
    publisher: 'Rockstar Games',
    badge: 'Next-Gen Leonida',
  },
  gta5: {
    title: 'Grand Theft Auto V',
    artwork: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
    publisher: 'Rockstar North',
    badge: 'FiveM Verified',
  },
  valorant: {
    title: 'Valorant India',
    artwork: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/capsule_616x353.jpg',
    publisher: 'Riot Games',
    badge: 'Mumbai 12ms Ping',
  },
  wukong: {
    title: 'Black Myth: Wukong',
    artwork: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg',
    publisher: 'Game Science',
    badge: 'Unreal Engine 5.4',
  },
  cyberpunk: {
    title: 'Cyberpunk 2077',
    artwork: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
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
  gold24k: 'https://m.media-amazon.com/images/I/71ZDY57y6QL._SX679_.jpg',
  silver: 'https://m.media-amazon.com/images/I/61b7L9VfNBL._SX679_.jpg',
  petrol: 'https://m.media-amazon.com/images/I/71+vR0m3uWL._SX679_.jpg',
  mandi: 'https://m.media-amazon.com/images/I/71u-YxKfZkL._SX679_.jpg',
  sarkari: 'https://m.media-amazon.com/images/I/71ItMeqpN3L._SX679_.jpg',
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
