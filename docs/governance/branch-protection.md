# Branch Protection Policy

## Current Status

Branch Protection / Rulesets are not enabled for this private repository (verified: `main` returns "Branch not protected" from the GitHub API).

## Temporary Solo Founder Workflow

Until Branch Protection is available, follow these rules manually:

1. Do not push directly to `main` for product work.
2. Create a feature branch for every meaningful change.
3. Open a Pull Request before merging.
4. Confirm GitHub Actions pass before merging.
5. Use Codex Review before merging important code.
6. Use Squash Merge for cleaner history.
7. Delete feature branches after merge.

## Required Before Public Release

Before launching a serious commercial product, enable Branch Protection or Rulesets with:

- Require pull request before merging
- Require status checks to pass
- Require conversation resolution
- Block force pushes
- Restrict branch deletion

## Review Condition

Revisit this decision when:

- The project has paying users
- The project stores customer data
- Another developer joins
- GitHub Pro / Team becomes justified
