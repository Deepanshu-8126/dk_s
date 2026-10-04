import React, { useState } from 'react';
import { Sparkles, Star, ExternalLink, TrendingUp, Layers, Check, Bot, Code2, Wand2, Cpu, Music, FileText, Search } from 'lucide-react';
import { AI_TOOLS } from '../data/aiTools';

const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'AI Assistant', label: 'Assistants' },
  { id: 'Coding', label: 'Coding' },
  { id: 'Image & Art', label: 'Image & Video' },
  { id: 'Writing & Copy', label: 'Writing & SEO' },
  { id: 'Productivity', label: 'Productivity' },
];

const TOOL_ICONS = {
  'gemini-ultra': Sparkles,
  'chatgpt-plus': Bot,
  'perplexity-pro': Search,
  'cursor-ide': Code2,
  'midjourney-v7': Wand2,
  'claude-sonnet': Cpu,
  'suno-music-ai': Music,
  'notion-ai': FileText,
};

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <Sparkles size={13} />
            <span>Verified AI Intelligence Hub</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Curated AI Tools Directory <span className="text-indigo-600">2026</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Kantar benchmark: +154% YoY search demand. Handpicked utility tools with free tiers, benchmark scores, and verified features.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-slate-950 text-white shadow-xs border border-slate-950'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tools (Refined Modern Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filtered.map(tool => {
          const ToolIcon = TOOL_ICONS[tool.id] || Sparkles;
          return (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between rounded-2xl p-5 bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs border bg-slate-50 border-slate-200 text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-50 transition-all">
                      <ToolIcon size={19} />
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 mb-1">
                        {tool.tagBadge || tool.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                        {tool.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-amber-800 text-xs font-semibold shrink-0">
                    <Star size={12} className="fill-amber-500 text-amber-500" />
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
