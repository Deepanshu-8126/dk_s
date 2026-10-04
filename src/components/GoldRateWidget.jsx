import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ExternalLink, BarChart2, AlertTriangle, Coins, Activity, ShieldCheck, RefreshCw } from 'lucide-react';
import { REAL_GOLD_DATA, fetchLiveGoldRate, isDataStale, STALE_BADGE_TEXT } from '../data/realData';

function SparkLine({ data }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 120, h = 36;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polyline
        points={pts}
        fill="none"
        stroke="#059669"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={w} cy={h - ((data[data.length-1]-min)/range)*(h - 8) - 4} r="3.5" fill="#059669" />
    </svg>
  );
}

export default function GoldRateWidget() {
  const [goldData, setGoldData] = useState(REAL_GOLD_DATA);
  const [isLive, setIsLive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchLiveGoldRate();
      if (res) {
        setGoldData(res);
        setIsLive(Boolean(res.isLive));
      }
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stale = isDataStale(goldData.lastUpdated);

  return (
    <section className="fade-up mb-8">
      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Coins className="text-amber-600" size={17} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Gold Rate Today
          </h2>
          <span className="badge-gold text-xs font-bold px-2.5 py-0.5 rounded-full">
            {goldData.displayUpdated.split(',')[0]}
          </span>
          {isLive && (
            <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              SPOT API LIVE
            </span>
          )}
          {stale && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
              <AlertTriangle size={11} />
              {STALE_BADGE_TEXT}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            disabled={isRefreshing}
            title="Fetch latest verified bullion prices"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin text-indigo-600" : "text-slate-500"} />
            <span>{isRefreshing ? "Syncing..." : "Live Sync"}</span>
          </button>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Updated: {goldData.displayUpdated}
          </span>
        </div>
      </div>

      {/* 3 Main Gold Rate Cards (Clean Modern Elevation, Bold Slate Prices) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-5">
        {goldData.national.map((rate, i) => (
          <div key={i} className="global-card relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {rate.karat}
                </div>
                <div className="price-num text-3xl font-black text-slate-900 font-mono tracking-tight">
                  ₹{rate.perGram.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">per 1 gram</div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-sm font-bold text-emerald-600 font-mono">
                  <TrendingUp size={14} />
                  <span>+₹{rate.change}</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 font-mono">
                  +{rate.changePercent}%
                </div>
              </div>
            </div>

            {/* 10g Calculation */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">10 Grams Total</span>
              <span className="font-bold text-sm text-slate-900 font-mono">
                ₹{rate.per10g.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Verification label */}
            <div className="mt-2 text-[10px] text-slate-400 font-mono">
              Last updated: {goldData.displayUpdated}
            </div>
          </div>
        ))}
      </div>

      {/* Trend + Nifty/Sensex Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* Weekly Trend */}
        <div className="global-card p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
              <TrendingUp size={14} className="text-[#059669]" />
              <span>7-Day Gold Trend (24K)</span>
            </div>
            <div className="py-2">
              <SparkLine data={goldData.sparkline} />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-[11px] font-mono text-[#6B7280] pt-2 border-t border-[#F3F4F6]">
            <span>Start: ₹{goldData.sparkline[0].toLocaleString('en-IN')}</span>
            <span className="text-[#059669] font-bold">Now: ₹{goldData.sparkline[goldData.sparkline.length-1].toLocaleString('en-IN')} ↑</span>
          </div>
        </div>

        {/* Nifty 50 */}
        <div className="global-card p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#334155] uppercase tracking-wide flex items-center gap-1.5">
              <Activity size={14} className="text-[#0284C7]" />
              Nifty 50
            </span>
            <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">LIVE</span>
          </div>
          <div className="text-2xl font-black text-[#111827] font-mono">
            {goldData.nifty.value}
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-[#059669] font-mono mt-1">
            <TrendingUp size={13} />
            <span>{goldData.nifty.change} ({goldData.nifty.changePercent})</span>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-[#F3F4F6] text-[11px] text-[#6B7280] font-mono">
            <span>High: {goldData.nifty.high}</span>
            <span>Low: {goldData.nifty.low}</span>
          </div>
        </div>

        {/* Sensex */}
        <div className="global-card p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#334155] uppercase tracking-wide flex items-center gap-1.5">
              <Activity size={14} className="text-[#D97706]" />
              Sensex BSE
            </span>
            <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">LIVE</span>
          </div>
          <div className="text-2xl font-black text-[#111827] font-mono">
            {goldData.sensex.value}
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-[#059669] font-mono mt-1">
            <TrendingUp size={13} />
            <span>{goldData.sensex.change} ({goldData.sensex.changePercent})</span>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-[#F3F4F6] text-[11px] text-[#6B7280] font-mono">
            <span>Open: {goldData.sensex.value}</span>
            <span className="text-[#059669] font-semibold">Market: Bullish</span>
          </div>
        </div>
      </div>

      {/* City-wise Rates Table (Clean White UI Table) */}
      <div className="global-card overflow-hidden mb-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs">
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#E5E7EB] bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-[#B45309]" />
            <span className="font-bold text-sm text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
              City-Wise Gold Price Table (India)
            </span>
          </div>
          <span className="text-xs text-[#6B7280] font-mono">
            Last updated: {goldData.displayUpdated}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F1F5F9] border-b border-[#E5E7EB]">
                {['City', '22 Carat (/gram)', '24 Carat (/gram)', 'Today Change'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#475569]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {goldData.cities.map((row, i) => (
                <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#111827]">
                    {row.city}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-[#B45309] font-mono text-base">
                    ₹{row.rate22k.toLocaleString('en-IN')}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-[#111827] font-mono text-base">
                    ₹{row.rate24k.toLocaleString('en-IN')}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-[#059669] font-mono">
                    +₹{row.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monetization / Affiliate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goldData.affiliates.map((aff, i) => (
          <div key={i} className="global-card p-5 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#F59E0B] shadow-xs flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
                  {aff.name}
                </span>
                <span className="badge-gold text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {aff.badge}
                </span>
              </div>
              <p className="text-xs text-[#4B5563] mb-4 leading-relaxed">
                {aff.desc}
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
              <span className="text-xs text-[#6B7280] font-mono">
                {aff.cpc}
              </span>
              <a
                href={aff.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs px-3.5 py-2 inline-flex items-center gap-1.5 font-bold rounded-xl shadow-xs"
              >
                <span>{aff.cta}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
