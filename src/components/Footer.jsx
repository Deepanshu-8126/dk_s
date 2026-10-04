import React from 'react';
import { Shield, Sparkles, Coins, Gamepad2, Newspaper, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-16 pt-12 pb-8 border-t border-[#E5E7EB] bg-white text-[#4B5563]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1 */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm">
                UD
              </div>
              <span className="font-black text-xl text-[#111827] tracking-tight">
                Unique<span className="text-[#B45309]">Digit</span>
              </span>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
              India's premier daily intelligence & utility dashboard. Uniting verified gold rates, revolutionary AI tools, PC gaming benchmarks, and official sarkari results in one clean portal.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Free Public Verification
            </div>
          </div>

          {/* Col 2: Gaming & GTA Craze */}
          <div>
            <h4 className="text-sm font-bold text-[#111827] mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Gamepad2 size={16} className="text-cyan-600" /> Gaming & GTA
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('gaming')} className="text-[#4B5563] hover:text-cyan-700 hover:underline transition-colors text-left">
                  GTA 6 PC Specs & Benchmark
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gaming')} className="text-[#4B5563] hover:text-cyan-700 hover:underline transition-colors text-left">
                  GTA V Steam Live Deals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gaming')} className="text-[#4B5563] hover:text-cyan-700 hover:underline transition-colors text-left">
                  Gaming PC Builds (1080p to 4K)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gaming')} className="text-[#4B5563] hover:text-cyan-700 hover:underline transition-colors text-left">
                  Valorant & BGMI System Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-[#111827] mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Coins size={16} className="text-amber-600" /> Gold & Bullion
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('gold')} className="text-[#4B5563] hover:text-amber-700 hover:underline transition-colors text-left">
                  24K / 22K Gold Rate Today
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gold')} className="text-[#4B5563] hover:text-amber-700 hover:underline transition-colors text-left">
                  City-wise Rates (Mumbai, Delhi)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gold')} className="text-[#4B5563] hover:text-amber-700 hover:underline transition-colors text-left">
                  Nifty 50 & Bullion Pulse
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gold')} className="text-[#4B5563] hover:text-amber-700 hover:underline transition-colors text-left">
                  Sovereign Gold Bond Alerts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-bold text-[#111827] mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={16} className="text-indigo-600" /> Top AI Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('ai')} className="text-[#4B5563] hover:text-indigo-700 hover:underline transition-colors text-left">
                  Google Gemini Ultra 2.0
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="text-[#4B5563] hover:text-indigo-700 hover:underline transition-colors text-left">
                  ChatGPT Plus & GPT-4o
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="text-[#4B5563] hover:text-indigo-700 hover:underline transition-colors text-left">
                  Midjourney v7 & AI Generators
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="text-[#4B5563] hover:text-indigo-700 hover:underline transition-colors text-left">
                  Top Free Coding Assistants
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h4 className="text-sm font-bold text-[#111827] mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Newspaper size={16} className="text-rose-600" /> Sarkari Result
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('sarkari')} className="text-[#4B5563] hover:text-rose-700 hover:underline transition-colors text-left">
                  SSC CGL 2026 Merit List
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sarkari')} className="text-[#4B5563] hover:text-rose-700 hover:underline transition-colors text-left">
                  Railway RRB NTPC Notice
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sarkari')} className="text-[#4B5563] hover:text-rose-700 hover:underline transition-colors text-left">
                  EPFO Passbook & Claims
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sarkari')} className="text-[#4B5563] hover:text-rose-700 hover:underline transition-colors text-left">
                  UPSC CSE 2026 Calendar
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Disclaimers */}
        <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>© 2026 UniqueDigit. All rights reserved. Rates & results collected from official public boards.</p>
          <p className="flex items-center gap-1">
            Built with high performance for Indian traffic <Heart size={12} className="text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
