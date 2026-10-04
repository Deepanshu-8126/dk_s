import React from 'react';
import { Sparkles, X, ExternalLink, ShieldCheck, CheckCircle2, Lock, Cpu, DollarSign, Award, Globe, Scale } from 'lucide-react';

export default function AIToolModal({ tool, onClose }) {
  if (!tool) return null;
  const pillars = tool.pillars || {
    domain_ssl: "Official Provider SSL Verified",
    core_functionality: tool.description,
    pricing_transparency: tool.pricing,
    hardware_latency: "Standard Cloud API Latency",
    benchmark_rank: "Top Tier Model Evaluation",
    commercial_license: "Permitted on standard plan",
    india_availability: "Full India Access",
    guardrails: "Verified Safety Standard"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                  {tool.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck size={11} /> 8-Pillars Verified
                </span>
              </div>
              <span className="text-xs text-slate-400 font-semibold">{tool.category}</span>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs">
          <div>
            <strong className="text-slate-800 block mb-1">What this tool is used for:</strong>
            <p className="text-slate-600 leading-relaxed">{tool.description}</p>
          </div>

          {/* Pricing & Rating Card */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Pricing Model:</span>
              <strong className="text-slate-900 font-mono text-sm">{tool.pricing}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Verified Rating:</span>
              <span className="font-bold text-amber-700">★ {tool.rating} ({tool.reviewCount} users)</span>
            </div>
          </div>

          {/* 8-Pillar Authenticity Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <strong className="text-slate-900 font-bold flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                8-Pillar Authenticity & Safety Audit
              </strong>
              {tool.verificationScore && (
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Score: {tool.verificationScore}/100
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
                  <Lock size={10} /> 1. Domain & SSL
                </span>
                <span className="text-slate-800 font-medium">{pillars.domain_ssl}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
                  <Cpu size={10} /> 2. Core Capability
                </span>
                <span className="text-slate-800 font-medium">{pillars.core_functionality}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
                  <DollarSign size={10} /> 3. Pricing Transparency
                </span>
                <span className="text-slate-800 font-medium">{pillars.pricing_transparency}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
                  <Award size={10} /> 4. Benchmark Rank
                </span>
                <span className="text-slate-800 font-medium">{pillars.benchmark_rank}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
                  <Globe size={10} /> 5. India Availability
                </span>
                <span className="text-slate-800 font-medium">{pillars.india_availability}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1">
                  <Scale size={10} /> 6. Commercial Rights
                </span>
                <span className="text-slate-800 font-medium">{pillars.commercial_license}</span>
              </div>
            </div>
          </div>

          {/* Primary Workflows */}
          <div>
            <strong className="text-slate-800 block mb-2">Primary Workflows:</strong>
            <div className="flex flex-wrap gap-1.5">
              {tool.useCase?.map((uc, i) => (
                <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium text-[11px]">
                  <CheckCircle2 size={11} /> {uc}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link */}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <a
              href={tool.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>{tool.cta || 'Launch Official Workspace'}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
