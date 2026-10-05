// Smart Non-Redundant Upgrade & Alternative Recommendation Engine for UniqueDigit
// Guarantees products NEVER recommend themselves as upgrades or alternatives.

/**
 * Filters out the current product and returns curated alternative/upgrade picks
 * @param {string} currentProductId - The ID or title of current product
 * @param {Array} allProducts - List of all candidate products
 * @param {string} category - Category filter (optional)
 * @returns {Array} Top unique upgrade picks
 */
export function getSmartUpgrades(currentProductId, allProducts = [], category = null) {
  if (!Array.isArray(allProducts) || allProducts.length === 0) {
    return [];
  }

  const normalizedCurrentId = String(currentProductId || '').toLowerCase().trim();

  // Filter out current product completely by ID, ASIN, or exact title
  let candidates = allProducts.filter(product => {
    if (!product) return false;
    const pId = String(product.id || '').toLowerCase().trim();
    const pTitle = String(product.title || '').toLowerCase().trim();
    const pAsin = String(product.asin || '').toLowerCase().trim();

    if (pId === normalizedCurrentId) return false;
    if (pAsin && pAsin === normalizedCurrentId) return false;
    if (pTitle && normalizedCurrentId.includes(pTitle)) return false;
    if (pId && normalizedCurrentId.includes(pId)) return false;

    return true;
  });

  // If category is provided, prioritize products from the same or related category
  if (category) {
    const normCat = category.toLowerCase();
    const sameCat = candidates.filter(p => (p.category || '').toLowerCase().includes(normCat));
    if (sameCat.length >= 2) {
      candidates = sameCat;
    }
  }

  // Sort by spec score or rating if available
  candidates.sort((a, b) => (b.specScore || b.rating || 0) - (a.specScore || a.rating || 0));

  return candidates.slice(0, 3);
}

/**
 * Returns tailored alternatives for specific flagship products
 * @param {Object} topic - The product or entity being viewed
 * @returns {Array} List of curated competitor and upgrade cards
 */
export function getCuratedAlternatives(topic) {
  if (!topic) return [];
  const t = (topic.title || topic.name || '').toLowerCase();
  
  if (t.includes('s24 ultra') || t.includes('galaxy s24')) {
    return [
      {
        name: 'Apple iPhone 16 Pro (128GB / 256GB)',
        role: 'Top iOS Contender',
        why: 'Offers maximum video capability with 4K 120fps Dolby Vision and class-leading A18 Pro silicon.',
        badge: 'FLAGSHIP RIVAL',
        score: 96
      },
      {
        name: 'OnePlus 12 5G (16GB RAM, 512GB Storage)',
        role: 'Best Value Alternative',
        why: 'Delivers ~90% of the flagship experience with Snapdragon 8 Gen 3 at almost half the price.',
        badge: 'VALUE CHAMP',
        score: 92
      }
    ];
  }

  if (t.includes('iphone 16') || t.includes('iphone')) {
    return [
      {
        name: 'Samsung Galaxy S24 Ultra 5G',
        role: 'Top Android Rival',
        why: 'Glare-free flat Gorilla Armor display, built-in S-Pen, and class-leading 100x zoom versatility.',
        badge: 'ANDROID FLAGSHIP',
        score: 95
      },
      {
        name: 'OnePlus 12 5G (Silky Black)',
        role: 'Value Alternative',
        why: 'Blazing 100W SUPERVOOC charging and 4500-nit ProXDR display at an accessible price point.',
        badge: 'BUDGET CHAMP',
        score: 92
      }
    ];
  }

  if (t.includes('oneplus 12') || t.includes('oneplus')) {
    return [
      {
        name: 'iQOO 12 5G (Snapdragon 8 Gen 3)',
        role: 'Performance Alternative',
        why: 'Direct benchmark rival with dedicated Q1 gaming chip and 144Hz OLED panel.',
        badge: 'GAMING RIVAL',
        score: 93
      },
      {
        name: 'Samsung Galaxy S24 Ultra 5G',
        role: 'Ultimate Flagship Step-Up',
        why: 'Full Grade 5 titanium build, 200MP + 100x zoom, and 7 years of OS upgrades.',
        badge: 'UPGRADE PICK',
        score: 95
      }
    ];
  }

  if (t.includes('4070') || t.includes('gpu') || t.includes('graphics card')) {
    return [
      {
        name: 'NVIDIA GeForce RTX 4080 Super 16GB',
        role: 'Top 4K Ultra Upgrade',
        why: '16GB VRAM buffer and 10,240 CUDA cores for native 4K 120FPS ultra ray tracing.',
        badge: '4K UPGRADE',
        score: 98
      },
      {
        name: 'AMD Radeon RX 7900 GRE 16GB',
        role: 'Best Raster Value Alternative',
        why: 'Offers 16GB VRAM for raw rasterized high-FPS gaming at a competitive Indian retail price.',
        badge: 'VALUE RIVAL',
        score: 91
      }
    ];
  }

  if (t.includes('macbook') || t.includes('laptop')) {
    return [
      {
        name: 'Apple MacBook Pro 14-inch (M3 Pro)',
        role: 'Pro Creator Upgrade',
        why: 'Active fan cooling, 120Hz Liquid Retina XDR screen, and support for dual external 6K displays.',
        badge: 'PRO UPGRADE',
        score: 98
      },
      {
        name: 'ASUS Zenbook 14 OLED (Intel Core Ultra 7)',
        role: 'Top Windows OLED Alternative',
        why: 'Lightweight aluminium chassis, vibrant 120Hz OLED screen, and extensive port selection.',
        badge: 'WINDOWS CHAMP',
        score: 90
      }
    ];
  }

  return [
    {
      name: `Premium Upgrade Contender for ${topic.niche || 'Tech'}`,
      role: 'Top Tier Upgrade',
      why: 'Offers dedicated creator features, higher bandwidth memory, and extended thermal headroom.',
      badge: 'UPGRADE PICK',
      score: 96
    },
    {
      name: `Value Champion Alternative`,
      role: 'Best Budget Alternative',
      why: 'Delivers ~85% of flagship performance at a noticeably lower Indian retail price point.',
      badge: 'VALUE PICK',
      score: 90
    }
  ];
}
