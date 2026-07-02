# DCA Backtest

DCA Backtest is a premium finance calculator website that helps users backtest monthly investments against historical market data and project compound growth.

## Project Overview

The project provides two core investing calculators:

- A historical dollar-cost averaging backtest for supported ETFs and stocks
- A compound interest calculator for forward-looking portfolio projections

The website is designed for public use with internationalization, multi-currency display, responsive charts, SEO metadata, sitemap support, robots.txt, and Google Analytics integration.

## Live Website

[https://dcabacktest.com](https://dcabacktest.com)

## Features

- Historical DCA backtest
- Compound interest calculator
- Multi-language support
- Multi-currency display
- Responsive chart visualizations
- Google Analytics support via `NEXT_PUBLIC_GA_ID`
- SEO metadata for localized pages
- Sitemap and robots.txt routes

## Supported Languages

- English (`en`)
- Simplified Chinese (`zh-CN`)
- Traditional Chinese (`zh-TW`)
- Bahasa Melayu (`ms`)
- Bahasa Indonesia (`id`)
- Japanese (`ja`)
- Korean (`ko`)
- Russian (`ru`)
- French (`fr`)
- Italian (`it`)
- Spanish (`es`)
- Arabic (`ar`)
- German (`de`)
- Tamil (`ta`)

## Supported Currencies

- USD
- MYR
- SGD
- IDR
- JPY
- KRW
- CNY
- TWD
- HKD
- EUR
- GBP
- CHF
- AUD
- CAD
- RUB
- AED
- SAR
- INR
- THB

## Tech Stack

- Next.js
- TypeScript
- React
- Recharts
- Vercel

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run lint checks:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Before pushing changes, run:

```bash
npm run build
npm run check-site
```

## Market Data Updates

Yahoo Finance chart data is used as the default automated source for raw historical CSV files. If Yahoo Finance is unavailable, rate-limited, blocked, or returns invalid data, the update scripts keep existing valid CSV files unchanged.

Check current historical CSV coverage:

```bash
npm run audit-market-data
```

Show only assets missing public monthly CSV files:

```bash
npm run audit-market-data -- --missing-only
```

Fetch only missing assets that have a Yahoo Finance symbol mapping:

```bash
npm run fetch-yahoo-market-data -- --missing-only --delay=5000
```

Run the automated fetch and import flow:

```bash
npm run fetch-yahoo-market-data
npm run import-market-data
npm run validate-market-data
npm run build
```

Manual fallback workflow:

1. Run `npm run audit-market-data` to identify assets that are missing historical data or need manual CSV files.
2. Download historical daily CSV data from another reliable source if Yahoo Finance does not support the symbol.
3. Save the file as `data/raw-market-data/{dataKey}.csv`, for example `data/raw-market-data/cspx-l.csv`.
4. Run:

```bash
npm run import-market-data
npm run validate-market-data
npm run build
```

Generated monthly CSV files are written to `public/market-data/`. The import script only overwrites public market data when the imported file contains valid rows.

## Disclaimer

DCA Backtest is for educational purposes only. The calculators do not provide financial advice, investment recommendations, brokerage services, or guarantees of future returns. Past performance does not guarantee future results.

## Contact

For support or product inquiries, contact:

[support@dcabacktest.com](mailto:support@dcabacktest.com)
