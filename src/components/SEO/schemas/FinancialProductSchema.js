/**
 * Schema.org FinancialProduct for Live Bullion & Gold Rates
 */
export function generateFinancialProductSchema(rate24k, rate22k, city = 'National / Mumbai') {
  const highPrice = rate24k?.per10g || (typeof rate24k === 'number' ? rate24k : 118500);
  const lowPrice = rate22k ? rate22k * 10 : 108620;

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `24K & 22K Gold Rate Index in ${city}`,
    description: `Daily benchmarked 24 Karat (999 Purity) and 22 Karat spot gold prices in ${city}, India.`,
    category: 'Bullion Spot Commodity',
    provider: {
      '@type': 'Organization',
      name: 'IBJA Indian Bullion & Jewellers Association',
      url: 'https://ibja.co',
    },
    feesAndCommissionsSpecification: 'Excludes 3% GST and local making charges',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice,
      highPrice,
      offerCount: 10,
      priceValidUntil: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
    },
  };
}

// Backward-compatible alias
export const generateGoldSchema = generateFinancialProductSchema;
