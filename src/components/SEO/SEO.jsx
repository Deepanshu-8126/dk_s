import React, { useEffect } from 'react';
import { generateBreadcrumbSchema } from './schemas/BreadcrumbSchema.js';

/**
 * SEO.jsx
 * Dynamic Meta Manager with canonical trailing-slash normalizer, BreadcrumbList, and hreflang
 */
export default function SEO({
  title = "Gold Rate Today + AI Tools + Sarkari Result | UniqueDigit",
  description = "India's daily intelligence hub for verified 24K/22K gold rate today, top AI tools directory, PC gaming benchmarks, and government exam results.",
  canonicalPath = "",
  ogImage = "https://uniquedigit.in/favicon.svg",
  ogType = "website",
  keywords = "gold rate today, sarkari result 2026, AI tools india, GTA 6 PC price, MCX bullion",
  schema = null,
  breadcrumbs = null,
}) {
  const siteUrl = import.meta.env?.VITE_SITE_URL || 'https://uniquedigit.in';
  
  // Rule 8: Normalize canonical by always stripping trailing slash
  const rawPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const strippedPath = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  const fullCanonical = `${siteUrl}${strippedPath === '/' ? '' : strippedPath}`;

  // Rule 9: BreadcrumbList JSON-LD
  const breadcrumbItems = breadcrumbs || (strippedPath && strippedPath !== '/' ? [
    { name: 'Home', path: '/' },
    ...strippedPath.split('/').filter(Boolean).map((seg, idx, arr) => ({
      name: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
      path: `/${arr.slice(0, idx + 1).join('/')}`,
    }))
  ] : null);

  const breadcrumbSchema = breadcrumbItems && breadcrumbItems.length > 1
    ? generateBreadcrumbSchema(breadcrumbItems, siteUrl)
    : null;

  useEffect(() => {
    // Title bound <= 60 chars
    const cleanTitle = title.length > 60 ? `${title.substring(0, 56).trim()}...` : title;
    document.title = cleanTitle;

    const setMeta = (name, content, attr = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href, extraAttrs = {}) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) selector += `[hreflang="${extraAttrs.hreflang}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setLink('canonical', fullCanonical);

    // OpenGraph & Twitter
    setMeta('og:title', cleanTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:url', fullCanonical, 'property');
    setMeta('og:image', ogImage, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', cleanTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Rule 4: Real hreflang only: hi and x-default
    setLink('alternate', fullCanonical, { hreflang: 'hi' });
    setLink('alternate', fullCanonical, { hreflang: 'x-default' });

    // Google Search Console Verification from env
    const gscCode = import.meta.env?.VITE_GSC_CODE;
    if (gscCode) setMeta('google-site-verification', gscCode);
  }, [title, description, fullCanonical, ogImage, ogType, keywords]);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
}
