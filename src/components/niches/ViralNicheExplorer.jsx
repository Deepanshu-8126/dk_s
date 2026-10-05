import React, { useState } from 'react';
import { Sparkles, Gamepad2, Coins, Newspaper, ShoppingBag, Zap, HeartPulse, Wheat, Dog, CloudSun, Loader2 } from 'lucide-react';
import staticNichesData from '../../data/viralNiches2026.json';
import nichesCatalog from '../../data/nichesCatalog.json';
import UniversalCard from '../common/UniversalCard';
import AdBannerInjector from '../common/AdBannerInjector';
import AccordionFAQ from '../common/AccordionFAQ';
import { useOnlineNicheFeed } from '../../hooks/useOnlineFeed';

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
  const [activeNicheId, setActiveNicheId] = useState(allNiches[0]?.id || 'ai-frontier');

  const currentNiche = allNiches.find(n => n.id === activeNicheId) || allNiches[0];
  
  // Dynamic Online Fetching for the active niche's topic blueprint
  const topicQueries = currentNiche?.topicQueries || [];
  const { items: liveItems, isLoading } = useOnlineNicheFeed(topicQueries);

  const displayItems = currentNiche?.items?.length ? currentNiche.items : liveItems;

  const faqs = [
    {
      q: "How does UniqueDigit verify daily benchmark scores and pricing?",
      a: "Our automated telemetry engine cross-references real-time MCX bullion tickers, verified retail listings, and direct hardware frame-time benchmarks."
    },
    {
      q: "Can I get personalized notifications for price drops in specific niches?",
      a: "Yes, use the Price Drop Alert widget on any product card or subscribe to the weekly drop to receive instant transactional notifications."
    }
  ];

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-semibold mb-2 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Sparkles size={13} className="text-amber-500" />
            <span>2026 Live Online Intelligence Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-outfit">
            Universal Dynamic <span className="text-indigo-600">Niche Ecosystem</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
            Real-time online streaming data across AI Frontier, PC Hardware, Bullion Markets, and Public Exams.
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
              className={`flex items-center gap-2 shrink-0 min-w-max px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap touch-manipulation ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs border border-slate-900 font-extrabold scale-[1.01]'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-amber-400' : 'text-slate-400'} />
              <span className="whitespace-nowrap">{niche.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold whitespace-nowrap ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {niche.badge || niche.tag || 'Online'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Grid / Skeletons */}
      {isLoading && !displayItems?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(n => (
            <div key={n} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
              <div className="h-44 bg-slate-100 rounded-xl mb-4" />
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-4" />
              <div className="h-8 bg-slate-100 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayItems?.map(item => (
            <UniversalCard
              key={item.id || item.title}
              item={item}
              accent={currentNiche.accent || 'indigo'}
              onSelect={onSelectTopic}
            />
          ))}

          {/* Dynamic Ad & Banner Injector Slot */}
          <AdBannerInjector
            headline={`Exclusive ${currentNiche?.name || 'Featured'} Drops & Verified Discounts`}
            description="Instant vouchers and verified Indian price drops updated hourly on Amazon India."
            tag="Auto-Injected Deal Slot"
          />
        </div>
      )}

      {/* Auto-Generated FAQ Accordion */}
      <AccordionFAQ faqs={currentNiche?.items?.[0]?.faqs || faqs} />
    </section>
  );
}
