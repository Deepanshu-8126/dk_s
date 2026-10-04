import React, { useState } from 'react';
import { Award, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { getArticlesPage } from '../data/articles/index.js';
import { ArticleCard } from './articles';
import GuideArticleView from './GuideArticleView';

/**
 * ArticlesSection Component
 * Displays Agentic EEAT-verified long-tail articles passing Critic quality audits.
 * Features pagination & dynamic reader with full Google EEAT Author Entity.
 */
export default function ArticlesSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticle, setActiveArticle] = useState(null);

  const { articles, total, totalPages, hasNext, hasPrev } = getArticlesPage(currentPage, 8);

  if (!articles || articles.length === 0) {
    return null;
  }

  // If viewing a full article guide
  if (activeArticle) {
    return (
      <div className="mb-12">
        <GuideArticleView
          article={activeArticle}
          onBack={() => setActiveArticle(null)}
        />
      </div>
    );
  }

  return (
    <section id="guides" className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
              <ShieldCheck size={14} /> Google EEAT & Helpful Content Verified
            </span>
          </div>
          <h2
            className="text-xl md:text-2xl font-black text-[#111827]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Verified Market Guides & <span className="text-emerald-600">Verdicts</span>
          </h2>
          <p className="text-xs text-[#4B5563] mt-1 max-w-xl">
            Autonomous multi-agent research. Factual ground realities, long-tail regional prices, and honest buying verdicts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
          <Award size={14} className="text-amber-500" />
          <span>Critic Audit Passed (<strong className="text-slate-800">100% Unique</strong>)</span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            onClick={() => setActiveArticle(article)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Showing Page {currentPage} of {totalPages} ({total} guides)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={!hasPrev}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1"
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={!hasNext}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1"
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
