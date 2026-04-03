## Context

The transactions page currently displays a flat list with basic type and date-range filters. The API has been extended to support `categoryId`, `currencyCode`, `sortBy`, and `sortOrder` parameters, but the UI does not expose them. Recurring transactions exist as a feature but lack sidebar navigation. Users need faster month-based browsing and better visual grouping of transactions by date.

## Goals / Non-Goals

**Goals:**

- Add recurring-transactions to sidebar and header navigation
- Replace manual date range inputs with a month navigator (arrows + label)
- Default transaction view to the current month
- Expose category, currency, and sort filters in the UI
- Group transactions visually by date with section headers
- Pass all new filter/sort params through the data fetching layer

**Non-Goals:**

- Modifying the API or backend
- Adding analytics or summary cards to the transactions page
- Supporting custom date range selection (month navigator replaces it)
- Adding search/text filtering for transactions

## Decisions

### 1. Month navigator replaces date range filter

The `MonthNavigator` component sets `dateFrom` (1st of month) and `dateTo` (last of month) URL params automatically. This replaces `TransactionDateFilter` entirely.

**Rationale:** Month-based browsing is the primary use case for personal finance. Two separate date inputs add friction without proportional value. The month navigator is simpler and aligns with how users think about their finances.

**Alternative considered:** Keeping date range alongside month nav. Rejected because it creates confusion about which controls the date scope.

### 2. Default to current month on first load

When `dateFrom`/`dateTo` are absent from URL params, `parseTransactionSearchParams` computes the current month's range. This changes the default from "all time" to "current month."

**Rationale:** Showing all-time transactions by default is overwhelming and slow for users with many transactions. Current month is the most relevant view.

### 3. Client-side date grouping

`TransactionList` groups the flat API response by `transaction.date` and renders date section headers. No API changes needed.

**Rationale:** The API already returns transactions sorted by date. Grouping is a presentation concern. The data set per page (20 items) is small enough that client-side grouping has zero performance impact.

### 4. Filter layout: primary row + secondary row

- **Primary row:** Type filter (existing) + Month navigator + Sort controls
- **Secondary row:** Category select + Currency select

**Rationale:** Type and month are the most-used filters. Sort is a common action. Category and currency are secondary filters used less frequently. Two rows keep the UI organized without hiding filters behind a toggle.

### 5. Category list fetched server-side in TransactionListServer

`TransactionListServer` fetches category list in parallel with transaction list using `Promise.all`. Passed to `TransactionsPageContent` as a prop for the category filter dropdown.

**Rationale:** Reuses existing `fetchCategoryList` action. Server-side fetch avoids client waterfall. `Promise.all` prevents sequential blocking.

### 6. Currency list from shared constants

Use the existing `CURRENCY_CODE` constant from the shared package rather than deriving from transaction data (which would only show currencies on the current page).

**Rationale:** The full currency list is small and static. Deriving from data is unreliable (page-scoped).

## Risks / Trade-offs

- **Behavior change on default load**: Users who expected all-time view will now see only the current month. Mitigation: The month navigator makes it obvious which month is shown and easy to navigate.
- **No custom date range**: Power users who need arbitrary date ranges lose that ability. Mitigation: This is a personal tracker; month-based browsing covers 95% of use cases. Can be revisited if needed.
- **Category filter requires extra fetch**: Adds one more API call per page load. Mitigation: Parallel fetch with `Promise.all` minimizes latency impact.
