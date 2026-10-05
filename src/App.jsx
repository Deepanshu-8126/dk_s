import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TrendingBar from './components/TrendingBar';
import HeroWidget from './components/HeroWidget';
import GoldRateWidget from './components/GoldRateWidget';
import GamingSection from './components/GamingSection';
import SarkariResultSection from './components/SarkariResultSection';
import AIToolsSection from './components/AIToolsSection';
import Footer from './components/Footer';
import SEOSchema from './components/SEOSchema';
import ProductShowcase from './components/products/ProductShowcase';
import UniversalTopicViewer from './components/common/UniversalTopicViewer';
import VersusBattleEngine from './components/common/VersusBattleEngine';
import StickyBuyBar from './components/common/StickyBuyBar';
import ViralNicheExplorer from './components/niches/ViralNicheExplorer';
import ArticlesSection from './components/ArticlesSection';
import HyperlocalSection from './components/HyperlocalSection';
import GuideArticleView from './components/GuideArticleView';
import { EditorialStudio } from './components/studio';
import SEO, { generateFinancialProductSchema, generateAIToolsSchema } from './components/SEO';
import { REAL_GOLD_DATA } from './data/realData';
import { AI_TOOLS } from './data/aiTools';
import publishedArticles from './data/articles/published.json';
import productsCatalog from './data/productsCatalog.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveTopic, setLiveTopic] = useState(null);
  const [versusModal, setVersusModal] = useState({ isOpen: false, itemA: null, itemB: null });
  
  const [directArticle, setDirectArticle] = useState(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path.startsWith('/guide/')) {
      const slug = path.replace(/^\/guide\//, '').replace(/\/$/, '');
      return (publishedArticles || []).find(a => a.slug === slug) || null;
    }
    return null;
  });

  // Debounced live topic discovery for ANY user query (Wikipedia zero-cost pipeline)
  useEffect(() => {
    const q = (searchQuery || '').trim();
    if (q.length < 3) {
      setLiveTopic(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/topic/live?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.topic) setLiveTopic(data.topic);
        }
      } catch {}
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const openVersus = (itemA = null, itemB = null) => {
    const defaultA = itemA || productsCatalog[0] || null;
    const defaultB = itemB || productsCatalog[1] || null;
    setVersusModal({ isOpen: true, itemA: defaultA, itemB: defaultB });
  };

  const getSeoProps = () => {
    switch (activeTab) {
      case 'gold':
        return {
          title: "Gold Rate Today: 24K & 22K Live MCX Prices India",
          description: "Live 24 Carat and 22 Carat gold rates across Indian metros. Verified IBJA bullion prices.",
          canonicalPath: "/gold-rate",
          schema: generateFinancialProductSchema(REAL_GOLD_DATA.national[0], REAL_GOLD_DATA.national[1]?.perGram, "India"),
        };
      case 'products':
        return {
          title: "Top Trending Gadgets, PC Builds & Deals 2026 | UniqueDigit",
          description: "Verified tech deals, flagship smartphones, GPUs, laptops, and authentic product pricing in India.",
          canonicalPath: "/products",
          schema: null,
        };
      case 'hyperlocal':
        return {
          title: "Petrol, Diesel & Mandi Bhav Today: UP & Metro Rates",
          description: "Daily revised petrol, diesel, CNG prices, and mandi bhav updated every morning.",
          canonicalPath: "/rates-mandi",
          schema: null,
        };
      case 'gaming':
        return {
          title: "GTA 6 PC Specs & Benchmark 2026: Steam Deals",
          description: "Complete PC system requirements, FPS benchmarks, and Steam deals in India.",
          canonicalPath: "/gaming",
          schema: null,
        };
      case 'ai':
        return {
          title: "Top AI Tools Directory 2026: Gemini, ChatGPT, Claude",
          description: "Verified AI tools directory with free tiers and benchmark comparisons.",
          canonicalPath: "/ai-tools",
          schema: generateAIToolsSchema(AI_TOOLS),
        };
      case 'sarkari':
        return {
          title: "Sarkari Result 2026: Latest Government Job Alerts",
          description: "Official notifications, admit cards, merit lists for SSC CGL, Railway RRB, UPSC.",
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
          title: "UniqueDigit — India's #1 Live Hardware Intelligence & Wirecutter-Grade Verdicts",
          description: "India's daily intelligence hub uniting live gadget verdicts, 2 Pros + 1 Con honest breakdowns, and verified deals.",
          canonicalPath: "/",
          schema: null,
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-amber-400 selection:text-black pb-16 md:pb-0">
      <SEO {...getSeoProps()} />
      <SEOSchema activeItem={liveTopic} products={productsCatalog} />

      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setDirectArticle(null);
          setActiveTab(tab);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

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
                catalog={productsCatalog}
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
                <GamingSection searchQuery={searchQuery} setActiveTab={setActiveTab} isHome={true} />
                <GoldRateWidget searchQuery={searchQuery} />
                <AIToolsSection searchQuery={searchQuery} />
                <SarkariResultSection searchQuery={searchQuery} />
                <HyperlocalSection />
                {searchQuery && <ProductShowcase searchQuery={searchQuery} onCompare={(p) => openVersus(p)} />}
              </div>
            )}

            {/* Tab Specific Views */}
            {activeTab === 'niches' && <div className="py-2"><ViralNicheExplorer onSelectTopic={(t) => setLiveTopic(t)} /></div>}
            {activeTab === 'products' && <div className="py-2"><ProductShowcase searchQuery={searchQuery} onCompare={(p) => openVersus(p)} /></div>}
            {activeTab === 'gaming' && <div className="py-2"><GamingSection searchQuery={searchQuery} setActiveTab={setActiveTab} isHome={false} /></div>}
            {activeTab === 'gold' && <div className="py-2"><GoldRateWidget searchQuery={searchQuery} /></div>}
            {activeTab === 'hyperlocal' && <div className="py-2"><HyperlocalSection /></div>}
            {activeTab === 'ai' && <div className="py-2"><AIToolsSection searchQuery={searchQuery} /></div>}
            {activeTab === 'sarkari' && <div className="py-2"><SarkariResultSection searchQuery={searchQuery} /></div>}

            {/* Verified Market Guides & Editorial Articles */}
            {activeTab !== 'studio' && <ArticlesSection />}
          </>
        )}
      </main>

      {/* High-Converting Mobile Sticky Bar */}
      <StickyBuyBar
        activeItem={liveTopic || productsCatalog[0]}
        onOpenVersus={() => openVersus(liveTopic || productsCatalog[0], productsCatalog[1])}
      />

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
