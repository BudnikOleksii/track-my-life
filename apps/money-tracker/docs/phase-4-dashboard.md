# Phase 4: Dashboard — Detailed Implementation Plan

## Context

Replace the placeholder dashboard (welcome card + logout button) with a rich analytics overview. The backend provides 5 analytics endpoints at `/api/transactions-analytics/` with all DTOs auto-generated. The dashboard is the main landing page after authentication, showing financial summaries, charts, and spending breakdowns with shared filter controls.

---

## API Endpoints

All endpoints share common query params: `currencyCode` (required), `dateFrom?`, `dateTo?`, `type?` (EXPENSE|INCOME), `categoryId?`.

| Endpoint                  | Response DTO                   | Key Fields                                                                       |
| ------------------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| GET `/summary`            | `SummaryResponseDto`           | totalIncome, totalExpenses, netBalance, transactionCount                         |
| GET `/category-breakdown` | `CategoryBreakdownResponseDto` | breakdown[]: categoryName, total, percentage, transactionCount                   |
| GET `/trends`             | `TrendsResponseDto`            | granularity (weekly\|monthly), periods[]: totalIncome, totalExpenses, netBalance |
| GET `/top-categories`     | `TopCategoriesResponseDto`     | categories[]: rank, categoryName, total, percentage                              |
| GET `/daily-spending`     | `DailySpendingResponseDto`     | year, month, days[]: date, total, transactionCount                               |

Exception: `/daily-spending` uses `year` + `month` params instead of `dateFrom`/`dateTo`.

Generated controller types (in `packages/shared/src/api/generated/types.gen.ts`):

- `TransactionsAnalyticsControllerGetSummaryData` / `Responses`
- `TransactionsAnalyticsControllerGetCategoryBreakdownData` / `Responses`
- `TransactionsAnalyticsControllerGetTrendsData` / `Responses`
- `TransactionsAnalyticsControllerGetTopCategoriesData` / `Responses`
- `TransactionsAnalyticsControllerGetDailySpendingData` / `Responses`

---

## Design Decisions

| Decision                     | Choice                                       | Rationale                                                           |
| ---------------------------- | -------------------------------------------- | ------------------------------------------------------------------- |
| Daily spending visualization | BarChart                                     | Recharts built-in; heatmap needs custom SVG or extra lib            |
| Data fetching                | Client-side via server actions + `useEffect` | Matches `useTransactionManagement` pattern                          |
| Filter state                 | `useState` in custom hook                    | Matches transactions page; `nuqs` not installed                     |
| Chart library location       | `apps/money-tracker` dependency              | Charts are app-specific; keep `packages/ui` lean                    |
| Loading states               | Skeleton UI atom                             | New atom in `packages/ui`; reusable across all phases               |
| Tabs/Progress UI components  | Skip                                         | Filter bar reuses Button group pattern; top categories use CSS bars |

---

## Architecture

### Data Flow

```
DashboardPageContent (client)
├── useDashboardFilters() → { filters, handleFilterChange }
├── DashboardFilterBar ← filters
├── SummaryWidget ← filters → useWidgetData(fetchSummary, filters)
├── CategoryBreakdownChart ← filters → useWidgetData(fetchCategoryBreakdown, filters)
├── TrendsChart ← filters → useWidgetData(fetchTrends, filters)
├── TopCategoryList ← filters → useWidgetData(fetchTopCategoryList, filters)
├── DailySpendingChart ← filters → useWidgetData(fetchDailySpending, { year, month, currencyCode })
└── RecentTransactionList ← filters → useWidgetData(fetchTransactionList, filters)
```

Each widget:

1. Receives filter props from parent
2. Calls `useWidgetData(serverAction, params)` to fetch independently
3. Renders loading Skeleton via WidgetCard while fetching
4. Renders data or empty state

### Custom Hooks

**`use-dashboard-filters.ts`** — shared filter state

```
State: { dateFrom, dateTo, type (FilterValue), currencyCode }
Defaults: dateFrom = 1st of current month, dateTo = today, type = 'ALL', currencyCode = 'USD'
Returns: { filters, handleFilterChange }
```

**`use-widget-data.ts`** — generic fetch hook

```
Input: fetchFn(params) → Promise<T | null>, params object
State: { data: T | null, isLoading: boolean }
Behavior: re-fetches on params change via useEffect
Returns: { data, isLoading }
```

---

## Responsive Layout

CSS Grid with mobile-first breakpoints (matching `packages/ui/src/styles/_breakpoints.scss`):

```
Mobile (<768px):     1 column, all widgets stack vertically
Tablet (768px+):     2 columns, summary as 2x2 grid
Desktop (1024px+):   Summary 4-across, 2-col widget grid
Large (1440px+):     3-column grid for chart/list widgets
```

Summary widget renders as a 4-card row (or 2x2 on tablet) using its own internal grid.

