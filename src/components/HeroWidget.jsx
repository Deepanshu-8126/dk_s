import React from 'react';
import { TrendingUp, Sparkles, ArrowRight, Gamepad2, Coins, Newspaper, Flame, Swords, ShoppingBag } from 'lucide-react';
import { REAL_GOLD_DATA, REAL_GTA_DATA } from '../data/realData';

export default function HeroWidget({ setActiveTab, onOpenVersus }) {
  const gold24k = REAL_GOLD_DATA.national.find(g => g.karat.includes('24 Carat')) || REAL_GOLD_DATA.national[0];
  const gold22k = REAL_GOLD_DATA.national.find(g => g.karat.includes('22 Carat')) || REAL_GOLD_DATA.national[1];

  return (
    <section className="mb-10 pt-2">
      {/* 4 Spotlight Cards - Sleek Obsidian Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Gold Rate Today */}
        <div
          onClick={() => setActiveTab('gold')}
          className="cursor-pointer group rounded-2xl p-5 bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Coins size={12} className="text-amber-400" />
                Live MCX
              </span>
              <span className="text-[11px] text-slate-400 font-medium">9:30 AM IST</span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-400 font-medium">Gold 24K (10g)</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  ₹{gold24k.per10g.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  <TrendingUp size={13} className="inline mr-0.5" /> +{gold24k.changePercent}%
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                22K Rate: <strong className="text-slate-200 font-semibold">₹{gold22k.perGram.toLocaleString('en-IN')}/g</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-amber-400 font-bold group-hover:text-amber-300 pt-3 border-t border-slate-800">
            <span>City Rates & Charts</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Gaming & GTA Craze */}
        <div
          onClick={() => setActiveTab('gaming')}
          className="cursor-pointer group rounded-2xl p-5 bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 shadow-lg hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Gamepad2 size={12} className="text-sky-400" />
                GTA 6 Craze
              </span>
              <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">PC Specs</span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-400 font-medium">Rockstar Games</div>
              <div className="text-lg font-black text-white mt-1 group-hover:text-sky-400 transition-colors font-display">
                Vice City 4K RT
              </div>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                Leaked hardware benchmark specs & Indian budget builds from {REAL_GTA_DATA.gta6.specs.minimum.estimatedPcCost} to 4K Ultra.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-sky-400 font-bold group-hover:text-sky-300 pt-3 border-t border-slate-800">
            <span>PC Build & FPS Chart</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Top Gadgets & Versus */}
        <div
          onClick={() => onOpenVersus ? onOpenVersus() : setActiveTab('products')}
          className="cursor-pointer group rounded-2xl p-5 bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Swords size={12} className="text-indigo-400" />
                Versus Arena
              </span>
              <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Compare</span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-400 font-medium">Hardware Intel</div>
              <div className="text-lg font-black text-white mt-1 group-hover:text-indigo-400 transition-colors font-display">
                Side-by-Side Battles
              </div>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                Wirecutter 2 Pros + 1 Con breakdowns with direct SmartScore rankings and Amazon India verified deals.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-indigo-400 font-bold group-hover:text-indigo-300 pt-3 border-t border-slate-800">
            <span>Launch Versus Battle</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Sarkari Result & Jobs */}
        <div
          onClick={() => setActiveTab('sarkari')}
          className="cursor-pointer group rounded-2xl p-5 bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Newspaper size={12} className="text-emerald-400" />
                Sarkari Result
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">17,727 Posts</span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-400 font-medium">Govt Recruitment 2026</div>
              <div className="text-lg font-black text-white mt-1 group-hover:text-emerald-400 transition-colors font-display">
                SSC CGL & RRB Live
              </div>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                Tier-2 cutoffs, official PDF scorecards, and Railway RRB 11,558 post application portal links.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold group-hover:text-emerald-300 pt-3 border-t border-slate-800">
            <span>Scorecard & Cutoff PDF</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </section>
  );
}
