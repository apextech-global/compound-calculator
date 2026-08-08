# Latest Handoff

## 2026-08-08 — Korean Market Launch V1 + Safari JSON-LD Compatibility

### Result

- Implementation and local verification completed; ready for Founder Review.
- Korean is now the sixth public locale and is included in existing navigation, sitemap, canonical, hreflang, metadata, legal, Content Engine, comparison, related-link, and supported-assets paths.
- The approved first eight South Korean assets are registered with KRW historical data from the existing Yahoo Finance pipeline.
- No calculator formula, financial output, UI design, routing architecture, Content Engine architecture, dependency, analytics, advertising, or infrastructure behavior was changed.

### Safari error fix

- Root cause confirmed: Safari's page-analysis code assumed each JSON-LD script had an object root and called `.toLowerCase()` on the top-level `@context`; multi-node pages previously emitted a top-level array.
- Added a small shared serializer that preserves every existing Schema node inside an object-root `@graph` with top-level `"@context": "https://schema.org"`.
- Homepage, SEO/comparison pages, and the learn hub now use the same object-root contract. Existing JSON-LD types, FAQ items, breadcrumbs, compared items, metadata, and Content Engine generation remain intact.
- Desktop and mobile production tests parse the emitted JSON-LD for homepage, comparison, and learn routes and reject array roots.

### Korean locale

- Added `ko` to `publicLocaleCodes`; Korean routes now participate automatically in current sitemap, canonical, hreflang, language-switcher, footer, supported-assets, metadata, and Content Engine behavior.
- Completed all 19 previously missing Korean message keys and corrected malformed Korean legal title/eyebrow value types.
- Added complete Korean affiliate disclosure, calculator-dashboard empty state/action copy, result-action feedback, quick starts, mode switcher, next-step CTA, footer labels, recommended-tools content, and comparison-library content.
- Korean metadata and pages were runtime-verified for homepage, privacy, affiliate disclosure, recommended tools, supported assets, and `voo-vs-spy`.

### South Korean assets and data

- ETFs: `069500.KS` KODEX 200, `360750.KS` TIGER U.S. S&P 500, and `133690.KS` TIGER U.S. NASDAQ 100.
- Stocks: `005930.KS` Samsung Electronics, `000660.KS` SK hynix, `005380.KS` Hyundai Motor, `035420.KS` NAVER, and `207940.KS` Samsung Biologics.
- All eight use `South Korea`, `Korea Exchange`, `KRW`, `.KS` Yahoo symbols, unique data keys, and the existing market-query flow.
- The repository's targeted fetch generated eight raw daily CSV files; the existing importer generated eight monthly public CSV files with 73–320 rows each.
- Historical availability registration was updated so the UI truthfully labels all eight assets as historical rather than sample data.

### Verification

- `npm run qa:production`: passed; Next.js 16.2.9 generated 416 static pages, site checks passed, algorithm tests passed 4/4, and Playwright passed 103 tests with 1 expected desktop-only skip.
- `npm run check-site`: passed; 402 routes, 403 sitemap URLs, 6 public locales, 0 warnings, and 0 errors.
- `npm run test:content-engine`: passed 16/16 contracts, including Korean coverage through the public locale source.
- `npm run audit-market-data`: passed; 71/71 assets have historical data, 0 missing, 0 missing Yahoo mappings, and 0 sample-only assets.
- `npm run validate-market-data`: passed 71/71 CSV files.
- `npm run lint`: passed with 0 errors and 0 warnings.
- `git diff --check`: passed after the final documentation update.

### Git status and next step

- No commit, push, merge, deployment, branch switch, staging, or reset was performed.
- The working tree still includes the approved but uncommitted V3.1/V3.2 dashboard work plus this Korean-market expansion.
- Safe to commit: Yes, subject to explicit Founder approval and final post-documentation diff verification.
- Recommended next step: Founder reviews Korean copy, the eight-asset selection, and Safari behavior, then explicitly authorizes commit if accepted.

## 2026-08-08 — DCA Backtest Design V3.2

### Result

- Implementation and local verification completed; ready for Founder Visual Review.
- Added restrained state motion and interaction feedback to the approved V3.1 calculator dashboard without redesigning its workflow.
- Independent read-only review found no remaining Critical or Important code issue after follow-up fixes.

### Development `1 Issue` diagnosis

