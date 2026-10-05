import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { AFFILIATE_CONFIG, buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function StickyBuyBar({ activeItem, onOpenVersus }) {
  if (!activeItem) return null;

  const currentTag = AFFILIATE_CONFIG.getAmazonTag();
  const amazonUrl = buildAmazonAffiliateUrl(activeItem.name || activeItem.title, currentTag);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-4 py-3 shadow-lg transition-transform animate-slideUp md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700">
            <Flame size={12} className="text-amber-600 shrink-0" />
            <span>SmartScore: {activeItem.smartScore || activeItem.score || '94'}/100</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 truncate">{activeItem.name || activeItem.title}</h4>
          <p className="text-[11px] font-extrabold text-emerald-700">{activeItem.price || 'Check Live Price'}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenVersus && (
            <button
              onClick={onOpenVersus}
              className="py-2 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-200 transition cursor-pointer"
            >
              VS
            </button>
          )}

          <a
            href={amazonUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-xs transition cursor-pointer"
          >
            <ShoppingBag size={13} />
            <span>Buy</span>
          </a>
        </div>
      </div>
    </div>
  );
}
