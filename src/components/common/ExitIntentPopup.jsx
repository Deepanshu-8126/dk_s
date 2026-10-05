import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import productsCatalog from '../../data/productsCatalog.json';
import { buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const topDeal = productsCatalog.products?.[0]; // iPhone 16 Pro or top pick

  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem('ud_exit_shown');
      if (alreadyShown) return;

      const handleMouseLeave = (e) => {
        if (e.clientY <= 10 && !sessionStorage.getItem('ud_exit_shown')) {
          sessionStorage.setItem('ud_exit_shown', 'true');
          setIsVisible(true);
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    } catch {}
  }, []);

  if (!isVisible || !topDeal) return null;

  const buyUrl = buildAmazonAffiliateUrl(topDeal.title);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-7 border border-amber-500/30 shadow-2xl shadow-amber-500/10 text-center">
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={13} className="text-amber-400" />
          <span>Wait! Exclusive Tech Deal Before You Go</span>
        </div>

        <h3 className="text-xl font-black text-white font-display mb-1">
          {topDeal.title}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Verified Amazon India price drop with free express delivery.
        </p>

        {topDeal.imageUrl && (
          <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-slate-950 border border-slate-800 flex items-center justify-center">
            <img src={topDeal.imageUrl} alt={topDeal.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-baseline justify-center gap-2 mb-5">
          <span className="text-2xl font-black text-emerald-400 font-mono">
            ₹{topDeal.price?.toLocaleString('en-IN')}
          </span>
          {topDeal.originalPrice && (
            <span className="text-xs line-through text-slate-500 font-mono">
              ₹{topDeal.originalPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <a
            href={buyUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            onClick={() => setIsVisible(false)}
            className="w-full py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={15} />
            <span>Claim Verified Deal on Amazon →</span>
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="w-full py-2 text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer"
          >
            No thanks, I will check later
          </button>
        </div>

        <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-emerald-400" /> Official Amazon verified deal
        </div>

      </div>
    </div>
  );
}
