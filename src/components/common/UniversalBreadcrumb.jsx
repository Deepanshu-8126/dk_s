import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function UniversalBreadcrumb({ items = [] }) {
  if (!items || items.length === 0) return null;

  const breadcrumbsList = [
    { name: 'Home', url: '/' },
    ...items
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbsList.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `https://uniquedigit.com${item.url || ''}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 my-4 flex-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <a href="/" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </a>

      {items.map((b, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          {idx === items.length - 1 ? (
            <span className="font-semibold text-slate-200 truncate max-w-xs">{b.name}</span>
          ) : (
            <a href={b.url || '#'} className="hover:text-cyan-400 transition-colors">
              {b.name}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
