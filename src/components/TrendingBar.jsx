import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';

const TRENDS = [
  { label: 'iPhone 16 Pro Deals', tag: 'Verified Deal', tab: 'products' },
  { label: 'GTA 6 PC Specs', tag: 'Craze', tab: 'gaming' },
  { label: 'RTX 4070 Super Rig', tag: 'Hardware', tab: 'products' },
  { label: 'Gold Rate Today', tag: 'Live MCX', tab: 'gold' },
  { label: 'GTA V Steam Deal', tag: '₹999', tab: 'gaming' },
  { label: 'Google Gemini 2.0', tag: '+154%', tab: 'ai' },
  { label: 'SSC CGL Result 2026', tag: 'Live', tab: 'sarkari' },
  { label: 'MacBook Air M3', tag: 'Best Laptop', tab: 'products' },
  { label: 'Gaming PC ₹55k Build', tag: 'Hot', tab: 'gaming' },
  { label: 'Railway NTPC 11,558 Posts', tag: 'New', tab: 'sarkari' },
  { label: 'Sony XM5 Headphones', tag: '23% OFF', tab: 'products' },
  { label: 'Nifty 50 Record High', tag: 'Finance', tab: 'gold' },
];

export default function TrendingBar({ setActiveTab, setSearchQuery }) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 sm:px-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs mb-8 overflow-hidden">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 shrink-0 uppercase tracking-wide">
        <span className="p-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
          <Flame size={13} className="fill-amber-500 text-amber-500" />
        </span>
        <span className="hidden sm:inline font-bold text-slate-800">Daily Viral:</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        {TRENDS.map((t, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(t.tab);
              if (t.tab === 'products') {
                setSearchQuery(t.label.split(' ')[0]);
              } else {
                setSearchQuery('');
              }
            }}
            className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-xl text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200/80 transition-all cursor-pointer"
          >
            <span className="font-medium">{t.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-white border border-slate-200 text-slate-500">
              {t.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
