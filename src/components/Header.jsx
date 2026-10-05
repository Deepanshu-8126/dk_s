import React, { useState, useEffect } from 'react';
import { Search, X, Flame, Gamepad2, Coins, Sparkles, Newspaper, Fuel, Menu, PenTool, ShoppingBag, ShieldCheck } from 'lucide-react';
import MobileDrawer from './common/MobileDrawer';

const TICKERS = [
  "GOLD ALERT: 24K Gold ₹7,462/gram — Up ₹130 today | MCX India",
  "DEALS: iPhone 16 Pro & RTX 4070 Super price drops verified on Amazon India",
  "PETROL/DIESEL: Daily UP rates revised at 6 AM — Aligarh ₹96.48, Lucknow ₹96.57",
  "GTA 6: Rockstar confirms Vice City map size & Leonida physics engine — PC specs live",
  "AI TOOLS: Gemini Ultra 2.0 launches with real-time Hindi voice — 154% YoY search surge",
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
    <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg text-slate-100">
      {/* Ticker strip on top */}
      {showTicker && (
        <div className="flex items-center text-xs bg-[#030712] border-b border-slate-800/80 text-slate-300 h-8">
          <div className="shrink-0 flex items-center gap-1.5 px-3 font-bold uppercase tracking-wider bg-slate-900/90 text-emerald-400 h-full border-r border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="hidden sm:inline text-[11px] font-display">LIVE INTELLIGENCE</span>
            <span className="sm:hidden text-[11px] font-display">LIVE</span>
          </div>
          <div className="flex-1 overflow-hidden px-2 sm:px-3 font-medium text-slate-300 font-display">
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
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Menu size={20} />
          </button>

          <div
            onClick={() => setActiveTab('all')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-950 p-0.5 border border-slate-700 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
                <defs>
                  <linearGradient id="udGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
                <rect width="36" height="36" rx="8" fill="#0B0F19" />
                <path d="M9 10V20C9 23.866 12.134 27 16 27C19.866 27 23 23.866 23 20V10" stroke="url(#udGrad)" strokeWidth="3" strokeLinecap="round" />
                <path d="M21 10H27V26" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="27" cy="10" r="2" fill="#10B981" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white leading-none font-display">
                  Unique<span className="text-indigo-400">Digit</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 hidden sm:block">
                Hardware Intel & Verified Deals
              </div>
            </div>
          </div>
        </div>

        {/* Center: Desktop Nav Pills */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto flex-1 max-w-2xl px-2">
          {DESKTOP_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70 font-medium'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Search Box */}
        <div className="relative flex items-center">
          <div className={`relative flex items-center transition-all ${searchFocused ? 'w-48 sm:w-64' : 'w-36 sm:w-52'}`}>
            <Search size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search gadgets, AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-full pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={DESKTOP_TABS}
      />
    </header>
  );
}
