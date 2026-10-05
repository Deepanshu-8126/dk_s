# 📋 Task Plan: Hinglish Pipeline, Social Story Generator & Price Time-Traveler

## Objectives
1. **Feature 1: Instant Regional Language Pipeline (Hinglish/Hindi/English Switcher)**
   - LanguageContext / useTranslation hook supporting `en` (English), `hi-en` (Conversational Hinglish), and `hi` (Hindi).
   - Global Language Switcher in Header and Mobile Dock.
   - Translation keys for UI labels, badges, calculators, and verdicts.
2. **Feature 2: One-Click Social Deal Card & Story Generator**
   - Interactive modal (`SocialDealStoryModal.jsx`) that renders a high-res 9:16 Instagram Story & WhatsApp Status canvas.
   - Includes UniqueDigit watermark, product imagery, discount badge, pricing, and 1-click PNG download + WhatsApp direct share.
3. **Feature 3: Amazon Price "Time-Traveler" 6-Month History Graph**
   - Interactive SVG price chart component (`PriceHistoryChart.jsx`) with 6-month historical low, all-time high, price fluctuation trend line, and "Best Time to Buy" verdict.

---

## Phases & Tasks

- [x] **Phase 1: Architecture & Data Specs**
  - [x] Task 1.1: Create `src/context/LanguageContext.jsx` with full Hindi & Hinglish dictionaries.
  - [x] Task 1.2: Add price history datapoints and multi-language keys in `src/data/productsCatalog.json`.
- [x] **Phase 2: Component Implementation**
  - [x] Task 2.1: Build `src/components/common/LanguageSelector.jsx` and wire to `Header.jsx`.
  - [x] Task 2.2: Build `src/components/common/SocialDealStoryModal.jsx` using HTML5 Canvas with branded layout.
  - [x] Task 2.3: Build `src/components/products/PriceHistoryChart.jsx` with smooth SVG area gradient.
- [x] **Phase 3: Integration & UI Lock**
  - [x] Task 3.1: Integrate Story Share button and Price History graph into `ProductShowcase.jsx` and `ProductCard`.
  - [x] Task 3.2: Wire Language Provider across `src/App.jsx`.
- [x] **Phase 4: Reticle Verification & Build Integrity**
  - [x] Task 4.1: Run `npm run build` and verify static HTML prerender of 32+ routes with 0 errors.
  - [x] Task 4.2: Audit bundle size and verify UI token consistency.
