import React from 'react';
import { ShoppingCart, ExternalLink, Award, CheckCircle, Flame, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { buildAffiliateUrl, calculateDiscount, formatINR } from '../../utils/core';
import { useTranslation } from '../../context/LanguageContext';

const ACCENT_STYLES = {
  cyan: {
    border: 'border-slate-200 hover:border-indigo-400',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    button: 'from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-indigo-500/20',
    glow: 'hover:shadow-md'
  },
  emerald: {
    border: 'border-slate-200 hover:border-emerald-400',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    button: 'from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-emerald-500/20',
    glow: 'hover:shadow-md'
  },
  purple: {
    border: 'border-slate-200 hover:border-indigo-400',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    button: 'from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-indigo-500/20',
    glow: 'hover:shadow-md'
  },
  rose: {
    border: 'border-slate-200 hover:border-rose-400',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
    button: 'from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-rose-500/20',
    glow: 'hover:shadow-md'
  },
  amber: {
    border: 'border-slate-200 hover:border-amber-400',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    button: 'from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-500/20',
    glow: 'hover:shadow-md'
  }
};

export default function UniversalCard({ item, accent = 'cyan', onSelect = null }) {
  const { t } = useTranslation();
  if (!item) return null;

  const style = ACCENT_STYLES[accent] || ACCENT_STYLES.cyan;
  const discount = calculateDiscount(item.originalPrice, item.price);
  const inStock = item.inStock !== false;
  const affUrl = buildAffiliateUrl(item.title || item.name, null, inStock);

  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className={`group flex flex-col justify-between rounded-3xl bg-white p-5 border ${style.border} shadow-xs transition-all duration-300 hover:-translate-y-1 ${style.glow} cursor-pointer`}
    >
      <div>
        {/* Aspect-Locked Media Box */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-white border border-slate-200 flex items-center justify-center p-2.5">
          <img
            src={item.imageUrl || 'https://m.media-amazon.com/images/I/71ZDY57y6QL._SX679_.jpg'}
            alt={item.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badge */}
          <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border shadow-2xs backdrop-blur-md ${style.badgeBg}`}>
            {item.category || 'Featured'}
          </span>

          {discount > 0 && (
            <span className="absolute top-3 right-3 rounded-lg bg-amber-500 text-white px-2 py-0.5 text-[10px] font-mono font-bold shadow-2xs">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 font-outfit line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
          {item.summary || item.description}
        </p>

        {/* Dynamic Spec List */}
        {item.specs && (
          <div className="mt-3.5 space-y-1 rounded-xl bg-slate-50 p-2.5 border border-slate-200 text-[11px] font-mono">
            {Object.entries(item.specs).slice(0, 3).map(([k, v]) => (
              <div key={k} className="flex justify-between text-slate-700">
                <span className="text-slate-500">{k}:</span>
                <span className="font-semibold text-slate-900">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing & CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {item.price ? 'Verified Rate' : 'Classification'}
            </span>
            <span className="text-lg font-black font-mono text-slate-900 tracking-tight">
              {item.price ? formatINR(item.price) : (item.badge || 'Verified Fact')}
            </span>
          </div>
          {item.originalPrice && item.price && item.originalPrice > item.price && (
            <span className="text-xs line-through font-mono text-slate-400">
              {formatINR(item.originalPrice)}
            </span>
          )}
        </div>

        <a
          href={item.sourceUrl || affUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center justify-center gap-1.5 w-full rounded-xl bg-gradient-to-r ${style.button} py-2.5 text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer`}
        >
          {item.price ? <ShoppingCart className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
          <span>
            {item.price 
              ? (inStock ? t('viewOnAmazon') : 'Find on Flipkart') 
              : 'View Intelligence Source'}
          </span>
        </a>
      </div>
    </div>
  );
}
