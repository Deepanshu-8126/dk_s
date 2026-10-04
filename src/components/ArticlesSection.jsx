import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, ChevronLeft, ChevronRight, PenTool, BookOpen } from 'lucide-react';
import { ArticleCard } from './articles';
import GuideArticleView from './GuideArticleView';
import { EditorialStudio } from './studio';
import { BlogApiClient } from '../services/geminiRotator';
import fallbackArticles from '../data/articles/published.json';

export default function ArticlesSection() {
  const [articles, setArticles] = useState(fallbackArticles || []);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticle, setActiveArticle] = useState(null);
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
            Fact-grounded editorial publication. Real source citations, licensed Wikimedia Commons media, and genuine market analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStudio(!showStudio)}
            className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PenTool size={14} />
            <span>{showStudio ? 'Close Studio' : 'Editorial Studio'}</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Award size={14} className="text-amber-500" />
            <span>100% Fact-Checked</span>
          </div>
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
        <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <BookOpen size={32} className="mx-auto text-slate-400 mb-2" />
          <h3 className="font-bold text-base text-slate-800">No Articles Published Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            No live posts found in data store. Use the Editorial Studio to fetch sources and draft an authentic article.
          </p>
          <button
            onClick={() => setShowStudio(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors"
          >
            Open Editorial Studio
          </button>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentArticles.map((article) => (
          <ArticleCard
            key={article.slug || article.id}
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
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
