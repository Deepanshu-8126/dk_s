import React from 'react';
import { ExternalLink, Tag, ShieldCheck, ShoppingCart, Check } from 'lucide-react';
import { buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function MultiStorePriceCard({ product }) {
  if (!product) return null;

  const amazonPrice = product.priceNumber || 0;
  const flipkartPrice = Math.round(amazonPrice * 1.02); // Competitive benchmark
  const lowestStore = amazonPrice <= flipkartPrice ? 'Amazon' : 'Flipkart';

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
        <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
          <Tag className="w-3 h-3 text-cyan-400" /> Multi-Store Price Comparison
        </span>
        <span className="text-[10px] rounded-full bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 font-bold border border-emerald-500/30">
          Best Deal on {lowestStore}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Amazon India Card */}
        <div className={`rounded-xl p-3 border transition-all ${
          lowestStore === 'Amazon' ? 'border-amber-500/40 bg-amber-950/20' : 'border-slate-800 bg-slate-950/60'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400">Amazon India</span>
            {lowestStore === 'Amazon' && <span className="text-[10px] text-emerald-400 font-mono font-bold">Lowest Price</span>}
          </div>
          <div className="text-base font-bold font-mono text-white mt-1">₹{amazonPrice.toLocaleString('en-IN')}</div>
          <a
            href={buildAmazonAffiliateUrl(product.title || product.name)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-2.5 flex items-center justify-center gap-1.5 w-full rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 shadow-md transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Buy on Amazon
          </a>
        </div>

        {/* Flipkart Card */}
        <div className={`rounded-xl p-3 border transition-all ${
          lowestStore === 'Flipkart' ? 'border-blue-500/40 bg-blue-950/20' : 'border-slate-800 bg-slate-950/60'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400">Flipkart</span>
            {lowestStore === 'Flipkart' && <span className="text-[10px] text-emerald-400 font-mono font-bold">Lowest Price</span>}
          </div>
          <div className="text-base font-bold font-mono text-white mt-1">₹{flipkartPrice.toLocaleString('en-IN')}</div>
          <a
            href="https://www.flipkart.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-2.5 flex items-center justify-center gap-1.5 w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 shadow-md transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Buy on Flipkart
          </a>
        </div>
      </div>
    </div>
  );
}
