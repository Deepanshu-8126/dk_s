import React, { useState, useEffect } from 'react';
import { getRealImage } from '../../utils/getRealImage';

/**
 * SmartImage Component
 * 
 * Automatically resolves and displays a real photograph for any keyword/niche.
 * - 7-day local caching
 * - Blur grey skeleton placeholder while fetching
 * - Edge CDN optimization via weserv.nl
 * - Native lazy loading (with priority support for LCP / Hero images)
 * - Zero dummy photo policy: returns null or fallback text if no real image exists
 */
export default function SmartImage({
  src = null,
  keyword,
  niche = 'general',
  alt = '',
  className = '',
  priority = false,
  fallback = null,
  width = 800,
  imgClassName = '',
}) {
  const [imgUrl, setImgUrl] = useState(src || null);
  const [status, setStatus] = useState(src ? 'loaded' : 'loading');

  useEffect(() => {
    let isMounted = true;

    if (src) {
      setImgUrl(src);
      setStatus('loaded');
      return;
    }

    setStatus('loading');
    if (!keyword) {
      setStatus('empty');
      return;
    }

    getRealImage(keyword, niche, { width })
      .then(url => {
        if (!isMounted) return;
        if (url) {
          setImgUrl(url);
        } else {
          setStatus('empty');
        }
      })
      .catch(() => {
        if (isMounted) setStatus('empty');
      });

    return () => {
      isMounted = false;
    };
  }, [src, keyword, niche, width]);

  // If no image found or image errored out
  if (status === 'empty' || status === 'error') {
    return fallback || null;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur Grey Skeleton Placeholder */}
      {status === 'loading' && (
        <div
          className="absolute inset-0 bg-slate-200/80 animate-pulse backdrop-blur-xs flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-6 h-6 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin opacity-40" />
        </div>
      )}

      {imgUrl && (
        <img
          src={imgUrl}
          alt={alt || keyword}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
