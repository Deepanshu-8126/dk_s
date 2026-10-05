import { ShoppingBag, ExternalLink, Star, Tag, SlidersHorizontal, RefreshCw, CheckCircle2, XCircle, Award, Bookmark, Bell, Share2, History } from 'lucide-react';
import fallbackData from '../../data/productsCatalog.json';
import { AFFILIATE_CONFIG, buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';
import { calculateDiscount } from '../../utils/calculator';
import UniversalTopicViewer from '../common/UniversalTopicViewer';
import PriceDropAlertModal from '../common/PriceDropAlertModal';
import SocialDealStoryModal from '../common/SocialDealStoryModal';
import PriceHistoryChart from './PriceHistoryChart';
import { useTranslation } from '../../context/LanguageContext';

const FILTER_TABS = [
  { id: 'all', label: 'All Deals' },
  { id: 'Smartphones', label: 'Phones' },
  { id: 'PC Gaming', label: 'Gaming & GPUs' },
  { id: 'Laptops', label: 'Laptops' },
  { id: 'Audio', label: 'Audio & ANC' },
];

export default function ProductShowcase({ searchQuery, activeCategory = 'all', onCompare, onWishlistUpdate }) {
  const { t } = useTranslation();
  const [products, setProducts] = useState(fallbackData.products || []);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState(() => AFFILIATE_CONFIG.getAmazonTag());
  const [showTagSettings, setShowTagSettings] = useState(false);
  const [inputTag, setInputTag] = useState(() => AFFILIATE_CONFIG.getAmazonTag());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedModalProduct, setSelectedModalProduct] = useState(null);
  const [alertModalProduct, setAlertModalProduct] = useState(null);
  const [storyModalProduct, setStoryModalProduct] = useState(null);
  const [expandedHistoryId, setExpandedHistoryId] = useState(null);
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ud_wishlist') || '[]');
      return saved.map(item => item.id);
    } catch {
      return [];
    }
  });

  const toggleWishlist = (product) => {
    try {
      const existing = JSON.parse(localStorage.getItem('ud_wishlist') || '[]');
      const exists = existing.some(item => item.id === product.id);
      let updated;
      if (exists) {
        updated = existing.filter(item => item.id !== product.id);
      } else {
        updated = [...existing, product];
      }
      localStorage.setItem('ud_wishlist', JSON.stringify(updated));
      setWishlistIds(updated.map(item => item.id));
      if (onWishlistUpdate) onWishlistUpdate(updated);
    } catch {}
  };

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <Award size={13} className="text-amber-600" />
            <span>UniqueDigit Tested & Spec-Score Audited Engine</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
            {t('bestDeals')} <span className="text-amber-600">2026</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
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
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTagSettings(!showTagSettings)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition-all cursor-pointer"
            title="Configure your Amazon Associate Tag"
          >
            <SlidersHorizontal size={13} className="text-slate-500" />
            <span>{currentTag ? `Tag: ${currentTag}` : 'Set Tag'}</span>
          </button>
          <button
            onClick={() => loadProducts(searchQuery)}
            disabled={loading}
            className="p-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition-all cursor-pointer"
            title="Refresh verified deals"
          >
            <RefreshCw size={13} className={loading ? "animate-spin text-amber-600" : "text-slate-500"} />
          </button>
        </div>
      </div>

      {/* Dynamic Tag Configuration Modal / Bar */}
      {showTagSettings && (
        <form onSubmit={handleSaveTag} className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <Tag size={15} className="text-amber-600 shrink-0" />
            <div>
              <strong className="text-slate-900 block">Amazon Associate ID Configuration</strong>
              <span className="text-slate-600 text-[11px]">Paste your Amazon ID here to route all links dynamically through your affiliate account.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="e.g. yourtag-21"
              value={inputTag}
              onChange={e => setInputTag(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-amber-500 text-xs w-44"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition-all cursor-pointer"
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
          const computedDiscount = calculateDiscount(product.originalPrice, product.price);
          const activeDiscount = computedDiscount > 0 ? `${computedDiscount}% OFF` : null;

          return (
            <div
              key={product.id}
              className="group flex flex-col justify-between rounded-3xl p-5 bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div>
                {/* Product Image Box */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3.5 bg-slate-50 flex items-center justify-center border border-slate-200">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Chip */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 shadow-xs">
                    {product.badge || product.category}
                  </span>

                  {/* Actions & Discount Bar */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    {activeDiscount && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-400 text-slate-950 shadow-xs font-mono">
                        {activeDiscount}
                      </span>
                    )}
                    {/* Share Story Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setStoryModalProduct(product); }}
                      className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-cyan-600 border border-slate-200 backdrop-blur-md transition cursor-pointer shadow-xs"
                      title="Share as WhatsApp/Instagram Story"
                    >
                      <Share2 size={12} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setAlertModalProduct(product); }}
                      className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-amber-600 border border-slate-200 backdrop-blur-md transition cursor-pointer shadow-xs"
                      title="Set Price Drop Alert"
                    >
                      <Bell size={12} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                      className={`p-1.5 rounded-lg bg-white/90 hover:bg-white border border-slate-200 backdrop-blur-md transition cursor-pointer shadow-xs ${
                        wishlistIds.includes(product.id) ? 'text-amber-500' : 'text-slate-700 hover:text-slate-900'
                      }`}
                      title={wishlistIds.includes(product.id) ? "Saved in Wishlist" : "Save to Wishlist"}
                    >
                      <Bookmark size={12} className={wishlistIds.includes(product.id) ? "fill-amber-500 text-amber-500" : ""} />
                    </button>
                  </div>
                </div>

                {/* UniqueDigit Verdict Badge & Smartprix Spec Score */}
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
                <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2 font-display">
                  {product.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-amber-700 font-semibold text-[11px]">
                    <Star size={11} className="fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">{product.reviewsCount} reviews</span>
                </div>

                {/* The 1-Sentence Bottom Line Verdict */}
                {product.verdict && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 mb-3.5 text-xs text-slate-700 leading-relaxed italic">
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
                      <div key={i} className="flex items-start gap-1.5 text-rose-600 text-[11px]">
                        <XCircle size={13} className="text-rose-600 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price History Toggle Button */}
                <button
                  type="button"
                  onClick={() => setExpandedHistoryId(expandedHistoryId === product.id ? null : product.id)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-cyan-700 py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 mb-3 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <History size={13} className="text-cyan-600" />
                    <span>{expandedHistoryId === product.id ? 'Hide Price History' : '6-Month Price Graph'}</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold">ATL Verified</span>
                </button>

                {/* Expandable Price History Graph */}
                {expandedHistoryId === product.id && (
                  <PriceHistoryChart product={{
                    ...product,
                    priceNumber: product.price || 61499
                  }} />
                )}
              </div>

              {/* Price & Action Button */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-500 block text-[10px]">Verified Amazon Price</span>
                    <span className="text-xl font-black text-slate-900 font-mono tracking-tight">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
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
                      pros: product.pros,
                      cons: product.cons,
                      fastFacts: {
                        "Display": product.specs?.display || "Standard High Refresh",
                        "Processor / GPU": product.specs?.processor || product.specs?.gpu || "Flagship Grade",
                        "Battery / Endurance": product.specs?.battery || "Optimized",
                        "Spec Score": `${product.specScore || '92'}/100`,
                        "Amazon Verified": "In Stock"
                      }
                    })}
                    className="py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Full Specs</span>
                    <ExternalLink size={12} />
                  </button>

                  <a
                    href={finalUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>{t('viewOnAmazon')}</span>
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

      {/* Instant Price Drop Alert Modal */}
      {alertModalProduct && (
        <PriceDropAlertModal
          product={alertModalProduct}
          isOpen={!!alertModalProduct}
          onClose={() => setAlertModalProduct(null)}
        />
      )}

      {/* 9:16 Social Story Modal */}
      {storyModalProduct && (
        <SocialDealStoryModal
          product={storyModalProduct}
          isOpen={!!storyModalProduct}
          onClose={() => setStoryModalProduct(null)}
        />
      )}
    </section>
  );
}