---

## Implementation Steps

### Step 1: Foundation

#### 1a. Skeleton UI Atom

Create `packages/ui/src/components/atoms/skeleton/`:

- `skeleton.tsx` — div with pulse animation, accepts `className`, width/height props
- `skeleton.module.scss` — `@keyframes pulse` animation, configurable border-radius

Pattern reference: `packages/ui/src/components/atoms/badge/badge.tsx`

#### 1b. TransactionsAnalyticsApiService

Create `packages/shared/src/api/services/transactions-analytics-api.service.ts`:

- Extends `ApiClient` (from `../client/api-client`)
- `private BASE_URL = '/api/transactions-analytics' as const`
- Type aliases from generated controller types using `[typeof HTTP_STATUS_CODE.OK]` indexing

Methods:

```
fetchSummary(query) → SummaryResponseDto
fetchCategoryBreakdown(query) → CategoryBreakdownResponseDto
fetchTrends(query) → TrendsResponseDto
fetchTopCategories(query) → TopCategoriesResponseDto
fetchDailySpending(query) → DailySpendingResponseDto
```

Pattern reference: `packages/shared/src/api/services/transaction-api.service.ts`

#### 1c. Register in server-api.ts

Modify `packages/shared/src/api/server-api.ts`:

- Import `TransactionsAnalyticsApiService`
- `export const transactionsAnalyticsApiService = new TransactionsAnalyticsApiService({ baseUrl: API_BASE_URL })`
- `authInterceptor.setupOn(transactionsAnalyticsApiService)`

#### 1d. Dashboard Constants

Create `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/constants/dashboard.ts`:

- `DEFAULT_CURRENCY_CODE = 'USD'`
- `TOP_CATEGORY_LIST_LIMIT = 5`
- `TRENDS_GRANULARITY = 'monthly'`
- `CHART_COLOR_LIST` — array of hex colors for pie/bar charts
- Helper: `getDefaultDateRange()` → `{ dateFrom: string, dateTo: string }`

### Step 2: Server Actions

All in `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/actions/`:

Each file follows the same pattern (reference: `transactions/actions/fetch-transaction-list.ts`):

- `'use server'` directive
- Import types directly from `@track-my-life/shared/src/api/generated/types.gen` (never re-export types)
- Import service from `@track-my-life/shared/src/api/server-api`
- Type-guard response with `checkIs*Response` function
- Return typed data or `null`

| File                          | Service Method                  | Response Type                  | Type Guard Check                              |
| ----------------------------- | ------------------------------- | ------------------------------ | --------------------------------------------- |
| `fetch-summary.ts`            | `fetchSummary(query)`           | `SummaryResponseDto`           | `'totalIncome' in value`                      |
| `fetch-category-breakdown.ts` | `fetchCategoryBreakdown(query)` | `CategoryBreakdownResponseDto` | `'breakdown' in value && Array.isArray(...)`  |
| `fetch-trends.ts`             | `fetchTrends(query)`            | `TrendsResponseDto`            | `'periods' in value && Array.isArray(...)`    |
| `fetch-top-category-list.ts`  | `fetchTopCategories(query)`     | `TopCategoriesResponseDto`     | `'categories' in value && Array.isArray(...)` |
| `fetch-daily-spending.ts`     | `fetchDailySpending(query)`     | `DailySpendingResponseDto`     | `'days' in value && Array.isArray(...)`       |

### Step 3: Custom Hooks

Create in `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/hooks/`:

**`use-dashboard-filters.ts`**

- State interface: `DashboardFilters { dateFrom: string; dateTo: string; type: FilterValue; currencyCode: string }`
- Initial values use `getDefaultDateRange()` from constants
- `handleFilterChange(update: Partial<DashboardFilters>)` merges partial updates

**`use-widget-data.ts`**

- Generic: `useWidgetData<T>(fetchFn: (params: P) => Promise<T | null>, params: P)`
- `useState` for `data: T | null` and `isLoading: boolean`
- `useEffect` with `JSON.stringify(params)` as dependency (or individual param deps)
- Sets `isLoading = true` before fetch, `false` after

### Step 4: Install recharts

```bash
pnpm add recharts --filter money-tracker
```

Add as exact version in `apps/money-tracker/package.json` (no ^ or ~ prefix per project rules).

### Step 5: WidgetCard Component

Create `dashboard/components/widget-card/`:

- Props: `title: string`, `subtitle?: string`, `isLoading: boolean`, `isEmpty?: boolean`, `children: ReactNode`
- Loading state: renders Skeleton placeholders inside Card
- Empty state: centered message with icon
- Normal state: Card with header (title + subtitle) and content area

### Step 6: Non-Chart Widgets

#### 6a. DashboardFilterBar

