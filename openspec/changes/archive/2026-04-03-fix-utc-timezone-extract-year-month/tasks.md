## 1. Fix timezone-unsafe date parsing

- [x] 1.1 Replace `extractYearMonth` with `getYearMonth` in `DailySpendingChartServer.tsx`: use string splitting for `YYYY-MM-DD` input, UTC methods for fallback when no dateString
- [x] 1.2 Remove the `MONTH_OFFSET` constant
- [x] 1.3 Update the call site from `extractYearMonth(filters.dateTo)` to `getYearMonth(filters.dateTo)`

## 2. Verification

- [x] 2.1 Run type-check to confirm no TypeScript errors
- [x] 2.2 Run build to confirm no build errors
