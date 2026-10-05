import React from 'react';
import { Sparkles } from 'lucide-react';
import nichesCatalog from '../../data/nichesCatalog.json';
import UniversalCard from './UniversalCard';

export default function RelatedCrossNiche({ currentId, currentTags = [], onSelect = null }) {
  const allItems = (nichesCatalog.niches || []).flatMap((n) =>
    (n.items || []).map((item) => ({ ...item, accent: n.accent }))
  );

  // Find matches by tags, excluding current item
  const related = allItems
    .filter((item) => item.id !== currentId)
    .map((item) => {
      const matchScore = (item.tags || []).filter((t) => currentTags.includes(t)).length;
      return { ...item, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h3 className="text-xl font-bold font-outfit text-white">Cross-Niche Recommendations</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((item) => (
          <UniversalCard key={item.id} item={item} accent={item.accent} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