- Props: `filters: DashboardFilters`, `onFilterChange: (update: Partial<DashboardFilters>) => void`
- Renders:
  - Date range: two native `<Input type="date" />` (from/to) — same pattern as `TransactionDateFilter`
  - Type filter: Button group using `FILTER_OPTION_LIST` + `FILTER_TO_LABEL_KEY` — same pattern as `TransactionTypeFilter`
  - Currency: `<Input />` for currency code (simple for now)
- Uses `useTranslations(I18N_NAMESPACE.dashboardPage)`

#### 6b. SummaryWidget

- Props: `filters: DashboardFilters`
- Fetches via `useWidgetData(fetchSummary, { currencyCode, dateFrom, dateTo, type })`
- Renders 4 stat cards in internal CSS Grid:
  - Total Income (green)
  - Total Expenses (red/destructive)
  - Net Balance (primary or conditional color)
  - Transaction Count (secondary)
- Each card: large formatted amount + label
- Wrapped in WidgetCard

#### 6c. TopCategoryList

- Props: `filters: DashboardFilters`
- Fetches via `useWidgetData(fetchTopCategoryList, { ...filters, limit: TOP_CATEGORY_LIST_LIMIT })`
- Renders ranked list:
  - Rank number + category name + formatted amount
  - CSS percentage bar (div with `width: ${percentage}%` and background color)
- Wrapped in WidgetCard

#### 6d. RecentTransactionList

- Props: `filters: DashboardFilters`
- Fetches via `useWidgetData(fetchTransactionList, { pageSize: 5, type, dateFrom, dateTo })`
  - Reuse `fetchTransactionList` from `src/actions/fetch-transaction-list.ts` or create dashboard-specific action
- Renders simplified transaction rows: date, description/category, amount with Badge (income/expense)
- "View all" link to `/transactions` using `NavigationLink`
- Wrapped in WidgetCard

### Step 7: Chart Widgets (recharts)

All charts use `ResponsiveContainer` for responsive sizing and are wrapped in WidgetCard.

#### 7a. CategoryBreakdownChart

- Props: `filters: DashboardFilters`
- Fetches via `useWidgetData(fetchCategoryBreakdown, filters)`
- Recharts components: `PieChart`, `Pie`, `Cell`, `Legend`, `Tooltip`, `ResponsiveContainer`
- Each slice colored from `CHART_COLOR_LIST` constant
- Tooltip shows: category name, amount, percentage

#### 7b. TrendsChart

- Props: `filters: DashboardFilters`
- Fetches via `useWidgetData(fetchTrends, { ...filters, granularity: TRENDS_GRANULARITY })`
- Recharts components: `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `Legend`, `ResponsiveContainer`
- Two grouped bars per period: income (green) vs expense (red)
- X-axis: period labels (month name or week range)

#### 7c. DailySpendingChart

- Props: `filters: DashboardFilters`
- Note: this endpoint uses `year` + `month`, not dateFrom/dateTo
- Extracts year/month from `filters.dateTo` (or current date)
- Fetches via `useWidgetData(fetchDailySpending, { year, month, currencyCode, type })`
- Recharts components: `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `ResponsiveContainer`
- Single bar per day showing total spending

### Step 8: Page Assembly

#### 8a. Rewrite `page.content.tsx`

```
'use client'

DashboardPageContent:
  useDashboardFilters() → filters, handleFilterChange
  useTranslations(I18N_NAMESPACE.dashboardPage)

  Render:
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="h4">{title}</Typography>
      </div>
      <DashboardFilterBar filters={filters} onFilterChange={handleFilterChange} />
      <div className={styles.grid}>
        <SummaryWidget filters={filters} className={styles.summary} />
        <CategoryBreakdownChart filters={filters} />
        <TrendsChart filters={filters} />
        <TopCategoryList filters={filters} />
        <DailySpendingChart filters={filters} />
        <RecentTransactionList filters={filters} />
      </div>
    </div>
```

#### 8b. Rewrite `page.module.scss`

```scss
@use '@track-my-life/ui/src/styles/mixins';

.page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);

  @include mixins.media-m {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mixins.media-l {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mixins.media-xl {
    grid-template-columns: repeat(3, 1fr);
  }
}

.summary {
  grid-column: 1 / -1; // full width always
}
```

### Step 9: i18n Messages

Rewrite both `messages/en/dashboard-page.json` and `messages/uk/dashboard-page.json`:

```json
{
  "metadata": {
    "title": "Dashboard - Track My Money",
    "description": "Your financial overview"
  },
  "content": {
    "title": "Dashboard",
    "filterDateFrom": "From",
    "filterDateTo": "To",
    "filterType": "Transaction type",
    "filterCurrency": "Currency",
    "allTypes": "All",
    "incomeType": "Income",
    "expenseType": "Expense",
    "summaryTitle": "Summary",
    "totalIncome": "Total Income",
    "totalExpenses": "Total Expenses",
    "netBalance": "Net Balance",
    "transactionCount": "Transactions",
    "categoryBreakdownTitle": "Spending by Category",
    "trendsTitle": "Income vs Expenses",
    "topCategoriesTitle": "Top Categories",
    "dailySpendingTitle": "Daily Spending",
    "recentTransactionsTitle": "Recent Transactions",
    "noData": "No data available for the selected period",
    "viewAllTransactions": "View all transactions"
  }
}
```

