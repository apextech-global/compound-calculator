# Data Source Policy

Last updated: 2026-07-10

## Purpose

DCA Backtest depends on historical market data. This document defines how data should be sourced, interpreted, validated, and explained to users so the calculator remains trustworthy and maintainable.

## Product Positioning

DCA Backtest is an educational investing calculator. It helps users understand how recurring investments could have behaved historically.

It is not financial advice, investment advice, tax advice, or a promise of future returns.

## Current Data Sources

The project currently uses CSV-based historical market data stored in the repository.

Known data direction:

- Yahoo Finance / CSV exports
- Local CSV files in `data/raw-market-data/`
- Coverage and status metadata in `data/market-data-coverage.json`
- Data freshness metadata in `data/market-data-status.json`

Before adding or updating any symbol, confirm that the source, fields, date range, and licensing constraints are suitable for educational display.

## Required Fields

Every imported historical price file should clearly define:

- Symbol
- Exchange or market
- Currency
- Date
- Open, high, low, close, adjusted close when available
- Volume when available
- Data source
- Last updated date

If a file does not include adjusted close, the app must not imply that dividends, splits, or total return are fully reflected.

## Price Method Rules

The calculator must clearly state which price method is used:

- Close price
- Adjusted close
- Mock/sample data

Adjusted close is preferred for long-term backtests when available because it is usually better for reflecting splits and distributions. If only close price is available, the UI and documentation must say so.

## Dividend Rules

Dividend handling must be explicit.

Allowed states:

- Dividends included through adjusted close
- Dividends excluded
- Dividend treatment unknown

The UI must not claim total return unless the data and calculation logic support it.

## Currency Rules

Each instrument must have a base currency.

If the user views results in another currency, the app must clarify whether values are:

- Converted using a fixed reference rate
- Converted using a current approximate rate
- Not converted
- Shown in the instrument's base currency

Historical FX conversion should not be implied unless implemented and tested.

## Monthly Purchase Timing

Each DCA backtest must define when recurring purchases happen:

- Start of month
- End of month
- First available trading day
- Last available trading day

If exact trading-day logic is not implemented, the UI must explain the approximation.

## Fees and Taxes

Fees and taxes must be explicit.

The calculator may support:

- Fixed fee per purchase
- Percentage fee per purchase
- No tax modeling

Do not imply after-tax return unless tax logic exists and is documented.

## Missing Data Rules

When market data has missing dates:

- Use the next available trading day only if this is documented.
- Do not silently fill long gaps without warning.
- Do not show stale or incomplete data as fully reliable.

If data quality is insufficient, show a clear sample-data or limited-data warning.

## Validation Checklist

Before a new symbol is exposed in production:

- [ ] CSV parses successfully.
- [ ] Symbol metadata exists.
- [ ] Currency is defined.
- [ ] Earliest and latest dates are known.
- [ ] Missing-date behavior is acceptable.
- [ ] Price method is documented.
- [ ] Dividend treatment is documented.
- [ ] Build passes.
- [ ] Algorithm tests pass.
- [ ] UI shows the correct data source label.

## User-Facing Disclosure

Every DCA Backtest page should include or link to a disclosure similar to:

```text
This calculator is for educational purposes only. Results are based on available historical data and assumptions about recurring purchases, fees, currencies, and dividend treatment. Past performance does not guarantee future results.
```

## AI Agent Rules

Claude Code and Codex must follow these rules:

- Do not add a new market symbol without documenting the source and currency.
- Do not label data as total return unless dividends are handled correctly.
- Do not remove data warnings to make the UI look cleaner.
- Do not add complex real-time data infrastructure unless GPT / CTO approves the product need.
- Prefer small, auditable improvements to data quality and clarity.

## Next Improvements

- Add a per-symbol metadata table.
- Add an automated data audit report to CI.
- Add tests for purchase timing and missing-date handling.
- Add public documentation explaining close vs adjusted close.

