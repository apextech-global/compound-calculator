# Current Tasks

## Active Task

### Calculator UI V2.1 — Financial Dashboard Polish

**Status:** Implementation complete; validation passed

**Objective:**

Polish the existing V2 dashboard container, controls, KPI cards, action hierarchy, typography, and mobile behavior without changing workflow or calculation behavior.

**Business reason:**

Improve calculator clarity, trust, mobile usability, and result scanning while preserving formulas, data, SEO, routing, analytics, and translations.

**In scope:**

- Calculator container and visual hierarchy
- Standardized inputs, focus states, and mobile touch targets
- Primary and secondary result metric hierarchy
- Unified share/copy/download action styling
- Advanced options presentation
- Public-locale clipping and mobile overflow regression coverage
- KPI integrity coverage before and after input changes

**Out of scope:**

- Calculator formulas and output logic
- Market data and Yahoo Finance scripts
- SEO, routes, locales, translations, analytics, and advertising
- New actions, metrics, dependencies, or workflow changes
- Commit, push, PR, or deployment

**Acceptance criteria:**

- Both calculators use the V2 dashboard hierarchy
- Existing controls, mode switch, advanced options, and secondary share actions work
- Result metrics remain unchanged and are easier to scan
- All five public locales avoid obvious calculator label clipping
- Mobile view has no horizontal overflow
- Required build, site, lint, algorithm, and Playwright checks pass

**Required tests:**

```bash
npm run build
npm run check-site
npm run lint
npm run qa:production
```
**Risks:** CSS primitives are scoped to calculator dashboards, but final visual review on additional physical devices remains useful.

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
