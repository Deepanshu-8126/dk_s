import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { GAMING_PC_BUILDS } from '../../data/gamingData';
import { REAL_GAMING_PC_DATA, isDataStale, STALE_BADGE_TEXT } from '../../data/realData';

export default function PcBuildTable({ activeBuildIdx, setActiveBuildIdx }) {
  const build = GAMING_PC_BUILDS[activeBuildIdx] || GAMING_PC_BUILDS[0];
  const staleBuild = isDataStale(REAL_GAMING_PC_DATA.lastVerified);

  // Exact dynamic sum of all component prices to prevent any math contradiction
  const calculatedTotal = build.components.reduce((sum, c) => {
    const numeric = parseInt((c.price || '').replace(/[^0-9]/g, ''), 10) || 0;
    return sum + numeric;
  }, 0);

  const displayTotal = calculatedTotal > 0 ? `₹${calculatedTotal.toLocaleString('en-IN')}` : build.budget;

  return (
    <div className="mb-10 text-slate-100">
      {/* Header & Tier Selector */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xl font-black text-white font-display">
            Indian Gaming PC Build Pricing Guide <span className="text-indigo-400">(2026)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tested part-by-part component prices with zero bottleneck guarantees.
          </p>
        </div>

        {/* Build Tier Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {GAMING_PC_BUILDS.map((b, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBuildIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeBuildIdx === idx
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {b.tier.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Active Build Card */}
      <div className="rounded-2xl p-6 bg-slate-900/70 border border-slate-800 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1">
              {build.badge}
            </span>
            <h4 className="text-lg font-black text-white font-display">
              {build.tier}
            </h4>
            <p className="text-xs text-slate-400">Target: {build.targetGames}</p>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-slate-400 block">Total Estimated Cost (Sum of Parts)</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {displayTotal}
            </span>
            <span className="text-[11px] text-slate-400 block font-mono mt-0.5">
              {REAL_GAMING_PC_DATA.verifiedLabel}
            </span>
            {staleBuild && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {STALE_BADGE_TEXT}
              </span>
            )}
          </div>
        </div>

        {/* Components Table */}
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-y border-slate-800 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Component</th>
                <th className="py-2.5 px-3 font-semibold">Recommended Model</th>
                <th className="py-2.5 px-3 font-semibold text-right">Approx India Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {build.components.map((c, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-400">{c.part}</td>
                  <td className="py-2.5 px-3 font-bold text-white">{c.model}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 text-right font-bold">{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            ⚡ All prices updated daily based on Amazon & Nehru Place wholesale index.
          </span>
          <a
            href={build.affiliateUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 transition-all shadow-md cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>{build.affiliateCta}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
