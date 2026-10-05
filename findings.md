# 🔍 Findings & Technical Discoveries

## 1. Regional Language Pipeline (Hinglish / Hindi)
- We can implement a zero-dependency React Context (`LanguageContext`) with a lightweight translation catalog.
- Languages:
  - `en`: English (Standard Tech Journalism)
  - `hi-en`: Conversational Hinglish ("Bhai yeh deal miss mat karna", "Total Kitna Padega", "Best Time to Buy")
  - `hi`: Shuddh Hindi ("दैनिक टेक समाचार एवं मूल्य तुलना")
- Persisted in `localStorage.getItem('ud_lang')` with fallback to `en` during SSR/prerender.

## 2. One-Click Social Deal Card & Story Generator
- Using HTML5 `<canvas>` allows 100% offline client-side PNG generation without needing Puppeteer or external serverless image generators.
- Dimensions: 1080x1920 (Standard 9:16 Instagram Story & WhatsApp Status).
- Design Elements:
  - Dark obsidian background with cyber grid.
  - UniqueDigit Neon Watermark & QR Badge.
  - MRP vs Discounted Price badge with savings amount.
  - 1-Click WhatsApp Share link (`whatsapp://send?text=...`) + Direct PNG Download.

## 3. 6-Month Price "Time-Traveler" History Graph
- Lightweight pure SVG area chart with cubic bezier curves (`d="M ... C ..."`), gradient fill, and interactive hover tooltip.
- Computes:
  - All-time Low (ATL) vs All-time High (ATH) vs Current Price.
  - Buy Recommendation Rating: "🔥 Strong Buy (At 6-Month Lowest Price)" vs "⏳ Wait (Price High)".
