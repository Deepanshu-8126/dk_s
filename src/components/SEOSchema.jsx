import React from 'react';

/**
 * SEOSchema Component
 * Implements Google-compliant Schema.org JSON-LD structured data
 * Covers WebSite, Organization, and live Financial & Intelligence News
 */
export default function SEOSchema() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'UniqueDigit',
    'alternateName': ['UniqueDigit Portal', 'UniqueDigit Daily Intelligence'],
    'url': 'https://uniquedigit.com',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://uniquedigit.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'UniqueDigit Media Group',
    'url': 'https://uniquedigit.com',
    'logo': 'https://uniquedigit.com/logo.png',
    'sameAs': [
      'https://twitter.com/uniquedigit',
      'https://t.me/uniquedigit',
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer support',
      'availableLanguage': ['English', 'Hindi'],
    },
  };

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    'name': 'India Live Gold Rates & Bullion Spot Index',
    'description': 'Daily 24K and 22K gold rate benchmarks across major Indian metropolitan cities with IBJA alignment.',
    'license': 'https://creativecommons.org/publicdomain/zero/1.0/',
    'creator': {
      '@type': 'Organization',
      'name': 'UniqueDigit Bullion Desk',
    },
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
    </>
  );
}
