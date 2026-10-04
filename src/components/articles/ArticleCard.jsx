import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import { getArticleVisualMeta } from './articleVisualMeta';

export default function ArticleCard({ article, onClick }) {
  const meta = getArticleVisualMeta(article);
  const FallbackIcon = meta.icon;
  const readMins = Math.max(2, Math.round((article.wordCount || 850) / 220));

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-slate-300 p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        {/* Visual Preview (Cinematic 44-48px height, object-cover) */}
        <div className={`relative h-44 sm:h-48 rounded-xl overflow-hidden mb-3.5 bg-slate-900 bg-gradient-to-br ${meta.gradient}`}>
          <SmartImage
            src={article.image?.thumbUrl || article.imageUrl || meta.src}
            keyword={article.keyword}
            niche={meta.niche}
            alt={article.imageAlt || article.title}
            className="w-full h-full"
            imgClassName="group-hover:scale-105 transition-transform duration-700 object-cover w-full h-full"
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                <FallbackIcon size={28} className={`${meta.accent} mb-1.5 opacity-80`} />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  {meta.label}
                </span>
              </div>
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" />

          {/* Category Chip */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 shadow-xs">
            {meta.label || 'GUIDE'}
          </div>

          {/* Reading Time */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-semibold text-slate-800 shadow-xs border border-white/60">
            {readMins} min read
          </div>
        </div>

        {/* Title & Metadata */}
        <h3 className="font-bold text-[15px] text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          {article.title}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {article.metaDescription}
        </p>
      </div>

      {/* Author & Read Action */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="flex items-center gap-1.5 font-medium truncate max-w-[150px]">
            <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 text-[10px] font-bold">
              {(article.author?.name || 'U')[0]}
            </span>
            <span className="truncate">{article.author?.name || 'Editorial Team'}</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {article.publishedAt ? article.publishedAt.split('T')[0] : '2026'}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
          <span>Read In-Depth Guide</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
