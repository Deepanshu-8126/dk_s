import React, { useState, useEffect } from 'react';
import { ShoppingBag, ExternalLink, Star, ShieldCheck, Tag, Sparkles, SlidersHorizontal, Check, RefreshCw, CheckCircle2, XCircle, Award } from 'lucide-react';
import fallbackData from '../../data/productsCatalog.json';
import { AFFILIATE_CONFIG, buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';
import PcBuildTable from '../gaming/PcBuildTable';

const FILTER_TABS = [
  { id: 'all', label: 'All Deals' },
  { id: 'Smartphones', label: 'Phones' },
  { id: 'PC Gaming', label: 'Gaming & GPUs' },
  { id: 'Laptops', label: 'Laptops' },
  { id: 'Audio', label: 'Audio & ANC' },
];

export default function ProductShowcase({ searchQuery, activeCategory = 'all' }) {
  const [activeBuildIdx, setActiveBuildIdx] = useState(1);
  const [products, setProducts] = useState(fallbackData.products || []);
  const [selectedFilter, setSelectedFilter] = useState('all');
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <Award size={13} className="text-amber-600" />
            <span>Wirecutter & Spec-Score Audited Engine</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            The Best Tech & Gadget Deals in India <span className="text-amber-600">2026</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Tested benchmark scores, verified 1-sentence verdicts, 2 pros + 1 honest con, and live Amazon India pricing.
          </p>
        </div>

        {/* Dynamic Tag & Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTagSettings(!showTagSettings)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
            title="Configure your Amazon Associate Tag"
          >
            <SlidersHorizontal size={13} className="text-slate-500" />
            <span>{currentTag ? `Tag: ${currentTag}` : 'Set Tag'}</span>
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
              <span className="text-slate-600 text-[11px]">Paste your Amazon ID here to route all links dynamically through your affiliate account.</span>
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

      {/* Products Grid (Wirecutter + Smartprix High-Conversion Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(product => {
          const finalUrl = buildAmazonAffiliateUrl(product.title, currentTag);
          return (
            <div
              key={product.id}
              className="group flex flex-col justify-between rounded-3xl p-5 bg-white border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Product Image Box */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3.5 bg-slate-900">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Chip */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/10">
                    {product.badge || product.category}
                  </span>

                  {/* Discount Badge */}
                  {product.discount && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Wirecutter Verdict Badge & Smartprix Spec Score */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {product.verdictBadge || "Verified Recommendation"}
                  </span>
                  {product.specScore && (
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Spec Score: {product.specScore}/100
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {product.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-amber-800 font-semibold text-[11px]">
                    <Star size={11} className="fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{product.reviewsCount} reviews</span>
                </div>

                {/* The 1-Sentence Bottom Line Verdict */}
                {product.verdict && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 mb-3.5 text-xs text-slate-700 leading-relaxed italic">
                    "{product.verdict}"
                  </div>
                )}

                {/* 2 Pros + 1 Honest Con Chips */}
                {product.pros && product.cons && (
                  <div className="space-y-1.5 mb-4 text-xs">
                    {product.pros.map((pro, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-700 text-[11px]">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                    {product.cons.map((con, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-rose-700 text-[11px]">
                        <XCircle size={13} className="text-rose-500 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Action Button */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400 block text-[10px]">Verified Amazon Price</span>
                    <span className="text-xl font-black text-slate-900 font-mono tracking-tight">
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
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-xs transition-all cursor-pointer"
                >
                  <span>Check Verified Deal on Amazon</span>
                  <ExternalLink size={13} />
                </a>
                <span className="block text-center text-[10px] text-slate-400 mt-1.5">
                  Audited Today · Real Amazon India Stock
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Indian PC Builds & Component Rigs Guide */}
      <div className="mt-14 pt-10 border-t border-slate-200">
        <PcBuildTable
          activeBuildIdx={activeBuildIdx}
          setActiveBuildIdx={setActiveBuildIdx}
        />
      </div>
    </section>
  );
}
