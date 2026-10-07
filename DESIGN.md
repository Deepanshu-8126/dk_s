# 🎨 DESIGN.md: Design System Lock & UI Tokens

## 1. Brand Identity & Visual Baseline
* **Application:** UniqueDigit Portal & Trend Earning Hub
* **Aesthetic Direction:** Modern Dark-Mode-First Glassmorphism with Vibrant Contrast & High-Trust Micro-Badges.

---

## 2. Color Tokens (HSL / Hex)

| Token Name | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `--bg-base-dark` | `#0B0F17` | Main Application Background (Dark) |
| `--bg-surface-dark` | `#131B2E` | Product Cards, Modals, Drawer Backgrounds |
| `--bg-card-glass` | `rgba(255, 255, 255, 0.03)` | Frosted Glass Accent Cards with `backdrop-blur-lg` |
| `--primary-brand` | `#6366F1` | Brand Indigo: Buttons, Active Tabs, Highlights |
| `--primary-glow` | `#3B82F6` | Electric Blue: Badges, Verified Icons |
| `--accent-success` | `#10B981` | Emerald Green: Lowest Price, Verified In-Stock, Buy CTAs |
| `--accent-deal` | `#F59E0B` | Warm Amber: Price Drops, Trending Flame, Hot Badges |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Card Borders, Separators |

---

## 3. Typography Hierarchy

* **Heading Font:** `Outfit, -apple-system, BlinkMacSystemFont, sans-serif`
  * H1 (Hero Title): `clamp(2rem, 5vw, 3.5rem)` / Weight `800` / Tracking `-0.03em`
  * H2 (Section Title): `1.75rem (28px)` / Weight `700` / Tracking `-0.02em`
  * H3 (Product Title): `1.125rem (18px)` / Weight `600`
* **Body Font:** `Inter, sans-serif`
  * Body Standard: `0.9375rem (15px)` / Line Height `1.6` / Weight `400`
  * Micro Copy / Metadata: `0.75rem (12px)` / Weight `500`
* **Tabular / Price Font:** `JetBrains Mono, monospace` (For accurate digit alignments in comparison tables)

---

## 4. Component Standards

### Product Card (`ProductCard.jsx`)
* **Corner Radius:** `rounded-2xl` (16px)
* **Elevation:** `shadow-xl shadow-indigo-950/20`
* **Hover State:** `hover:-translate-y-1.5 transition-all duration-300 hover:border-indigo-500/40`
* **Call To Action Button:** Prominent Amazon CTA with Amazon icon, price badge, and verified affiliate tag.

### Language Switcher (`LanguageSelector.jsx`)
* Floating pill toggle in Header (`English` | `Hinglish` | `हिंदी`).
* Real-time re-render with zero layout shift.

---

## 5. Strict Anti-Slop Constraints
- ❌ **No generic bootstrap/plain borders**: Always use calibrated opacity borders (`border-slate-800/80` or `border-white/10`).
- ❌ **No broken image fallbacks**: Always wrap with `SmartImage` component with automated category SVG fallback.
- ❌ **No style drift**: All new subpages MUST consume these exact CSS tokens.
