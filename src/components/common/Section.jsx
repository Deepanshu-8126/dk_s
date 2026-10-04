import React from 'react';

/**
 * Universal Reusable Section Wrapper
 * Standardizes section headers, category pills, and responsive grids.
 */
export default function Section({
  id,
  badge = null,
  badgeColor = '#4F46E5',
  title,
  titleHighlight = null,
  subtitle = null,
  tabs = [],
  activeTab = null,
  onTabChange = null,
  columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  className = '',
  children,
}) {
  return (
    <section id={id} className={`mb-10 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          {badge && (
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: badgeColor }}
              />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: badgeColor }}
              >
                {badge}
              </span>
            </div>
          )}
          <h2
            className="text-xl md:text-2xl font-black text-[#111827]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}{' '}
            {titleHighlight && (
              <span style={{ color: badgeColor }}>{titleHighlight}</span>
            )}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#4B5563] mt-1 max-w-xl">{subtitle}</p>
          )}
        </div>

        {/* Optional Filter Tabs / Category Pills */}
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {tabs.map((tab) => {
              const tabId = typeof tab === 'string' ? tab : tab.id;
              const tabLabel = typeof tab === 'string' ? tab : tab.label;
              const isActive = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => onTabChange && onTabChange(tabId)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'bg-white text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid or Children */}
      <div className={`grid ${columns} gap-4`}>
        {children}
      </div>
    </section>
  );
}
