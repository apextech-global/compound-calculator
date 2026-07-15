# Content Engine V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one stateless, configuration-driven engine for all comparison-style page content without changing visible or SEO behavior.

**Architecture:** Discriminated configurations describe ETF, strategy, calculator, and broker pages. Small pure generators create content models; a stateless orchestrator composes them for the existing SEO page renderer.

**Tech Stack:** TypeScript, Next.js 16.2.9, existing site-quality and Playwright validation.

## Global Constraints

- Do not change UI, URLs, calculator logic, formulas, Yahoo Finance, routing, analytics, or advertising.
- Preserve existing visible content and SEO behavior.
- Do not commit or push.

---

### Task 1: Establish engine registration regression checks

**Files:**
- Modify: `scripts/check-site-quality.mjs`

**Interfaces:**
- Consumes: comparison slug registries
- Produces: failing checks for missing engine and generator registrations

- [ ] Add checks for all comparison-style slugs and required generator modules.
- [ ] Run `npm run check-site` and confirm failure because the engine does not exist.

### Task 2: Create stateless generator modules and models

**Files:**
- Create: `lib/comparisonContent/models.ts`
- Create: `lib/comparisonContent/generators/hero.ts`
- Create: `lib/comparisonContent/generators/metadata.ts`
- Create: `lib/comparisonContent/generators/jsonLd.ts`
- Create: `lib/comparisonContent/generators/faq.ts`
- Create: `lib/comparisonContent/generators/relatedLinks.ts`
- Create: `lib/comparisonContent/generators/calculatorCta.ts`
- Create: `lib/comparisonContent/generators/prosCons.ts`
- Create: `lib/comparisonContent/generators/breadcrumb.ts`
- Create: `lib/comparisonContent/engine.ts`

**Interfaces:**
- Consumes: `ComparisonPageConfig`, explicit locale/page URL context
- Produces: `generateComparisonContent(config, context): ComparisonContentModel`

- [ ] Define discriminated configuration and generated content types.
- [ ] Implement pure Hero, Metadata, FAQ, RelatedLinks, Calculator CTA, Pros/Cons, and JSON-LD generators.
- [ ] Implement a stateless orchestrator that only composes generator output.
- [ ] Run `npm run check-site` and confirm generator architecture checks pass.

### Task 3: Migrate comparison configurations

**Files:**
- Modify: `lib/comparisonLibrary.ts`
- Modify: `lib/seoLandingPages.ts`

**Interfaces:**
- Consumes: comparison assets, localized copy, existing legacy page content
- Produces: engine configuration for ETF, strategy, calculator, and broker comparison kinds

- [ ] Move generated ETF and broker page policies into engine configurations.
- [ ] Adapt legacy comparison content to configurations without changing copy.
- [ ] Register every comparison-style slug with one engine lookup.
- [ ] Run `npm run build` and `npm run check-site`.

### Task 4: Make the page renderer consume generated models

**Files:**
- Modify: `app/[locale]/[seoPage]/page.tsx`

**Interfaces:**
- Consumes: generated metadata and JSON-LD models
- Produces: unchanged rendered page and SEO output

- [ ] Replace inline comparison JSON-LD construction with generated JSON-LD where available.
- [ ] Keep non-comparison rendering on existing behavior.
- [ ] Ensure the component never branches on `comparisonKind`.
- [ ] Run `npm run build` and `npm run check-site`.

### Task 5: Documentation and full verification

**Files:**
- Modify: `.ai/TASKS.md`
- Modify: `.ai/HANDOFF.md`

**Interfaces:**
- Consumes: final implementation and command output
- Produces: evidence-based handoff

- [ ] Update task and handoff documentation.
- [ ] Run `npm run build`.
- [ ] Run `npm run check-site`.
- [ ] Run `npm run qa:production`.
- [ ] Run `npm run lint`.
- [ ] Run `git diff --check`.
- [ ] Review final status and diff; do not commit or push.
