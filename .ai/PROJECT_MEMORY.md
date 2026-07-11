# Project Memory

## Project Identity

- Internal project number: `Project_002`
- Product name: DCA Backtest / Compound Calculator
- Repository: `compound-calculator`
- Production domain: `dcabacktest.com`
- Project owner: Apex Tech Sdn. Bhd.
- Current version: Needs verification
- Last updated: 2026-07-11

## Product

### Problem

Users need a simple way to understand:

- How historical dollar-cost averaging would have performed
- How regular investing may grow over time
- How compound interest affects long-term investment outcomes

### Target Users

- Long-term investors
- Beginner investors
- ETF and stock investors
- Users comparing DCA strategies
- Users planning future investment growth
- Global users requiring multiple languages and currencies

### Value Proposition

Provide a clear, browser-based DCA backtest and compound growth calculator with:

- Historical investment simulation
- Forward-looking compound calculation
- Multi-language support
- Multi-currency support
- Shareable results
- Accessible educational explanations

### Business Model

Current monetization direction:

- Organic SEO traffic
- Google AdSense
- Affiliate recommendations where appropriate

Do not add subscriptions, authentication, or paid features unless explicitly approved.

### Target Markets

Global.

### Supported Languages

Multiple languages are implemented.

The exact current public locale count must be verified from the repository before updating this section.

## Technical Architecture

### Framework

- Next.js
- TypeScript

The project uses a non-standard or pre-release Next.js version.

Before making framework-specific changes, inspect:

```text
node_modules/next/dist/docs/
```

Also read the framework notice in `AGENTS.md`.

### Hosting

- Vercel

### Database

No database is currently confirmed as required.

### Authentication

No user authentication is currently confirmed.

### Payments

No payment system is currently confirmed.

### Analytics

- Google Analytics
- Google Search Console

### Advertising

- Google AdSense

### Testing

The project includes:

- Build checks
- Site checks
- Algorithm tests
- Playwright end-to-end tests
- Production QA scripts

Exact commands must be verified from `package.json` before execution.

### Market Data

Market data scripts and generated files are managed through automation.

Important paths include:

```text
data/raw-market-data/
public/market-data/
.github/workflows/update-market-data.yml
```

Do not manually edit generated market data files without a clear approved reason.

## Current Status

### Live

- Production site: `dcabacktest.com`
- Vercel deployment is active
- DCA Backtest is available
- Compound Calculator is available

### Completed

- DCA backtest calculator
- Compound growth calculator
- Multi-language foundation
- Multi-currency support
- SEO foundation
- Legal pages
- Google Analytics integration
- Google Search Console integration
- Google AdSense integration
- Playwright testing
- Production QA workflow
- Share and result export features
- Supported assets page
- Responsive UI improvements

### In Progress

- Expanding supported international assets
- Improving non-US market data coverage
- Improving Chinese SEO
- Adding or improving additional languages
- Monitoring Search Console indexing
- Improving content depth and organic traffic

### Pending

- More country-specific ETFs and stocks
- More reliable automated price and historical data updates
- Further SEO landing pages
- Continued production monitoring
- Verification of all supported locales
- Verification of all available asset histories

### Blocked

No confirmed blocking issue at the time of this update.

## Known Issues

- Some non-US assets may have incomplete historical data.
- Yahoo Finance or similar sources may fail or provide incomplete data.
- Some assets may only have history from a later start date.
- Language additions can affect layout, sitemap, hreflang, and legal pages.
- Generated market data must not be manually changed without understanding the automation.
- Local build success does not prove production behavior.
- Exact current version, locale count, and asset count require repository verification.

## Important Constraints

- Do not change investment formulas without explicit approval and algorithm verification.
- Do not change generated market data manually without reviewing the update workflow.
- Do not change routes, locales, canonical URLs, sitemap, robots, or hreflang without SEO verification.
- Do not remove existing tests to make changes pass.
- Do not add authentication, a database, subscriptions, or complex infrastructure without business justification.
- Preserve existing production behavior unless a change is approved.
- AI workflow or documentation changes must not modify product features, calculator formulas, SEO content, or market data logic.

## Next Recommended Step

Verify the current repository state by checking:

1. `package.json`
2. Supported locale configuration
3. Supported assets
4. Current production QA commands
5. Current Git status
6. Search Console indexing status

Then select one high-value task only.

## Source of Truth

Use these files for current project truth:

1. `AGENTS.md`
2. `.ai/PROJECT_MEMORY.md`
3. `.ai/TASKS.md`
4. `.ai/DECISIONS.md`
5. `.ai/PITFALLS.md`
6. `.ai/HANDOFF.md`
7. `README.md`
8. Repository code and configuration
