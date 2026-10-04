import React, { useState, useEffect } from 'react';
import { Search, Zap, X, Bell, Flame, Gamepad2, Coins, Sparkles, Newspaper, Fuel } from 'lucide-react';

const TICKERS = [
  "GOLD ALERT: 24K Gold ₹7,462/gram — Up ₹130 today | MCX India",
  "PETROL/DIESEL: Daily UP rates revised at 6 AM — Aligarh ₹96.48, Lucknow ₹96.57",
  "GTA 6: Rockstar confirms Vice City map size & Leonida physics engine — PC specs guide live",
  "AI TOOLS: Gemini Ultra 2.0 launches with real-time Hindi voice — 154% YoY search surge",
  "GTA V: Steam India special deal live at ₹999 + FiveM Roleplay bonus cash",
  "SARKARI: SSC CGL 2026 Result declared — 17,727 posts | Check scorecard now",
  "MANDI BHAV: Aligarh Gehu ₹2,550/Qtl, Agra Sarson ₹5,850/Qtl — Morning auction live",
  "RAILWAY: RRB NTPC 2026 notification out — 11,558 posts | Apply before 5 Nov",
];

export default function Header({ searchQuery, setSearchQuery, activeTab, setActiveTab }) {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [showTicker, setShowTicker] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKERS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-xs">
      {/* 5. Ticker strip on top: background #FEF2F2, text #DC2626, no dark mode */}
      {showTicker && (
        <div className="flex items-center text-xs bg-[#FEF2F2] border-b border-[#FEE2E2] text-[#DC2626]" style={{ minHeight: '32px' }}>
          <div className="shrink-0 flex items-center gap-1.5 px-3 font-bold uppercase tracking-wider bg-[#FEE2E2] text-[#DC2626]" style={{ height: '32px' }}>
            <span className="live-dot" />
            <span style={{ fontFamily: 'var(--font-display)' }}>LIVE UPDATES</span>
          </div>
          <div className="flex-1 overflow-hidden px-3 font-semibold text-[#DC2626]" style={{ fontFamily: 'var(--font-display)' }}>
            <span key={tickerIdx} className="block truncate" style={{ animation: 'fadeUp 0.35s ease' }}>
              {TICKERS[tickerIdx]}
            </span>
          </div>
          <button
            onClick={() => setShowTicker(false)}
            aria-label="Close live ticker"
            className="shrink-0 px-3 text-[#DC2626]/70 hover:text-[#DC2626] transition-colors"
            style={{ height: '32px' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4 flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', fontFamily: 'var(--font-display)' }}
          >
            UD
          </div>
          <div>
            <div className="font-black text-lg leading-none text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
              Unique<span className="text-[#B45309]">Digit</span>
            </div>
            <div className="text-[10px] font-semibold text-[#6B7280] hidden sm:block">
              Daily Intelligence & Utilities
            </div>
          </div>
        </div>

        {/* Niche Tab Pills */}
        <nav className="flex items-center gap-1.5 scroll-x flex-1 min-w-0">
          {[
            { id: 'all', label: 'All Hits', icon: Flame, activeClass: 'active-all' },
            { id: 'gold', label: 'Gold Rate', icon: Coins, activeClass: 'active-gold' },
            { id: 'hyperlocal', label: 'Fuel & Mandi', icon: Fuel, activeClass: 'active-gold' },
            { id: 'gaming', label: 'Gaming & GTA', icon: Gamepad2, activeClass: 'active-cyan' },
            { id: 'ai', label: 'AI Tools', icon: Sparkles, activeClass: 'active-indigo' },
            { id: 'sarkari', label: 'Sarkari Result', icon: Newspaper, activeClass: 'active-red' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-pill flex items-center gap-1.5 ${isActive ? tab.activeClass : ''}`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Search Input */}
        <div className="relative shrink-0 w-full sm:w-60">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search gold, GTA, SSC, AI..."
            className="w-full pl-9 pr-8 py-2 text-sm rounded-xl outline-none transition-all bg-[#F9FAFB] text-[#111827] placeholder:text-[#9CA3AF]"
            style={{
              border: `1px solid ${searchFocused ? '#B45309' : '#E5E7EB'}`,
              boxShadow: searchFocused ? '0 0 0 3px rgba(180, 83, 9, 0.1)' : 'none',
              fontFamily: 'var(--font-body)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4B5563]"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Alert Bell */}
        <button
          aria-label="Alerts"
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-all"
        >
          <Bell size={15} />
        </button>
      </div>
    </header>
  );
}
