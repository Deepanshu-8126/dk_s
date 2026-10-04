import React from 'react';
import { Monitor, Cpu, Zap, HardDrive, CheckCircle2, ExternalLink } from 'lucide-react';

export default function GtaBenchmarkSpecs({
  currentGta,
  selectedRes,
  setSelectedRes,
}) {
  const currentSpecs = currentGta.specs[selectedRes];

  return (
    <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[#F8FAFC] border-t lg:border-t-0 lg:border-l border-[#E5E7EB]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4B5563] flex items-center gap-1.5">
            <Monitor size={14} className="text-cyan-600" />
            Target Performance Specs:
          </span>

          {/* Resolution Switcher */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E7EB]">
            {Object.keys(currentGta.specs).map(resKey => (
              <button
                key={resKey}
                onClick={() => setSelectedRes(resKey)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-all ${
                  selectedRes === resKey
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {resKey === 'minimum' ? '1080p' : resKey === 'recommended' ? '1440p' : '4K Ultra'}
              </button>
            ))}
          </div>
        </div>

        {/* Active Specs Detail Card */}
        {currentSpecs && (
          <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs mb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-cyan-700">
                🎯 Target: {currentSpecs.res}
              </span>
              <div className="text-right">
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Est. PC Cost: ~{currentSpecs.estimatedPcCost}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <Cpu size={15} className="text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#6B7280] text-[11px] block">Processor (CPU)</span>
                  <strong className="text-[#111827]">{currentSpecs.cpu}</strong>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Zap size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#6B7280] text-[11px] block">Graphics Card (GPU)</span>
                  <strong className="text-[#111827]">{currentSpecs.gpu}</strong>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Zap size={15} className="text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#6B7280] text-[11px] block">Memory (RAM)</span>
                  <strong className="text-[#111827]">{currentSpecs.ram}</strong>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <HardDrive size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#6B7280] text-[11px] block">Storage</span>
                  <strong className="text-[#111827]">{currentSpecs.storage}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Engine Highlights */}
        {currentGta.keyFeatures && (
          <div className="space-y-1.5 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
              Verified Engine Highlights:
            </span>
            {currentGta.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#374151]">
                <CheckCircle2 size={13} className="text-cyan-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-[#6B7280]">Planning to build this PC?</span>
        <a
          href="https://amazon.in/s?k=gaming+pc+components+deals&tag=shelfcreator-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-xs transition-all"
        >
          <span>Check Verified Component Deals</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
