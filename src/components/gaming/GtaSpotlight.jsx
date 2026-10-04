import React from 'react';
import { ExternalLink, Monitor, Cpu, Zap, HardDrive, CheckCircle2 } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import { isDataStale, STALE_BADGE_TEXT } from '../../data/realData';
import { getCuratedMedia } from '../../data/curatedMedia';
import { buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function GtaSpotlight({
  currentGta,
  selectedRes,
  setSelectedRes,
  steamGtaPrice,
  activeGtaTab,
}) {
  const curatedArtwork = getCuratedMedia(currentGta.title);
  const currentSpecs = currentGta.specs ? currentGta.specs[selectedRes] : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Game Preview & Store Pricing */}
        <div className="lg:col-span-5 relative min-h-[320px] flex flex-col justify-end p-6 overflow-hidden bg-slate-950">
          <SmartImage
            src={curatedArtwork}
            keyword={currentGta.imageKeyword || currentGta.title}
            niche="gaming"
            alt={currentGta.title}
            priority={true}
            className="absolute inset-0 w-full h-full"
            imgClassName="transition-transform duration-700 hover:scale-105 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />

          <div className="relative z-10 text-white">
            <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-sky-500 text-slate-950 mb-2 font-mono">
              {currentGta.tag}
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {currentGta.title}
            </h3>
            <p className="text-xs text-slate-200 mt-1.5 line-clamp-3 leading-relaxed">
              {currentGta.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300 block text-[11px]">Current Price</span>
                  {activeGtaTab === 'gta-5-premium' && steamGtaPrice?.isLive && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      STEAM LIVE
                    </span>
                  )}
                </div>
                <span className="text-lg font-black text-cyan-300 font-mono">
                  {activeGtaTab === 'gta-5-premium' ? steamGtaPrice?.currentPrice : currentGta.expectedPrice}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-300 block text-[11px]">Platform</span>
                <span className="text-xs font-semibold text-white">{currentGta.platform}</span>
              </div>
            </div>

            {currentGta.storeDeals && (
              <div className="mt-3 flex flex-wrap gap-2">
                {currentGta.storeDeals.map((deal, idx) => (
                  <a
                    key={idx}
                    href={deal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800/90 text-slate-100 hover:text-white border border-slate-600 flex items-center gap-1 transition-colors"
                  >
                    <span>{deal.store}:</span>
                    <span className="text-emerald-400 font-mono">{deal.price}</span>
                    <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Unified Performance & Benchmark Matrix */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[#F8FAFC] border-t lg:border-t-0 lg:border-l border-[#E5E7EB]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4B5563] flex items-center gap-1.5">
                <Monitor size={14} className="text-cyan-600" />
                Target Specs & Benchmarks:
              </span>

              {currentGta.specs && (
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
              )}
            </div>

            {currentSpecs && (
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs mb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-cyan-700">🎯 Target: {currentSpecs.res}</span>
                  <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Est. Cost: ~{currentSpecs.estimatedPcCost}
                  </span>
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

            {currentGta.keyFeatures && (
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                  Engine Highlights:
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
              href={buildAmazonAffiliateUrl('gaming pc components deals')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-xs transition-all cursor-pointer"
            >
              <span>Check Verified Component Deals</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
