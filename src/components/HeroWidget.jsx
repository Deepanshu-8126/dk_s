import React from 'react';
import { TrendingUp, Sparkles, ArrowRight, Gamepad2, Coins, Newspaper, Flame } from 'lucide-react';
import { REAL_GOLD_DATA, REAL_GTA_DATA } from '../data/realData';

export default function HeroWidget({ setActiveTab }) {
  const gold24k = REAL_GOLD_DATA.national.find(g => g.karat.includes('24 Carat')) || REAL_GOLD_DATA.national[0];
  const gold22k = REAL_GOLD_DATA.national.find(g => g.karat.includes('22 Carat')) || REAL_GOLD_DATA.national[1];

  return (
    <section className="mb-10 pt-2">
      {/* 4 Spotlight Cards - Clean White UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gold Rate Today */}
        <div
          onClick={() => setActiveTab('gold')}
          className="cursor-pointer group rounded-2xl p-5 bg-white border border-[#E5E7EB] hover:border-[#F59E0B] shadow-xs hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
              <Coins size={12} className="text-[#B45309]" />
              Live MCX
            </span>
            <span className="text-[11px] text-[#6B7280] font-medium">9:30 AM IST</span>
          </div>

          <div className="mb-4">
            <div className="text-xs text-[#6B7280] font-semibold">Gold 24K (10g)</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#B45309] font-mono">
                ₹{gold24k.per10g.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-[#059669] flex items-center">
                <TrendingUp size={13} className="inline mr-0.5" /> +{gold24k.changePercent}%
              </span>
            </div>
            <div className="text-xs text-[#4B5563] mt-1 font-medium">
              22K Rate: <strong className="text-[#111827]">₹{gold22k.perGram.toLocaleString('en-IN')}/g</strong>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#B45309] font-bold group-hover:text-[#92400E] pt-2 border-t border-[#F3F4F6]">
            <span>City Rates & Charts</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Gaming & GTA Craze */}
        <div
          onClick={() => setActiveTab('gaming')}
          className="cursor-pointer group rounded-2xl p-5 bg-white border border-[#E5E7EB] hover:border-[#0891B2] shadow-xs hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ECFEFF] text-[#0891B2] border border-[#CFFAFE]">
              <Gamepad2 size={12} className="text-[#0891B2]" />
              GTA 6 Craze
            </span>
            <span className="text-xs text-[#0891B2] font-bold">PC Specs</span>
          </div>

          <div className="mb-4">
            <div className="text-xs text-[#6B7280] font-semibold">Grand Theft Auto VI</div>
            <div className="text-lg font-black text-[#111827] mt-1 group-hover:text-[#0891B2] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
              Vice City 4K RT
            </div>
            <p className="text-xs text-[#4B5563] mt-1.5 line-clamp-2">
              Leaked hardware benchmark specs & Indian budget builds from {REAL_GTA_DATA.gta6.specs.minimum.estimatedPcCost} to 4K Ultra.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-[#0891B2] font-bold group-hover:text-[#0E7490] pt-2 border-t border-[#F3F4F6]">
            <span>GTA 6 Calculator & Deals</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: AI Tools Spotlight */}
        <div
          onClick={() => setActiveTab('ai')}
          className="cursor-pointer group rounded-2xl p-5 bg-white border border-[#E5E7EB] hover:border-[#4F46E5] shadow-xs hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]">
              <Sparkles size={12} className="text-[#4F46E5]" />
              +154% YoY
            </span>
            <span className="text-xs text-[#059669] font-bold bg-[#ECFDF5] px-2 py-0.5 rounded">High CPC</span>
          </div>

          <div className="mb-4">
            <div className="text-xs text-[#6B7280] font-semibold">Featured AI Tool</div>
            <div className="text-lg font-black text-[#111827] mt-1 group-hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
              Gemini Ultra 2.0
            </div>
            <p className="text-xs text-[#4B5563] mt-1.5 line-clamp-2">
              State-of-the-art Hindi voice & coding capabilities with live web citations.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-[#4F46E5] font-bold group-hover:text-[#3730A3] pt-2 border-t border-[#F3F4F6]">
            <span>Browse 12+ AI Tools</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Sarkari Result & Admit Alerts */}
        <div
          onClick={() => setActiveTab('sarkari')}
          className="cursor-pointer group rounded-2xl p-5 bg-white border border-[#E5E7EB] hover:border-[#DC2626] shadow-xs hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2]">
              <Newspaper size={12} className="text-[#DC2626]" />
              Sarkari Alert
            </span>
            <span className="text-xs text-[#DC2626] font-bold">17,727 Posts</span>
          </div>

          <div className="mb-4">
            <div className="text-xs text-[#6B7280] font-semibold">Exam Result Update</div>
            <div className="text-lg font-black text-[#111827] mt-1 group-hover:text-[#DC2626] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
              SSC CGL 2026 Tier-1
            </div>
            <p className="text-xs text-[#4B5563] mt-1.5 line-clamp-2">
              Scorecards & cut-off merit list released on official portal. Direct PDF links ready.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-[#DC2626] font-bold group-hover:text-[#991B1B] pt-2 border-t border-[#F3F4F6]">
            <span>Check Results & Cards</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
