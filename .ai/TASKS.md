# Current Tasks

## Active Task

### V3 Documentation Migration — Final Review

**Status:** In review

**Objective:**

Complete the final review and correction of the V3 AI documentation migration.

**Business reason:**

Ensure the new AI documentation structure is consistent, maintainable, safe for a Solo Founder workflow, and free from conflicting instructions.

**In scope:**

- Confirm Git authorization rules are consistent
- Confirm `.ai/HANDOFF.md` reflects the current migration
- Simplify `docs/governance/multi-agent-workflow.md`
- Run final documentation-only review
- Confirm whether the migration is safe to commit

**Out of scope:**

- Product feature changes
- Calculator logic changes
- SEO content changes
- Market data changes
- Dependency changes
- Production deployment

**Acceptance criteria:**

- Git permissions are consistent across active documents
- `HANDOFF.md` reflects the current migration
- `multi-agent-workflow.md` is concise and does not duplicate `AGENTS.md`
- No active file requires `CLAUDE.md` or the legacy memory structure
- No business code is modified
- `git diff --check` passes
- Codex final review returns `Safe to commit: Yes`

**Required tests:**

```bash
git status --short
git diff --check
git diff --stat
git diff --name-status
git diff
```
Risks:

* Governance documents may still contain duplicated rules
* The multi-agent workflow may remain too complex
* The migration may be committed before the final review passes

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
