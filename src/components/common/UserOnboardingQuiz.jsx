import React, { useState, useEffect } from 'react';
import { Sparkles, Gamepad2, Code, Smartphone, Coins, ArrowRight, X, CheckCircle2 } from 'lucide-react';

const INTEREST_OPTIONS = [
  { id: 'gaming', title: 'PC Gaming & GPUs', desc: 'GTA 6 specs, benchmarks, custom rigs & Steam deals', icon: Gamepad2, color: 'text-sky-400' },
  { id: 'smartphones', title: 'Flagship Smartphones', desc: 'Camera shootouts, 100W charging & S24/iPhone picks', icon: Smartphone, color: 'text-amber-400' },
  { id: 'coding', title: 'Coding & AI Laptops', desc: 'MacBook M3, VS Code performance, AI tools & IDEs', icon: Code, color: 'text-indigo-400' },
  { id: 'gold', title: 'Bullion & Market Pulse', desc: 'Live 24K/22K gold rates & daily city-wise updates', icon: Coins, color: 'text-emerald-400' },
];

export default function UserOnboardingQuiz({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('gaming');

  useEffect(() => {
    try {
      const hasCompleted = localStorage.getItem('ud_onboarding_completed');
      if (!hasCompleted) {
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleFinish = () => {
    try {
      localStorage.setItem('ud_onboarding_completed', 'true');
      localStorage.setItem('ud_user_interest', selectedInterest);
    } catch {}
    setIsOpen(false);
    if (onComplete) onComplete(selectedInterest);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <button
          onClick={() => {
            localStorage.setItem('ud_onboarding_completed', 'true');
            setIsOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={13} className="text-indigo-400" />
          <span>Personalize Your Intelligence Feed</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white font-display mb-2">
          Welcome to UniqueDigit! What are you researching today?
        </h3>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Select your primary interest so we can calibrate your top benchmark widgets, verified pricing, and recommendations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {INTEREST_OPTIONS.map(opt => {
            const Icon = opt.icon;
            const isSelected = selectedInterest === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedInterest(opt.id)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={20} className={opt.color} />
                  {isSelected && <CheckCircle2 size={16} className="text-indigo-400" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-display">{opt.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-[11px] text-slate-500">Preferences can be changed anytime</span>
          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition cursor-pointer"
          >
            <span>Apply My Feed</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
