import React from 'react';
import { ShieldCheck, Sparkles, Coins, Gamepad2, Newspaper, Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#0B0F19] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Ground Intelligence */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-slate-950 p-0.5 border border-slate-800 shadow-md flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
                  <defs>
                    <linearGradient id="udGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                  <rect width="36" height="36" rx="8" fill="#0B0F19" />
                  <path d="M9 10V20C9 23.866 12.134 27 16 27C19.866 27 23 23.866 23 20V10" stroke="url(#udGradFooter)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M21 10H27V26" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="27" cy="10" r="2" fill="#10B981" />
                </svg>
              </div>
              <span className="font-black text-xl text-white tracking-tight leading-none font-display">
                Unique<span className="text-indigo-400">Digit</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              India's premier daily intelligence & utility portal. Verified bullion rates, curated AI tools, PC gaming benchmarks, and verified gadget deals.
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              Live automated data sync • 2026
            </div>
          </div>

          {/* Col 2: Gold & Commodities */}
          <div>
            <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Coins size={14} className="text-amber-400" /> Gold & Bullion
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('gold')} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>24K / 22K Gold Rate Today</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gold')} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>City-wise Rates (Mumbai, Delhi)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gold')} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Nifty 50 & Bullion Pulse</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('hyperlocal')} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Daily Fuel & Mandi Bhav</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Gaming & Hardware */}
          <div>
            <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Gamepad2 size={14} className="text-sky-400" /> Gaming & Tech
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('gaming')} className="hover:text-sky-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>GTA 6 PC Specs & Benchmark</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gaming')} className="hover:text-sky-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Steam Live Deals & FiveM</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gaming')} className="hover:text-sky-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Budget Gaming PC Builds</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-sky-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Hardware & GPU Price Track</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: AI Intelligence Hub */}
          <div>
            <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Sparkles size={14} className="text-indigo-400" /> AI Tools Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('ai')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Google Gemini Ultra 2.0</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>ChatGPT Plus & GPT-4o</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Cursor & Code Assistants</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Free Tier Comparison Matrix</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Sarkari Recruitment */}
          <div>
            <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Newspaper size={14} className="text-emerald-400" /> Sarkari Result
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('sarkari')} className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>SSC CGL 2026 Scorecard</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sarkari')} className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Railway RRB NTPC Notice</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sarkari')} className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>EPFO Passbook & Claims</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sarkari')} className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <span>Official Portals Direct Links</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal, Integrity & Ethics Row */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 UniqueDigit. All verified rates & official recruitment alerts collected from authorized public bodies.</p>
          <p className="flex items-center gap-1 text-slate-400 font-medium">
            <span>High-Speed Clean Editorial Experience</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 inline ml-1" />
          </p>
        </div>
      </div>
    </footer>
  );
}
