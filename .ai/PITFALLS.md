# Project Compound Pitfalls

## Purpose

Record project-specific mistakes, failed approaches, root causes, correct solutions, and prevention rules so the same issue is not repeated.

This file belongs only to **DCA Backtest / Compound Calculator**.

Keep entries factual, concise, and actionable. Do not use this file as a general changelog.

---

## 2026-07-11 — Do not maintain two project memory systems

**Context:**

The project previously used `agent_memory/`, while the V3 documentation structure introduced `.ai/`.

**What happened:**

Two documentation systems existed at the same time:

- `agent_memory/`
- `.ai/`

**Root cause:**

The new structure was created before the old project memory was fully migrated and retired.

**Impact:**

AI agents may read outdated or conflicting project information.

**Correct solution:**

Use only:

```text
.ai/PROJECT_MEMORY.md
.ai/TASKS.md
.ai/DECISIONS.md
.ai/PITFALLS.md
.ai/HANDOFF.md
```

Delete `agent_memory/` only after all important content has been reviewed and migrated.

**Prevention rule:**

Each project must have only one active project memory system.

**Related files or systems:**

- `agent_memory/`
- `.ai/`
- `AGENTS.md`

---

## 2026-07-10 — Share button Playwright selector was unreliable

**Context:**

End-to-end testing for share, copy, and download functions.

**What happened:**

The Playwright test could not reliably locate or interact with the share controls.

**Root cause:**

The test relied on UI text or layout-sensitive selectors.

**Impact:**

End-to-end tests failed even though the feature could work manually.

**Correct solution:**

Add stable `data-testid` attributes and scroll the target element into view before interaction.

**Prevention rule:**

Use stable test IDs for important interactive controls instead of fragile text or layout selectors.

**Related files or systems:**

- Share controls
- Playwright tests
- `data-testid`

---

## 2026-07-10 — Adding languages can break more than translations

**Context:**

Multilingual page expansion.

**What happened:**

Some languages had untranslated text, number overflow, incomplete pages, or inconsistent layout.

**Root cause:**

Language work was treated as translation-only instead of a routing, layout, SEO, legal-page, and production change.

**Impact:**

Possible broken pages, incomplete translations, SEO inconsistencies, and mobile layout problems.

**Correct solution:**

After adding or modifying a locale, verify:

- Homepage
- Calculator
- Legal pages
- Number formatting
- Mobile layout
- Sitemap
- Canonical URLs
- Hreflang
- Production QA

**Prevention rule:**

Treat every locale change as a product, UI, routing, SEO, and production change.

**Related files or systems:**

- Locale files
- Routing
- Sitemap
- Canonical URLs
- Hreflang
- Legal pages
- Playwright

---

## 2026-07-10 — Local build success does not prove production success

**Context:**

Production deployment and QA.

**What happened:**

The project could build locally while production still had rendering, routing, data, or deployment issues.

**Root cause:**

Local build results were treated as full production verification.

**Impact:**

Problems could reach the live site after a successful local build.

**Correct solution:**

Run the full production QA workflow and verify the deployed Vercel site.

**Prevention rule:**

Do not mark a task complete based only on `npm run build`.

**Related files or systems:**

- Vercel
- Production deployment
- `qa:production`
- Playwright

---

## 2026-07-10 — Market data sources may be incomplete or unreliable

**Context:**

Historical price data for ETFs and stocks.

**What happened:**

Some assets failed to fetch, had incomplete history, or only started from a later date.

**Root cause:**

External providers such as Yahoo Finance may have missing data, request failures, symbol differences, or limited history.

**Impact:**

Backtest results may be unavailable or cover a shorter period than users expect.

**Correct solution:**

- Validate each asset's available date range.
- Use an approved fallback or imported dataset where needed.
- Clearly display the available historical period.
- Run algorithm and production tests after data changes.

**Prevention rule:**

Never assume every ticker has complete and reliable historical data.

**Related files or systems:**

- Market data scripts
- `data/raw-market-data/`
- `public/market-data/`
- Asset configuration
- Algorithm tests

---

## 2026-07-10 — Do not manually edit generated market data

**Context:**

Automated market data updates.

**What happened:**

Generated CSV or public market data could be mistaken for manually maintained files.

**Root cause:**

The automation source of truth was not checked before editing.

**Impact:**

Manual changes may be overwritten or conflict with automated updates.

**Correct solution:**

Review the following before changing market data:

```text
.github/workflows/update-market-data.yml
data/raw-market-data/
public/market-data/
```

**Prevention rule:**

Do not manually edit generated data unless the automation workflow and source files have been reviewed.

**Related files or systems:**

- GitHub Actions
- Market data scripts
- Generated CSV files

---

## Entry Template

### YYYY-MM-DD — Short Title

**Context:**

**What happened:**

**Root cause:**

**Impact:**

**Correct solution:**

**Prevention rule:**

**Related files or systems:**
