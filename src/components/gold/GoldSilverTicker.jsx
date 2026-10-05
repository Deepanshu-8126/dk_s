import React from 'react';
import { Coins, TrendingUp, Sparkles, MapPin } from 'lucide-react';
import { REAL_GOLD_DATA } from '../../data/realData';

export default function GoldSilverTicker() {
  const gold24 = REAL_GOLD_DATA.national[0];
  const gold22 = REAL_GOLD_DATA.national[1];
  const cities = REAL_GOLD_DATA.cities || [];

  return (
    <div className="w-full bg-white border-y border-slate-200 overflow-hidden py-2 px-4 text-[11px] font-mono text-slate-700 shadow-2xs">
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
        <div className="inline-flex items-center gap-1.5 font-bold text-amber-700 shrink-0 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <Coins size={13} className="text-amber-600 animate-pulse" />
          <span>BULLION TICKER:</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-slate-500">24K (Pure):</span>
          <span className="text-slate-900 font-bold">₹{gold24?.perGram?.toLocaleString('en-IN')}/g</span>
          <span className="text-emerald-600 text-[10px] font-bold">+{gold24?.change}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-slate-500">22K (Jewellery):</span>
          <span className="text-slate-900 font-bold">₹{gold22?.perGram?.toLocaleString('en-IN')}/g</span>
          <span className="text-emerald-600 text-[10px] font-bold">+{gold22?.change}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-slate-500">Silver 999:</span>
          <span className="text-slate-900 font-bold">₹92.50/g</span>
          <span className="text-emerald-600 text-[10px] font-bold">+₹1.20</span>
        </div>

        {cities.map((c, i) => (
          <div key={i} className="flex items-center gap-1.5 shrink-0 text-slate-600">
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-medium">{c.city}:</span>
            <span className="text-amber-700 font-bold">₹{c.rate24k?.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
