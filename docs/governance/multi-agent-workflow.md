# Multi-Agent Task Workflow
## Purpose
Use multiple AI roles only when role separation clearly improves safety, speed, or review quality.
This document supports `AGENTS.md`; it does not replace it.
`AGENTS.md` remains the source of truth for project rules, Git permissions, testing, documentation, and completion criteria.
## Default Model
Most tasks use:
1. One implementation agent
2. One independent review agent
Add another role only when:
- The repository area is unfamiliar
- The change is security-sensitive
- Production-critical behavior is affected
- Independent verification is valuable
- File ownership can be clearly separated
Do not add roles merely because the tools are available.
## Roles
### Read-Only Explorer
Purpose:
- Locate relevant files
- Understand current behavior
- Identify dependencies and risks
- Report evidence before implementation
May read files, search the repository, inspect configuration, and inspect Git history.
Must not edit, commit, push, create a Pull Request, merge, or deploy.
### Implementation Agent
Purpose:
- Implement the approved task
- Keep changes focused
- Follow existing architecture
- Run required tests
- Update relevant `.ai` files
Typical tool: Claude Code.
Must not expand scope without approval.
### Review Agent
Purpose:
- Review independently
- Find bugs and regressions
- Check security, maintainability, and performance
- Verify acceptance criteria and test evidence
Typical tool: Codex.
Read-only by default unless explicitly approved to fix confirmed issues.
### Verification Agent
Purpose:
- Run tests and checks
- Verify commands and results
- Report failures accurately
- Confirm whether evidence supports completion
Must not make unrelated fixes.
## Task Brief
When more than one role is used, provide:
```text
Role:
Goal:
Business reason:
Context:
Allowed actions:
Owned files or areas:
Forbidden actions:
Required evidence:
Output format:
Stop condition:
```
Keep the brief task-specific.
## Ownership
- Every editable file has one owner.
- Two implementation agents must not edit the same file at the same time.
- Shared files require one designated owner.
- Review and verification roles are read-only by default.
- A reviewer must not silently become an implementation agent.
- If ownership is unclear, stop and ask the Founder.
## Required Reading
Every role follows the reading order in `AGENTS.md`.
At minimum:
1. `AGENTS.md`
2. `.ai/PROJECT_MEMORY.md`
3. `.ai/TASKS.md`
4. `.ai/DECISIONS.md`
5. `.ai/PITFALLS.md`
6. `.ai/HANDOFF.md`
7. Relevant task files
8. `git status`
9. Current `git diff`
Do not create a second or conflicting rule system.
## Read-Only Review
A reviewer may:
- Inspect files and the full diff
- Run non-destructive checks
- Report findings by severity
- Recommend corrections
A reviewer must not:
- Modify files
- Commit
- Push
- Create or update a Pull Request
- Merge
- Deploy
- Approve without evidence
If fixes are required, return findings to the Implementation Agent or request explicit permission to change roles.
## Evidence-Based Handoff
Every handoff includes:
1. Role
2. Goal
3. Work completed
4. Files inspected or changed
5. Commands run
6. Results
7. Risks
8. Remaining work
9. Recommended next step
10. Stop condition reached: Yes / No
Claims such as “Tests pass”, “No issues”, or “Safe” require evidence.
## Git Authorization
Local reading, editing, and testing may proceed within approved scope.
Without explicit Founder approval, AI agents must not:
- Create or switch branches
- Commit
- Push
- Create or update a Pull Request
- Merge
- Deploy
Approval for one action does not authorize another.
## Completion
Multi-agent work is complete only when:
- Every role reaches its stop condition
- Acceptance criteria are satisfied
- Required tests pass
- Review findings are resolved or explicitly accepted
- Relevant `.ai` files are updated
- The final report states `Safe to commit: Yes / No`
- Founder approval is obtained before Git or production actions
## Related Documents
- `AGENTS.md`
- `.ai/PROJECT_MEMORY.md`
- `.ai/TASKS.md`
- `.ai/DECISIONS.md`
- `.ai/PITFALLS.md`
- `.ai/HANDOFF.md`
- `docs/governance/ai-development-workflow.md`
- `docs/governance/issue-to-pr-workflow.md`
