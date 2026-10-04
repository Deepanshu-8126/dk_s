/**
 * Schema.org ItemList Schema for AI Tools & Applications
 */
export function generateAIToolsSchema(tools = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top AI Tools & Productivity Software 2026',
    itemListElement: (tools || []).map((tool, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: tool.category,
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
      },
    })),
  };
}
