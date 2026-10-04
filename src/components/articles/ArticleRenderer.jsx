import React from 'react';
import { CheckCircle2, Target } from 'lucide-react';

/**
 * Format inline markdown: **bold**, [link](url), `code`
 */
function renderInlineText(text) {
  if (!text) return null;

  // Split by links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIdx = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push({ type: 'text', content: text.substring(lastIdx, match.index) });
    }
    parts.push({ type: 'link', text: match[1], url: match[2] });
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIdx) });
  }

  return parts.map((part, pIdx) => {
    if (part.type === 'link') {
      return (
        <a
          key={pIdx}
          href={part.url}
          className="text-emerald-700 hover:text-emerald-800 font-semibold underline decoration-emerald-300 underline-offset-2"
        >
          {part.text}
        </a>
      );
    }

    // Process bold (**bold**)
    const boldParts = part.content.split(/\*\*(.*?)\*\*/g);
    return boldParts.map((sub, sIdx) => {
      if (sIdx % 2 === 1) {
        return (
          <strong key={`${pIdx}-${sIdx}`} className="font-bold text-[#111827]">
            {sub}
          </strong>
        );
      }
      return sub;
    });
  });
}

/**
 * Robust, production-grade Article Content Renderer
 * Parses headings, bullet points, numbered steps, tables, and verdict cards.
 */
export default function ArticleRenderer({ content }) {
  if (!content) return null;

  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6 text-[#334155] leading-relaxed text-sm md:text-base">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Headings (### or ##)
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={idx}
              className="text-lg md:text-xl font-black text-[#111827] pt-5 pb-2 border-b border-[#E5E7EB] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="w-1.5 h-5 rounded-full bg-emerald-600 inline-block" />
              {trimmed.replace(/^###\s+/, '')}
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className="text-xl md:text-2xl font-black text-[#111827] pt-6 pb-2 border-b border-[#E5E7EB]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {trimmed.replace(/^##\s+/, '')}
            </h2>
          );
        }

        // 2. Verdict / Callout Cards
        if (trimmed.toLowerCase().includes('verdict:') || trimmed.startsWith('>')) {
          const cleanText = trimmed.replace(/^>\s*/, '').replace(/\*\*Verdict:[^*]+\*\*/i, '').trim();
          return (
            <div
              key={idx}
              className="p-5 my-6 rounded-2xl bg-[#FEF3C7]/40 border border-[#FDE68A] shadow-xs"
            >
              <div className="flex items-center gap-2 text-[#B45309] font-black text-sm uppercase tracking-wider mb-2">
                <Target size={18} className="text-[#B45309]" />
                <span>Expert Recommendation & Verdict</span>
              </div>
              <div className="text-sm md:text-base text-[#78350F] leading-relaxed font-medium">
                {renderInlineText(cleanText || trimmed)}
              </div>
            </div>
          );
        }

        // 3. Bullet Lists (- or *)
        const lines = trimmed.split('\n');
        const isBulletList = lines.every(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
        if (isBulletList) {
          return (
            <ul key={idx} className="space-y-2.5 my-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              {lines.map((line, lIdx) => {
                const itemContent = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <li key={lIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#374151]">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{renderInlineText(itemContent)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 4. Regular Paragraphs
        return (
          <p key={idx} className="text-xs md:text-sm text-[#374151] leading-relaxed">
            {renderInlineText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
