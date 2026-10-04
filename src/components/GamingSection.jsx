import React, { useState, useEffect } from 'react';
import { GTA_EDITIONS } from '../data/gamingData';
import { REAL_GTA_DATA, fetchLiveSteamGtaPrice } from '../data/realData';
import { GtaSpotlight, PcBuildTable, TrendingGames } from './gaming';

export default function GamingSection({ searchQuery }) {
  const [activeGtaTab, setActiveGtaTab] = useState('gta-6-pc');
  const [selectedRes, setSelectedRes] = useState('recommended');
  const [activeBuildIdx, setActiveBuildIdx] = useState(1); // Default to GTA 6 ready rig
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
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
              India Gaming & Hardware Craze
            </span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-[#111827]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            GTA Craze, PC Specs & Deals <span className="text-cyan-600">2026</span>
          </h2>
          <p className="text-sm text-[#4B5563] mt-1 max-w-2xl">
            GTA 6 hardware stress tests, verified GTA V Steam/Epic discounts, budget Indian PC builds (₹35k to ₹2.2L), and esports benchmarks.
          </p>
        </div>

        {/* Quick GTA Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-[#E5E7EB]">
          {GTA_EDITIONS.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveGtaTab(g.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeGtaTab === g.id
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#4B5563] hover:text-[#111827]'
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

      {/* 2. Indian PC Build Pricing Guide */}
      <PcBuildTable
        activeBuildIdx={activeBuildIdx}
        setActiveBuildIdx={setActiveBuildIdx}
      />

      {/* 3. Trending Games in India */}
      <TrendingGames />
    </section>
  );
}
