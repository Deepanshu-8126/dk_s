import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Universal Async SafeWrapper (HOC / Component)
 * Handles loading skeletons, network errors, and empty collection fallbacks in one place.
 */
export default function SafeWrapper({
  loading = false,
  error = null,
  empty = false,
  emptyMessage = 'No items found.',
  onRetry = null,
  skeletonHeight = 'h-48',
  children
}) {
  if (loading) {
    return (
      <div className={`w-full ${skeletonHeight} rounded-3xl bg-slate-900/60 border border-slate-800 animate-pulse flex items-center justify-center p-6`}>
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-6 h-6 text-cyan-500 animate-spin" />
          <span className="text-xs font-mono text-slate-400">Loading verified data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-2xl bg-rose-950/20 border border-rose-500/30 p-5 text-center my-4">
        <div className="flex justify-center mb-2">
          <AlertCircle className="w-6 h-6 text-rose-400" />
        </div>
        <p className="text-xs font-bold text-rose-300">Data Synchronization Error: {error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Retry Sync
          </button>
        )}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="w-full rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8 text-center my-4">
        <p className="text-xs text-slate-400 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return children;
}
