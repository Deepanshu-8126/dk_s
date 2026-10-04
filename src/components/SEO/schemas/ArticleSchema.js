/**
 * Schema.org Article Schema with Author Entity and Dates
 */
export function generateArticleSchema(article, siteUrl = 'https://uniquedigit.in') {
  if (!article) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/guide/${article.slug}`,
    },
    headline: article.title,
    description: article.metaDescription,
    image: article.imageUrl ? [article.imageUrl] : [`${siteUrl}/favicon.svg`],
    datePublished: article.publishedAt || new Date().toISOString(),
    dateModified: article.updatedAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Editorial Team',
      jobTitle: article.author?.role || 'Senior Analyst',
      url: `${siteUrl}/about`,
      description: article.author?.bio || '',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UniqueDigit Intelligence',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
    },
  };
}
