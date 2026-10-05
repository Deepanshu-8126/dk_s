import { Clock, ShieldCheck, ArrowRight, User } from 'lucide-react';
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
        className="group relative col-span-full rounded-3xl bg-white border border-slate-200 p-6 md:p-8 hover:border-indigo-400 transition-all duration-300 shadow-xs hover:shadow-lg cursor-pointer my-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Image Box (7 Columns on Desktop) */}
          <div className="lg:col-span-7 relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <SmartImage
              src={imgSrc}
              keyword={article.keyword}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <span className="absolute top-4 left-4 rounded-full bg-white/90 text-indigo-900 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-white shadow-xs backdrop-blur-md">
              {article.keyword || 'Featured Lead'}
            </span>
          </div>

          {/* Hero Content (5 Columns on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck size={12} /> Grounded Review
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  <Clock size={12} className="inline mr-1 text-slate-400" />
                  {readingTimeMin} Min Read
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors font-outfit leading-tight">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                {article.metaDescription || article.snippet}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <User size={14} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">{article.author?.name || 'Pradeep Joshi'}</span>
                  <span className="text-[10px] text-slate-500">{article.publishedAt ? article.publishedAt.split('T')[0] : '2026-10-05'}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
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
        className="group relative flex flex-col sm:flex-row gap-5 rounded-3xl bg-white border border-slate-200 p-5 hover:border-indigo-400 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer my-2"
      >
        {/* Asymmetric Thumbnail (Fixed Aspect on Mobile / Tablet) */}
        <div className="sm:w-56 shrink-0 aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
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
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider font-mono">
                {article.keyword || 'Analysis'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">· {readingTimeMin} Min Read</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-outfit line-clamp-2 leading-snug">
              {article.title}
            </h3>

            <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
              {article.metaDescription || article.snippet}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>by {article.author?.name || 'UniqueDigit Editorial'}</span>
            <span className="flex items-center gap-1 text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
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
      className="group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200 p-4 hover:border-indigo-400 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
    >
      <div>
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-3.5 bg-slate-100 border border-slate-200">
          <SmartImage
            src={imgSrc}
            keyword={article.keyword}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 text-slate-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-slate-200 shadow-2xs backdrop-blur-md">
            {article.keyword || 'Guide'}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-outfit line-clamp-2 leading-snug mb-1.5">
          {article.title}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {article.metaDescription}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>{readingTimeMin} Min Read</span>
        <ArrowRight size={12} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </article>
  );
}
