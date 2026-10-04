import React from 'react';
import { Star } from 'lucide-react';
import { TRENDING_GAMES_INDIA } from '../../data/gamingData';
import SmartImage from '../common/SmartImage';

export default function TrendingGames() {
  return (
    <div>
      <h3 className="text-xl font-black text-[#111827] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Trending Games in India <span className="text-cyan-600">(Top Community Hits)</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRENDING_GAMES_INDIA.map((game, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-4 bg-white border border-[#E5E7EB] hover:border-cyan-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-900">
                <SmartImage
                  src={game.artwork}
                  keyword={game.keyword || game.name}
                  niche="gaming"
                  alt={game.name}
                  className="w-full h-full"
                  imgClassName="group-hover:scale-105 transition-transform duration-500 object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-bold text-amber-700 border border-amber-200 shadow-xs flex items-center gap-1">
                  <Star size={10} className="fill-amber-500 text-amber-500" />
                  <span>{game.rating}</span>
                </div>
                {game.publisher && (
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] font-bold text-cyan-300">
                    {game.publisher}
                  </div>
                )}
              </div>

              <h4 className="font-bold text-sm text-[#111827] group-hover:text-cyan-700 transition-colors">
                {game.name}
              </h4>
              <div className="flex items-center justify-between text-xs text-[#6B7280] mt-1 mb-2">
                <span>{game.genre}</span>
                <span className="text-emerald-700 font-bold">{game.priceStatus}</span>
              </div>
              <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                {game.tip}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#6B7280]">
              <span>Playerbase: <strong className="text-[#111827]">{game.playerBase}</strong></span>
              <span className="text-cyan-700 font-bold group-hover:translate-x-0.5 transition-transform">Explore →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
