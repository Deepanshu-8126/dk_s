import React, { useState } from 'react';
import Header from './components/Header';
import TrendingBar from './components/TrendingBar';
import HeroWidget from './components/HeroWidget';
import GoldRateWidget from './components/GoldRateWidget';
import GamingSection from './components/GamingSection';
import SarkariResultSection from './components/SarkariResultSection';
import AIToolsSection from './components/AIToolsSection';
import Footer from './components/Footer';
import SEOSchema from './components/SEOSchema';
import AdSlot from './components/common/AdSlot';
import ArticlesSection from './components/ArticlesSection';
import HyperlocalSection from './components/HyperlocalSection';
import SEO, { generateFinancialProductSchema, generateAIToolsSchema } from './components/SEO';
import { REAL_GOLD_DATA } from './data/realData';
import { AI_TOOLS } from './data/aiTools';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic SEO Configuration per active tab / view
  const getSeoProps = () => {
    switch (activeTab) {
      case 'gold':
        return {
          title: "Gold Rate Today: 24K & 22K Live MCX Prices India",
          description: "Live 24 Carat and 22 Carat gold rates across Mumbai, Delhi, Bengaluru, and Indian metros. Verified IBJA bullion prices updated daily.",
          canonicalPath: "/gold-rate",
          schema: generateFinancialProductSchema(REAL_GOLD_DATA.national[0], REAL_GOLD_DATA.national[1]?.perGram, "India Metropolitan"),
        };
      case 'hyperlocal':
        return {
          title: "Petrol, Diesel & Mandi Bhav Today: UP & Metro Rates",
          description: "Daily revised petrol, diesel, CNG prices, mandi bhav (Gehu, Sarson), and high-reward credit card offers updated every morning.",
          canonicalPath: "/rates-mandi",
          schema: null,
        };
      case 'gaming':
        return {
          title: "GTA 6 PC Specs & Benchmark 2026: Steam Deals",
          description: "Complete PC system requirements, FPS benchmarks, and Steam deals for GTA 6, GTA V FiveM RP, and custom gaming PC builds in India.",
          canonicalPath: "/gaming",
          schema: null,
        };
      case 'ai':
        return {
          title: "Top AI Tools Directory 2026: Gemini, ChatGPT, Claude",
          description: "Handpicked high-utility AI tools for students and professionals. Benchmark comparison, free tiers, and verified pricing.",
          canonicalPath: "/ai-tools",
          schema: generateAIToolsSchema(AI_TOOLS),
        };
      case 'sarkari':
        return {
          title: "Sarkari Result 2026: Latest Government Job Alerts",
          description: "Official notifications, admit cards, merit lists for SSC CGL, Railway RRB, UPSC, and State government recruitment boards.",
          canonicalPath: "/sarkari",
          schema: null,
        };
      default:
        return {
          title: "Gold Rate Today + AI Tools + Sarkari Result | UniqueDigit",
          description: "India's daily intelligence hub uniting live gold rates, top AI tools, GTA gaming benchmarks, and government exam results in one portal.",
          canonicalPath: "/",
          schema: null,
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1A2027] selection:bg-amber-100 selection:text-amber-900">
      {/* Dynamic SEO Meta & Head Manager */}
      <SEO {...getSeoProps()} />

      {/* Schema.org Structured Data */}
      <SEOSchema />

      {/* Sticky Header with Ticker, Tabs, and Search */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-6">
        {/* Trending Keywords Bar */}
        <TrendingBar
          setActiveTab={setActiveTab}
          setSearchQuery={setSearchQuery}
        />

        {/* Header Ad Slot (Non-intrusive, CLS safe) */}
        <AdSlot id="header-leaderboard" slotType="leaderboard" />

        {/* Hero Spotlight (shown when in 'all' or when no search filter active) */}
        {!searchQuery && activeTab === 'all' && (
          <HeroWidget setActiveTab={setActiveTab} />
        )}

        {/* Tab 1: All View (Combines Gaming, Gold, AI Tools, Sarkari) */}
        {activeTab === 'all' && (
          <div className="space-y-12">
            {/* 1. Gaming & GTA Craze Hub */}
            <GamingSection searchQuery={searchQuery} />

            {/* 2. Live Gold Rates & Market Pulse */}
            <GoldRateWidget searchQuery={searchQuery} />

            {/* Daily Habit & Hyperlocal: Fuel, Mandi Bhav, Credit Cards, Schemes */}
            <HyperlocalSection />

            {/* In-Feed Sponsored Placement */}
            <AdSlot id="in-feed-market-pulse" slotType="in-feed" />

            {/* 3. AI Tools Directory (High CPC Affiliate) */}
            <AIToolsSection searchQuery={searchQuery} />

            {/* 4. Sarkari Results & Government Exams */}
            <SarkariResultSection searchQuery={searchQuery} />
          </div>
        )}

        {/* Tab 2: Gaming & GTA Craze Only */}
        {activeTab === 'gaming' && (
          <div className="py-2">
            <GamingSection searchQuery={searchQuery} />
          </div>
        )}

        {/* Tab 3: Gold Rates Only */}
        {activeTab === 'gold' && (
          <div className="py-2">
            <GoldRateWidget searchQuery={searchQuery} />
          </div>
        )}

        {/* Tab 4: Fuel & Mandi Hyperlocal Only */}
        {activeTab === 'hyperlocal' && (
          <div className="py-2">
            <HyperlocalSection />
          </div>
        )}

        {/* Tab 5: AI Tools Only */}
        {activeTab === 'ai' && (
          <div className="py-2">
            <AIToolsSection searchQuery={searchQuery} />
          </div>
        )}

        {/* Tab 6: Sarkari Results Only */}
        {activeTab === 'sarkari' && (
          <div className="py-2">
            <SarkariResultSection searchQuery={searchQuery} />
          </div>
        )}

        {/* Google EEAT Verified Market Guides & Buying Verdicts */}
        <ArticlesSection />
      </main>

      {/* Comprehensive SEO & Verification Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
