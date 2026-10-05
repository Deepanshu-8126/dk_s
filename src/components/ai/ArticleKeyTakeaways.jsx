import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function ArticleKeyTakeaways({ bullets = [] }) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-950 p-5 md:p-6 shadow-xl backdrop-blur-md my-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
          <Sparkles className="h-4 w-4" />
        </div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-outfit">
          10-Second Key Takeaways
        </h4>
      </div>

      <div className="space-y-2.5">
        {bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
