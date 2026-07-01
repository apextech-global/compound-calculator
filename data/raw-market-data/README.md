# Raw Market Data Import

Put manually downloaded historical CSV files in this folder.

The file name must match the instrument `dataKey` used by the app.

Examples:

- `cspx-l.csv`
- `0050-tw.csv`
- `1155-kl.csv`
- `es3-si.csv`
- `2800-hk.csv`

Supported input CSV formats include:

```csv
Date,Open,High,Low,Close,Adj Close,Volume
```

```csv
date,close
```

```csv
Date,Close
Date,Price
Date,Last
```

The importer prefers `Adj Close` when available. If `Adj Close` is not
available, it uses `Close`, then `Price`, then `Last`.

After adding raw CSV files, run:

```sh
npm run import-market-data
```

Generated monthly CSV files will appear in:

```text
public/market-data/
```

Output files use this format:

```csv
date,close
2020-01-31,123.45
2020-02-28,125.67
```
