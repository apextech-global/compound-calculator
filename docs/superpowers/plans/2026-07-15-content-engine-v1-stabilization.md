# Content Engine V1 Stabilization Implementation Plan

> **For agentic workers:** Execute inline with TDD. Do not commit or push.

**Goal:** Make Content Engine V1 type-safe, deterministic, validated, directly consumable by the page layer, and protected by executable contract tests.

**Architecture:** Use a discriminated `ComparisonPageConfig` union, one pure validation function, one stateless generation service, and one registry lookup path. Keep generators small and deterministic; render comparison models directly without inspecting comparison kinds in the page component.

**Tech Stack:** TypeScript, Node test runner, Next.js 16.2.9, existing site-quality and Playwright validation.

## Global Constraints

- Preserve all visible content, URLs, locales, SEO output, CTA behavior, calculator logic, and market-data behavior.
- Add no pages, assets, pairs, dependencies, analytics, advertising, or affiliate links.
- Do not modify or delete previously approved market-data work.
- Do not commit or push.

### Task 1: Executable contract-test harness

**Files:**
- Create: `tests/content-engine/contracts.ts`
- Create: `scripts/test-content-engine.mjs`
- Modify: `package.json`

- [ ] Define tests for ETF, strategy, calculator, broker, missing/invalid config, locale override, related links, current-page exclusion, CTA availability, metadata, JSON-LD, breadcrumbs, determinism, and unsupported-data honesty.
- [ ] Run `npm run test:content-engine` and verify failure against the current contracts.

### Task 2: Type-safe contracts and validation

**Files:**
- Modify: `lib/comparisonContent/models.ts`
- Create: `lib/comparisonContent/validation.ts`
- Modify: `lib/comparisonContent/engine.ts`

- [ ] Replace the flat config with a discriminated union that constrains CTA and JSON-LD by comparison kind.
- [ ] Validate required content, slugs, locale support, related links, self-links, CTA rules, and JSON-LD strategy.
- [ ] Return `null` for invalid configuration and deterministic models for valid configuration.
- [ ] Run contract tests until green.

### Task 3: Single configuration transformation and lookup path

**Files:**
- Modify: `lib/comparisonLibrary.ts`
- Modify: `lib/seoLandingPages.ts`
- Create: `lib/comparisonContent/service.ts`

- [ ] Consolidate duplicate adapter transformation into one pure service.
- [ ] Keep `comparisonLibrary.ts` limited to structured definitions, content factories, and lookup helpers.
- [ ] Ensure missing or invalid configs resolve to `null` and can trigger `notFound()`.
- [ ] Preserve exact localized content and ordering.

### Task 4: Direct page-model rendering and runtime site audit

**Files:**
- Modify: `app/[locale]/[seoPage]/page.tsx`
- Modify: `scripts/check-site-quality.mjs`

- [ ] Render comparison hero, sections, FAQ, CTA, related links, metadata, and JSON-LD from the generated model.
- [ ] Keep non-comparison SEO pages on the existing fallback model.
- [ ] Replace source-string architecture assertions with deterministic execution of the contract audit.
- [ ] Verify every route/config/locale/link/CTA/schema contract.

### Task 5: Verification and handoff

**Files:**
- Modify: `.ai/TASKS.md`
- Modify: `.ai/HANDOFF.md`

- [ ] Run `npm run test:content-engine`.
- [ ] Run `npm run build`.
- [ ] Run `npm run check-site`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run qa:production`.
- [ ] Run `git diff --check`.
- [ ] Confirm market-data/Yahoo/audit files were not modified during stabilization.
