import React, { useState, useEffect } from 'react';
import { ShieldCheck, PenTool, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import UniversalEditorialCard from './common/UniversalEditorialCard';
import GuideArticleView from './GuideArticleView';
import { EditorialStudio } from './studio';
import { BlogApiClient } from '../services/geminiRotator';
import fallbackArticles from '../data/articles/published.json';

export default function ArticlesSection() {
  const [articles, setArticles] = useState(fallbackArticles?.articles || fallbackArticles || []);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticle, setActiveArticle] = useState(null);

  // Update URL when activeArticle changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (activeArticle) {
        // Update URL to guide article path
        window.history.pushState({}, '', `/guide/${activeArticle.slug}`);
      } else {
        // When clearing activeArticle, go back to home (or could try to restore previous state)
        window.history.pushState({}, '', '/');
      }
    }
  }, [activeArticle]);
  const [showStudio, setShowStudio] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await BlogApiClient.getPosts();
      if (Array.isArray(data.posts) && data.posts.length > 0) {
        setArticles(data.posts);
      }
    } catch {
      // Keep fallback static articles if server is unreachable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const limit = 8;
  const total = articles.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (currentPage - 1) * limit;
  const currentArticles = articles.slice(start, start + limit);

  const heroArticle = currentArticles[0];
  const sideArticles = currentArticles.slice(1, 3);
  const remainingArticles = currentArticles.slice(3);

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
            <ShieldCheck size={13} />
            <span>The Verge-Style Fact-Grounded Desk</span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit"
          >
            Verified Market Guides & <span className="text-cyan-600">Analysis</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
            Real source grounding, licensed media, and genuine market analysis audited by our 10-pillar verification engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStudio(!showStudio)}
            className="px-3.5 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <PenTool size={13} />
            <span>{showStudio ? 'Close Studio' : 'Editorial Studio'}</span>
          </button>
        </div>
      </div>

      {/* Editorial Studio Inline Drafter */}
      {showStudio && (
        <EditorialStudio
          onArticlePublished={() => {
            loadPosts();
            setShowStudio(false);
          }}
          onClose={() => setShowStudio(false)}
        />
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-300 shadow-xs">
          <BookOpen size={32} className="mx-auto text-slate-400 mb-2" />
          <h3 className="font-bold text-base text-slate-800 font-outfit">No Articles Published Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            No live posts found in data store. Use the Editorial Studio to fetch sources and draft an authentic article.
          </p>
          <button
            onClick={() => setShowStudio(true)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold hover:bg-cyan-700 transition-colors shadow-xs"
          >
            Open Editorial Studio
          </button>
        </div>
      )}

      {/* The Verge-Style Asymmetric Visual Rhythm */}
      <div className="space-y-6">
        {/* 1. Hero Lead Article */}
        {heroArticle && (
          <UniversalEditorialCard
            article={heroArticle}
            layoutVariant="hero"
            onClick={(a) => setActiveArticle(a)}
          />
        )}

        {/* 2. Asymmetric Secondary Stories */}
        {sideArticles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {sideArticles.map((art) => (
              <UniversalEditorialCard
                key={art.slug || art.id}
                article={art}
                layoutVariant="asymmetric"
                onClick={(a) => setActiveArticle(a)}
              />
            ))}
          </div>
        )}

        {/* 3. Compact Grid Remaining Stories */}
        {remainingArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {remainingArticles.map((art) => (
              <UniversalEditorialCard
                key={art.slug || art.id}
                article={art}
                layoutVariant="compact"
                onClick={(a) => setActiveArticle(a)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-mono">
            Page {currentPage} of {totalPages} ({total} guides)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
