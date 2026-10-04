import React from 'react';
import { ArrowLeft, Calendar, Clock, ShieldCheck, ExternalLink, Image as ImageIcon, BookOpen } from 'lucide-react';
import SmartImage from './common/SmartImage';
import { ArticleRenderer, RelatedArticles } from './articles';
import SEO from './SEO';

export default function GuideArticleView({ article, onBack }) {
  if (!article) return null;

  const imageMeta = article.image || {};
  const imageAuthor = imageMeta.author || article.imageAuthor;
  const imageLicense = imageMeta.license || article.imageLicense;
  const imagePageUrl = imageMeta.pageUrl || article.imageSourceUrl;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: article.imageUrl || imageMeta.originalUrl || imageMeta.thumbUrl,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Pradeep Joshi',
      jobTitle: article.author?.role || 'Senior Analyst',
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
  };

  React.useEffect(() => {
    if (article?.slug) {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: article.slug, type: 'view' })
      }).catch(() => {});
    }
  }, [article?.slug]);

  return (
    <article className="max-w-4xl mx-auto py-6">
      <SEO
        title={article.title}
        description={article.metaDescription}
        canonicalPath={`/guide/${article.slug}`}
        ogImage={article.imageUrl || imageMeta.thumbUrl}
        ogType="article"
        schema={articleSchema}
      />

      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Guides</span>
        </button>
      )}

      <header className="mb-6">
        <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
          {article.keyword || 'Verified Editorial'}
        </span>
        <h1
          className="text-2xl md:text-4xl font-black text-[#111827] tracking-tight leading-tight mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#111827]">
                <span>{article.author?.name || 'Pradeep Joshi'}</span>
                <span className="inline-flex items-center text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  <ShieldCheck size={11} className="mr-0.5" /> Verified Author
                </span>
              </div>
              <div className="text-xs text-[#6B7280]">
                {article.author?.role || 'Senior Public Examinations Analyst'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              Published: {article.publishedAt ? article.publishedAt.split('T')[0] : '2026-10-04'}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {article.wordCount || 400} words
            </span>
          </div>
        </div>
      </header>

      {/* Hero Image & Attribution */}
      <div className="mb-8">
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-sm bg-slate-100">
          <SmartImage
            src={article.imageUrl || imageMeta.thumbUrl || imageMeta.originalUrl}
            keyword={article.keyword}
            alt={article.imageAlt || article.title}
            priority={true}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Real License Attribution */}
        {imageAuthor && (
          <div className="mt-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-center justify-between flex-wrap gap-2">
            <span className="flex items-center gap-1.5 truncate">
              <ImageIcon size={12} className="text-slate-400 shrink-0" />
              <span>Image Credit: <strong>{imageAuthor}</strong> ({imageLicense || 'Licensed Media'})</span>
            </span>
            {imagePageUrl && (
              <a
                href={imagePageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1 shrink-0"
              >
                <span>Wikimedia Commons</span>
                <ExternalLink size={10} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Article Content */}
      <ArticleRenderer content={article.content} />

      {/* Verified Grounded Sources */}
      {article.sources && article.sources.length > 0 && (
        <section className="mt-8 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <BookOpen size={15} className="text-purple-600" />
            <span>Verified Source Material & Grounding References</span>
          </h3>
          <ul className="space-y-2">
            {article.sources.map((s, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="font-bold text-slate-400">[{idx + 1}]</span>
                <div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-purple-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{s.title}</span>
                    <ExternalLink size={10} />
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{s.excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Author Bio Footer */}
      <footer className="mt-8 p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
          About the Author (Google EEAT Standard)
        </div>
        <div className="font-bold text-base text-[#111827] mb-1">
          {article.author?.name || 'Pradeep Joshi'}
        </div>
        <p className="text-xs text-[#4B5563] leading-relaxed">
          {article.author?.bio || 'Senior education journalist analyzing Staff Selection Commission normalization and regional cut-off matrices.'}
        </p>
      </footer>

      {/* Recommendations / Related Articles */}
      <RelatedArticles
        currentSlug={article.slug}
        onSelectArticle={(rec) => {
          window.history.pushState({}, '', `/guide/${rec.slug}`);
          window.location.reload();
        }}
      />
    </article>
  );
}
