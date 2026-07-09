<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

Baseline rules for any AI coding agent (Claude Code, Codex, Cursor, or other
tools) working in this repository. These apply in addition to `CLAUDE.md`
and `docs/governance/`. `CLAUDE.md` defines the Claude Code-specific role,
rules, and coding principles; this file is the shared baseline for any
agent, in case more than one is used on this project.

## Communication

- Default communication with the founder is Chinese (中文).
- Code, variable names, API names, directory names, and other technical
  identifiers must follow the repository's existing style and language.
  Do not translate or rename them just because the founder communicates in
  Chinese.

## Before Changing Code

- For non-trivial tasks, read the relevant files before modifying them.
- For tasks involving multiple files, runtime logic, public APIs, complex
  debugging, or multi-step execution, give a short plan before changing
  files.
- Default to the smallest safe change.
- Prefer reusing existing implementation, components, tools, and patterns
  over introducing new ones.

## Scope Discipline

- Every change must trace back to the founder's request, a confirmed
  assumption, or necessary verification.
- If an unrelated issue is discovered, record it as a risk or follow-up in
  `agent_memory/bugs.md` instead of expanding scope to fix it.

## Communication Style

- Keep explanations practical and concise.
- Do not present guesses as conclusions. Clearly mark uncertain
  information as uncertain.
- Stop and ask, or report, when scope, permission, risk, or product
  decision is unclear.

## Related Files

- `CLAUDE.md` — role, rules, and coding principles specific to Claude Code.
- `agent_memory/` — short, current project memory (context, progress,
  bugs/risks). Keep it short and useful, not an endless log.
- `docs/governance/multi-agent-workflow.md` — how to scope work when more
  than one agent role is involved in a task.
- `docs/governance/ai-development-workflow.md` — full Apex Tech AI-assisted
  development workflow and tool responsibilities.
