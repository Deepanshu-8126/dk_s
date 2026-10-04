import React, { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, ExternalLink, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { BlogApiClient } from '../../services/geminiRotator';

export default function WikimediaPicker({ onSelectImage, selectedImage, defaultQuery = '' }) {
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async (searchQuery) => {
    const q = (searchQuery || '').trim();
    if (!q) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await BlogApiClient.searchMedia(q, 8);
      setResults(data.results || []);
    } catch (err) {
      setError(err.message || 'Failed to search Wikimedia Commons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) fetchImages(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search verified Wikimedia Commons images..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          onClick={() => fetchImages(query)}
          disabled={loading || !query.trim()}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span>Search</span>
        </button>
      </div>

      {/* Selected Image Banner */}
      {selectedImage && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={selectedImage.thumbUrl}
              alt={selectedImage.title}
              className="w-12 h-12 rounded-lg object-cover border border-emerald-300 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 truncate">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span className="truncate">{selectedImage.title}</span>
              </div>
              <p className="text-[11px] text-emerald-700 truncate">
                Attribution: {selectedImage.author} • {selectedImage.license}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectImage(null)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold px-2 py-1"
          >
            Remove
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-slate-100 animate-pulse border border-slate-200" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchImages(query)}
            className="font-bold underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && query.trim() && results.length === 0 && (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl p-4 text-xs text-slate-500">
          <ImageIcon size={24} className="mx-auto mb-1 text-slate-400" />
          <p className="font-semibold text-slate-700">No licensed Wikimedia images found</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Try a simpler or broader search term (e.g., "satellite", "gold", "computer")</p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-1">
          {results.map((img) => {
            const isSelected = selectedImage?.id === img.id;
            return (
              <div
                key={img.id}
                onClick={() => onSelectImage(img)}
                className={`group cursor-pointer rounded-xl border p-2 flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-400'
                    : 'border-slate-200 hover:border-slate-400 bg-white'
                }`}
              >
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
                  <img
                    src={img.thumbUrl}
                    alt={img.description || img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold rounded">
                    {img.license}
                  </span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 line-clamp-1 leading-tight mb-1">
                    {img.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="truncate max-w-[80px]">By {img.author}</span>
                    <a
                      href={img.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-amber-600 hover:text-amber-700 p-0.5"
                      title="View on Wikimedia Commons"
                    >
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
