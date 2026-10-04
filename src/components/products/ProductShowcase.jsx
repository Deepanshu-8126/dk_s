import React, { useState, useEffect } from 'react';
import { ShoppingBag, ExternalLink, Star, ShieldCheck, Tag, Sparkles, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import fallbackData from '../../data/productsCatalog.json';
import { AFFILIATE_CONFIG, buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function ProductShowcase({ searchQuery, activeCategory = 'all' }) {
  const [products, setProducts] = useState(fallbackData.products || []);
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState(() => AFFILIATE_CONFIG.getAmazonTag());
  const [showTagSettings, setShowTagSettings] = useState(false);
  const [inputTag, setInputTag] = useState(() => AFFILIATE_CONFIG.getAmazonTag());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const loadProducts = async (q = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}&tag=${encodeURIComponent(currentTag)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      }
    } catch {
      // Keep fallback catalog
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(searchQuery || '');
  }, [searchQuery, currentTag]);

  const handleSaveTag = (e) => {
    e.preventDefault();
    const clean = inputTag.trim();
    setCurrentTag(clean);
    try {
      localStorage.setItem('ud_amazon_tag', clean);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setShowTagSettings(false);
      }, 1500);
    } catch {}
  };

  const filtered = products.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category?.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <section id="products-catalog" className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <ShoppingBag size={13} className="text-amber-600" />
            <span>Verified Hardware & Products Engine</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Trending Systems, Phones & <span className="text-amber-600">Deals</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Authentic retail specs, real e-commerce photos, and live INR prices audited by our verification engine.
          </p>
        </div>

        {/* Dynamic Tag & Refresh Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTagSettings(!showTagSettings)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
            title="Configure your Amazon Associate Tag"
          >
            <SlidersHorizontal size={13} className="text-slate-500" />
            <span>{currentTag ? `Tag: ${currentTag}` : 'Set Amazon Tag'}</span>
          </button>
          <button
            onClick={() => loadProducts(searchQuery)}
            disabled={loading}
            className="p-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
            title="Refresh verified deals"
          >
            <RefreshCw size={13} className={loading ? "animate-spin text-amber-600" : "text-slate-500"} />
          </button>
        </div>
      </div>

      {/* Dynamic Tag Configuration Modal / Bar */}
      {showTagSettings && (
        <form onSubmit={handleSaveTag} className="mb-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Tag size={15} className="text-amber-700 shrink-0" />
            <div>
              <strong className="text-amber-950 block">Amazon Associate ID Configuration</strong>
              <span className="text-slate-600 text-[11px]">Jaise hi aap Amazon ID banayein, yahan paste karein. Saare product links instantly update ho jayenge.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="e.g. yourtag-21"
              value={inputTag}
              onChange={e => setInputTag(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-amber-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-xs w-44"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all cursor-pointer"
            >
              {savedSuccess ? 'Saved!' : 'Save Tag'}
            </button>
          </div>
        </form>
      )}

      {/* Products Grid (Clean White Cards, 100% Mobile Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filtered.map(product => {
          const finalUrl = buildAmazonAffiliateUrl(product.title, currentTag);
          return (
            <div
              key={product.id}
              className="group flex flex-col justify-between rounded-2xl p-4 sm:p-5 bg-white border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Product Image Box */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-3 bg-slate-900">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Chip */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/10">
                    {product.badge || product.category}
                  </span>

                  {/* Discount Badge */}
                  {product.discount && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {product.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-amber-800 font-semibold text-[11px]">
                    <Star size={11} className="fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{product.reviewsCount}</span>
                </div>

                {/* Key Specs Matrix */}
                {product.specs && (
                  <div className="space-y-1 mb-4 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {Object.entries(product.specs).slice(0, 3).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center text-slate-600">
                        <span className="text-slate-400 font-medium">{k}:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[150px]">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Action Button */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400 block text-[10px]">Verified Price</span>
                    <span className="text-lg font-black text-slate-900 font-mono tracking-tight">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-xs line-through text-slate-400 font-mono">
                      ₹{product.originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <a
                  href={finalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-xs transition-all cursor-pointer"
                >
                  <span>View Verified Deal</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
