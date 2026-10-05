import React from 'react';
import { ShoppingCart, ExternalLink, Award, CheckCircle, Flame } from 'lucide-react';
import { buildAffiliateUrl, calculateDiscount, formatINR, parseMicroMarkdown } from '../../utils/core';

/**
 * UniversalBlock Engine
 * Reads JSON definitions and dynamically renders 'deal', 'specs', 'banner', or 'table'
 * without writing new JSX files.
 */
export default function UniversalBlock({ block }) {
  if (!block) return null;

  const { type = 'deal', data = {} } = block;

  switch (type) {
    case 'deal': {
      const discount = calculateDiscount(data.originalPrice, data.price);
      const affUrl = buildAffiliateUrl(data.title || data.name, null, data.inStock !== false);

      return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 font-mono">
              {data.badge || 'Verified Deal'}
            </span>
            {discount > 0 && (
              <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                {discount}% OFF
              </span>
            )}
          </div>

          <h4 className="text-base font-bold text-white font-outfit line-clamp-1">{data.title}</h4>
          
          <div className="flex items-baseline gap-2 mt-2 mb-3">
            <span className="text-xl font-black font-mono text-white">{formatINR(data.price)}</span>
            {data.originalPrice && (
              <span className="text-xs line-through text-slate-500 font-mono">{formatINR(data.originalPrice)}</span>
            )}
          </div>

          {data.inStock === false ? (
            <span className="text-xs font-bold text-rose-400 block mb-2">Out of Stock on Amazon — Checking Flipkart...</span>
          ) : null}

          <a
            href={affUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{data.inStock === false ? 'Find on Flipkart' : 'Buy on Amazon India'}</span>
          </a>
        </div>
      );
    }

    case 'specs': {
      return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-xs">
          <div className="text-xs font-bold uppercase text-cyan-400 mb-2 border-b border-slate-800 pb-1">
            {data.title || 'Hardware Spec Matrix'}
          </div>
          <div className="space-y-1.5">
            {Object.entries(data.specs || {}).map(([key, val]) => (
              <div key={key} className="flex justify-between py-1 border-b border-slate-800/40 text-slate-300">
                <span className="text-slate-400">{key}:</span>
                <span className="font-semibold text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'banner': {
      return (
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 my-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4" /> {data.tag || 'Special Announcement'}
          </div>
          <h3 className="text-lg font-bold text-white font-outfit">{data.headline}</h3>
          <p
            className="text-xs text-slate-300 mt-1 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseMicroMarkdown(data.description) }}
          />
        </div>
      );
    }

    default:
      return null;
  }
}
