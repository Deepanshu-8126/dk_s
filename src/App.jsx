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
import ArticlesSection from './components/ArticlesSection';
import HyperlocalSection from './components/HyperlocalSection';
import GuideArticleView from './components/GuideArticleView';
import { EditorialStudio } from './components/studio';
import SEO, { generateFinancialProductSchema, generateAIToolsSchema } from './components/SEO';
import { REAL_GOLD_DATA } from './data/realData';
import { AI_TOOLS } from './data/aiTools';
import publishedArticles from './data/articles/published.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [directArticle, setDirectArticle] = useState(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path.startsWith('/guide/')) {
      const slug = path.replace(/^\/guide\//, '').replace(/\/$/, '');
      return (publishedArticles || []).find(a => a.slug === slug) || null;
    }
    return null;
  });

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
          title: "Gold Rate Today + AI Tools + Sarkari Result | UniqueDigit",
          description: "India's daily intelligence hub uniting live gold rates, top AI tools, GTA gaming, and sarkari results.",
          canonicalPath: "/",
          schema: null,
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1A2027] selection:bg-amber-100 selection:text-amber-900">
      <SEO {...getSeoProps()} />
      <SEOSchema />

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
              <HeroWidget setActiveTab={setActiveTab} />
            )}

            {/* All View */}
            {activeTab === 'all' && (
              <div className="space-y-12">
                <ProductShowcase searchQuery={searchQuery} />
                <GamingSection searchQuery={searchQuery} />
                <GoldRateWidget searchQuery={searchQuery} />
                <HyperlocalSection />
                <AIToolsSection searchQuery={searchQuery} />
                <SarkariResultSection searchQuery={searchQuery} />
              </div>
            )}

            {/* Tab Specific Views */}
            {activeTab === 'products' && <div className="py-2"><ProductShowcase searchQuery={searchQuery} /></div>}
            {activeTab === 'gaming' && <div className="py-2"><GamingSection searchQuery={searchQuery} /></div>}
            {activeTab === 'gold' && <div className="py-2"><GoldRateWidget searchQuery={searchQuery} /></div>}
            {activeTab === 'hyperlocal' && <div className="py-2"><HyperlocalSection /></div>}
            {activeTab === 'ai' && <div className="py-2"><AIToolsSection searchQuery={searchQuery} /></div>}
            {activeTab === 'sarkari' && <div className="py-2"><SarkariResultSection searchQuery={searchQuery} /></div>}

            {/* Verified Market Guides & Editorial Articles */}
            {activeTab !== 'studio' && <ArticlesSection />}
          </>
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
