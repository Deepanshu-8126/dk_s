import React, { useState, useEffect } from 'react';
import { Search, X, Bell, Flame, Gamepad2, Coins, Sparkles, Newspaper, Fuel, Menu, PenTool } from 'lucide-react';
import MobileDrawer from './common/MobileDrawer';

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

const DESKTOP_TABS = [
  { id: 'all', label: 'All Hits', icon: Flame, activeClass: 'active-all' },
  { id: 'gold', label: 'Gold Rate', icon: Coins, activeClass: 'active-gold' },
  { id: 'hyperlocal', label: 'Fuel & Mandi', icon: Fuel, activeClass: 'active-gold' },
  { id: 'gaming', label: 'Gaming & GTA', icon: Gamepad2, activeClass: 'active-cyan' },
  { id: 'ai', label: 'AI Tools', icon: Sparkles, activeClass: 'active-indigo' },
  { id: 'sarkari', label: 'Sarkari Result', icon: Newspaper, activeClass: 'active-red' },
  { id: 'studio', label: 'Editorial Studio', icon: PenTool, activeClass: 'bg-purple-600 text-white shadow-xs' },
];

export default function Header({ searchQuery, setSearchQuery, activeTab, setActiveTab }) {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [showTicker, setShowTicker] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKERS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-xs">
      {/* Ticker strip on top */}
      {showTicker && (
        <div className="flex items-center text-xs bg-[#FEF2F2] border-b border-[#FEE2E2] text-[#DC2626] h-8">
          <div className="shrink-0 flex items-center gap-1.5 px-3 font-bold uppercase tracking-wider bg-[#FEE2E2] text-[#DC2626] h-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
            <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-display)' }}>LIVE UPDATES</span>
            <span className="sm:hidden" style={{ fontFamily: 'var(--font-display)' }}>LIVE</span>
          </div>
          <div className="flex-1 overflow-hidden px-2 sm:px-3 font-semibold text-[#DC2626]" style={{ fontFamily: 'var(--font-display)' }}>
            <span key={tickerIdx} className="block truncate text-[11px] sm:text-xs">
              {TICKERS[tickerIdx]}
            </span>
          </div>
          <button
            onClick={() => setShowTicker(false)}
            aria-label="Close live ticker"
            className="shrink-0 px-2 sm:px-3 text-[#DC2626]/70 hover:text-[#DC2626] transition-colors focus:ring-1 focus:ring-red-400"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Menu Trigger + Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-amber-500 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div
            onClick={() => setActiveTab('all')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-sm sm:text-base text-white shadow-sm"
              style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', fontFamily: 'var(--font-display)' }}
            >
              UD
            </div>
            <div>
              <div className="font-black text-base sm:text-lg leading-none text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
                Unique<span className="text-[#B45309]">Digit</span>
              </div>
              <div className="text-[10px] font-semibold text-[#6B7280] hidden lg:block">
                Daily Intelligence & Editorial
              </div>
            </div>
          </div>
        </div>

        {/* Center: Desktop Nav Pills */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto scroll-x flex-1 max-w-2xl px-2">
          {DESKTOP_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-pill flex items-center gap-1.5 text-xs py-1.5 px-2.5 whitespace-nowrap focus:ring-2 focus:ring-amber-500 ${
                  isActive ? tab.activeClass : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Search Box + Bell */}
        <div className="flex items-center gap-2">
          <div className="relative w-36 sm:w-56 md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search guides, gold..."
              className="w-full pl-8 pr-7 py-1.5 text-xs sm:text-sm rounded-xl outline-none bg-slate-50 text-slate-900 border transition-all"
              style={{
                borderColor: searchFocused ? '#B45309' : '#E5E7EB',
                boxShadow: searchFocused ? '0 0 0 2px rgba(180, 83, 9, 0.15)' : 'none',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <button
            aria-label="Notifications"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-amber-500"
          >
            <Bell size={15} />
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />
    </header>
  );
}
