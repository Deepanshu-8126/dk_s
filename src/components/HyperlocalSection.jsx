import React, { useState } from 'react';
import { Fuel, Wheat, CreditCard, ShieldCheck, Share2, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import { FUEL_DATA, MANDI_BHAV, CREDIT_CARDS_DATA, GOVT_SCHEMES_DATA } from '../data/hyperlocalData';

export default function HyperlocalSection() {
  const [subTab, setSubTab] = useState('fuel');

  const shareOnWhatsApp = (title, summary) => {
    const text = encodeURIComponent(`📢 *UniqueDigit Daily Alert:* ${title}\n\n${summary}\n\n👉 Live Check: https://uniquedigit.in`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] rounded-full text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Daily Habit & Hyperlocal Rates</span>
          </div>
          <h2 className="text-2xl font-bold text-[#111827] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Daily Essential Rates & High-Value Opportunities
          </h2>
          <p className="text-sm text-[#4B5563] mt-1">
            Fuel prices, mandi bhav, high-reward credit cards, and government scheme updates.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start overflow-x-auto max-w-full border border-[#E5E7EB]">
          {[
            { id: 'fuel', label: 'Fuel Rates', icon: Fuel },
            { id: 'mandi', label: 'Mandi Bhav', icon: Wheat },
            { id: 'cards', label: 'Credit Cards', icon: CreditCard },
            { id: 'schemes', label: 'Govt Schemes', icon: ShieldCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const active = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  active ? 'bg-white text-[#111827] shadow-xs' : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Fuel Rates View */}
      {subTab === 'fuel' && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-[#4B5563]">{FUEL_DATA.lastUpdated}</span>
            <button
              onClick={() => shareOnWhatsApp('Aaj Ka Petrol & Diesel Rate', 'Aligarh Petrol ₹96.48, Diesel ₹89.64. Check live metro fuel rates.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition"
            >
              <Share2 className="w-3.5 h-3.5" /> WhatsApp Share
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {FUEL_DATA.cities.map(c => (
              <div key={c.city} className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-center">
                <p className="text-xs font-bold text-[#111827] uppercase tracking-wide mb-1">{c.city}</p>
                <div className="text-lg font-black text-[#B45309] font-mono">{c.petrol}</div>
                <div className="text-xs text-[#4B5563] mt-0.5">Diesel: {c.diesel}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">CNG: {c.cng}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Mandi Bhav View */}
      {subTab === 'mandi' && (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-[#4B5563]">{MANDI_BHAV.lastUpdated}</span>
            <button
              onClick={() => shareOnWhatsApp('Aaj Ka Mandi Bhav UP', 'Gehu Aligarh: ₹2,420 - ₹2,550/Qtl, Sarson Agra: ₹5,600/Qtl.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition"
            >
              <Share2 className="w-3.5 h-3.5" /> WhatsApp Share
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MANDI_BHAV.items.map(item => (
              <div key={item.crop} className="border border-[#E5E7EB] bg-slate-50/60 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#111827] text-sm">{item.crop}</h4>
                    <p className="text-xs text-[#6B7280]">{item.mandi}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    item.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-[#4B5563]'
                  }`}>
                    {item.trend === 'up' ? '▲ Tezi' : '● Sthir'}
                  </span>
                </div>
                <div className="text-lg font-black text-[#111827] font-mono mt-2">{item.rate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Credit Cards View */}
      {subTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CREDIT_CARDS_DATA.map(card => (
            <div key={card.name} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                  {card.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {card.cpcTier}
                </span>
              </div>
              <h4 className="font-bold text-[#111827] text-base">{card.name}</h4>
              <p className="text-xs text-[#4B5563] mt-1">{card.cashback}</p>
              <div className="text-xs text-[#6B7280] mt-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{card.highlight}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#111827]">{card.annualFee}</span>
                <a
                  href={card.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition"
                >
                  Apply Online <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Govt Schemes View */}
      {subTab === 'schemes' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GOVT_SCHEMES_DATA.map(s => (
            <div key={s.name} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-bold uppercase px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">
                {s.urgency}
              </span>
              <h4 className="font-bold text-[#111827] text-sm mt-2">{s.name}</h4>
              <div className="text-base font-black text-emerald-700 font-mono mt-1">{s.amount}</div>
              <p className="text-xs text-[#4B5563] mt-1">{s.status}</p>
              <a
                href={`https://${s.portal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                Official Portal: {s.portal} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
