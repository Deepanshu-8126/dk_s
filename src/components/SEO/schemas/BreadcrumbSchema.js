/**
 * Schema.org BreadcrumbList for SERP Breadcrumbs
 */
export function generateBreadcrumbSchema(items = [], siteUrl = 'https://uniquedigit.in') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${siteUrl}${item.path}`,
    })),
  };
}
