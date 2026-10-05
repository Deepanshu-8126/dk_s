import React from 'react';
import { TrendingUp, Sparkles, ArrowRight, Gamepad2, Coins, Newspaper, Flame, Swords, ShoppingBag } from 'lucide-react';
import { REAL_GOLD_DATA, REAL_GTA_DATA } from '../data/realData';

export default function HeroWidget({ setActiveTab, onOpenVersus }) {
  const gold24k = REAL_GOLD_DATA.national.find(g => g.karat.includes('24 Carat')) || REAL_GOLD_DATA.national[0];
  const gold22k = REAL_GOLD_DATA.national.find(g => g.karat.includes('22 Carat')) || REAL_GOLD_DATA.national[1];

  return (
    <section className="mb-10 pt-2">
      {/* 4 Spotlight Cards - Crisp White Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Gold Rate Today */}
        <div
          onClick={() => setActiveTab('gold')}
          className="cursor-pointer group rounded-2xl p-5 bg-white border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200">
                <Coins size={12} className="text-amber-600" />
                Live MCX
              </span>
              <span className="text-[11px] text-slate-400 font-medium">9:30 AM IST</span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-500 font-medium">Gold 24K (10g)</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  ₹{gold24k.per10g.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <TrendingUp size={13} className="inline mr-0.5" /> +{gold24k.changePercent}%
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                22K Rate: <strong className="text-slate-800 font-semibold">₹{gold22k.perGram.toLocaleString('en-IN')}/g</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-amber-700 font-bold group-hover:text-amber-600 pt-3 border-t border-slate-100">
            <span>City Rates & Charts</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Gaming & GTA Craze */}
        <div
          onClick={() => setActiveTab('gaming')}
          className="cursor-pointer group rounded-2xl p-5 bg-white border border-slate-200 hover:border-sky-400 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-50 text-sky-900 border border-sky-200">
                <Gamepad2 size={12} className="text-sky-600" />
                GTA 6 Craze
              </span>
              <span className="text-xs text-sky-900 font-semibold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">PC Specs</span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-500 font-medium">Rockstar Games</div>
              <div className="text-lg font-black text-slate-900 mt-1 group-hover:text-sky-600 transition-colors font-display">
                Vice City 4K RT
              </div>
              <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                Leaked hardware benchmark specs & Indian budget builds from {REAL_GTA_DATA.gta6.specs.minimum.estimatedPcCost} to 4K Ultra.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-sky-700 font-bold group-hover:text-sky-600 pt-3 border-t border-slate-100">
            <span>PC Build & FPS Chart</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Top Gadgets & Versus */}
        <div
          onClick={() => onOpenVersus ? onOpenVersus() : setActiveTab('products')}
          className="cursor-pointer group rounded-2xl p-5 bg-white border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-900 border border-indigo-200">
                <Swords size={12} className="text-indigo-600" />
                Versus Arena
              </span>
              <span className="text-xs text-amber-900 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Compare</span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-500 font-medium">Hardware Intel</div>
              <div className="text-lg font-black text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors font-display">
                Side-by-Side Battles
              </div>
              <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                UniqueDigit 2 Pros + 1 Con breakdowns with direct SmartScore rankings and Amazon India verified deals.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-indigo-700 font-bold group-hover:text-indigo-600 pt-3 border-t border-slate-100">
            <span>Launch Versus Battle</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Sarkari Result & Jobs */}
        <div
          onClick={() => setActiveTab('sarkari')}
          className="cursor-pointer group rounded-2xl p-5 bg-white border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200">
                <Newspaper size={12} className="text-emerald-700" />
                Sarkari Result
              </span>
              <span className="text-xs text-emerald-900 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">17,727 Posts</span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-500 font-medium">Govt Recruitment 2026</div>
              <div className="text-lg font-black text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors font-display">
                SSC CGL & RRB Live
              </div>
              <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                Tier-2 cutoffs, official PDF scorecards, and Railway RRB 11,558 post application portal links.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold group-hover:text-emerald-600 pt-3 border-t border-slate-100">
            <span>Scorecard & Cutoff PDF</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </section>
  );
}