- Safari 26.5.2 reproduced the red Next development overlay on `/en`, `/zh-CN`, and `/zh-TW` with `Runtime TypeError: undefined is not an object (evaluating 'r["@context"].toLowerCase')` from an injected page-level script.
- The expression does not exist in the repository or rendered application scripts. Every application JSON-LD node retains a string `@context`, while the existing homepage JSON-LD payload is a top-level array.
- A fresh Chromium session reported no console or page errors, and no third-party Safari extension was registered. The source is Safari's built-in page-analysis tooling assuming a scalar top-level JSON-LD object, not application runtime, hydration, accessibility, or Next.js code.
- No application fix was applied because the sprint explicitly prohibited changing JSON-LD behavior. The overlay remains a local Safari development-tool compatibility issue.

### Motion and interaction changes

- Added shared CSS motion tokens: 160ms fast, 280ms standard, 420ms result reveal, with restrained easing and no new dependency.
- Added subtle mode-panel, selected-tab, input, asset-information, empty-state, preset, accordion, metric, action, and chart transitions.
- Result choreography now presents final value, core metrics, detail/risk metrics, actions, and chart in that order without withholding any content from assistive technology.
- Recharts retains its existing data and library while adding a dashed hover indicator, highlighted active points, and short line/tooltip animation.
- Positive, neutral, and negative performance values now use truthful semantic tones without changing their values.

### Action, preset, and accessibility changes

- Added a localized `aria-live` feedback region for share, link-copy, image-download, and caption-copy success/error outcomes in `en`, `zh-CN`, `zh-TW`, `ms`, and `id`.
- Feedback dismisses after 2.4 seconds. Real asynchronous result actions expose one accurate `aria-busy` state and cannot overlap; no fake delay or spinner was added.
- The synchronous calculation handlers remain immediate, so adding `aria-busy` to the primary calculation CTA was not technically meaningful.
- Advanced options and additional presets remain mounted for smooth transitions but use `inert` and `aria-hidden` immediately when closed.
- Presets expose selected state with `aria-pressed`; manual input, mode, currency, or asset changes clear that cosmetic selection.
- `prefers-reduced-motion` disables CSS movement, staggering, smooth scrolling, and Recharts drawing/tooltip animation; content remains immediately readable.

### Mobile and performance

- Desktop and approximately 390px browser probes found no calculator text clipping or horizontal overflow; result actions stack/wrap and retain at least 44px control height.
- Motion uses opacity/small transforms and finite timers only. Cosmetic action feedback is isolated in `ResultActionBar`, avoiding full-home rerenders.
- No animation package, repeated `requestAnimationFrame` loop, continuous timer, fake loading state, or layout-shifting transform was added.

### Scope confirmation

- No DCA, compound-interest, or ETF-comparison formula or output was changed.
- No historical data, Yahoo Finance script, market-data pipeline, asset registry, URL, route, metadata, sitemap, canonical, hreflang, JSON-LD, Content Engine, Comparison Library, Google Analytics, AdSense, referral, affiliate, or environment behavior was modified.

### Verification

- `npm run build`: passed; Next.js 16.2.9 generated 352 static pages.
- `npm run check-site`: passed; 339 routes, 340 sitemap URLs, 5 public locales, 0 warnings, 0 errors.
- `npm run lint`: passed with 0 errors and 1 pre-existing warning at `scripts/check-site-quality.mjs:213`.
- `npm run qa:production`: passed; algorithm tests 4/4 and Playwright 97 passed with 1 expected mobile skip for a desktop-only viewport check.
- Focused regression tests cover CTA pressed feedback, collapsible focus safety, ordered advanced-result reveal, truthful clipboard failure, action concurrency, localized auto-dismiss feedback, performance tones, and reduced-motion chart/content availability.
- `git diff --check`: passed after the final documentation update.

### Git status and next step

- No commit, push, merge, deployment, branch switch, staging, or reset was performed.
- Founder should visually review the desktop and approximately 390px calculator interactions, then explicitly decide whether to authorize a commit.

## 2026-08-08 — DCA Backtest Design V3.1

### Result

- Implementation and local verification completed; ready for Founder Review.
- DCA and compound calculators now show a localized, accessible empty state until the user runs a valid first calculation.
- Completed metrics, charts, tables, sharing/export actions, and the result-comparison next step are hidden before calculation and restored afterward.
- Valid shared DCA URLs continue to restore their result and result actions.
- Existing automatic result updates after the first calculation remain unchanged.

### UI changes

