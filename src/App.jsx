import React, { useState } from 'react';
import Header from './components/Header';
import TrendingBar from './components/TrendingBar';
import HeroWidget from './components/HeroWidget';
import GoldRateWidget from './components/GoldRateWidget';
import GoldSilverTicker from './components/gold/GoldSilverTicker';
import GamingSection from './components/GamingSection';
import SarkariResultSection from './components/SarkariResultSection';
import AIToolsSection from './components/AIToolsSection';
import Footer from './components/Footer';
import SEOSchema from './components/SEOSchema';
import ProductShowcase from './components/products/ProductShowcase';
import UniversalTopicViewer from './components/common/UniversalTopicViewer';
import VersusBattleEngine from './components/common/VersusBattleEngine';
import StickyBuyBar from './components/common/StickyBuyBar';
import StickyMobileNav from './components/common/StickyMobileNav';
import WishlistDrawer from './components/common/WishlistDrawer';
import InstantSearchModal from './components/common/InstantSearchModal';
import UserOnboardingQuiz from './components/common/UserOnboardingQuiz';
import ExitIntentPopup from './components/common/ExitIntentPopup';
import PwaInstallBanner from './components/common/PwaInstallBanner';
import SmartSpecMatcher from './components/ai/SmartSpecMatcher';
import PcBottleneckChecker from './components/ai/PcBottleneckChecker';
import BenchmarkVisualizer from './components/gaming/BenchmarkVisualizer';
import CommunityShowcase from './components/community/CommunityShowcase';
import ViralNicheExplorer from './components/niches/ViralNicheExplorer';
import ArticlesSection from './components/ArticlesSection';
import HyperlocalSection from './components/HyperlocalSection';
import GuideArticleView from './components/GuideArticleView';
import { EditorialStudio } from './components/studio';
import SEO from './components/SEO';
import { LanguageProvider } from './context/LanguageContext';
import publishedArticles from './data/articles/published.json';
import productsCatalog from './data/productsCatalog.json';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveTopic, setLiveTopic] = useState(null);
  const [versusModal, setVersusModal] = useState({ isOpen: false, itemA: null, itemB: null });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ud_wishlist') || '[]');
    } catch {
      return [];
    }
  });
  
  const [directArticle, setDirectArticle] = useState(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path.startsWith('/guide/')) {
      const slug = path.replace(/^\/guide\//, '').replace(/\/$/, '');
      return (publishedArticles.articles || []).find(a => a.slug === slug) || null;
    }
    return null;
  });

  const openVersus = (itemA = null, itemB = null) => {
    const defaultA = itemA || productsCatalog.products?.[0];
    const defaultB = itemB || productsCatalog.products?.[1];
    setVersusModal({ isOpen: true, itemA: defaultA, itemB: defaultB });
  };

  const handleRemoveWishlistItem = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    try {
      localStorage.setItem('ud_wishlist', JSON.stringify(updated));
    } catch {}
  };

  const handleClearAllWishlist = () => {
    setWishlist([]);
    try {
      localStorage.removeItem('ud_wishlist');
    } catch {}
  };

  const getSeoProps = () => {
    if (directArticle) {
      return {
        title: `${directArticle.title} | UniqueDigit Intelligence`,
        description: directArticle.metaDescription,
        canonicalPath: `/guide/${directArticle.slug}`,
        schema: null,
      };
    }

    switch (activeTab) {
      case 'gaming':
        return {
          title: "GTA 6 PC Specs, Real-Time Hardware Benchmarks & Deals 2026 | UniqueDigit",
          description: "Verified GTA 6 1080p to 4K specs, budget PC builds (₹35k - ₹2.2L), Steam discounts, and tested GPU benchmarks.",
          canonicalPath: "/gaming",
          schema: null,
        };
      case 'gold':
        return {
          title: "Live Gold Rate Today India (24K & 22K) & Bullion Index 2026 | UniqueDigit",
          description: "Real-time 24 Carat and 22 Carat gold rates across Mumbai, Delhi, Bangalore, and all major Indian cities.",
          canonicalPath: "/gold",
          schema: null,
        };
      case 'products':
        return {
          title: "Best Tech Deals & Hardware Intelligence 2026 | UniqueDigit",
          description: "Verified tech deals, flagship smartphones, GPUs, laptops, and authentic product pricing in India.",
          canonicalPath: "/products",
          schema: null,
        };
      case 'ai':
        return {
          title: "Top AI Tools Directory 2026: Gemini, ChatGPT & Cursor | UniqueDigit",
          description: "Curated directory of top-rated AI tools, direct pricing comparison, and free-tier access links.",
          canonicalPath: "/ai",
          schema: null,
        };
      case 'sarkari':
        return {
          title: "Sarkari Result 2026: Official Admit Cards, Answer Keys & Results | UniqueDigit",
          description: "Verified Sarkari recruitment notifications, direct PDF download links, and exam dates for Indian youth.",
          canonicalPath: "/sarkari",
          schema: null,
        };
      case 'studio':
        return {
          title: "Editorial Studio: Verified Fact Drafter | UniqueDigit",
          description: "Grounded article drafter with verified sources and licensed Wikimedia Commons media.",
          canonicalPath: "/studio",
          schema: null,
        };
      default:
        return {
          title: "UniqueDigit — India's #1 Live Hardware Intelligence & Tested Hardware Verdicts",
          description: "India's daily intelligence hub uniting live gadget verdicts, 2 Pros + 1 Con honest breakdowns, and verified deals.",
          canonicalPath: "/",
          schema: null,
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0C] text-[#EDEDED] selection:bg-amber-400 selection:text-black pb-16 md:pb-0">
      <SEO {...getSeoProps()} />
      <SEOSchema activeItem={liveTopic} products={productsCatalog.products || []} />

      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setDirectArticle(null);
          setActiveTab(tab);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        wishlistCount={wishlist.length}
      />

      {/* Live Bullion Ticker */}
      <GoldSilverTicker />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-6">
        {/* Direct Article Reader View if opened via URL */}
        {directArticle ? (
          <div className="mb-12">
            <GuideArticleView
              article={directArticle}
              onBack={() => {
                setDirectArticle(null);
                window.history.pushState({}, '', '/');
              }}
            />
          </div>
        ) : (
          <>
            <TrendingBar
              setActiveTab={setActiveTab}
              setSearchQuery={setSearchQuery}
            />

            {/* Universal Topic Intelligence Viewer (Gaming, Medicine, Animals, Crops, Tech, Weather) */}
            {liveTopic && (
              <UniversalTopicViewer
                topic={liveTopic}
                onClose={() => setLiveTopic(null)}
              />
            )}

            {/* Versus Battle Modal Engine */}
            {versusModal.isOpen && (
              <VersusBattleEngine
                productA={versusModal.itemA}
                productB={versusModal.itemB}
                catalog={productsCatalog.products || []}
                onClose={() => setVersusModal({ isOpen: false, itemA: null, itemB: null })}
              />
            )}

            {/* Editorial Studio Tab */}
            {activeTab === 'studio' && (
              <div className="py-4">
                <EditorialStudio
                  onArticlePublished={() => setActiveTab('all')}
                  onClose={() => setActiveTab('all')}
                />
              </div>
            )}

            {/* Hero Widget in 'all' view */}
            {!searchQuery && activeTab === 'all' && (
              <HeroWidget
                setActiveTab={setActiveTab}
                onOpenVersus={() => openVersus()}
              />
            )}

            {/* All View — High Signal Intelligence Radar */}
            {activeTab === 'all' && (
              <div className="space-y-12">
                <ViralNicheExplorer onSelectTopic={(t) => setLiveTopic(t)} />
                <SmartSpecMatcher />
                <GamingSection searchQuery={searchQuery} setActiveTab={setActiveTab} isHome={true} />
                <BenchmarkVisualizer />
                <PcBottleneckChecker />
                <GoldRateWidget searchQuery={searchQuery} />
                <CommunityShowcase />
                <AIToolsSection searchQuery={searchQuery} />
                <SarkariResultSection searchQuery={searchQuery} />
                <HyperlocalSection />
                {searchQuery && <ProductShowcase searchQuery={searchQuery} onCompare={(p) => openVersus(p)} onWishlistUpdate={setWishlist} />}
              </div>
            )}

            {/* Tab Specific Views */}
            {activeTab === 'niches' && <div className="py-2"><ViralNicheExplorer onSelectTopic={(t) => setLiveTopic(t)} /></div>}
            {activeTab === 'products' && (
              <div className="py-2 space-y-8">
                <SmartSpecMatcher />
                <ProductShowcase searchQuery={searchQuery} onCompare={(p) => openVersus(p)} onWishlistUpdate={setWishlist} />
              </div>
            )}
            {activeTab === 'gaming' && (
              <div className="py-2 space-y-8">
                <GamingSection searchQuery={searchQuery} setActiveTab={setActiveTab} isHome={false} />
                <BenchmarkVisualizer />
                <PcBottleneckChecker />
                <CommunityShowcase />
              </div>
            )}
            {activeTab === 'gold' && <div className="py-2"><GoldRateWidget searchQuery={searchQuery} /></div>}
            {activeTab === 'hyperlocal' && <div className="py-2"><HyperlocalSection /></div>}
            {activeTab === 'ai' && (
              <div className="py-2 space-y-8">
                <SmartSpecMatcher />
                <AIToolsSection searchQuery={searchQuery} />
              </div>
            )}
            {activeTab === 'sarkari' && <div className="py-2"><SarkariResultSection searchQuery={searchQuery} /></div>}

            {/* Verified Market Guides & Editorial Articles */}
            {activeTab !== 'studio' && <ArticlesSection />}
          </>
        )}
      </main>

      {/* High-Converting Mobile Sticky Bar */}
      <StickyBuyBar
        activeItem={liveTopic || productsCatalog.products?.[0]}
        onOpenVersus={() => openVersus(liveTopic || productsCatalog.products?.[0], productsCatalog.products?.[1])}
      />

      {/* Modern Bottom Mobile Navigation Dock */}
      <StickyMobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Saved Deals & Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={handleRemoveWishlistItem}
        onClearAll={handleClearAllWishlist}
      />

      {/* Keyboard-Friendly Fast Search Modal (Cmd+K) */}
      <InstantSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(article) => setDirectArticle(article)}
      />

      {/* User Preference Onboarding Quiz */}
      <UserOnboardingQuiz onComplete={(interest) => {
        if (interest && interest !== 'all') setActiveTab(interest);
      }} />

      {/* Exit-Intent Deal Retention Popup */}
      <ExitIntentPopup />

      {/* Progressive Web App Install Banner */}
      <PwaInstallBanner />

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
