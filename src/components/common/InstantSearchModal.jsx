import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShoppingBag, BookOpen, Coins, Gamepad2, ArrowRight, Sparkles } from 'lucide-react';
import { searchEverything } from '../../utils/universalSearch';
import { buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function InstantSearchModal({ isOpen, onClose, onSelectTopic, onSelectArticle }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else if (inputRef.current) inputRef.current.focus();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchResults = searchEverything(query);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fadeIn touch-manipulation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search size={18} className="text-amber-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deals, RTX GPUs, iPhone, Gold rates, GTA 6..."
            className="w-full bg-transparent text-slate-900 text-sm outline-none placeholder:text-slate-400 font-sans font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-700 text-xs font-semibold cursor-pointer">Clear</button>
          )}
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {searchResults.length > 0 ? (
            searchResults.map((res) => {
              if (res.type === 'article') {
                return (
                  <div
                    key={res.id}
                    onClick={() => {
                      if (onSelectArticle) onSelectArticle(res.data);
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-400 cursor-pointer flex items-center justify-between gap-3 transition"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-0.5">
                        {res.category}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{res.title}</h4>
                    </div>
                    <ArrowRight size={14} className="text-indigo-600 shrink-0" />
                  </div>
                );
              }

              const buyUrl = buildAmazonAffiliateUrl(res.title);
              return (
                <div
                  key={res.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {res.data?.imageUrl && (
                      <img src={res.data.imageUrl} alt={res.title} className="w-10 h-10 rounded-xl object-cover bg-slate-200 shrink-0" />
                    )}
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">{res.category}</span>
                      <h4 className="text-xs font-bold text-slate-900 truncate max-w-sm">{res.title}</h4>
                      {res.data?.price && (
                        <span className="text-xs font-mono font-bold text-emerald-700">₹{res.data.price.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                  <a
                    href={buyUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition shrink-0 cursor-pointer"
                  >
                    Buy Deal
                  </a>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No direct matches found for "{query}". Try searching for "RTX 4070", "Gold", "Cursor", or "Sony".
            </div>
          )}
        </div>

        {/* Modal Footer Keybinds */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Press <strong>ESC</strong> to close</span>
          <span>⚡ Instant Edge Search</span>
        </div>

      </div>
    </div>
  );
}
