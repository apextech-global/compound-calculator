<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses a Next.js version with breaking changes. APIs, conventions, and file structure may differ from model training data.

Before writing framework-related code:

1. Read the relevant guide in `node_modules/next/dist/docs/`.
2. Check deprecation notices.
3. Inspect the existing project implementation.
4. Do not rely on memory alone.

<!-- END:nextjs-agent-rules -->

---

# Project Agent Rules

## 1. Project Identity

- Internal project number: `Project_002`
- Product name: DCA Backtest / Compound Calculator
- Repository: `compound-calculator`
- Production domain: `dcabacktest.com`
- Project owner: Apex Tech Sdn. Bhd.
- Primary market: Global

## 2. Product Goal

This product helps users:

- Backtest historical dollar-cost averaging strategies
- Calculate forward-looking compound growth
- Compare long-term investment outcomes
- Use the product across multiple languages and currencies

Business priorities:

1. Reliable calculations
2. Clear user experience
3. Organic SEO growth
4. Global accessibility
5. Low maintenance cost
6. Sustainable monetization through AdSense and selective affiliate recommendations

Do not introduce subscriptions, authentication, payments, databases, or complex infrastructure without explicit approval.

## 3. Required Reading Order

Before any work, every AI agent must read:

1. `AGENTS.md`
2. `.ai/PROJECT_MEMORY.md`
3. `.ai/TASKS.md`
4. `.ai/DECISIONS.md`
5. `.ai/PITFALLS.md`
6. `.ai/HANDOFF.md`
7. `README.md`
8. Relevant files for the task
9. `git status`
10. Current `git diff`

Do not begin implementation before understanding:

- The active task
- The current repository state
- Existing decisions
- Known pitfalls
- Required tests

## 4. AI Roles

### ChatGPT — CTO and Product Lead

Responsible for:

- Product direction
- Business value analysis
- Requirement clarification
- MVP scope
- Architecture
- Database and API design
- Risk analysis
- Acceptance criteria
- Task breakdown
- Final go/no-go judgment

ChatGPT should not approve implementation when requirements, risks, or test evidence are unclear.

### Claude Code — Primary Implementation Agent

Responsible for:

- Reading project rules before editing
- Implementing approved tasks
- Keeping changes focused
- Following existing architecture
- Running required tests
- Updating relevant `.ai` files
- Updating `.ai/HANDOFF.md`

Claude Code must not expand product scope without approval.

### Codex — Review, QA, and Bug-Fix Agent

Responsible for:

- Reviewing changes
- Finding bugs and regressions
- Checking security, performance, and maintainability
- Verifying acceptance criteria
- Checking test evidence
- Fixing approved issues
- Reporting whether changes are safe to commit

Codex must not approve work without evidence.

### Gemini — Research and Second Opinion

Responsible for:

- Market research
- Google ecosystem research
- Official documentation research
- Long-form comparison
- Independent second opinion

Research findings must be verified before implementation.

### Founder — Final Authority

The Founder decides:

- Product direction
- Budget
- Scope
- Risk acceptance
- Commit
- Push
- Merge
- Deploy

## 5. Communication

- Default communication with the Founder is Chinese.
- Keep explanations practical and concise.
- Code, variable names, API names, directory names, and technical identifiers must follow the repository's existing style.
- Do not translate or rename technical identifiers only because the Founder communicates in Chinese.
- Do not present guesses as conclusions.
- Clearly mark uncertain information as uncertain.
- Stop and ask when scope, permission, risk, or a product decision is unclear.

## 6. Work Intake Requirements

Before implementation, the active task must define:

- Objective
- Business reason
- In scope
- Out of scope
- Acceptance criteria
- Required tests
- Risks
- Status

For non-trivial work, provide a short plan before changing files.

## 7. Scope Control

- Work on one main task at a time.
- Every change must trace back to the Founder’s request, a confirmed assumption, or required verification.
- Do not add unrelated features.
- Do not add dependencies without a clear need.
- Do not modify unrelated code.
- Prefer the smallest safe and reversible change.
- Reuse existing implementation, components, tools, and patterns.
- Preserve existing working behavior unless a change is explicitly approved.
- Record unrelated issues in `.ai/PITFALLS.md` or `.ai/TASKS.md` instead of expanding scope.

