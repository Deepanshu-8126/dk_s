import React, { useState } from 'react';
import { Sparkles, Star, ExternalLink, TrendingUp, Layers, Check } from 'lucide-react';
import { AI_TOOLS } from '../data/aiTools';
import { CURATED_AI_LOGOS } from '../data/curatedMedia';

const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'AI Assistant', label: 'Assistants' },
  { id: 'Coding', label: 'Coding' },
  { id: 'Image & Art', label: 'Image & Video' },
  { id: 'Writing & Copy', label: 'Writing & SEO' },
  { id: 'Productivity', label: 'Productivity' },
];

export default function AIToolsSection({ searchQuery }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const filtered = AI_TOOLS.filter(tool => {
    const matchCat = selectedCat === 'all' || tool.category.toLowerCase().includes(selectedCat.toLowerCase());
    const q = (searchQuery || '').toLowerCase();
    const matchSearch = !q || 
      tool.name.toLowerCase().includes(q) || 
      tool.description.toLowerCase().includes(q) || 
      tool.category.toLowerCase().includes(q) ||
      (tool.useCase && tool.useCase.some(u => u.toLowerCase().includes(q)));
    return matchCat && matchSearch;
  });

  const handleShare = (id, link) => {
    navigator.clipboard?.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="ai-tools" className="mb-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
              High Utility & Affiliate Tools
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
            Top AI Tools Directory <span className="text-[#4F46E5]">2026</span>
          </h2>
          <p className="text-xs text-[#4B5563] mt-1 max-w-xl">
            Kantar report: +154% YoY search surge. Handpicked high-utility tools with free tiers and verified benchmarks.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat.id
                  ? 'bg-[#4F46E5] text-white shadow-xs'
                  : 'bg-white text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tools (Clean White Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(tool => {
          const brand = CURATED_AI_LOGOS[tool.id] || { symbol: '🤖', bg: '#EEF2FF', color: '#4F46E5' };
          return (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between rounded-2xl p-5 bg-white border border-[#E5E7EB] hover:border-[#818CF8] shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-xs border"
                      style={{ backgroundColor: brand.bg, borderColor: `${brand.color}30` }}
                    >
                      {brand.symbol}
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF] mb-1">
                        {tool.tagBadge || tool.category}
                      </span>
                      <h3 className="text-base font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                        {tool.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 rounded-lg text-[#B45309] text-xs font-bold shrink-0">
                    <Star size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
                    <span>{tool.rating}</span>
                  </div>
                </div>

              {/* Description */}
              <p className="text-xs text-[#4B5563] line-clamp-3 mb-3 leading-relaxed">
                {tool.description}
              </p>

              {/* Use Cases tags */}
              {tool.useCase && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.useCase.map((uc, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]"
                    >
                      #{uc}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Meta & Action */}
            <div className="pt-3 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between text-xs mb-3 text-[#6B7280]">
                <span className="font-medium text-[#4B5563]">
                  Pricing: <strong className="text-[#111827]">{tool.pricing}</strong>
                </span>
                <span className="text-[11px] text-[#059669] font-semibold flex items-center gap-1">
                  <TrendingUp size={12} /> {tool.searchVolume || 'Trending'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={tool.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all shadow-xs"
                >
                  <span>{tool.cta || 'Try Free Now'}</span>
                  <ExternalLink size={13} />
                </a>
                <button
                  onClick={() => handleShare(tool.id, tool.affiliateLink)}
                  title="Copy direct link"
                  className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] transition-colors"
                >
                  {copiedId === tool.id ? <Check size={14} className="text-[#059669]" /> : <Layers size={14} />}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-white border border-[#E5E7EB] text-[#6B7280]">
          <p className="text-sm">Koi AI tool match nahi hua search query ke saath.</p>
        </div>
      )}
    </section>
  );
}
