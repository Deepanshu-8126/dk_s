import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';

const TRENDS = [
  { label: 'GTA 6 PC Specs', tag: 'Craze', tab: 'gaming' },
  { label: 'Gold Rate Today', tag: '101M/mo', tab: 'gold' },
  { label: 'GTA V Steam Deal', tag: '₹999', tab: 'gaming' },
  { label: 'Google Gemini 2.0', tag: '+154%', tab: 'ai' },
  { label: 'SSC CGL Result 2026', tag: 'Live', tab: 'sarkari' },
  { label: 'Gaming PC ₹55k Build', tag: 'Hot', tab: 'gaming' },
  { label: 'Railway NTPC 11,558 Posts', tag: 'New', tab: 'sarkari' },
  { label: 'Nifty 50 Record High', tag: 'Finance', tab: 'gold' },
  { label: 'Valorant India Servers', tag: 'Esports', tab: 'gaming' },
  { label: 'ChatGPT Search', tag: 'AI', tab: 'ai' },
  { label: 'EPFO Balance & Passbook', tag: 'Trending', tab: 'sarkari' },
];

export default function TrendingBar({ setActiveTab, setSearchQuery }) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs mb-8 overflow-hidden">
      <div className="flex items-center gap-1.5 text-xs font-bold text-[#B45309] shrink-0 uppercase tracking-wide">
        <Flame size={15} className="text-[#D97706] fill-[#D97706]" />
        <span className="hidden sm:inline font-bold">Daily Viral Hits:</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {TRENDS.map((t, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(t.tab);
              setSearchQuery(t.label.split(' ')[0]);
            }}
            className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-xl text-xs bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] hover:text-[#0F172A] border border-[#E2E8F0] transition-colors"
          >
            <span className="font-medium">{t.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-[#E2E8F0] text-[#475569]">
              {t.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
