import React, { createContext, useContext, useState, useEffect } from 'react';

const TRANSLATIONS = {
  en: {
    siteTitle: 'UniqueDigit Intelligence',
    searchPlaceholder: 'Search verified tech deals, PC builds, gold rates...',
    listenAudio: 'Listen to Article',
    bestDeals: 'Verified Hardware Deals',
    wishlist: 'Wishlist & Saved Deals',
    compare: 'Versus Battle',
    priceDropAlert: 'Price Drop Alert',
    shareStory: 'Share as Story',
    priceHistory: '6-Month Price History',
    bestTimeToBuy: 'Best Time to Buy Verdict',
    strongBuy: '🔥 Strong Buy (At 6-Month Lowest Price)',
    fairPrice: '⚖️ Fair Value (Average Market Rate)',
    waitDeal: '⏳ Wait for Sale (Price Fluctuating High)',
    lowestPriceBadge: 'All-Time Low',
    viewOnAmazon: 'Buy on Amazon',
    viewOnFlipkart: 'Buy on Flipkart',
    readTime: 'Min Read',
    verifiedEditorial: 'Verified Editorial',
    author: 'Author'
  },
  'hi-en': {
    siteTitle: 'UniqueDigit Tech & Bullion Hub',
    searchPlaceholder: 'Search karo best deals, PC builds, gold rates...',
    listenAudio: 'Article Suno (Audio Player)',
    bestDeals: 'Bhai Yeh Deals Miss Mat Karna',
    wishlist: 'Saved Deals & Wishlist',
    compare: 'Side-by-Side Takkar (Battle)',
    priceDropAlert: 'Price Kam Hone Ka Alert Lagao',
    shareStory: 'Story Share Karo (Insta/WhatsApp)',
    priceHistory: 'Pichle 6 Mahine Ka Price Graph',
    bestTimeToBuy: 'Kharidne Ka Sahi Time Hai?',
    strongBuy: '🔥 Turant Kharido (Pichle 6 Mahine Ka Lowest Price!)',
    fairPrice: '⚖️ Normal Rate (Theek Thaak Deal)',
    waitDeal: '⏳ Thoda Ruko (Price Abhi Mehenga Hai)',
    lowestPriceBadge: 'Sabse Sasta Rate',
    viewOnAmazon: 'Amazon Par Deal Lo',
    viewOnFlipkart: 'Flipkart Par Deal Lo',
    readTime: 'Min Ka Padhna',
    verifiedEditorial: '100% Asli Tested Guide',
    author: 'Tech Expert'
  },
  hi: {
    siteTitle: 'यूनिकडिजिट टेक एवं बुलियन पोर्टल',
    searchPlaceholder: 'सत्यापित टेक डील्स, पीसी बिल्ड, गोल्ड रेट खोजें...',
    listenAudio: 'आर्टिकल सुनें (ऑडियो)',
    bestDeals: 'आज के सर्वश्रेष्ठ ऑफर्स',
    wishlist: 'सेव किए गए उत्पाद',
    compare: 'तुलना मैट्रिक्स (वर्सस)',
    priceDropAlert: 'मूल्य गिरावट सूचना',
    shareStory: 'व्हाट्सएप/इंस्टा स्टोरी बनाएं',
    priceHistory: '६ महीने का मूल्य इतिहास',
    bestTimeToBuy: 'खरीदने का उपयुक्त समय',
    strongBuy: '🔥 अभी खरीदें (६ महीने का न्यूनतम मूल्य!)',
    fairPrice: '⚖️ सामान्य मूल्य',
    waitDeal: '⏳ प्रतीक्षा करें (मूल्य अधिक है)',
    lowestPriceBadge: 'सर्वोत्तम न्यूनतम मूल्य',
    viewOnAmazon: 'अमेज़न पर देखें',
    viewOnFlipkart: 'फ्लिपकार्ट पर देखें',
    readTime: 'मिनट का समय',
    verifiedEditorial: 'सत्यापित संपादकीय',
    author: 'समीक्षक'
  }
};

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('ud_lang') || 'hi-en';
      } catch {
        return 'hi-en';
      }
    }
    return 'hi-en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ud_lang', lang);
      } catch {}
    }
  };

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