## 8. Engineering Rules

- Business value before technical novelty.
- Avoid overengineering.
- Keep code and documentation DRY.
- Never expose secrets.
- Never weaken security to make tests pass.
- Never hide failures.
- Never mark unverified work as complete.
- Do not rewrite working code without a clear benefit.
- Do not manually edit generated market data without reviewing the automation source of truth.

Before changing market data, inspect:

```text
.github/workflows/update-market-data.yml
data/raw-market-data/
public/market-data/
```

## 9. Testing Requirements

Before completion:

- Run checks directly related to the change.
- Run the project build.
- Run existing site checks.
- Run algorithm tests when formulas or market data are affected.
- Run relevant Playwright tests when UI, routing, locale, sharing, or browser behavior is affected.
- Run production QA when SEO, routes, locales, market data, or deployment behavior is affected.
- Report exact commands and results.

Typical commands must be verified from `package.json` before execution.

A successful local build alone is not enough to approve completion.

Do not invent test results.

## 10. Security and Privacy

- Do not commit secrets.
- Do not expose environment variables.
- Do not log personal or sensitive data.
- Do not bypass security checks.
- Clearly report high-risk changes.
- Do not alter production environment variables without explicit approval.

## 11. SEO and Production Rules

For changes involving public pages, routes, locales, or metadata, verify:

- Production domain
- Canonical URLs
- Sitemap
- Robots rules
- Hreflang
- Page metadata
- Legal pages where applicable
- Mobile layout
- Production rendering
- Vercel deployment status

Do not create conflicting www and non-www canonical configurations.

Do not treat local success as proof of production success.

## 12. Git Workflow

Before work:

```bash
git status
git diff
```

After work:

1. Run required tests.
2. Update relevant `.ai` files.
3. Review `git status`.
4. Review the final diff.
5. Report whether the change is safe to commit.

Without explicit Founder approval, AI agents must not:

- Create or switch branches
- Run `git commit`
- Run `git push`
- Create or update a Pull Request
- Merge
- Deploy

## 13. Documentation Update Rules

Update only the relevant file:

- Long-term project state → `.ai/PROJECT_MEMORY.md`
- Current active task and backlog → `.ai/TASKS.md`
- Confirmed important decision → `.ai/DECISIONS.md`
- Project-specific mistake, risk, or prevention rule → `.ai/PITFALLS.md`
- Latest implementation and review result → `.ai/HANDOFF.md`

Do not duplicate the same information across multiple files.

`AGENTS.md` is the single source of truth for AI roles and project rules.

Do not create a second or conflicting rule system.

## 14. Definition of Done

A task is complete only when:

- Acceptance criteria are satisfied.
- Required tests pass.
- No known blocking issue remains.
- Security and performance risks are assessed.
- Relevant documentation is updated.
- `.ai/HANDOFF.md` is updated.
- The final report states whether it is safe to commit.

## 15. Prohibited Actions

Without explicit Founder approval, do not:

```text
git reset --hard
git clean -fd
force push
rewrite Git history
delete the repository
delete production data
remove security controls
delete uncertain files
modify unrelated business code
commit
push
merge
deploy
```

## 16. Final Report Format

Every completed task must report:

1. Completed work
2. Files changed
3. Tests run
4. Test results
5. Risks
6. Remaining work
7. Safe to commit: Yes / No
8. Recommended next step

## 17. Related Project Files

- `.ai/PROJECT_MEMORY.md` — stable, long-term project context
- `.ai/TASKS.md` — current active task, ready work, and backlog
- `.ai/DECISIONS.md` — confirmed product and technical decisions
- `.ai/PITFALLS.md` — project-specific mistakes, risks, and prevention rules
- `.ai/HANDOFF.md` — latest implementation and review handoff
- `README.md` — project overview and usage
- `docs/governance/multi-agent-workflow.md` — supporting multi-agent workflow details
- `docs/governance/ai-development-workflow.md` — supporting AI-assisted development workflow details
