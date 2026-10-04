import React from 'react';
import { ExternalLink } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import { isDataStale, STALE_BADGE_TEXT } from '../../data/realData';
import { getCuratedMedia } from '../../data/curatedMedia';
import GtaBenchmarkSpecs from './GtaBenchmarkSpecs';

export default function GtaSpotlight({
  currentGta,
  selectedRes,
  setSelectedRes,
  steamGtaPrice,
  activeGtaTab,
}) {
  const curatedArtwork = getCuratedMedia(currentGta.title);

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-xs overflow-hidden mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Game Preview & Store Pricing */}
        <div className="lg:col-span-5 relative min-h-[320px] flex flex-col justify-end p-6 overflow-hidden bg-slate-900">
          <SmartImage
            src={curatedArtwork}
            keyword={currentGta.imageKeyword || currentGta.title}
            niche="gaming"
            alt={currentGta.title}
            priority={true}
            className="absolute inset-0 w-full h-full"
            imgClassName="transition-transform duration-700 hover:scale-105 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          <div className="relative z-10 text-white">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 mb-2">
              {currentGta.tag}
            </span>
            <h3 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {currentGta.title}
            </h3>
            <p className="text-xs text-slate-200 mt-1.5 line-clamp-3 leading-relaxed">
              {currentGta.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300 block text-[11px]">Current India Price</span>
                  {activeGtaTab === 'gta-5-premium' && steamGtaPrice.isLive && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      STEAM LIVE
                    </span>
                  )}
                </div>
                <span className="text-lg font-black text-cyan-300 font-mono">
                  {activeGtaTab === 'gta-5-premium' ? steamGtaPrice.currentPrice : currentGta.expectedPrice}
                </span>
                <span className="text-[10px] text-slate-300 block font-mono">
                  {activeGtaTab === 'gta-5-premium' ? steamGtaPrice.verifiedLabel : `Verified ${currentGta.lastVerified || 'Oct 2026'}`}
                </span>
                {isDataStale(currentGta.lastVerified) && (
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {STALE_BADGE_TEXT}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-slate-300 block text-[11px]">Target Platform</span>
                <span className="text-xs font-semibold text-white">
                  {currentGta.platform}
                </span>
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

        {/* Right Column: Interactive Benchmark Specs */}
        <GtaBenchmarkSpecs
          currentGta={currentGta}
          selectedRes={selectedRes}
          setSelectedRes={setSelectedRes}
        />
      </div>
    </div>
  );
}
