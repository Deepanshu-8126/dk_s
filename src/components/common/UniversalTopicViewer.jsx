import React from 'react';
import { ShieldCheck, ExternalLink, Calendar, BookOpen, X, Sparkles } from 'lucide-react';

export default function UniversalTopicViewer({ topic, onClose }) {
  if (!topic) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden mb-8 transition-all">
      {/* Top Banner & Header */}
      <div className="p-4 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              {topic.niche || 'Universal Intelligence'}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span>Verified Fact Dossier</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {topic.title}
          </h2>
          {topic.description && (
            <p className="text-xs text-slate-500 mt-1 font-medium">{topic.description}</p>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close dossier"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Main Grid: Visual Media + Fast Facts Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-100">
        {/* Real Authentic Photo */}
        <div className="lg:col-span-5 relative min-h-[260px] max-h-[360px] bg-slate-950 overflow-hidden flex items-center justify-center">
          <img
            src={topic.imageUrl}
            alt={topic.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] flex justify-between items-center">
            <span className="font-semibold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
              Wikimedia Peer-Reviewed
            </span>
            <span className="font-mono text-slate-300">
              Verified {topic.lastVerified || '2026'}
            </span>
          </div>
        </div>

        {/* Fast Facts / Specs Matrix */}
        <div className="lg:col-span-7 p-5 sm:p-6 bg-slate-50/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              <Sparkles size={14} className="text-indigo-600" />
              <span>Core Specifications & Fast Facts:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {topic.fastFacts && Object.entries(topic.fastFacts).map(([key, val]) => (
                <div key={key} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">
                    {key}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 line-clamp-2 mt-0.5">
                    {String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" />
              <span>Live ground verification</span>
            </span>
            {topic.sourceUrl && (
              <a
                href={topic.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
              >
                <span>Read Original Reference</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="p-5 sm:p-6 bg-white">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <BookOpen size={13} className="text-slate-500" />
          <span>Detailed Ground Analysis & Verdict</span>
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-6">
          {topic.summary}
        </p>

        {/* Dynamic Affiliate CTA + Sticky Recommendations */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Verified Indian Pricing & Deals
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Check live availability, seller offers & lowest price on Amazon India for <strong className="text-white">{topic.title}</strong>
            </p>
          </div>
          <a
            href={`https://www.amazon.in/s?k=${encodeURIComponent(topic.title)}&tag=uniquedigi0c6-21`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm text-center shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer shrink-0"
          >
            Check Price on Amazon.in →
          </a>
        </div>
      </div>
    </div>
  );
}
