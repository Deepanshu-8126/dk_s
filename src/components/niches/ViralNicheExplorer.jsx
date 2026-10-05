import React, { useState } from 'react';
import { Sparkles, Gamepad2, Coins, Newspaper, ShoppingBag, Zap, HeartPulse, Wheat, Dog, CloudSun, ChevronRight, ExternalLink } from 'lucide-react';
import staticNichesData from '../../data/viralNiches2026.json';
import nichesCatalog from '../../data/nichesCatalog.json';
import UniversalCard from '../common/UniversalCard';
import AdBannerInjector from '../common/AdBannerInjector';
import AccordionFAQ from '../common/AccordionFAQ';

const NICHE_ICONS = {
  Sparkles,
  Gamepad2,
  Coins,
  Newspaper,
  ShoppingBag,
  Zap,
  HeartPulse,
  Wheat,
  Dog,
  CloudSun,
};

export default function ViralNicheExplorer({ onSelectTopic }) {
  const allNiches = [...(nichesCatalog.niches || []), ...(staticNichesData.niches || [])];
  const [activeNicheId, setActiveNicheId] = useState(allNiches[0]?.id || 'gaming');

  const currentNiche = allNiches.find(n => n.id === activeNicheId) || allNiches[0];

  const faqs = [
    {
      q: "How does UniqueDigit verify daily benchmark scores and pricing?",
      a: "Our automated telemetry engine cross-references real-time MCX bullion tickers, verified retail listings, and direct hardware frame-time benchmarks."
    },
    {
      q: "Can I get personalized notifications for price drops in specific niches?",
      a: "Yes, use the Price Drop Alert widget on any product card or subscribe to the weekly drop to receive instant transactional email notifications."
    }
  ];

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Sparkles size={13} className="text-amber-400" />
            <span>2026 Cross-Niche Intelligence Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-outfit">
            Universal Dynamic <span className="text-cyan-400">Niche Ecosystem</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Config-driven dynamic categories across Gaming, Bullion, AI Developer Tools, and Smart Wearables.
          </p>
        </div>
      </div>

      {/* Dynamic Niche Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 mb-6">
        {allNiches.map(niche => {
          const Icon = NICHE_ICONS[niche.icon] || Sparkles;
          const isActive = activeNicheId === niche.id;
          return (
            <button
              key={niche.id}
              onClick={() => setActiveNicheId(niche.id)}
              className={`flex items-center gap-2 shrink-0 min-w-max px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 border border-cyan-400 font-extrabold scale-[1.02]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-slate-950' : 'text-slate-500'} />
              <span className="whitespace-nowrap">{niche.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold whitespace-nowrap ${
                isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {niche.badge || niche.tag || 'Active'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Universal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentNiche?.items?.map(item => (
          <UniversalCard
            key={item.id}
            item={item}
            accent={currentNiche.accent || 'cyan'}
            onSelect={onSelectTopic}
          />
        ))}

        {/* Dynamic Ad & Banner Injector Slot */}
        <AdBannerInjector
          headline={`Exclusive ${currentNiche.name} Drops & Verified Discounts`}
          description="Instant vouchers and verified Indian price drops updated hourly on Amazon India."
          tag="Auto-Injected Deal Slot"
        />
      </div>

      {/* Auto-Generated FAQ Accordion */}
      <AccordionFAQ faqs={currentNiche?.items?.[0]?.faqs || faqs} />
    </section>
  );
}
