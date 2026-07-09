# Multi-Agent Task Workflow

This document defines how to scope work when more than one AI agent role is
needed within a single implementation task (for example, a read-only
exploration pass before editing, or a separate verification pass after a
change). It is a lightweight extension of
[ai-development-workflow.md](./ai-development-workflow.md), not a
replacement for it — the ChatGPT / Claude Code / Codex / Gemini tool
responsibilities across the Issue-to-PR lifecycle still apply.

## Roles

- **Read-only explorer** — locates code, reads files, answers "where is X"
  or "how does Y work" questions. Cannot edit files.
- **Scoped implementation worker** — makes the actual code change, within
  an explicit, disjoint area of ownership.
- **Security reviewer** — checks a change for security risk (injection,
  secrets, unsafe dependencies, auth gaps) without making edits.
- **Verification worker** — runs and reports on tests, lint, build, or
  manual checks against a change, without making unrelated edits.
- **Handoff writer** — summarizes findings and evidence into a short report
  for the next role or the founder; does not implement or review code.

## Required Brief Template

Whenever work is split across more than one agent/role, write a short brief
for each role using this template:

```
Role: <one of the roles above>
Goal: <the single outcome this role must produce>
Context: <the minimum this role needs — issue link, files, prior findings>
Allowed actions: <what this role may do>
Ownership: <exact files/areas this role owns, disjoint from other roles>
Forbidden actions: <what this role must not do>
Output format: <what the role reports back, e.g. findings + evidence>
Stop condition: <when the role stops and hands off or asks for guidance>
```

See [prompts/multi-agent-task-brief.md](../../prompts/multi-agent-task-brief.md)
for a copyable version of this template.

## Rules

- Do not spawn multiple agents just because this workflow exists. Most
  tasks need exactly one role — usually the scoped implementation worker.
- Use more than one role only when the task clearly needs it, e.g. a large
  or security-sensitive change benefits from a separate review pass.
- When multiple agents/roles are used, ownership must be disjoint: no two
  roles edit the same files at the same time.
- Every handoff requires findings and evidence, not just a summary claim
  (e.g. "tests pass" must say what was run and what it showed, not just
  assert it).
- Stop and ask the founder if permissions, ownership, or data access across
  roles are unclear.

## How This Maps to Apex Tech Tools

- **ChatGPT** — CTO + Product Lead + final decision maker across the whole
  Issue-to-PR lifecycle (see
  [ai-development-workflow.md](./ai-development-workflow.md)).
- **Claude Code** — scoped implementation worker; may use its own
  read-only-explorer or verification sub-agents within a single task, per
  `AGENTS.md` and `CLAUDE.md`.
- **Codex** — security reviewer / PR reviewer / verification reviewer.
- **Gemini** — read-only explorer for market and discovery research.
- **v0** — read-only explorer for UI/frontend visual prototyping; produces
  draft UI concepts (landing pages, dashboards, pricing/calculator UI,
  onboarding flows) for ChatGPT to review. It is not a scoped
  implementation worker and does not review code; see
  [prompts/v0-ui-prototyping.md](../../prompts/v0-ui-prototyping.md).
- The founder keeps final control over merge, release, billing, DNS,
  secrets, and production settings, regardless of how many agent roles
  were used to produce a change.

## Related Documents

- [ai-development-workflow.md](./ai-development-workflow.md) — full
  Issue-to-PR tool responsibility model.
- [prompts/multi-agent-task-brief.md](../../prompts/multi-agent-task-brief.md)
  — copyable brief template for assigning a role.
- `AGENTS.md` — baseline rules for any agent working in this repo.
- `agent_memory/` — where context, progress, and risk notes live between
  tasks.
