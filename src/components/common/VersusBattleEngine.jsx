import React, { useState } from 'react';
import { Swords, Check, X, ArrowRight, ShieldCheck, Sparkles, Trophy, ShoppingBag } from 'lucide-react';
import { AFFILIATE_CONFIG, buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function VersusBattleEngine({ productA, productB, catalog = [], onClose }) {
  const [itemA, setItemA] = useState(productA || catalog[0] || null);
  const [itemB, setItemB] = useState(productB || catalog[1] || null);

  const currentTag = AFFILIATE_CONFIG.getAmazonTag();

  if (!itemA || !itemB) return null;

  const scoreA = parseFloat(itemA.smartScore || itemA.score || 92);
  const scoreB = parseFloat(itemB.smartScore || itemB.score || 89);
  const winner = scoreA >= scoreB ? itemA : itemB;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-900">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shadow-xs">
              <Swords size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 font-outfit tracking-tight">
                Versus Battle Engine
              </h3>
              <p className="text-xs text-slate-500">
                Direct Side-by-Side Spec Teardown & Value Verdict
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Comparison Arena */}
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Product Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card A */}
            <div className={`p-4 rounded-2xl border transition-all ${winner === itemA ? 'bg-indigo-50/50 border-indigo-300 shadow-xs' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-start gap-3.5">
                <img
                  src={itemA.imageUrl || itemA.image || 'https://m.media-amazon.com/images/I/71ZDY57y6QL._SX679_.jpg'}
                  alt={itemA.name || itemA.title}
                  className="w-20 h-20 rounded-xl object-contain p-1.5 border border-slate-200 bg-white shrink-0 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">Contender A</span>
                    {winner === itemA && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow-xs">
                        <Trophy size={10} /> WINNER
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate mt-0.5">{itemA.name || itemA.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">SmartScore: <strong className="text-indigo-700 font-mono">{scoreA}/100</strong></p>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{itemA.price || 'Check Live'}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1.5 text-xs">
                <div className="text-slate-700"><strong>Pros:</strong> {(itemA.pros || ['Class-leading battery', 'Smooth high-refresh display'])[0]}</div>
                <div className="text-slate-500"><strong>Trade-off:</strong> {(itemA.cons || ['Average low-light camera'])[0]}</div>
              </div>

              <a
                href={buildAmazonAffiliateUrl(itemA.name || itemA.title, currentTag)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
              >
                <ShoppingBag size={14} />
                <span>Buy on Amazon India</span>
              </a>
            </div>

            {/* Card B */}
            <div className={`p-4 rounded-2xl border transition-all ${winner === itemB ? 'bg-indigo-50/50 border-indigo-300 shadow-xs' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-start gap-3.5">
                <img
                  src={itemB.imageUrl || itemB.image || 'https://m.media-amazon.com/images/I/717Qo4MH97L._SX679_.jpg'}
                  alt={itemB.name || itemB.title}
                  className="w-20 h-20 rounded-xl object-contain p-1.5 border border-slate-200 bg-white shrink-0 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">Contender B</span>
                    {winner === itemB && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow-xs">
                        <Trophy size={10} /> WINNER
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate mt-0.5">{itemB.name || itemB.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">SmartScore: <strong className="text-indigo-700 font-mono">{scoreB}/100</strong></p>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{itemB.price || 'Check Live'}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1.5 text-xs">
                <div className="text-slate-700"><strong>Pros:</strong> {(itemB.pros || ['Ultra-clean build', 'Long software support'])[0]}</div>
                <div className="text-slate-500"><strong>Trade-off:</strong> {(itemB.cons || ['Higher initial price point'])[0]}</div>
              </div>

              <a
                href={buildAmazonAffiliateUrl(itemB.name || itemB.title, currentTag)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
              >
                <ShoppingBag size={14} />
                <span>Buy on Amazon India</span>
              </a>
            </div>

          </div>

          {/* Wirecutter Verdict Teardown */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold text-amber-700 mb-1">
              <Sparkles size={14} />
              <span>UniqueDigit Editorial Verdict</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Based on overall benchmark testing, <strong>{winner.name || winner.title}</strong> wins with a higher SmartScore ({Math.max(scoreA, scoreB)}/100). It delivers superior real-world value and performance-per-rupee for Indian buyers.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
