import React, { useState, useEffect } from 'react';
import { Sparkles, Star, ExternalLink, Layers, Check, Bot, Code2, Wand2, Cpu, Music, FileText, Search, ShieldCheck, Video } from 'lucide-react';
import { AI_TOOLS } from '../data/aiTools';
import AIToolModal from './ai/AIToolModal';

const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'Video Generation', label: 'Video AI' },
  { id: 'AI Assistant', label: 'Assistants & LLMs' },
  { id: 'Coding', label: 'Coding' },
  { id: 'Image & Art', label: 'Image & Art' },
  { id: 'Writing & Copy', label: 'Writing & SEO' },
  { id: 'Audio & Music', label: 'Audio & Music' },
];

const TOOL_ICONS = {
  'gemini-ultra': Sparkles,
  'chatgpt-plus': Bot,
  'perplexity-pro': Search,
  'cursor-ide': Code2,
  'midjourney-v7': Wand2,
  'claude-sonnet': Cpu,
  'suno-music-ai': Music,
  'suno-v4': Music,
  'notion-ai': FileText,
  'google-veo-2': Video,
  'kling-ai': Video,
  'luma-dream-machine': Video,
  'deepseek-v3': Cpu,
};

export default function AIToolsSection({ searchQuery }) {
  const [tools, setTools] = useState(AI_TOOLS);
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/ai-tools')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (mounted && data?.tools && data.tools.length > 0) {
          const discoveredIds = new Set(data.tools.map(t => t.id));
          const existingFiltered = AI_TOOLS.filter(t => !discoveredIds.has(t.id));
          setTools([...data.tools, ...existingFiltered]);
        }
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const filtered = tools.filter(tool => {
    const matchCat = selectedCat === 'all' || tool.category.toLowerCase().includes(selectedCat.toLowerCase());
    const q = (searchQuery || '').toLowerCase();
    const matchSearch = !q || 
      tool.name.toLowerCase().includes(q) || 
      tool.description.toLowerCase().includes(q) || 
      tool.category.toLowerCase().includes(q) ||
      (tool.useCase && tool.useCase.some(u => u.toLowerCase().includes(q)));
    return matchCat && matchSearch;
  });

  return (
    <section id="ai-tools" className="mb-10 text-slate-100">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>8-Pillar Authenticity Verified Engine</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display">
            Curated AI Tools Directory <span className="text-indigo-400">2026</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Auto-verified video models, frontier LLMs, and code agents audited for commercial safety, latency, and free tier allowances.
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
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
              className="group cursor-pointer relative flex flex-col justify-between rounded-2xl p-5 bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md border bg-slate-950 border-slate-800 text-indigo-400 group-hover:scale-105 group-hover:border-indigo-500/40 transition-all">
                      <ToolIcon size={19} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {tool.tagBadge || tool.category}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <ShieldCheck size={10} /> Verified
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug font-display">
                        {tool.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg text-amber-400 text-xs font-semibold shrink-0">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span>{tool.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 mb-3 leading-relaxed">
                  {tool.description}
                </p>

                {tool.useCase && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.useCase.map((uc, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                        #{uc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta & Action */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs mb-3 text-slate-400">
                  <span className="font-medium text-slate-300">
                    Pricing: <strong className="text-white">{tool.pricing}</strong>
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {tool.pricingType === 'freemium' ? 'Free Tier' : 'Pro Tier'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(tool.affiliateLink, '_blank');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md cursor-pointer"
                  >
                    <span>{tool.cta || 'Try Official Tool'}</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedTool && (
        <AIToolModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </section>
  );
}
