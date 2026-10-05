import React from 'react';
import { Flame, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { buildAffiliateUrl } from '../../utils/core';

export default function AdBannerInjector({
  headline = 'Exclusive Flash Drop on Amazon India',
  description = 'Verified highest discount vouchers and instant bank offers applied automatically.',
  link = 'https://amazon.in',
  tag = 'Limited Time Drop'
}) {
  const affUrl = buildAffiliateUrl(link);

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-cyan-950/40 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden my-4">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-[11px] font-bold text-amber-400 mb-2">
            <Flame className="w-3.5 h-3.5" /> {tag}
          </span>
          <h3 className="text-xl font-bold font-outfit text-white">{headline}</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">{description}</p>
        </div>

        <a
          href={affUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 transition-all shrink-0 active:scale-95"
        >
          <span>Claim Verified Deal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
