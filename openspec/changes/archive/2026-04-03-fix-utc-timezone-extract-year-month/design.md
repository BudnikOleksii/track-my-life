## Context

The `DailySpendingChartServer` component extracts year and month from a date string filter (`filters.dateTo`) to query daily spending data. The current `extractYearMonth` function parses the string with `new Date(dateString)` and reads `.getFullYear()` / `.getMonth()`, which converts UTC midnight to local time — producing wrong results on non-UTC servers.

## Goals / Non-Goals

**Goals:**

- Eliminate timezone sensitivity in year/month extraction from date strings
- Rename function to follow `get`-prefix naming convention

**Non-Goals:**

- Auditing other date handling across the app (separate concern)
- Changing the daily spending API contract or data flow

## Decisions

**Decision 1: Use string splitting instead of Date object**

Replace `new Date(dateString).getFullYear()` / `.getMonth()` with `dateString.split('-').map(Number)` to extract year and month directly from the `YYYY-MM-DD` string.

_Alternatives considered:_

- Use `getUTCFullYear()` / `getUTCMonth()`: Correct but unnecessarily creates a Date object for what is fundamentally a string parsing task.
- Use a date library (date-fns, dayjs): Over-engineered for extracting two numbers from a known format.

String splitting is the simplest, most robust approach — no timezone logic involved at all.

**Decision 2: Handle missing dateString with UTC methods**

When no `dateString` is provided, use `new Date()` with `.getUTCFullYear()` / `.getUTCMonth()` to get the current UTC date. This ensures consistent behavior regardless of server timezone.

**Decision 3: Remove MONTH_OFFSET constant**

The `MONTH_OFFSET = 1` constant existed solely to convert JavaScript's 0-based `.getMonth()` to 1-based. With string splitting, the month is already 1-based from the `YYYY-MM-DD` format, making the constant unnecessary.

## Risks / Trade-offs

- [Risk: dateString format assumption] The string-split approach assumes `YYYY-MM-DD` format. → Mitigation: This is the only format used by the dashboard date filters; the API contract guarantees this format.
