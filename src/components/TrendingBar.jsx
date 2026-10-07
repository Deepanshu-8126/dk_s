import React, { useState, useEffect } from 'react';
import { Flame, TrendingUp, Loader2 } from 'lucide-react';
import { fetchLiveTrends, clearTrendsCache } from '../services/trendsService';

export default function TrendingBar({ setActiveTab, setSearchQuery }) {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch trends on mount
    loadTrends();

    // Also refresh every 15 minutes (cache TTL)
    const interval = setInterval(loadTrends, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [setActiveTab, setSearchQuery]);

  async function loadTrends() {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchLiveTrends();
      setTrends(data);
      setLoading(false);
    } catch (err) {
      console.error('[TrendingBar] Failed to load trends:', err);
      setError('Failed to load trends data');
      setLoading(false);
      
      // Even on error, try to show some data
      try {
        const fallback = await fetchLiveTrends(); // Will use simulated data
        setTrends(fallback);
      } catch (fallbackErr) {
        console.error('[TrendingBar] Fallback also failed:', fallbackErr);
        setTrends([]); // Empty array as last resort
      }
    }
  }

  const handleRefresh = async () => {
    clearTrendsCache();
    await loadTrends();
  };

  if (loading && trends.length === 0) {
    return (
      <div className="flex items-center gap-3 py-2 px-3 sm:px-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs mb-8 overflow-hidden">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 shrink-0 uppercase tracking-wide">
          <span className="p-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
            <Flame size={13} className="fill-amber-500 text-amber-500" />
          </span>
          <span className="hidden sm:inline font-bold text-slate-800">Daily Viral:</span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs bg-slate-50 text-slate-400">
            <Loader2 size={16} className="animate-spin" />
            <span>Loading trends...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error && trends.length === 0) {
    return (
      <div className="flex items-center gap-3 py-2 px-3 sm:px-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs mb-8 overflow-hidden">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 shrink-0 uppercase tracking-wide">
          <span className="p-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
            <Flame size={13} className="fill-amber-500 text-amber-500" />
          </span>
          <span className="hidden sm:inline font-bold text-slate-800">Daily Viral:</span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs bg-red-50 text-red-600 border border-red-200/80">
            <span>Failed to load trends</span>
            <button 
              onClick={handleRefresh}
              className="ml-2 px-2 py-0.5 text-xs bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 py-2 px-3 sm:px-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs mb-8 overflow-hidden">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 shrink-0 uppercase tracking-wide">
        <span className="p-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
          <Flame size={13} className="fill-amber-500 text-amber-500" />
        </span>
        <span className="hidden sm:inline font-bold text-slate-800">Daily Viral:</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        {trends.map((trend, idx) => (
          <button
            key={trend.id || idx}
            onClick={() => {
              setActiveTab(trend.tab);
              if (trend.tab === 'products') {
                setSearchQuery(trend.label.split(' ')[0]);
              } else {
                setSearchQuery('');
              }
            }}
            className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-xl text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200/80 transition-all cursor-pointer ${idx === 0 ? 'border-l-2 border-emerald-400' : ''}`}
          >
            <span className="font-medium">{trend.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-white border border-slate-200 text-slate-500">
              {trend.tag}
            </span>
            {trend.score !== undefined && (
              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                {trend.score}%
              </span>
            )}
          </button>
        ))}
        
        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1 px-2 py-1 rounded-xl text-xs bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 transition-all cursor-pointer hover:scale-[1.02]"
          title="Refresh trends"
        >
          <Loader2 size={14} className="opacity-75 transition-opacity duration-200 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
}