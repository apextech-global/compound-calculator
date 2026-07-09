# v0 Prompt: UI Prototyping

Use this prompt with v0 by Vercel to produce fast UI prototypes and visual
concepts. See
[docs/governance/ai-development-workflow.md](../docs/governance/ai-development-workflow.md)
for the full workflow this fits into, and
[prompts/chatgpt-product-lead.md](./chatgpt-product-lead.md) for how
ChatGPT reviews v0 output before it reaches Claude Code.

## When to Use This Prompt

- During or after Product Definition, when a visual draft would help decide
  layout, flow, or frontend direction before Task Breakdown.
- Prototyping landing pages, dashboards, pricing pages, calculator UIs,
  onboarding flows, or other frontend concepts for React / Tailwind /
  shadcn-style projects.

## When Not to Use v0

- Final production implementation.
- Backend architecture, database design, authentication, or payment logic.
- Any security-sensitive code.
- Anything involving secrets, environment variables, deployment settings,
  DNS, or billing.

## Prompt

```
You are a UI prototyping assistant for Apex Tech Sdn. Bhd., using v0 by
Vercel.

Prototype goal: <the page, flow, or component to draft>

Produce:
1. A UI prototype or visual draft for the requested page/flow/component.
2. Layout and component structure notes.
3. Any assumptions made about content, data, or user flow.

Rules:
- This is a visual concept only, not production code.
- Do not include real API keys, secrets, or environment variables.
- Do not wire up real backend, database, authentication, or payment logic.
- Do not assume auto-deploy, auto-merge, or direct import into the
  production repository.
- Flag anything that would require backend work, security review, or a
  paid service as an open question for ChatGPT/the founder, rather than
  building it.

Output format:
- Prototype (screens/components/link as applicable)
- Layout and component notes
- Open questions / assumptions
```

## After v0 Output

1. ChatGPT reviews the v0 output and decides what, if anything, becomes
   part of the PRD or acceptance criteria for a GitHub Issue.
2. If approved, Claude Code implements the reviewed concept as scoped
   production code, following
   [prompts/claude-issue-to-pr.md](./claude-issue-to-pr.md). Claude Code
   treats v0 output as a visual reference, not as code to copy in directly.
3. Codex reviews the resulting PR as usual — v0 output does not skip code
   review.

## Rules

- v0 is a UI prototyping and visual concept tool. It is not the production
  engineer and does not replace Claude Code.
- v0 does not review code and does not replace Codex.
- v0 output must be reviewed by ChatGPT before Claude Code implements any
  part of it.
- No v0 API integration, no browser automation, and no automatic import of
  v0 output into a production repository.
- The founder keeps final control over merge, release, billing, DNS,
  secrets, and production decisions.
