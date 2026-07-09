# Project Context

Stable, slow-changing context about this project. Update when it actually
changes — not on every task. Keep this short.

## What This Project Is

DCA Backtest (compound-calculator) is a Next.js finance calculator website
at dcabacktest.com. It provides a historical dollar-cost averaging backtest
and a forward-looking compound interest calculator, with multi-language and
multi-currency support. See `README.md` for the full feature/language list.

## Key Decisions

<!-- Architecture or product decisions future agents should not silently
     re-litigate. Link to docs/decisions/ for full detail. -->

## Conventions

- This project runs a non-standard/pre-release version of Next.js. Read
  `node_modules/next/dist/docs/` before writing framework-related code —
  see the notice at the top of `AGENTS.md`.
- Market data update scripts and raw/public CSV data under
  `data/raw-market-data/` and `public/market-data/` are automated via
  `.github/workflows/update-market-data.yml` — do not hand-edit generated
  data files or change that workflow without a clear reason.

## Out of Scope

- Product features, calculator formulas, SEO content, and market data
  logic are not touched by AI development-system/workflow changes — see
  `docs/governance/ai-development-workflow.md` safety rules.
