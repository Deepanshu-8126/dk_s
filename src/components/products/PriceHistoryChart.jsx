import React, { useState } from 'react';
import { History, TrendingDown, Flame, ShieldAlert, Award, Calendar } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export default function PriceHistoryChart({ product }) {
  const { t } = useTranslation();
  const currentPrice = product?.priceNumber || 61499;

  // Generate realistic 6-month historical price data points based on product price
  const historyData = [
    { month: 'Apr', price: Math.round(currentPrice * 1.14) },
    { month: 'May', price: Math.round(currentPrice * 1.10) },
    { month: 'Jun', price: Math.round(currentPrice * 1.18) }, // Peak
    { month: 'Jul', price: Math.round(currentPrice * 1.08) },
    { month: 'Aug', price: Math.round(currentPrice * 1.04) },
    { month: 'Sep', price: Math.round(currentPrice * 1.01) },
    { month: 'Oct (Now)', price: currentPrice } // ATL
  ];

  const prices = historyData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const isAllTimeLow = currentPrice <= minPrice;

  // SVG dimensions
  const svgWidth = 500;
  const svgHeight = 160;
  const paddingX = 40;
  const paddingY = 25;

  const getX = (idx) => paddingX + (idx / (historyData.length - 1)) * (svgWidth - 2 * paddingX);
  const getY = (val) => {
    const range = maxPrice - minPrice || 1;
    return svgHeight - paddingY - ((val - minPrice) / range) * (svgHeight - 2 * paddingY);
  };

  const points = historyData.map((d, i) => `${getX(i)},${getY(d.price)}`).join(' ');
  const areaPath = `M ${getX(0)},${svgHeight - paddingY} L ${points.split(' ').join(' L ')} L ${getX(historyData.length - 1)},${svgHeight - paddingY} Z`;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl backdrop-blur-md my-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-outfit">
            {t('priceHistory')}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {isAllTimeLow ? (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
              <Flame className="w-3 h-3" /> {t('strongBuy')}
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400">
              {t('fairPrice')}
            </span>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 text-center py-2 mb-2 bg-slate-900/60 rounded-xl border border-slate-800/80">
        <div>
          <span className="text-[10px] text-slate-500 uppercase block font-bold">Lowest (6M)</span>
          <span className="text-xs font-mono font-bold text-emerald-400">₹{minPrice.toLocaleString('en-IN')}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase block font-bold">Highest (6M)</span>
          <span className="text-xs font-mono font-bold text-rose-400">₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase block font-bold">Current Deal</span>
          <span className="text-xs font-mono font-bold text-cyan-400">₹{currentPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* SVG Interactive Area Chart */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-32">
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="rgba(255,255,255,0.1)" />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#priceGradient)" />

          {/* Line */}
          <polyline
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data Points */}
          {historyData.map((d, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(d.price)}
                r={i === historyData.length - 1 ? 5 : 3.5}
                fill={i === historyData.length - 1 ? '#10b981' : '#06b6d4'}
                stroke="#090d16"
                strokeWidth="2"
              />
              <text
                x={getX(i)}
                y={svgHeight - 8}
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
                fontFamily="sans-serif"
              >
                {d.month}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
