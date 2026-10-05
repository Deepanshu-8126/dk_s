import React, { useState, useEffect } from 'react';
import { GTA_EDITIONS } from '../data/gamingData';
import { REAL_GTA_DATA, fetchLiveSteamGtaPrice } from '../data/realData';
import { GtaSpotlight, PcBuildTable, TrendingGames } from './gaming';
import InteractivePcCustomizer from './gaming/InteractivePcCustomizer';
import DailyTechPoll from './common/DailyTechPoll';

export default function GamingSection({ searchQuery, setActiveTab, isHome = false }) {
  const [activeGtaTab, setActiveGtaTab] = useState('gta-6-pc');
  const [selectedRes, setSelectedRes] = useState('recommended');
  const [activeBuildIdx, setActiveBuildIdx] = useState(1); // Default to GTA 6 ready rig
  const [showHardwareBuilds, setShowHardwareBuilds] = useState(!isHome);
  const [steamGtaPrice, setSteamGtaPrice] = useState({
    currentPrice: REAL_GTA_DATA.gta5.cachedPriceInr,
    isLive: false,
    lastVerified: REAL_GTA_DATA.gta5.lastVerified,
    verifiedLabel: `Verified ${REAL_GTA_DATA.gta5.lastVerified} - Steam India approx`,
  });

  useEffect(() => {
    let mounted = true;
    fetchLiveSteamGtaPrice().then(res => {
      if (mounted && res) {
        setSteamGtaPrice(res);
      }
    });
    return () => { mounted = false; };
  }, []);

  const currentGta = GTA_EDITIONS.find(g => g.id === activeGtaTab) || GTA_EDITIONS[0];

  return (
    <section id="gaming-hub" className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
            <span>Gaming Hardware & Deals</span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            GTA Craze, PC Specs & Deals <span className="text-sky-600">2026</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            GTA 6 hardware stress tests, verified GTA V Steam/Epic discounts, budget Indian PC builds (₹35k to ₹2.2L), and esports benchmarks.
          </p>
        </div>

        {/* Quick GTA Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200">
          {GTA_EDITIONS.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveGtaTab(g.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeGtaTab === g.id
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {g.title.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* 1. GTA Spotlight */}
      <GtaSpotlight
        currentGta={currentGta}
        selectedRes={selectedRes}
        setSelectedRes={setSelectedRes}
        steamGtaPrice={steamGtaPrice}
        activeGtaTab={activeGtaTab}
      />

      {/* 2. Interactive PC Customizer & FPS Estimator Tool */}
      <InteractivePcCustomizer />

      {/* 3. Indian PC Build Pricing Guide / Hardware Rigs Callout */}
      {showHardwareBuilds ? (
        <div className="relative">
          {isHome && (
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowHardwareBuilds(false)}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Hide PC Rigs Table
              </button>
            </div>
          )}
          <PcBuildTable
            activeBuildIdx={activeBuildIdx}
            setActiveBuildIdx={setActiveBuildIdx}
          />
        </div>
      ) : (
        <div className="my-6 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-500/20 shadow-xs">
          <div>
            <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">Hardware Rigs & Deals</span>
            <h4 className="text-sm md:text-base font-bold text-white mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>
              Building a PC for GTA 6 or Esports?
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Compare 4 tested builds (₹35k Budget to ₹2.2L Ultra) with verified part prices.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowHardwareBuilds(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              Quick View Rigs
            </button>
            {setActiveTab && (
              <button
                onClick={() => setActiveTab('products')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
              >
                Gadgets & Deals Tab →
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Community Daily Tech Poll */}
      <DailyTechPoll />

      {/* 5. Trending Games in India */}
      <TrendingGames />
    </section>
  );
}
