## Why

The `extractYearMonth` helper in `DailySpendingChartServer.tsx` parses date strings via `new Date('YYYY-MM-DD')`, which creates a UTC midnight timestamp, but then reads values with local-time methods (`.getFullYear()`, `.getMonth()`). On servers running in non-UTC timezones (e.g. `America/Los_Angeles`), `2026-03-01` resolves to February 28 locally, returning the wrong month and potentially the wrong year.

## What Changes

- Replace `new Date()`-based date parsing in `extractYearMonth` with a timezone-safe string-split approach
- Rename function from `extractYearMonth` to `getYearMonth` to align with `get`-prefix naming convention
- Remove the now-unnecessary `MONTH_OFFSET` constant (string-split returns 1-based month directly)

## Capabilities

### New Capabilities

### Modified Capabilities

- `dashboard-analytics`: Fix timezone-unsafe year/month extraction to use string splitting instead of `Date` object parsing

## Impact

- `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/components/daily-spending-chart/DailySpendingChartServer.tsx` - single file affected
- No API changes, no dependency changes
- Fixes incorrect daily spending chart data on non-UTC server deployments
