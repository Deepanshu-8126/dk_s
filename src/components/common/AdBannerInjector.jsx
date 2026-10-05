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
    <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50/80 via-white to-indigo-50/60 p-6 shadow-xs relative overflow-hidden my-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/90 border border-amber-200 px-3 py-1 text-[11px] font-bold text-amber-900 mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-600" /> {tag}
          </span>
          <h3 className="text-xl font-bold font-outfit text-slate-900">{headline}</h3>
          <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">{description}</p>
        </div>

        <a
          href={affUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-3 text-xs font-bold text-white shadow-xs transition-all shrink-0 active:scale-95 cursor-pointer"
        >
          <span>Claim Verified Deal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
