# Task Plan: Real Image Engine & UI Consistency Elevation

## Context & Objectives
The user requested:
1. **Real Images**: Replace random Wikimedia expo/cosplay photos and missing images with authentic, verified high-resolution keyart, product photos, and official brand assets across Gaming, AI Tools, Gold/Bullion, Govt Exams, and Hyperlocal sectors.
2. **UI Better / UI Consistency**: Enforce strict typography hierarchy, color & token lock, comfortable touch targets, and zero style drift across all sections (Hero, Hyperlocal, Gold, Gaming, AI Tools, Sarkari, Articles).
3. **Reticle Verifier**: Automated proof layer with zero silent breakages (`npm run build`, bundle size audit < 500KB, all files strictly < 200 lines).

---

## Phases

### Phase 1: Real Visuals & Curated Media Registry
- [x] Create `src/data/curatedMedia.js` containing verified, high-resolution official CDN assets for:
  - Top Games (GTA 6 Vice City keyart, GTA V action keyart, Valorant agent keyart, Black Myth Wukong action keyart, Cyberpunk 2077 Night City keyart)
  - AI Tool Brand Logos & Badges (Gemini, ChatGPT, Perplexity, Cursor, Midjourney, Claude, Suno, Notion)
  - Bullion & Gold Assets (Swiss PAMP 24K bar, MCX hallmark bullion)
  - Govt Exams & Sarkari Assets (SSC CGL, UPSC, Railway, Bank PO)
  - Fuel & Mandi Agriculture Assets
- [x] Update `src/utils/imageEngine/fetchers.js` and `src/utils/imageEngine/index.js` to prioritize authentic curated keyart over random Wikipedia search results.

### Phase 2: UI Consistency & Visual Elevation
- [x] Elevate `TrendingGames.jsx`:
  - Use verified official high-res game art directly (`src={game.artwork}`)
  - Add publisher badge, clean playerbase pill, and responsive typography
- [x] Elevate `AIToolsSection.jsx`:
  - Add official tool brand avatars/badges with custom color accents
  - Standardize typography to SaaS hierarchy (`#111827`, `#4B5563`, `#6B7280`)
- [x] Elevate `HyperlocalSection.jsx`:
  - Token lock: replace ad-hoc `gray-900`/`gray-500` with standard `#111827`, `#4B5563`, `#E5E7EB`
  - Clean table headers with proper padding and pill badges
- [x] Elevate `GtaSpotlight.jsx`:
  - Direct curated artwork pass (`src={curatedArtwork}`) and high-contrast specs cards

### Phase 3: Architectural & Line Count Constraints (<200 lines)
- [x] Verify every modified or created file is strictly < 200 lines (all files 54-175 lines)
- [x] Ensure barrel exports `index.js` exist for any component directories

### Phase 4: Reticle Runtime Perception & Verification Layer
- [x] Execute `npm run build` (Passed with 0 errors)
- [x] Verify bundle sizes < 500KB (All chunks < 210KB)
- [x] Verify 32 routes pre-rendered with SEO metadata
- [x] Check dev server status on `http://localhost:5175` (Healthy & HMR active)
- [x] Document final walkthrough in `walkthrough.md`
