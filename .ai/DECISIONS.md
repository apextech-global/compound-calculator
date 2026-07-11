# Project Decisions

## Purpose

Record confirmed product, technical, SEO, data, workflow, and business decisions that future AI agents must not silently reverse.

Only add decisions that are explicitly approved or clearly verified from the repository and production setup.

---

## 2026-07-11 — Use the V3 project documentation structure

**Decision:**

Use the following project documentation structure:

```text
AGENTS.md
.ai/
  PROJECT_MEMORY.md
  TASKS.md
  DECISIONS.md
  PITFALLS.md
  HANDOFF.md
```

**Reason:**

The previous `agent_memory/` structure overlapped with the new `.ai/` structure and could create conflicting sources of truth.

**Alternatives considered:**

- Keep both `agent_memory/` and `.ai/`
- Keep only `agent_memory/`
- Move to `.ai/` as the only active project memory system

**Consequences:**

- `.ai/` becomes the only active project documentation system.
- `agent_memory/` may be removed only after all important content is migrated and verified.
- AI agents must follow the reading order in `AGENTS.md`.

**Do not change unless:**

A future company-wide documentation standard is explicitly approved.

---

## 2026-07-11 — `AGENTS.md` is the single source of truth for AI roles and project rules

**Decision:**

All AI role assignments, project rules, testing expectations, scope controls, Git rules, and completion criteria are maintained in `AGENTS.md`.

**Reason:**

Maintaining separate full rule files for ChatGPT, Claude Code, Codex, and Gemini creates duplication and drift.

**Alternatives considered:**

- Separate full prompt file for each AI
- One shared `AGENTS.md`
- Short AI-specific entry files plus `AGENTS.md`

**Consequences:**

- AI-specific full rule files are not required.
- Every AI must read `AGENTS.md` before work.
- No second or conflicting rule system should be created.

**Do not change unless:**

A specific tool technically requires a separate entry file and that file only points back to `AGENTS.md`.

---

## 2026-07-11 — Keep project memory and pitfalls project-specific

**Decision:**

`PROJECT_MEMORY.md` and `PITFALLS.md` belong only to this repository.

**Reason:**

DCA Backtest has product, data, SEO, testing, and deployment constraints that should not be mixed with other Apex Tech projects.

**Alternatives considered:**

- One global project memory
- One global pitfalls file
- Separate files inside each repository

**Consequences:**

- DCA Backtest information stays in this repository.
- QR Nest and future projects must maintain their own files.
- Shared company rules remain outside project-specific memory.

**Do not change unless:**

A reusable lesson is deliberately promoted into a company-wide rule without removing the project-specific record.

---

## 2026-07-10 — Production domain is `dcabacktest.com`

**Decision:**

Use `dcabacktest.com` as the production domain and canonical project identity.

**Reason:**

This is the approved live domain for DCA Backtest / Compound Calculator.

**Alternatives considered:**

Needs verification from historical project records.

**Consequences:**

- SEO metadata, canonical URLs, sitemap, robots, analytics, and production checks must align with this domain.
- Domain-related changes require SEO and production verification.

**Do not change unless:**

The Founder explicitly approves a domain migration.

---

## 2026-07-10 — Keep DCA Backtest and Compound Calculator in one product

**Decision:**

The product includes both:

- Historical DCA backtesting
- Forward-looking compound growth calculation

**Reason:**

Both tools serve the same long-term investing audience and support the same SEO and educational positioning.

**Alternatives considered:**

- Split into separate websites
- Remove one calculator
- Keep both modes in one product

**Consequences:**

- Product messaging should clearly explain both use cases.
- Changes to navigation, homepage positioning, or SEO should preserve both product modes.

**Do not change unless:**

There is a validated business reason to split or remove a product mode.

---

## 2026-07-10 — Global and multilingual product direction

**Decision:**

The product targets global users and supports multiple languages and currencies.

**Reason:**

The product is intended for international investing audiences and organic search growth.

**Alternatives considered:**

- English-only product
- Single-country product
- Global multilingual product

**Consequences:**

- Locale changes must include UI, routing, legal, sitemap, canonical, and hreflang checks.
- Number and currency formatting must be tested.
- Mobile layout must be verified after translation changes.

**Do not change unless:**

The Founder explicitly changes the market strategy.

---

## 2026-07-10 — Monetization uses SEO, AdSense, and selective affiliate recommendations

**Decision:**

Current monetization direction includes:

- Organic SEO traffic
- Google AdSense
- Affiliate recommendations where appropriate

**Reason:**

This supports a lightweight content-and-tools business model without adding user accounts or payment complexity.

**Alternatives considered:**

- Subscription model
- User accounts and paid plans
- Advertising and affiliate model

**Consequences:**

- Do not add authentication, subscriptions, or paid infrastructure without approval.
- SEO quality, legal disclosures, and ad-policy compliance remain important.

**Do not change unless:**

A new monetization model is explicitly approved.

---

## 2026-07-10 — Automated market data is the source of truth

**Decision:**

Market data updates must follow the approved automation workflow and source files.

**Reason:**

Manual edits to generated files may be overwritten or may conflict with automated updates.

**Alternatives considered:**

- Manual data maintenance
- Automated update workflow
- Mixed manual and automated editing

**Consequences:**

Before changing market data, review:

```text
.github/workflows/update-market-data.yml
data/raw-market-data/
public/market-data/
```

Run algorithm and production tests after data changes.

**Do not change unless:**

The data pipeline is intentionally redesigned and approved.

---

## 2026-07-10 — Full QA is required; build alone is insufficient

**Decision:**

A successful local build is not enough to approve completion.

**Reason:**

Production issues can still exist in routing, locale behavior, market data, rendering, deployment, or browser interactions.

**Alternatives considered:**

- Build-only verification
- Build plus targeted tests
- Full project QA and production verification

**Consequences:**

Use the relevant project scripts from `package.json`, including build, site checks, algorithm tests, Playwright tests, and production QA where applicable.

**Do not change unless:**

The test strategy is intentionally updated and provides equal or stronger coverage.

---

## Decision Entry Template

### YYYY-MM-DD — Decision Title

**Decision:**

**Reason:**

**Alternatives considered:**

**Consequences:**

**Do not change unless:**
