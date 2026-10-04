import React from 'react';
import { ArrowLeft, Calendar, Clock, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';
import SmartImage from './common/SmartImage';
import { ArticleRenderer } from './articles';
import SEO from './SEO';

/**
 * Dedicated SEO-Friendly Guide Article View
 * Renders full Google EEAT Author Entity, Timestamps, and Article Schema
 */
export default function GuideArticleView({ article, onBack }) {
  if (!article) return null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: article.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Gold_bullion_2.jpg',
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Vikramaditya Rathore',
      jobTitle: article.author?.role || 'Senior Analyst',
      url: 'https://uniquedigit.in/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UniqueDigit Media Group',
      logo: {
        '@type': 'ImageObject',
        url: 'https://uniquedigit.in/favicon.svg',
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://uniquedigit.in/guide/${article.slug}`,
    },
  };

  return (
    <article className="max-w-4xl mx-auto py-6">
      {/* Dynamic SEO Head with Article Schema */}
      <SEO
        title={article.title}
        description={article.metaDescription}
        canonicalPath={`/guide/${article.slug}`}
        ogImage={article.imageUrl || 'https://uniquedigit.in/favicon.svg'}
        ogType="article"
        schema={articleSchema}
      />

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Guides</span>
        </button>
      )}

      {/* Header */}
      <header className="mb-8">
        <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
          {article.keyword}
        </span>
        <h1
          className="text-2xl md:text-4xl font-black text-[#111827] tracking-tight leading-tight mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {article.title}
        </h1>

        {/* EEAT Author & Timestamp Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center gap-3">
            {article.author?.avatar && (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/20"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#111827]">
                <span>{article.author?.name}</span>
                <span className="inline-flex items-center text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  <ShieldCheck size={11} className="mr-0.5" /> Verified Author
                </span>
              </div>
              <div className="text-xs text-[#6B7280]">
                {article.author?.role}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              Published: {article.publishedAt ? article.publishedAt.split('T')[0] : 'Today'}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {article.wordCount} words
            </span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-sm">
        <SmartImage
          src={article.imageUrl}
          keyword={article.keyword}
          alt={article.imageAlt || article.title}
          priority={true}
          className="w-full h-full"
        />
      </div>

      {/* Article Content */}
      <ArticleRenderer content={article.content} />

      {/* Author Bio Footer */}
      <footer className="mt-12 p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
          About the Author (Google EEAT Standard)
        </div>
        <div className="font-bold text-base text-[#111827] mb-1">
          {article.author?.name}
        </div>
        <p className="text-xs text-[#4B5563] leading-relaxed">
          {article.author?.bio}
        </p>
      </footer>
    </article>
  );
}
