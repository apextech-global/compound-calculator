# Release and Tracking Workflow

This document describes how Apex Tech projects record releases and track
their impact after merge, using free/low-cost tools appropriate for a solo
founder. See [ai-development-workflow.md](./ai-development-workflow.md) for
the full workflow this fits into.

## Recording a Release

1. Merge approved PRs into `main` using squash merge.
2. Tag or create a GitHub Release describing what shipped, referencing the
   closed Issue(s) and merged PR(s).
3. Add a short entry summarizing user-facing changes (what changed and
   why), not implementation detail.
4. Close the related GitHub Issue(s) if not already closed automatically.

## Deployment

- Vercel handles deployment for this project. Production deploys and any
  change to Vercel project settings, domains, or environment variables
  require explicit founder confirmation — AI must not change deployment
  settings on its own.

## Tracking

- Search Console tracks indexing status and search performance for this
  public website. Reviewing Search Console data is part of Discovery/SEO
  research (Gemini/ChatGPT), not part of the release step itself.
- No new analytics, tracking, or ads are added beyond what the project
  already uses, unless explicitly requested (see safety rules in
  [ai-development-workflow.md](./ai-development-workflow.md)).

## What GitHub Actions Automates

- `.github/workflows/pr-checks.yml` runs lint/build/test on every PR where
  the project has those scripts configured.
- `.github/workflows/update-market-data.yml` refreshes historical market
  data on a schedule; it is unrelated to this release process and must not
  be changed as part of routine feature releases.
- These workflows do not deploy, merge, or spend money. Automation is
  limited to verification and scheduled data refresh, not release action.

## What Stays Manual

- Merging PRs.
- Creating GitHub Releases.
- Deploying to production (even via Vercel, the founder confirms
  production promotions).
- Any change to DNS, billing, secrets, or production environment
  configuration.
