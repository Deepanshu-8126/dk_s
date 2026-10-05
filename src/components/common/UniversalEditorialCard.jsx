import React from 'react';
import { Clock, ShieldCheck, ArrowRight, Sparkles, User } from 'lucide-react';
import SmartImage from './SmartImage';

/**
 * UniversalEditorialCard (The Verge Style Elite Layout Engine)
 * Renders 'hero', 'asymmetric', or 'compact' based on layoutVariant in JSON/props.
 */
export default function UniversalEditorialCard({
  article,
  layoutVariant = 'compact',
  onClick = null
}) {
  if (!article) return null;

  const isHero = layoutVariant === 'hero' || article.layoutVariant === 'hero';
  const isAsymmetric = layoutVariant === 'asymmetric' || article.layoutVariant === 'asymmetric';

  const readingTimeMin = Math.max(2, Math.ceil((article.wordCount || 450) / 180));
  const imageMeta = article.image || {};
  const imgSrc = article.imageUrl || imageMeta.thumbUrl || imageMeta.originalUrl;

  if (isHero) {
    return (
      <article
        onClick={() => onClick && onClick(article)}
        className="group relative col-span-full rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 md:p-8 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl backdrop-blur-xl cursor-pointer my-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Image Box (7 Columns on Desktop) */}
          <div className="lg:col-span-7 relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <SmartImage
              src={imgSrc}
              keyword={article.keyword}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <span className="absolute top-4 left-4 rounded-full bg-cyan-500/20 text-cyan-300 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-cyan-500/30 backdrop-blur-md">
              {article.keyword || 'Featured Lead'}
            </span>
          </div>

          {/* Hero Content (5 Columns on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ShieldCheck size={12} /> Grounded Review
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  <Clock size={12} className="inline mr-1" />
                  {readingTimeMin} Min Read
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors font-outfit leading-tight">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                {article.metaDescription || article.snippet}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <User size={14} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block leading-tight">{article.author?.name || 'Pradeep Joshi'}</span>
                  <span className="text-[10px] text-slate-500">{article.publishedAt ? article.publishedAt.split('T')[0] : '2026-10-05'}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Read Full Story</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (isAsymmetric) {
    return (
      <article
        onClick={() => onClick && onClick(article)}
        className="group relative flex flex-col sm:flex-row gap-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 hover:border-cyan-500/40 transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer my-2"
      >
        {/* Asymmetric Thumbnail (Fixed Aspect on Mobile / Tablet) */}
        <div className="sm:w-56 shrink-0 aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
          <SmartImage
            src={imgSrc}
            keyword={article.keyword}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Story Body */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider font-mono">
                {article.keyword || 'Analysis'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">· {readingTimeMin} Min Read</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-outfit line-clamp-2 leading-snug">
              {article.title}
            </h3>

            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
              {article.metaDescription || article.snippet}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>by {article.author?.name || 'UniqueDigit Editorial'}</span>
            <span className="flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Read Story</span>
              <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Default: Compact Grid Card
  return (
    <article
      onClick={() => onClick && onClick(article)}
      className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/70 border border-slate-800/80 p-4 hover:border-cyan-500/40 transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer"
    >
      <div>
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-3.5 bg-slate-950 border border-slate-800">
          <SmartImage
            src={imgSrc}
            keyword={article.keyword}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2.5 left-2.5 rounded-full bg-slate-950/80 text-cyan-300 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-slate-700 backdrop-blur-md">
            {article.keyword || 'Guide'}
          </span>
        </div>

        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-outfit line-clamp-2 leading-snug mb-1.5">
          {article.title}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {article.metaDescription}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span>{readingTimeMin} Min Read</span>
        <ArrowRight size={12} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </article>
  );
}
