import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import { getArticleVisualMeta } from './articleVisualMeta';

export default function ArticleCard({ article, onClick }) {
  const meta = getArticleVisualMeta(article);
  const FallbackIcon = meta.icon;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl bg-white border border-[#E5E7EB] hover:border-emerald-500 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Visual Preview */}
        <div className={`relative h-32 rounded-xl overflow-hidden mb-3 bg-gradient-to-br ${meta.gradient}`}>
          <SmartImage
            src={meta.src}
            keyword={article.keyword}
            niche={meta.niche}
            alt={article.imageAlt || article.title}
            className="w-full h-full"
            imgClassName="group-hover:scale-105 transition-transform duration-500"
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                <FallbackIcon size={26} className={`${meta.accent} mb-1 opacity-80`} />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  {meta.label}
                </span>
              </div>
            }
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-bold text-emerald-700 border border-emerald-200 shadow-xs">
            EEAT {article.wordCount}w
          </div>
        </div>

        {/* Title & Metadata */}
        <h3 className="font-bold text-sm text-[#111827] group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-2">
          {article.title}
        </h3>

        <p className="text-xs text-[#6B7280] line-clamp-2 mb-3 leading-relaxed">
          {article.metaDescription}
        </p>
      </div>

      {/* Author & Read Action */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-[#475569] mb-2">
          <span className="flex items-center gap-1 font-medium truncate max-w-[140px]">
            <User size={12} className="text-emerald-600 shrink-0" />
            {article.author?.name || 'Editorial Team'}
          </span>
          <span className="text-[10px] text-slate-400">
            {article.publishedAt ? article.publishedAt.split('T')[0] : '2026'}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
          <span>Read Full Verdict</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
