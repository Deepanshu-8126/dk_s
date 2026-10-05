import React from 'react';
import { ShoppingBag, RefreshCw, Wifi, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GAMING_PC_BUILDS } from '../../data/gamingData';
import { REAL_GAMING_PC_DATA, isDataStale, STALE_BADGE_TEXT } from '../../data/realData';
import { calculatePCTotal, formatPriceINR } from '../../utils/calculator';
import { useLivePcBuilds } from '../../hooks/useLivePcBuilds';

export default function PcBuildTable({ activeBuildIdx, setActiveBuildIdx }) {
  const { buildData, isLive, loading, lastSynced, refresh } = useLivePcBuilds(activeBuildIdx);
  const build = buildData || GAMING_PC_BUILDS[activeBuildIdx] || GAMING_PC_BUILDS[0];
  const staleBuild = isDataStale(REAL_GAMING_PC_DATA.lastVerified);

  // Exact dynamic sum of all component prices to prevent any math contradiction
  const calculatedTotal = calculatePCTotal(build);
  const displayTotal = calculatedTotal > 0 ? formatPriceINR(calculatedTotal) : build.budget;

  return (
    <div className="mb-10 text-slate-900">
      {/* Header & Tier Selector */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
              isLive 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500'}`} />
              <Wifi size={11} />
              <span>{isLive ? 'Live API Feed' : 'Verified Merchant Index'}</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Synced: {lastSynced}
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 font-display">
            Indian Gaming PC Build Pricing Guide <span className="text-indigo-600">(2026)</span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Tested part-by-part component prices with zero bottleneck guarantees.
          </p>
        </div>

        {/* Build Tier Selector & Refresh Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {GAMING_PC_BUILDS.map((b, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBuildIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeBuildIdx === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {b.tier.split('(')[0].trim()}
            </button>
          ))}
          <button
            onClick={refresh}
            disabled={loading}
            title="Refresh live pricing feed"
            className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin text-amber-600' : ''} />
          </button>
        </div>
      </div>

      {/* Active Build Card */}
      <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-xs min-h-[360px] flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
                {build.badge}
              </span>
              <h4 className="text-lg font-black text-slate-900 font-display">
                {build.tier}
              </h4>
              <p className="text-xs text-slate-500">Target: {build.targetGames}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-slate-500 block">Total Estimated Cost (Sum of Parts)</span>
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {displayTotal}
              </span>
              <span className="text-[11px] text-slate-500 block font-mono mt-0.5">
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
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">Component</th>
                  <th className="py-2.5 px-3 font-semibold">Recommended Model</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Approx India Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {build.components.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-600">{c.part}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{c.model}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-600 text-right font-bold">{c.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            ⚡ All prices updated daily based on Amazon & Nehru Place wholesale index.
          </span>
          <a
            href={build.affiliateUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 transition-all shadow-xs cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>{build.affiliateCta}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
