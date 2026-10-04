import React, { useState } from 'react';
import { Sparkles, Gamepad2, Coins, Newspaper, ShoppingBag, Zap, HeartPulse, Wheat, Dog, CloudSun, ChevronRight, ExternalLink } from 'lucide-react';
import staticNichesData from '../../data/viralNiches2026.json';

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
  const niches = staticNichesData.niches || [];
  const [activeNicheId, setActiveNicheId] = useState(niches[0]?.id || 'ai-frontier');

  const currentNiche = niches.find(n => n.id === activeNicheId) || niches[0];

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Sparkles size={13} className="text-amber-400" />
            <span>2026 High-Growth Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Top 10 High-Growth <span className="text-indigo-600">Viral Niches</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Curated 2026 trends across AI, Gaming, Bullion, Sarkari, Auto, Health, Crops, and Pets. Capped with zero origin load.
          </p>
        </div>
      </div>

      {/* 10 Niches Horizontal Switcher (100% Mobile Fluid Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 mb-6">
        {niches.map(niche => {
          const Icon = NICHE_ICONS[niche.icon] || Sparkles;
          const isActive = activeNicheId === niche.id;
          return (
            <button
              key={niche.id}
              onClick={() => setActiveNicheId(niche.id)}
              className={`flex items-center gap-2 shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-950 text-white shadow-md border border-slate-950 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
              <span>{niche.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-100 text-slate-500'
              }`}>
                {niche.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Verified Entities in Current Niche */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentNiche?.items?.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectTopic && onSelectTopic(item)}
            className="group cursor-pointer flex flex-col justify-between rounded-2xl p-4 bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Authentic Photo Box */}
              <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/10">
                  {currentNiche.name.split(' ')[0]}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                {item.summary || item.description}
              </p>

              {/* Fast Facts Snippets */}
              {item.fastFacts && (
                <div className="space-y-1 mb-3 text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {Object.entries(item.fastFacts).slice(0, 2).map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center text-slate-600">
                      <span className="text-slate-400 font-medium text-[10px]">{k}:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[140px]">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Read Dossier Action */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
              <span>Inspect Ground Dossier</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
