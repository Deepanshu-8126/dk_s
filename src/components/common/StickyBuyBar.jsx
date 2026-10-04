import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { AFFILIATE_CONFIG, buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function StickyBuyBar({ activeItem, onOpenVersus }) {
  if (!activeItem) return null;

  const currentTag = AFFILIATE_CONFIG.getAmazonTag();
  const amazonUrl = buildAmazonAffiliateUrl(activeItem.name || activeItem.title, currentTag);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/80 px-4 py-3 shadow-2xl transition-transform animate-slideUp md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400">
            <Flame size={12} className="text-amber-400 shrink-0" />
            <span>SmartScore: {activeItem.smartScore || activeItem.score || '94'}/100</span>
          </div>
          <h4 className="text-xs font-bold text-white truncate">{activeItem.name || activeItem.title}</h4>
          <p className="text-[11px] font-extrabold text-emerald-400">{activeItem.price || 'Check Live Price'}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenVersus && (
            <button
              onClick={onOpenVersus}
              className="py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-700 transition cursor-pointer"
            >
              VS
            </button>
          )}

          <a
            href={amazonUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            <ShoppingBag size={13} />
            <span>Buy</span>
          </a>
        </div>
      </div>
    </div>
  );
}
