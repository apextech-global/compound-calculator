# Raw Market Data

Download historical CSV files from Yahoo Finance and place them in this folder.

Use these Yahoo Finance download settings:

- Time Period: Max
- Frequency: Daily

Save the files with these exact names:

- `voo.csv`
- `spy.csv`
- `qqq.csv`
- `aapl.csv`
- `tsla.csv`
- `nvda.csv`

The expected Yahoo Finance CSV format is:

```csv
Date,Open,High,Low,Close,Adj Close,Volume
```

After adding the files, run:

```sh
npm run import:market-data
```
