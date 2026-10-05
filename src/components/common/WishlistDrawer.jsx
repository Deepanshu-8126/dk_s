import React from 'react';
import { Bookmark, X, ShoppingBag, Trash2, ExternalLink, ShieldCheck } from 'lucide-react';
import { buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveItem, onClearAll }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white text-slate-900 h-full border-l border-slate-200 shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
              <Bookmark size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Saved Deals & Wishlist</h3>
              <span className="text-xs text-slate-500">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved locally</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlist.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
              <Bookmark size={32} className="opacity-30 mb-2" />
              <p className="text-xs font-medium">Your wishlist is currently empty.</p>
              <span className="text-[11px] text-slate-400 mt-1">Click the bookmark icon on any deal to save it here!</span>
            </div>
          ) : (
            wishlist.map(item => {
              const amazonUrl = buildAmazonAffiliateUrl(item.title);
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-200 shrink-0 border border-slate-200"
                      />
                    )}
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-900 truncate max-w-[180px] font-display">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={amazonUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition shadow-2xs cursor-pointer"
                      title="Buy on Amazon"
                    >
                      <ShoppingBag size={14} />
                    </a>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
            >
              Clear All Items
            </button>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-600" /> Saved in browser storage
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