- Grouped existing DCA controls into Asset, Investment plan, and Costs / advanced settings; advanced settings remain collapsed by default.
- Added one strong primary Calculate / Run backtest action per calculator while preserving existing secondary result actions and test IDs.
- Made final value the dominant result, followed by invested amount, profit, return, shares, and existing advanced details.
- Standardized dashboard groups, result container, controls, focus treatment, disabled state, tabular numerals, and responsive spacing.
- Reduced hero spacing slightly without changing the H1, description, disclaimer, or calculator links.
- Added localized dashboard copy for `en`, `zh-CN`, `zh-TW`, `ms`, and `id`.

### Scope confirmation

- No calculator formula, result value, market data, Yahoo script, asset registry, Content Engine, Comparison Library, route, metadata, sitemap, canonical, hreflang, JSON-LD, analytics, AdSense, referral, or environment configuration was modified.
- A missing-query parsing correction prevents an absent `amount` parameter from overwriting the existing default monthly investment with zero; valid shared URLs remain covered by E2E tests.

### Verification

- `npm run build`: passed; 352 static pages generated.
- `npm run check-site`: passed; 339 routes, 340 sitemap URLs, 5 public locales, 0 warnings, 0 errors.
- `npm run lint`: passed with 0 errors and 1 pre-existing warning at `scripts/check-site-quality.mjs:213`.
- `npm run qa:production`: passed; algorithm tests 4/4, Playwright 81 passed with 1 expected mobile-only skip.
- Focused desktop/mobile empty-state, result-action, shared-link, advanced-settings, touch-target, and overflow checks passed.
- 390px visual probe: 0px horizontal overflow and 0 clipped calculator labels/buttons.
- Read-only code review: no remaining Critical or Important findings after gating the result-comparison CTA.
- `git diff --check`: passed after documentation updates.

### Git status

- No commit, push, merge, or deployment was performed.

## 2026-07-15 — AADS v1.3 Sprint Execution Lifecycle

- Added Sprint Continuation Mode, Founder Review Mode, and Automatic Sprint
  Recommendation to `AGENTS.md`.
- Future `Continue`, `Proceed`, and `继续下一步` instructions automatically select
  the highest-priority unfinished task from `.ai/TASKS.md`.
- Automatic commit, push, merge, and deploy remain prohibited.
- No application source code changed; no commit or push was performed.

## 2026-07-15 — AADS v1.2 Governance Update

- Added the approved Implementation Sprint Policy to `AGENTS.md`.
- Preserved all calculator, market-data, framework, testing, SEO, security,
  documentation, communication, and Git approval rules.
- Reconciled the former default short-plan requirement: normal implementation
  now proceeds directly, while the listed high-impact changes and unclear or
  conflicting requirements still require Founder approval.
- Validation: documentation checks only; no application source code changed.
- Commit/push status: not performed.

## Session

- Date: 2026-07-15
- Reviewer: Codex
- Task: Release Verification V1

## Result

- Release decision: GO, subject to Founder approval and post-deployment verification
- Safe to commit: Yes
- No commit, push, merge, or deployment was performed

## Verification

- `npm run build`: passed; 352 static pages
- `npm run check-site`: passed; 339 routes, 340 sitemap URLs, 5 public locales, 0 warnings, 0 errors
- `npm run qa:production`: passed; algorithms 4/4, Playwright 79 passed with 1 expected mobile skip
- `npm run test:content-engine`: passed; 16/16 contracts
- `npm run audit-market-data`: passed; 63/63 historical assets, 0 missing, 0 sample-only
- `npm run lint`: passed; 0 errors and 1 pre-existing warning at `scripts/check-site-quality.mjs:213`
- `git diff --check`: passed before report generation and must be rerun after documentation updates

## SEO and Content Findings

- No duplicate sitemap URLs or public route duplicates detected
- No orphan public SEO pages detected
- No missing audited metadata, canonical, or hreflang output detected
- No broken Content Engine related links detected
- No invalid generated comparison breadcrumbs or FAQs detected
- No missing required comparison structured data detected
- Sitemap and robots are technically ready for Search Console discovery

## Non-Blocking Findings

- The optional legacy `npm run check-seo` exact-string audit is stale and reports a false positive for the current typed `getSeoPageAlternates()` and dynamic `getSeoPageXDefault()` implementation; authoritative `npm run check-site` passes.
- Actual Vercel deployment state and Google Search Console indexing/submission state were not verified locally.

## Report

- `docs/releases/2026-07-15-release-verification-v1.md`

## Recommended Next Step

- Founder reviews the diff and report, then explicitly authorizes commit/push/deployment if accepted.
