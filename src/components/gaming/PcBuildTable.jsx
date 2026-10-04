import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { GAMING_PC_BUILDS } from '../../data/gamingData';
import { REAL_GAMING_PC_DATA, isDataStale, STALE_BADGE_TEXT } from '../../data/realData';

export default function PcBuildTable({ activeBuildIdx, setActiveBuildIdx }) {
  const build = GAMING_PC_BUILDS[activeBuildIdx] || GAMING_PC_BUILDS[0];
  const staleBuild = isDataStale(REAL_GAMING_PC_DATA.lastVerified);

  return (
    <div className="mb-10">
      {/* Header & Tier Selector */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xl font-black text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
            Indian Gaming PC Build Pricing Guide <span className="text-cyan-600">(2026)</span>
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Tested part-by-part component prices with zero bottleneck guarantees.
          </p>
        </div>

        {/* Build Tier Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {GAMING_PC_BUILDS.map((b, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBuildIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeBuildIdx === idx
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB] hover:border-slate-300'
              }`}
            >
              {b.tier.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Active Build Card */}
      <div className="rounded-2xl p-6 bg-white border border-[#E5E7EB] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-1">
              {build.badge}
            </span>
            <h4 className="text-lg font-black text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
              {build.tier}
            </h4>
            <p className="text-xs text-[#6B7280]">Target: {build.targetGames}</p>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-[#6B7280] block">Total Estimated Cost</span>
            <span className="text-2xl font-black text-emerald-600 font-mono">
              {build.budget}
            </span>
            <span className="text-[11px] text-[#9CA3AF] block font-mono mt-0.5">
              {REAL_GAMING_PC_DATA.verifiedLabel}
            </span>
            {staleBuild && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                {STALE_BADGE_TEXT}
              </span>
            )}
          </div>
        </div>

        {/* Components Table */}
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-[#E5E7EB] text-[#4B5563]">
                <th className="py-2.5 px-3 font-semibold">Component</th>
                <th className="py-2.5 px-3 font-semibold">Recommended Model</th>
                <th className="py-2.5 px-3 font-semibold text-right">Approx India Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {build.components.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-[#4B5563]">{c.part}</td>
                  <td className="py-2.5 px-3 font-bold text-[#111827]">{c.model}</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-700 text-right font-bold">{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-[#6B7280]">
            ⚡ All prices updated daily based on Amazon & Nehru Place wholesale index.
          </span>
          <a
            href={build.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-all shadow-xs"
          >
            <ShoppingBag size={14} />
            <span>{build.affiliateCta}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
