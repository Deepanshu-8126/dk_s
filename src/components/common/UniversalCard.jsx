import React from 'react';
import { ShoppingCart, ExternalLink, Award, CheckCircle, Flame, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { buildAffiliateUrl, calculateDiscount, formatINR } from '../../utils/core';
import { useTranslation } from '../../context/LanguageContext';

const ACCENT_STYLES = {
  cyan: {
    border: 'border-[#23232C] hover:border-amber-500/50',
    badgeBg: 'bg-white/5 text-slate-200 border-white/10',
    button: 'from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-amber-500/20 text-slate-950',
    glow: 'group-hover:shadow-black/60'
  },
  emerald: {
    border: 'border-[#23232C] hover:border-emerald-500/50',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    button: 'from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-emerald-500/20 text-slate-950',
    glow: 'group-hover:shadow-black/60'
  },
  purple: {
    border: 'border-[#23232C] hover:border-indigo-500/50',
    badgeBg: 'bg-white/5 text-slate-200 border-white/10',
    button: 'from-indigo-400 to-indigo-500 hover:from-indigo-300 hover:to-indigo-400 shadow-indigo-500/20 text-slate-950',
    glow: 'group-hover:shadow-black/60'
  },
  rose: {
    border: 'border-[#23232C] hover:border-rose-500/50',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    button: 'from-rose-400 to-rose-500 hover:from-rose-300 hover:to-rose-400 shadow-rose-500/20 text-slate-950',
    glow: 'group-hover:shadow-black/60'
  },
  amber: {
    border: 'border-[#23232C] hover:border-amber-500/50',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    button: 'from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-amber-500/20 text-slate-950',
    glow: 'group-hover:shadow-black/60'
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
      className={`group flex flex-col justify-between rounded-3xl bg-[#141419] p-5 border ${style.border} shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 ${style.glow} cursor-pointer`}
    >
      <div>
        {/* Aspect-Locked Media Box */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-slate-950 border border-slate-800">
          <img
            src={item.imageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'}
            alt={item.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Badge */}
          <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${style.badgeBg}`}>
            {item.category || 'Featured'}
          </span>

          {discount > 0 && (
            <span className="absolute top-3 right-3 rounded-lg bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-mono font-bold shadow-md">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white font-outfit line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {item.summary || item.description}
        </p>

        {/* Dynamic Spec List */}
        {item.specs && (
          <div className="mt-3.5 space-y-1 rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80 text-[11px] font-mono">
            {Object.entries(item.specs).slice(0, 3).map(([k, v]) => (
              <div key={k} className="flex justify-between text-slate-300">
                <span className="text-slate-500">{k}:</span>
                <span className="font-semibold text-slate-200">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing & CTA */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Verified Rate</span>
            <span className="text-lg font-black font-mono text-white tracking-tight">
              {formatINR(item.price)}
            </span>
          </div>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-xs line-through font-mono text-slate-500">
              {formatINR(item.originalPrice)}
            </span>
          )}
        </div>

        <a
          href={affUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center justify-center gap-1.5 w-full rounded-xl bg-gradient-to-r ${style.button} py-2.5 text-xs font-bold shadow-md transition-all active:scale-95`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{inStock ? t('viewOnAmazon') : 'Find on Flipkart'}</span>
        </a>
      </div>
    </div>
  );
}
