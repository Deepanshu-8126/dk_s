import React, { useState } from 'react';
import { Sparkles, Star, ExternalLink, Layers, Check, Bot, Code2, Wand2, Cpu, Music, FileText, Search, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
  const [selectedTool, setSelectedTool] = useState(null);
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

  const handleShare = (e, id, link) => {
    e.stopPropagation();
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
            <span>Curated AI Intelligence Hub</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Curated AI Tools Directory <span className="text-indigo-600">2026</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Click any tool to inspect real-world capabilities, Indian INR pricing, and free tier allowances.
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

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filtered.map(tool => {
          const ToolIcon = TOOL_ICONS[tool.id] || Sparkles;
          return (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="group cursor-pointer relative flex flex-col justify-between rounded-2xl p-5 bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Top Row */}
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

                <p className="text-xs text-slate-500 line-clamp-3 mb-3 leading-relaxed">
                  {tool.description}
                </p>

                {tool.useCase && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.useCase.map((uc, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        #{uc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta & Action */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-3 text-slate-500">
                  <span className="font-medium text-slate-700">
                    Pricing: <strong className="text-slate-900">{tool.pricing}</strong>
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    {tool.pricingType === 'freemium' ? 'Free Tier Included' : 'Pro Tier Available'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(tool.affiliateLink, '_blank');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xs cursor-pointer"
                  >
                    <span>{tool.cta || 'Try Official Tool'}</span>
                    <ExternalLink size={13} />
                  </button>
                  <button
                    onClick={(e) => handleShare(e, tool.id, tool.affiliateLink)}
                    title="Copy direct link"
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedId === tool.id ? <Check size={14} className="text-emerald-600" /> : <Layers size={14} />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Detail Modal for Selected Tool */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedTool(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedTool.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">{selectedTool.category}</span>
                </div>
              </div>
              <button onClick={() => setSelectedTool(null)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <strong className="text-slate-800 block mb-1">What this tool is used for:</strong>
                <p className="text-slate-600 leading-relaxed">{selectedTool.description}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Pricing Model:</span>
                  <strong className="text-slate-900 font-mono text-sm">{selectedTool.pricing}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Verified Rating:</span>
                  <span className="font-bold text-amber-700">★ {selectedTool.rating} ({selectedTool.reviewCount} users)</span>
                </div>
              </div>

              <div>
                <strong className="text-slate-800 block mb-2">Primary Workflows:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTool.useCase?.map((uc, i) => (
                    <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium text-[11px]">
                      <CheckCircle2 size={11} /> {uc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <a
                  href={selectedTool.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Launch Official Workspace</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
