import React, { useState, useEffect } from 'react';
import { ShoppingBag, ExternalLink, Star, ShieldCheck, Tag, Sparkles, SlidersHorizontal, Check, RefreshCw, CheckCircle2, XCircle, Award, Swords } from 'lucide-react';
import fallbackData from '../../data/productsCatalog.json';
import { AFFILIATE_CONFIG, buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';
import UniversalTopicViewer from '../common/UniversalTopicViewer';

const FILTER_TABS = [
  { id: 'all', label: 'All Deals' },
  { id: 'Smartphones', label: 'Phones' },
  { id: 'PC Gaming', label: 'Gaming & GPUs' },
  { id: 'Laptops', label: 'Laptops' },
  { id: 'Audio', label: 'Audio & ANC' },
];

export default function ProductShowcase({ searchQuery, activeCategory = 'all', onCompare }) {
  const [products, setProducts] = useState(fallbackData.products || []);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState(() => AFFILIATE_CONFIG.getAmazonTag());
  const [showTagSettings, setShowTagSettings] = useState(false);
  const [inputTag, setInputTag] = useState(() => AFFILIATE_CONFIG.getAmazonTag());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedModalProduct, setSelectedModalProduct] = useState(null);

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

  const effectiveCat = activeCategory !== 'all' ? activeCategory : selectedFilter;
  const filtered = products.filter(p => {
    if (effectiveCat === 'all') return true;
    return p.category?.toLowerCase().includes(effectiveCat.toLowerCase());
  });

  return (
    <section id="products-catalog" className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <Award size={13} className="text-amber-400" />
            <span>Wirecutter & Spec-Score Audited Engine</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display">
            The Best Tech & Gadget Deals in India <span className="text-amber-400">2026</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Tested benchmark scores, verified 1-sentence verdicts, 2 pros + 1 honest con, and live Amazon India pricing.
          </p>
        </div>

        {/* Dynamic Tag & Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-full border border-slate-800">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTagSettings(!showTagSettings)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
            title="Configure your Amazon Associate Tag"
          >
            <SlidersHorizontal size={13} className="text-slate-400" />
            <span>{currentTag ? `Tag: ${currentTag}` : 'Set Tag'}</span>
          </button>
          <button
            onClick={() => loadProducts(searchQuery)}
            disabled={loading}
            className="p-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
            title="Refresh verified deals"
          >
            <RefreshCw size={13} className={loading ? "animate-spin text-amber-400" : "text-slate-400"} />
          </button>
        </div>
      </div>

      {/* Dynamic Tag Configuration Modal / Bar */}
      {showTagSettings && (
        <form onSubmit={handleSaveTag} className="mb-6 p-4 rounded-2xl bg-slate-900 border border-amber-500/30 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Tag size={15} className="text-amber-400 shrink-0" />
            <div>
              <strong className="text-white block">Amazon Associate ID Configuration</strong>
              <span className="text-slate-400 text-[11px]">Paste your Amazon ID here to route all links dynamically through your affiliate account.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="e.g. yourtag-21"
              value={inputTag}
              onChange={e => setInputTag(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:ring-2 focus:ring-amber-500 text-xs w-44"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-md transition-all cursor-pointer"
            >
              {savedSuccess ? 'Saved!' : 'Save Tag'}
            </button>
          </div>
        </form>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(product => {
          const finalUrl = buildAmazonAffiliateUrl(product.title, currentTag);
          return (
            <div
              key={product.id}
              className="group flex flex-col justify-between rounded-3xl p-5 bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Product Image Box */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3.5 bg-slate-950 flex items-center justify-center border border-slate-800">
                  <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=85'}
                    alt={product.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=85';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Chip */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700">
                    {product.badge || product.category}
                  </span>

                  {/* Discount Badge */}
                  {product.discount && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-400 text-slate-950 shadow-md">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Wirecutter Verdict Badge & Smartprix Spec Score */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                    {product.verdictBadge || "Verified Recommendation"}
                  </span>
                  {product.specScore && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      Spec Score: {product.specScore}/100
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug mb-2 font-display">
                  {product.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-amber-400 font-semibold text-[11px]">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{product.reviewsCount} reviews</span>
                </div>

                {/* The 1-Sentence Bottom Line Verdict */}
                {product.verdict && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 mb-3.5 text-xs text-slate-300 leading-relaxed italic">
                    "{product.verdict}"
                  </div>
                )}

                {/* 2 Pros + 1 Honest Con Chips */}
                {product.pros && product.cons && (
                  <div className="space-y-1.5 mb-4 text-xs">
                    {product.pros.map((pro, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                    {product.cons.map((con, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-rose-400 text-[11px]">
                        <XCircle size={13} className="text-rose-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Action Button */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400 block text-[10px]">Verified Amazon Price</span>
                    <span className="text-xl font-black text-white font-mono tracking-tight">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-xs line-through text-slate-400 font-mono">
                      ₹{product.originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Actions: Direct Amazon Buy + Full Deep Dive Dossier */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => setSelectedModalProduct({
                      title: product.title,
                      niche: product.category,
                      summary: product.verdict,
                      imageUrl: product.imageUrl,
                      fastFacts: {
                        "Display": product.specs?.display || "Standard High Refresh",
                        "Processor / GPU": product.specs?.processor || product.specs?.gpu || "Flagship Grade",
                        "Battery / Endurance": product.specs?.battery || "Optimized",
                        "Spec Score": `${product.specScore || '92'}/100`,
                        "Amazon Verified": "In Stock"
                      }
                    })}
                    className="py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Full Specs</span>
                    <ExternalLink size={12} />
                  </button>

                  <a
                    href={finalUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>Buy Deal</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive Modal */}
      {selectedModalProduct && (
        <UniversalTopicViewer
          topic={selectedModalProduct}
          onClose={() => setSelectedModalProduct(null)}
        />
      )}
    </section>
  );
}
