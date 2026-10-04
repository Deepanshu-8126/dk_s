import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import ArticleCard from './ArticleCard';
import publishedArticles from '../../data/articles/published.json';

export default function RelatedArticles({ currentSlug, onSelectArticle }) {
  const recommendations = (publishedArticles || [])
    .filter(a => a.slug !== currentSlug)
    .slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1 mb-1">
            <Sparkles size={13} /> Recommended Next
          </span>
          <h3 className="text-lg font-black text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
            More Verified Editorial Guides
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map(article => (
          <ArticleCard
            key={article.slug}
            article={article}
            onClick={() => {
              if (onSelectArticle) onSelectArticle(article);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </section>
  );
}
