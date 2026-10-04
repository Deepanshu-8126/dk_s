import React, { useState } from 'react';
import { Calculator, ShieldCheck, Info } from 'lucide-react';

export default function GoldFairPriceCalculator({ rate22k = 6842, rate24k = 7462 }) {
  const [weight, setWeight] = useState(10);
  const [karat, setKarat] = useState('22');
  const [makingPct, setMakingPct] = useState(8);

  const pricePerGram = karat === '24' ? rate24k : rate22k;
  const rawGoldCost = weight * pricePerGram;
  const makingCharges = Math.round(rawGoldCost * (makingPct / 100));
  const gst = Math.round((rawGoldCost + makingCharges) * 0.03);
  const totalFairPrice = rawGoldCost + makingCharges + gst;

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5 rounded-2xl border border-amber-200/80 mb-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/60 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
            <Calculator size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              UniqueDigit Fair Jewelry & GST Calculator
            </h3>
            <span className="text-[11px] text-amber-900 font-medium">
              Don't get overcharged by showrooms. Know your exact invoice breakdown.
            </span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
          <ShieldCheck size={12} className="text-emerald-600" />
          <span>BIS 6-Digit HUID Audited</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-1">Gold Weight (Grams):</label>
          <input
            type="number"
            min="1"
            max="500"
            value={weight}
            onChange={e => setWeight(Math.max(1, Number(e.target.value) || 1))}
            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-1">Purity:</label>
          <select
            value={karat}
            onChange={e => setKarat(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
          >
            <option value="22">22 Karat (Showroom Jewelry)</option>
            <option value="24">24 Karat (Pure Bullion Bar / Coin)</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-1">
            Making Charge ({makingPct}% fair rate):
          </label>
          <input
            type="range"
            min="5"
            max="18"
            value={makingPct}
            onChange={e => setMakingPct(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer mt-2"
          />
        </div>
      </div>

      {/* Fair Breakdown Output */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-amber-200/60 text-xs">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
          <span className="text-[10px] text-slate-400 block font-medium">Pure Gold Cost</span>
          <strong className="text-slate-900 font-mono text-sm">₹{rawGoldCost.toLocaleString('en-IN')}</strong>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
          <span className="text-[10px] text-slate-400 block font-medium">Making ({makingPct}%)</span>
          <strong className="text-amber-800 font-mono text-sm">+₹{makingCharges.toLocaleString('en-IN')}</strong>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
          <span className="text-[10px] text-slate-400 block font-medium">Govt GST (3%)</span>
          <strong className="text-slate-700 font-mono text-sm">+₹{gst.toLocaleString('en-IN')}</strong>
        </div>
        <div className="bg-amber-600 text-white p-2.5 rounded-xl shadow-xs">
          <span className="text-[10px] text-amber-100 block font-medium">Fair Invoice Total</span>
          <strong className="text-white font-mono text-base">₹{totalFairPrice.toLocaleString('en-IN')}</strong>
        </div>
      </div>
    </div>
  );
}
