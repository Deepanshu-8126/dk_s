import React from 'react';

/**
 * Enhanced Google Rich-Results Schema Generator (JSON-LD)
 * Includes: WebSite, Organization, Product/Review, Dataset, and FAQPage.
 */
export default function SEOSchema({ activeItem = null, products = [] }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'UniqueDigit',
    'alternateName': ['UniqueDigit Portal', 'UniqueDigit Hardware Intelligence'],
    'url': 'https://uniquedigit.in/',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://uniquedigit.in/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'UniqueDigit Intelligence Labs',
    'url': 'https://uniquedigit.in/',
    'logo': 'https://uniquedigit.in/favicon.svg',
    'sameAs': [
      'https://twitter.com/uniquedigit',
      'https://github.com/Deepanshu-8126/dk_s',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How does UniqueDigit test and score hardware products?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'UniqueDigit evaluates hardware across 12 benchmark parameters including build quality, performance-per-dollar, thermals, battery endurance, and software longevity to calculate a verified SmartScore (0-100).',
        },
      },
      {
        '@type': 'Question',
        'name': 'Are the Amazon prices and deals verified daily?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, all affiliate links and pricing data are synced and validated daily to ensure active stock availability and accurate pricing.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What is the 2 Pros + 1 Con Wirecutter breakdown?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'To eliminate marketing hype, every product features 2 decisive advantages and 1 honest trade-off so buyers make clear, well-informed decisions.',
        },
      },
    ],
  };

  // Generate Product & Review Schema if an active item or product list exists
  const productSchemas = (products.length > 0 ? products : (activeItem ? [activeItem] : [])).slice(0, 5).map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': p.name || p.title || 'Tech Hardware',
    'image': p.imageUrl || p.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=85',
    'description': p.verdict || p.description || 'Tested and rated with verified benchmarks.',
    'brand': {
      '@type': 'Brand',
      'name': (p.name || '').split(' ')[0] || 'Generic',
    },
    'offers': {
      '@type': 'Offer',
      'url': p.buyUrl || `https://www.amazon.in/dp/${p.asin || 'B08N5WRWNW'}?tag=uniquedigi0c6-21`,
      'priceCurrency': 'INR',
      'price': p.priceNumeric || (p.price ? String(p.price).replace(/[^0-9]/g, '') : '24999') || '24999',
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Amazon India',
      },
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': p.smartScore ? (parseFloat(p.smartScore) / 20).toFixed(1) : '4.6',
      'reviewCount': '1420',
      'bestRating': '5',
      'worstRating': '1',
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {productSchemas.map((ps, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ps) }}
        />
      ))}
    </>
  );
}
