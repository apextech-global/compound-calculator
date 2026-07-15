# Current Tasks

## Active Task

### Release Verification V1

**Status:** Verification completed; GO recommendation awaiting Founder approval

**Objective:**

Verify that the Comparison Library Expansion V2 production candidate is ready for release.

**Business reason:**

Prevent SEO, routing, structured-data, calculator, content, or market-data regressions from reaching production.

**In scope:**

- Build, sitemap, robots, metadata, canonical, hreflang, JSON-LD, internal-link, comparison, calculator, supported-assets, Content Engine, and Search Console technical-readiness verification
- Duplicate-page, orphan-page, metadata, related-link, breadcrumb, FAQ, and structured-data audits
- Required command execution and evidence-based release report

**Out of scope:**

- New features, redesign, product-code fixes, dependency changes, or deployment
- Commit, push, PR, or deployment

**Acceptance criteria:**

- All Founder-required commands pass
- No release-blocking SEO, routing, content, calculator, or structured-data defect remains
- Release report clearly separates local technical readiness from post-deployment and Search Console verification

**Required tests:**

```bash
npm run build
npm run check-site
npm run qa:production
npm run test:content-engine
npm run audit-market-data
npm run lint
git diff --check
```
**Risks:** Local QA cannot prove a future Vercel deployment or Google Search Console indexing state. One pre-existing lint warning and one stale optional SEO audit remain documented as non-blocking.

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
