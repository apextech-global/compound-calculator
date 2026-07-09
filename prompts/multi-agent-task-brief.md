# Prompt: Multi-Agent Task Brief

Use this prompt to assign a single, scoped role when a task is split across
more than one agent. See
[docs/governance/multi-agent-workflow.md](../docs/governance/multi-agent-workflow.md)
for the full rules this fits into.

## When to Use This Prompt

- A task is large, security-sensitive, or otherwise clearly benefits from a
  separate exploration, review, or verification pass.
- A UI prototype from v0 needs to hand off to ChatGPT for review before
  Claude Code implements anything from it — see
  [prompts/v0-ui-prototyping.md](./v0-ui-prototyping.md).
- Do not use this by default — most tasks need only the scoped
  implementation worker role directly, e.g. via
  [prompts/claude-issue-to-pr.md](./claude-issue-to-pr.md).

## Prompt

```
Role: <read-only explorer | scoped implementation worker | security reviewer | verification worker | handoff writer>
Goal: <the single outcome this role must produce>
Context: <issue link, relevant files, prior findings this role needs>
Allowed actions: <what this role may do>
Ownership: <exact files/areas this role owns, disjoint from any other active role>
Forbidden actions: <what this role must not do>
Output format: <e.g. findings + evidence, diff, pass/fail + issues>
Stop condition: <when this role stops and hands off or asks for guidance>

Rules:
- Stay within Ownership; do not edit or decide outside it.
- Report findings and evidence, not just a summary claim.
- Do not spawn further agents unless this specific role clearly needs it.
- Stop and ask if permissions, ownership, or data access are unclear.
```
