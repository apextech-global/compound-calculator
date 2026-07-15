# Current Tasks

## Active Task

### Content Engine V1 Stabilization / Release Blocker Fix V1

**Status:** Stabilization and validation completed; deterministic market-data coverage release blocker fixed

**Objective:**

Stabilize the shared comparison content engine with enforceable contracts, runtime configuration auditing, direct model rendering, and regression tests.

Make the generated market-data coverage report deterministic when CSV contents do not change.

**Business reason:**

Make future comparison-page additions safe and configuration-led without changing current content, SEO, routes, or calculator behavior.

**In scope:**

- Discriminated configuration contracts for ETF, strategy, calculator, and broker pages
- Runtime validation, safe missing-config behavior, and one authoritative registry
- Direct generated-model rendering in the SEO page layer
- Focused Content Engine contract tests and deterministic site audits
- Market-data coverage dates derived from CSV trading data instead of filesystem timestamps

**Out of scope:**

- New pages, ETFs, comparison pairs, visible content, UI, routes, or URLs
- Calculator formulas, Yahoo Finance, analytics, AdSense, translations, or market data
- Reverting legitimate earlier approved work already present in the dirty workspace
- Commit, push, PR, or deployment

**Acceptance criteria:**

- Every comparison route maps to exactly one valid descriptor
- Invalid or missing configuration cannot render an incomplete comparison page
- Contract tests cover four kinds, locale, metadata, JSON-LD, breadcrumb, links, CTA, determinism, and unsupported data
- Visible content and existing SEO behavior remain compatible
- Required validation passes
- Consecutive market-data audits produce byte-identical coverage output

**Required tests:**

```bash
npm run audit-market-data
npm run audit-market-data
npm run build
npm run check-site
npm run lint
npm run qa:production
git diff --check
```
**Risks:** The workspace still contains legitimate earlier Asset Expansion and Comparison Library changes; they must be reviewed as part of the eventual combined commit or separated by the Founder.

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
