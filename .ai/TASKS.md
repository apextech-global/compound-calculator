# Current Tasks

## Active Task

### Korean Market Launch V1 + Safari JSON-LD Compatibility

**Status:** Implementation and local verification completed; awaiting Founder Review

**Objective:**

Launch Korean as a public locale, add the approved first eight South Korean ETFs and stocks with real historical data, and remove the Safari development overlay caused by top-level JSON-LD arrays.

**Business reason:**

Open the product to Korean-language search and calculator users while providing locally relevant KRW assets and a clean Safari experience.

**In scope:**

- Promote `ko` through existing locale, sitemap, canonical, hreflang, navigation, legal, metadata, Content Engine, and internal-linking paths
- Complete the Korean message contract and Korean-only hardcoded copy used by the current UI/content implementation
- Add KODEX 200, TIGER U.S. S&P 500, TIGER U.S. NASDAQ 100, Samsung Electronics, SK hynix, Hyundai Motor, NAVER, and Samsung Biologics
- Fetch Yahoo Finance daily data through the existing pipeline and import monthly KRW backtest CSV files
- Preserve every structured-data node while serializing multi-node JSON-LD as an object-root `@graph`
- Add automated Korean-launch, historical-data, sitemap, metadata, and Safari JSON-LD regression coverage

**Out of scope:**

- Calculator formulas or financial output changes
- UI redesign, new routing architecture, Content Engine architecture changes, new dependencies, or infrastructure changes
- Commit, push, merge, or deployment

**Acceptance criteria:**

- `/ko` and all shared public routes render with Korean metadata, canonical, hreflang, legal content, structured data, and internal links
- The calculator defaults to KRW for Korean and selects all eight South Korean assets through the existing query contract
- All eight assets use imported historical data rather than sample data
- Multi-node JSON-LD has a string top-level `@context` and object root on homepage, comparison, and learn pages
- Existing calculations, routing behavior, UI design, Content Engine architecture, and non-Korean locales remain functional
- Required validation passes with no blocking issue

**Required tests:**

```bash
npm run build
npm run check-site
npm run qa:production
npm run test:content-engine
npm run audit-market-data
npm run validate-market-data
npm run lint
git diff --check
```

**Validation result:** All required commands pass. Production QA reports algorithm tests 4/4 and Playwright 103 passed with 1 expected desktop-only skip. Site checks report 402 routes, 403 sitemap URLs, 6 public locales, 0 warnings, and 0 errors. Market-data audit and validation report 71/71 historical assets with 0 missing or sample-only assets.

**Risks:** Local QA cannot prove the future deployed Vercel rendering, Safari behavior on every release, or Search Console indexing. Yahoo Finance is a third-party source and may later revise or temporarily withhold data.

⸻

Ready

Simplify the multi-agent workflow

* Reduce it to approximately 120–180 lines
* Keep only:
    * When multiple roles are needed
    * Four necessary roles
    * Short task brief
    * File ownership
    * Read-only review
    * Evidence-based handoff
    * Link back to AGENTS.md

Run final Codex review

* Verify the three previous findings are resolved
* Verify no new conflict was introduced
* Obtain a final Safe to commit: Yes / No

⸻

Backlog

* Verify the exact current Next.js version
* Verify the exact public locale count
* Verify the exact supported asset count
* Verify current production QA scripts from package.json
* Review Search Console indexing status
* Continue improving non-US market-data coverage
* Continue multilingual SEO and content expansion

⸻

Completed Recently

2026-08-08 — DCA Backtest Design V3.2

* Added approved restrained motion, result feedback, reduced-motion handling, and interaction polish.
* Local validation completed before Korean Market Launch V1 began; no commit or push was performed.

2026-08-08 — DCA Backtest Design V3.1

* Added the approved calculator dashboard and honest pre-calculation empty state.
* Preserved formulas, outputs, data, routing, SEO, analytics, Content Engine, and Comparison Library behavior.
* Local validation completed before V3.2 began; no commit or push was performed.

2026-07-15 — Adopted AADS v1.2 Implementation Sprint Policy

* Updated `AGENTS.md` only within project governance.
* Preserved project-specific calculator and operational rules.
* Removed the contradictory default requirement for a pre-implementation plan.
* No application source code was modified; no commit or push was performed.

2026-07-11 — V3 migration implementation

Implementation completed:

* Created the five required .ai files
* Updated AGENTS.md
* Removed the legacy AI-specific rule file
* Removed the legacy project-memory directory
* Updated governance documents
* Updated the Issue-to-PR workflow
* Updated the Claude implementation prompt
* Moved the pre-V3 backup outside the repository
* Removed active references to the legacy documentation structure

Final review is still pending.

Do not treat this task as fully complete until Codex returns Safe to commit: Yes.
