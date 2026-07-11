# Issue-to-PR Workflow

## 1. Purpose

This document defines the approved path from a GitHub Issue to a Pull Request for Apex Tech projects.

It supports `AGENTS.md` and does not replace it.

`AGENTS.md` remains the single source of truth for:

- AI roles
- Scope control
- Testing requirements
- Git permissions
- Completion criteria
- Founder approval requirements

---

## 2. Authorization Model

AI agents may, without additional approval:

- Read the repository
- Inspect Git history
- Create or update local files within approved scope
- Run local tests and verification commands
- Prepare a proposed branch name
- Prepare a proposed commit message
- Prepare a proposed Pull Request title and description
- Report whether the changes appear safe to commit

Without explicit Founder approval, AI agents must not:

- Run `git commit`
- Run `git push`
- Create or update a Pull Request
- Merge a Pull Request
- Deploy to production

If the Founder explicitly approves commit and push for the current task, the agent may perform only those approved Git actions.

Merge and deployment require separate explicit approval unless the Founder clearly authorizes them in the same instruction.

---

## 3. Preconditions

Before implementation starts, the GitHub Issue or approved task brief must contain:

- A clear problem statement
- A clear goal
- In-scope items
- Out-of-scope items
- Acceptance criteria
- Required tests
- Known risks
- Relevant links to product, architecture, or decision documents when applicable

If any material requirement is unclear, the implementation agent must stop and ask the Founder or ChatGPT to clarify.

Do not guess.

---

## 4. Workflow

### Step 1 — Read Context

Before work, read:

1. `AGENTS.md`
2. `.ai/PROJECT_MEMORY.md`
3. `.ai/TASKS.md`
4. `.ai/DECISIONS.md`
5. `.ai/PITFALLS.md`
6. `.ai/HANDOFF.md`
7. The GitHub Issue or approved task brief
8. Relevant files under `docs/`
9. `git status`
10. Current `git diff`

### Step 2 — Confirm the Work Boundary

Before editing, state:

- Objective
- Business reason
- In scope
- Out of scope
- Acceptance criteria
- Required tests
- Risks

For non-trivial work, provide a short implementation plan.

### Step 3 — Prepare a Branch Plan

Prepare a descriptive branch name, for example:

```text
feature/issue-12-checkout-validation
fix/issue-27-locale-routing
docs/v3-ai-workflow
```

Do not create or switch branches unless explicitly approved by the Founder.

Do not commit directly to `main` unless explicitly instructed.

### Step 4 — Implement the Smallest Safe Change

Follow these principles:

- Simplicity first
- Surgical changes
- Reuse existing patterns
- Avoid unrelated edits
- Avoid unnecessary dependencies
- Do not add Docker, databases, authentication, analytics, payments, or infrastructure unless explicitly required
- Preserve existing working behavior unless a change is approved

### Step 5 — Add or Update Tests

Add or update tests when behavior changes.

Use the requirements in `AGENTS.md` to determine whether to run:

- Build checks
- Site checks
- Algorithm tests
- Playwright tests
- Production QA
- Manual production verification

### Step 6 — Run Local Verification

Run the relevant commands from `package.json`.

Report:

- Exact commands
- Exact results
- Any failures
- Any skipped checks and why

A successful local build alone is not enough when the task affects routing, locales, SEO, market data, browser behavior, or production deployment.

### Step 7 — Prepare Commit and Pull Request Materials

After implementation and verification, prepare:

#### Proposed commit message

```text
<type>: <short summary>
```

#### Proposed Pull Request

- Title
- Summary
- Why this change is needed
- What changed
- How it was tested
- Risks
- Related Issue
- Screenshots or evidence when applicable

Do not create the commit or Pull Request yet.

### Step 8 — Request Founder Approval

Stop and ask the Founder to approve one or more of the following:

- Commit
- Push
- Pull Request creation
- Merge
- Deployment

Do not assume approval from prior tasks.

### Step 9 — Perform Only Approved Git Actions

After explicit approval:

- Perform only the approved action
- Do not expand authorization
- Do not merge or deploy unless separately approved
- Report the resulting branch, commit, or Pull Request state

### Step 10 — Codex Review

After a Pull Request exists or a reviewable diff is available:

- Hand off to Codex
- Provide the active task
- Provide acceptance criteria
- Provide test evidence
- Provide the current diff or Pull Request
- Ask for severity-ranked findings
- Do not dismiss feedback without explanation

If Codex identifies valid issues, return to implementation and repeat verification.

### Step 11 — Final Decision

ChatGPT may recommend:

- Approve
- Request changes
- Hold
- Reduce scope
- Run more tests

The Founder makes the final decision.

### Step 12 — Merge and Deploy

Merge and deployment are separate actions.

- Founder approval is required for merge
- Founder approval is required for deployment
- Squash merge is preferred when consistent with repository policy
- Delete the feature branch after merge only when safe
- Verify the production deployment after release

---

## 5. Completion Report

At the end of every task, the implementation agent reports:

1. Completed work
2. Files changed
3. Tests run
4. Test results
5. Risks
6. Remaining work
7. Proposed commit message
8. Proposed Pull Request title
9. Safe to commit: Yes / No
10. Recommended next step

Update `.ai/HANDOFF.md` for major implementation or review work.

---

## 6. Stop Conditions

Stop and ask for guidance when:

- Requirements are unclear
- Scope is unclear
- The task affects architecture
- The task introduces a paid service
- The task requires a database migration
- Secrets or production environment variables are involved
- Tests fail and the correct fix is uncertain
- The requested change conflicts with acceptance criteria
- The requested change conflicts with business goals
- Git authorization is unclear
- Merge or deployment approval is missing
- A destructive Git action appears necessary

---

## 7. Prohibited Actions

Without explicit Founder approval, do not:

```text
git commit
git push
gh pr create
gh pr edit
gh pr merge
git merge
git rebase --onto
git reset --hard
git clean -fd
force push
deploy
```

Do not disable tests or checks to make work appear successful.

Do not rewrite working code without a clear benefit.

Do not create a second AI rule system that conflicts with `AGENTS.md`.

---

## 8. Related Documents

- `AGENTS.md` — single source of truth for project rules
- `.ai/PROJECT_MEMORY.md` — stable project context
- `.ai/TASKS.md` — active task and backlog
- `.ai/DECISIONS.md` — confirmed decisions
- `.ai/PITFALLS.md` — project-specific lessons and prevention rules
- `.ai/HANDOFF.md` — latest implementation and review handoff
- `docs/governance/ai-development-workflow.md` — overall AI-assisted development workflow
- `docs/governance/multi-agent-workflow.md` — rules for tasks involving multiple AI roles
- `prompts/claude-issue-to-pr.md` — implementation prompt aligned with this workflow