---

## Complete File List

### New Files (28)

```
packages/ui/src/components/atoms/skeleton/skeleton.tsx
packages/ui/src/components/atoms/skeleton/skeleton.module.scss
packages/shared/src/api/services/transactions-analytics-api.service.ts
dashboard/constants/dashboard.ts
dashboard/actions/fetch-summary.ts
dashboard/actions/fetch-category-breakdown.ts
dashboard/actions/fetch-trends.ts
dashboard/actions/fetch-top-category-list.ts
dashboard/actions/fetch-daily-spending.ts
dashboard/hooks/use-dashboard-filters.ts
dashboard/hooks/use-widget-data.ts
dashboard/components/widget-card/WidgetCard.tsx
dashboard/components/widget-card/WidgetCard.module.scss
dashboard/components/dashboard-filter-bar/DashboardFilterBar.tsx
dashboard/components/dashboard-filter-bar/DashboardFilterBar.module.scss
dashboard/components/summary-widget/SummaryWidget.tsx
dashboard/components/summary-widget/SummaryWidget.module.scss
dashboard/components/category-breakdown-chart/CategoryBreakdownChart.tsx
dashboard/components/category-breakdown-chart/CategoryBreakdownChart.module.scss
dashboard/components/trends-chart/TrendsChart.tsx
dashboard/components/trends-chart/TrendsChart.module.scss
dashboard/components/top-category-list/TopCategoryList.tsx
dashboard/components/top-category-list/TopCategoryList.module.scss
dashboard/components/daily-spending-chart/DailySpendingChart.tsx
dashboard/components/daily-spending-chart/DailySpendingChart.module.scss
dashboard/components/recent-transaction-list/RecentTransactionList.tsx
dashboard/components/recent-transaction-list/RecentTransactionList.module.scss
```

(dashboard/ prefix = `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/`)

### Modified Files (7)

```
packages/shared/src/api/server-api.ts                     — add analytics service + interceptor
apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/page.tsx           — update if needed
apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/page.content.tsx   — full rewrite
apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/page.module.scss   — full rewrite
apps/money-tracker/messages/en/dashboard-page.json         — rewrite
apps/money-tracker/messages/uk/dashboard-page.json         — rewrite
apps/money-tracker/package.json                            — add recharts
```

---

## Reuse References

| What                  | Where                                                                       | Used For                                             |
| --------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------- |
| API service pattern   | `packages/shared/src/api/services/transaction-api.service.ts`               | TransactionsAnalyticsApiService                      |
| Server action pattern | `transactions/actions/fetch-transaction-list.ts`                            | All 5 dashboard actions                              |
| Hook pattern          | `transactions/hooks/use-transaction-management.ts`                          | useDashboardFilters, useWidgetData                   |
| Filter UI pattern     | `transactions/components/transaction-type-filter/TransactionTypeFilter.tsx` | DashboardFilterBar type filter                       |
| Date filter pattern   | `transactions/components/transaction-date-filter/TransactionDateFilter.tsx` | DashboardFilterBar date inputs                       |
| Badge variant map     | `transactions/components/transaction-list/TransactionList.tsx`              | RecentTransactionList                                |
| Shared constants      | `src/constants/transaction.ts` + `src/constants/filter.ts`                  | FilterValue, FILTER_OPTION_LIST, FILTER_TO_LABEL_KEY |
| UI atom pattern       | `packages/ui/src/components/atoms/badge/badge.tsx`                          | Skeleton component structure                         |
| SCSS mixins           | `@track-my-life/ui/src/styles/mixins`                                       | Responsive breakpoints                               |
| NavigationLink        | `packages/shared/src/i18n/navigation/NavigationLink.tsx`                    | "View all" link                                      |

---

## Verification

1. `pnpm type-check` — no TypeScript errors
2. `pnpm lint` — passes oxlint
3. `pnpm stylelint` — passes stylelint
4. `pnpm build` — successful production build
5. Manual: navigate to `/dashboard` with backend running, verify all 6 widgets render
6. Manual: change date range / type / currency filters, verify all widgets update
7. Manual: test responsive layout at mobile (< 768px), tablet (768px+), desktop (1024px+), large (1440px+)
8. Manual: verify Skeleton loading states appear during data fetch
9. Manual: verify empty states when no data matches filters
10. i18n: switch between en/uk locales, verify all text renders correctly
