# Issue-to-PR Workflow (Claude Code)

This document defines the repeatable path from a GitHub Issue to a merged
Pull Request for Apex Tech projects.

See [ai-development-workflow.md](./ai-development-workflow.md) for the full
tool responsibility model, and
[prompts/claude-issue-to-pr.md](../../prompts/claude-issue-to-pr.md) for the
prompt Claude Code should be given at the start of each task.

## Preconditions

Before implementation starts, the GitHub Issue must have:

- A clear problem statement and goal.
- Scope and out-of-scope sections.
- Acceptance criteria.
- Any relevant links to PRD, architecture, or prior decisions in
  `docs/product/`, `docs/architecture/`, or `docs/decisions/`, where those
  exist for this project.

If an issue is missing these, Claude Code should stop and ask ChatGPT (via
the founder) to clarify rather than guessing.

## Steps

1. **Read context.**
   - Read `CLAUDE.md`.
   - Read the target GitHub Issue in full (via `gh issue view` or the
     issue text provided).
   - Read any related docs under `docs/` and existing prompts.

2. **Create a feature branch.**
   - Branch from `main`.
   - Use a descriptive name, e.g. `feature/issue-12-checkout-validation`.
   - Do not commit directly to `main` unless explicitly instructed.

3. **Implement the smallest change that satisfies the issue.**
   - Follow the Karpathy-inspired coding principles in `CLAUDE.md`:
     think before coding, simplicity first, surgical changes, goal-driven
     execution.
   - Do not touch unrelated files.
   - Do not add dependencies, Docker, database, auth, analytics, or
     payments unless the issue explicitly requires them.

4. **Add or update tests** when the change affects behavior.

5. **Run local checks** (lint/build/test) if the project has them
   configured, before opening the PR.

6. **Open a Pull Request.**
   - Reference the issue number.
   - Fill in Summary, Why This Change Is Needed, What Changed, How It Was
     Tested, and Risk.
   - Mark the PR as ready for Codex review.

7. **Wait for automated checks.**
   - GitHub Actions runs `.github/workflows/pr-checks.yml`.
   - If checks fail, fix the underlying issue rather than disabling checks.

8. **Hand off to Codex review** using
   [prompts/codex-pr-review.md](../../prompts/codex-pr-review.md).

9. **Address Codex feedback.**
   - Fix confirmed issues.
   - Push updates to the same branch/PR.
   - Do not dismiss review feedback without explanation.

10. **Hand off to ChatGPT for final decision** using
    [prompts/chatgpt-product-lead.md](../../prompts/chatgpt-product-lead.md).
    ChatGPT recommends merge, request-changes, or hold; the founder makes
    the final call.

11. **Merge.**
    - Founder merges (squash merge preferred, per
      [branch-protection.md](./branch-protection.md)).
    - Delete the feature branch after merge.

## Completion Report

At the end of every task, Claude Code reports:

1. Files changed
2. What changed
3. Why it changed
4. How it was tested
5. Any risks or follow-up work

## Stop Conditions

Claude Code stops and asks for guidance if:

- The requirement is unclear.
- The change affects architecture.
- The task requires a new paid service, database migration, or secrets.
- Tests fail and the fix is not obvious.
- The requested change conflicts with the issue's acceptance criteria or
  business goals.
