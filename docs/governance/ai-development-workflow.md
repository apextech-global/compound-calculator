# Apex Tech AI-Assisted Development Workflow

This document describes the standard, repeatable AI-assisted development
workflow used across all Apex Tech Sdn. Bhd. websites and apps. It is
designed for a solo founder working with multiple AI tools, and it is meant
to remain valid for future projects without modification.

## Why This Exists

A single founder cannot manually coordinate every hand-off between AI tools
on every project. This workflow standardizes who does what, in what order,
and what safety rules apply, so new projects can adopt it by copying this
template instead of re-deriving it.

## Tool Responsibility Model

| Stage | Responsible Tool(s) | Purpose |
|---|---|---|
| Discovery | Gemini, ChatGPT | Market research, competitor research, SEO opportunity, demand validation, worth-it/not-worth-it call |
| Product Definition | ChatGPT | PRD, MVP scope, user flow, acceptance criteria, risks, out of scope |
| UI Prototyping (optional) | v0 | Fast UI prototypes, landing page drafts, dashboard/pricing/calculator/onboarding concepts, frontend visual inspiration; reviewed by ChatGPT before Task Breakdown |
| Task Breakdown | ChatGPT | Create small, Claude Code-ready GitHub Issues; keep tasks small; avoid overengineering |
| Development | Claude Code | Implement, refactor, add tests when appropriate, run lint/build, open PR |
| Automated Checks | GitHub Actions | Lint/build/test on every PR |
| Review | Codex | Review diff for bugs, security, performance, overengineering, unnecessary dependencies, regressions |
| Fix | Claude Code | Address Codex review comments, re-run checks, update PR |
| Final Judgment | ChatGPT | Decide merge/release readiness, record risks and follow-up issues |
| Release & Tracking | GitHub, GitHub Actions, Vercel (where applicable), Search Console (where applicable) | Build verification, release notes, issue tracking, SEO/indexing monitoring |

Founder / CEO (Hiew / Apex Tech) has final authority at every stage and can
override or stop any step.

## Standard Flow

1. **Discovery** — Gemini and/or ChatGPT research the market, competitors,
   and SEO opportunity for a proposed feature or product.
2. **Product Definition** — ChatGPT, acting as CTO + Product Lead, turns
   validated ideas into a PRD with MVP scope, user flow, architecture notes,
   risks, and acceptance criteria.
3. **UI Prototyping (optional)** — v0 generates UI prototypes, landing page
   drafts, dashboard/pricing/calculator/onboarding concepts, or frontend
   visual inspiration. ChatGPT reviews v0 output and decides what, if
   anything, becomes part of the acceptance criteria before Task Breakdown.
   v0 output is a visual reference only; it is not implemented directly.
4. **Task Breakdown** — ChatGPT creates small, well-scoped GitHub Issues,
   each with scope, out of scope, and acceptance criteria, sized for a
   single Claude Code session.
5. **Implementation** — Claude Code implements the issue following
   [issue-to-pr-workflow.md](./issue-to-pr-workflow.md) and opens a PR.
6. **Automated Checks** — GitHub Actions runs the PR checks workflow
   (`.github/workflows/pr-checks.yml`): lint/build/test where applicable.
7. **Review** — Codex reviews the PR using
   [prompts/codex-pr-review.md](../../prompts/codex-pr-review.md).
8. **Fix** — Claude Code addresses Codex feedback and pushes updates.
9. **Final Decision** — ChatGPT reviews the PR, Codex findings, and CI
   results, then recommends merge, request changes, or hold. The founder
   makes the final merge/release call.
10. **Release & Tracking** — GitHub Releases record what shipped; Vercel
    deploys where applicable; Search Console tracks SEO/indexing impact. See
    [release-workflow.md](./release-workflow.md).

## Related Documents

- [issue-to-pr-workflow.md](./issue-to-pr-workflow.md) — detailed Issue → PR
  steps for Claude Code.
- [release-workflow.md](./release-workflow.md) — release and tracking steps.
- [branch-protection.md](./branch-protection.md) — interim manual branch
  safety rules until GitHub branch protection is available.
- [multi-agent-workflow.md](./multi-agent-workflow.md) — roles and brief
  template for tasks split across more than one agent.
- [prompts/](../../prompts/) — role prompts for ChatGPT, Claude Code, Codex,
  Gemini, and v0.
- [prompts/v0-ui-prototyping.md](../../prompts/v0-ui-prototyping.md) — how to
  use v0 for UI prototyping and hand its output to ChatGPT for review.
- [../../AGENTS.md](../../AGENTS.md) — baseline rules shared by any AI agent
  working in this repo.
- [.ai/](../../.ai/) — project-specific memory and workflow documentation:
  - `PROJECT_MEMORY.md` — stable, long-term project context
  - `TASKS.md` — current active task, ready work, and backlog
  - `DECISIONS.md` — confirmed product and technical decisions
  - `PITFALLS.md` — project-specific mistakes, risks, and prevention rules
  - `HANDOFF.md` — latest implementation and review handoff

## Safety Rules for Solo Founder Development

These rules apply to every Apex Tech project using this workflow, across
all AI tools:

- AI must not auto-merge pull requests.
- AI must not change DNS, billing, secrets, production settings, or
  deployment settings without explicit founder confirmation.
- AI must not use Full Access / autonomous modes by default.
- AI must not add login, database, payment, analytics, or ads unless the
  product requires it.
- AI must not add unnecessary dependencies.
- AI must not overengineer early MVPs.
- v0 output is a visual prototype only. It must not be treated as
  production-ready code, and it must be reviewed by ChatGPT before Claude
  Code implements any part of it.
- v0 must not replace Claude Code as the production engineer, and must not
  replace Codex review.
- Every task should start from business value and user value.
- Every task should define scope, out of scope, and acceptance criteria
  before implementation begins.
- The founder keeps final control over merge, release, billing, DNS, and
  production decisions.

## Out of Scope for This Workflow

- Auto-merge of any kind.
- Auto-deploy approval.
- Paid GitHub features.
- Additional third-party AI tools beyond ChatGPT, Gemini, Claude Code,
  Codex, and v0.
- v0 API integration or browser automation.
- Auto-importing v0-generated code directly into a production repo.
- Complex project management systems.
- Docker, databases, payments, or analytics unless a specific project
  explicitly requires them.
