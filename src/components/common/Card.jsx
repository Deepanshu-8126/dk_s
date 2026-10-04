import React from 'react';
import SmartImage from './SmartImage';

/**
 * Universal Reusable Card Component
 * Supports White UI standard and Cyber/Dark variant.
 */
export default function Card({
  theme = 'white', // 'white' | 'dark'
  badge = null,
  badgeColor = 'amber', // 'amber' | 'cyan' | 'indigo' | 'rose' | 'emerald'
  rating = null,
  title,
  subtitle = null,
  description = null,
  tags = [],
  price = null,
  priceLabel = null,
  actionText = null,
  onAction = null,
  keyword = null,
  niche = 'general',
  showImage = false,
  imageAspect = 'h-36',
  className = '',
  children,
}) {
  const isDark = theme === 'dark';

  const badgeStyles = {
    amber: isDark ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
    cyan: isDark ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' : 'bg-[#ECFEFF] text-[#0891B2] border-[#CFFAFE]',
    indigo: isDark ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' : 'bg-[#EEF2FF] text-[#4F46E5] border-[#E0E7FF]',
    rose: isDark ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : 'bg-[#FFF1F2] text-[#E11D48] border-[#FFE4E6]',
    emerald: isDark ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-[#ECFDF5] text-[#059669] border-[#D1FAE5]',
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl transition-all duration-200 ${
        isDark
          ? 'bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 p-5 shadow-lg'
          : 'bg-white border border-[#E5E7EB] hover:border-[#818CF8] p-5 shadow-xs hover:shadow-md'
      } ${className}`}
    >
      <div>
        {/* Optional Image */}
        {showImage && keyword && (
          <div className={`relative ${imageAspect} rounded-xl overflow-hidden mb-3.5`}>
            <SmartImage
              keyword={keyword}
              niche={niche}
              alt={title}
              className="w-full h-full"
              imgClassName="group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Top Header / Badges */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          {badge && (
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border ${
                badgeStyles[badgeColor] || badgeStyles.amber
              }`}
            >
              {badge}
            </span>
          )}
          {rating && (
            <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
              ★ {rating}
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        {title && (
          <h3
            className={`font-bold text-base leading-snug transition-colors ${
              isDark ? 'text-white group-hover:text-cyan-300' : 'text-[#111827] group-hover:text-[#4F46E5]'
            }`}
          >
            {title}
          </h3>
        )}
        {subtitle && (
          <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#6B7280]'}`}>
            {subtitle}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#4B5563]'}`}>
            {description}
          </p>
        )}

        {/* Custom Inner Content */}
        {children}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 mb-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[10px] px-2 py-0.5 rounded-md border ${
                  isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer / Pricing & Actions */}
      {(price || actionText) && (
        <div className={`pt-3 mt-3 border-t flex items-center justify-between gap-2 ${
          isDark ? 'border-slate-800' : 'border-[#F1F5F9]'
        }`}>
          {price && (
            <div>
              {priceLabel && (
                <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-[#6B7280]'}`}>
                  {priceLabel}
                </div>
              )}
              <div className={`font-mono font-bold text-lg ${isDark ? 'text-amber-400' : 'text-[#B45309]'}`}>
                {price}
              </div>
            </div>
          )}

          {actionText && (
            <button
              onClick={onAction}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isDark
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
                  : 'bg-[#111827] hover:bg-[#1F2937] text-white shadow-xs'
              }`}
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
