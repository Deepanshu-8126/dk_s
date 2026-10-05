# UniqueDigit Permanent Modular Architecture & Workflow Guidelines

All future development, modifications, and feature additions across the **UniqueDigit** portal must strictly adhere to these 4 architectural pillars:

---

## 1. 📂 Folder & File Separation of Concerns

- **`src/components/` (Presentation & UI Layer):**
  - Pure UI components (e.g., `PcBuildTable.jsx`, `ProductShowcase.jsx`, `UniversalTopicViewer.jsx`).
  - Zero hardcoded pricing math, static calculation strings, or competitor boilerplate.
  - Strict adherence to the 3-Layer Design System (`var(--color-obsidian-950)`, `Outfit`, `Inter`, `JetBrains Mono`).

- **`src/data/` (Centralized Single Source of Truth):**
  - All catalogs, bullion rates, specs, and mock schemas reside in `realData.js`, `productsCatalog.json`, `gold-rates.json`, and `blogData.js`.
  - Never hardcode raw prices directly into JSX templates.

- **`src/hooks/` & `src/utils/` (Isolated Business & Calculation Logic):**
  - All pricing math, discounts, and multipliers must live in `calculator.js` (`calculatePCTotal`, `calculateGoldTotal`, `calculateDiscount`).
  - Upgrade and competitor recommendations must live in `recommendations.js` (`getCuratedAlternatives`, `getSmartUpgrades`) to guarantee products never recommend themselves.
  - Live data fetchers must live in custom hooks (`useLivePcBuilds.js`).

- **`functions/` (Cloudflare Pages Edge Serverless Layer):**
  - `/go/:slug` affiliate link cloaking (`functions/go/[slug].js`).
  - Sub-50ms dynamic pricing APIs (`functions/api/pc-builds.js`, `functions/api/gold-rates.js`).

---

## 2. 🛡️ Amazon Associates & Compliance Protocols

- **Official Disclosure Mandatory:** Always keep the Amazon Associates transparency disclosure banner active in `Footer.jsx` and product modal dossiers.
- **Affiliate Tag Protection:** Never render raw affiliate tracking tags (`Tag Active: ...`) as visible text in the DOM. Always encapsulate tags securely inside anchor `href` URLs or `/go/:slug` edge redirects.
- **Multi-Vendor Fallback:** Always maintain fallback logic for out-of-stock items via `buildMultiVendorUrl`.

---

## 3. ⚡ Edge Caching & Performance Standards

- **Static Cache Rules (`public/_headers`):** 1-year immutable caching for static assets, fonts, and images.
- **API Cache Bypass:** `no-cache, no-store, must-revalidate` for all `/api/*` and `/go/*` routes.
- **Bundle Budget:** Keep production client bundles under 500KB with 0 unused dependencies.
- **Zero Layout Shifts (CLS):** Reserve explicit container dimensions and minimum heights on dynamically synced tables.

---

## 4. 🔄 Verification & Deployment Pipeline

- **Pre-Commit Verification:** Run `npm run build` before every git commit to ensure all 32+ prerendered routes compile with zero syntax errors.
- **Automated Git Edge Sync:** Push commits directly to `origin/main` for automatic Cloudflare Pages & Workers deployment.
