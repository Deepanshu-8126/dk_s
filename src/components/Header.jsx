import React, { useState, useEffect } from 'react';
import { Search, X, Bell, Flame, Gamepad2, Coins, Sparkles, Newspaper, Fuel, Menu, PenTool, ShoppingBag } from 'lucide-react';
import MobileDrawer from './common/MobileDrawer';

const TICKERS = [
  "GOLD ALERT: 24K Gold ₹7,462/gram — Up ₹130 today | MCX India",
  "DEALS: iPhone 16 Pro & RTX 4070 Super price drops verified on Amazon India",
  "PETROL/DIESEL: Daily UP rates revised at 6 AM — Aligarh ₹96.48, Lucknow ₹96.57",
  "GTA 6: Rockstar confirms Vice City map size & Leonida physics engine — PC specs guide live",
  "AI TOOLS: Gemini Ultra 2.0 launches with real-time Hindi voice — 154% YoY search surge",
  "GTA V: Steam India special deal live at ₹999 + FiveM Roleplay bonus cash",
  "SARKARI: SSC CGL 2026 Result declared — 17,727 posts | Check scorecard now",
  "MANDI BHAV: Aligarh Gehu ₹2,550/Qtl, Agra Sarson ₹5,850/Qtl — Morning auction live",
  "RAILWAY: RRB NTPC 2026 notification out — 11,558 posts | Apply before 5 Nov",
];

const DESKTOP_TABS = [
  { id: 'all', label: 'All Hits', icon: Flame },
  { id: 'niches', label: '10 Viral Niches', icon: Sparkles },
  { id: 'products', label: 'Gadgets & Deals', icon: ShoppingBag },
  { id: 'gold', label: 'Gold Rate', icon: Coins },
  { id: 'hyperlocal', label: 'Fuel & Mandi', icon: Fuel },
  { id: 'gaming', label: 'Gaming & GTA', icon: Gamepad2 },
  { id: 'ai', label: 'AI Tools', icon: Sparkles },
  { id: 'sarkari', label: 'Sarkari Result', icon: Newspaper },
  { id: 'studio', label: 'Editorial Studio', icon: PenTool },
];

export default function Header({ searchQuery, setSearchQuery, activeTab, setActiveTab }) {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [showTicker, setShowTicker] = useState(() => {
    try {
      return localStorage.getItem('ud_ticker_closed') !== 'true';
    } catch {
      return true;
    }
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDismissTicker = () => {
    setShowTicker(false);
    try {
      localStorage.setItem('ud_ticker_closed', 'true');
    } catch {}
  };

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKERS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Ticker strip on top (Persistently Dismissible in localStorage) */}
      {showTicker && (
        <div className="flex items-center text-xs bg-[#0B0F19] border-b border-slate-800 text-slate-300 h-8">
          <div className="shrink-0 flex items-center gap-1.5 px-3 font-bold uppercase tracking-wider bg-slate-900/90 text-emerald-400 h-full border-r border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="hidden sm:inline text-[11px]" style={{ fontFamily: 'var(--font-display)' }}>LIVE INTELLIGENCE</span>
            <span className="sm:hidden text-[11px]" style={{ fontFamily: 'var(--font-display)' }}>LIVE</span>
          </div>
          <div className="flex-1 overflow-hidden px-2 sm:px-3 font-medium text-slate-200" style={{ fontFamily: 'var(--font-display)' }}>
            <span key={tickerIdx} className="block truncate text-[11px] sm:text-xs">
              {TICKERS[tickerIdx]}
            </span>
          </div>
          <button
            onClick={handleDismissTicker}
            aria-label="Close live ticker"
            className="shrink-0 px-2 sm:px-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={13} />
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
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div
            onClick={() => setActiveTab('all')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-sm sm:text-base text-white shadow-xs bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-600 border border-indigo-500/20 group-hover:scale-105 transition-transform"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              UD
            </div>
            <div>
              <div className="font-black text-base sm:text-lg leading-none text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                Unique<span className="text-indigo-600">Digit</span>
              </div>
              <div className="text-[10px] font-semibold text-slate-400 hidden lg:block tracking-wide">
                Daily Intelligence & Editorial
              </div>
            </div>
          </div>
        </div>

        {/* Center: Desktop Nav Pills */}
        <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto scroll-x flex-1 max-w-2xl px-2">
          {DESKTOP_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-pill flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full transition-all ${
                  isActive
                    ? 'bg-slate-950 text-white font-bold shadow-xs border-slate-950'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-indigo-400' : 'text-slate-400'} />
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
              className="w-full pl-8 pr-7 py-1.5 text-xs sm:text-sm rounded-xl outline-none bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
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
            onClick={() => {
              const next = !showTicker;
              setShowTicker(next);
              try {
                localStorage.setItem('ud_ticker_closed', (!next).toString());
              } catch {}
            }}
            title={showTicker ? "Hide live intelligence strip" : "Show live intelligence strip"}
            aria-label="Toggle Live Alerts"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              showTicker
                ? 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'bg-emerald-50 border-emerald-300 text-emerald-600 hover:bg-emerald-100'
            }`}
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
