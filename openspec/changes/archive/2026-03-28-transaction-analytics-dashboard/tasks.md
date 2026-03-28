## 1. Foundation

- [x] 1.1 Create Skeleton atom component in `packages/ui/src/components/atoms/skeleton/` (skeleton.tsx + skeleton.module.scss)
- [x] 1.2 Export Skeleton from `packages/ui` barrel exports
- [x] 1.3 Add Skeleton Storybook story in `apps/storybook/src/stories/`
- [x] 1.4 Create `TransactionsAnalyticsApiService` in `packages/shared/src/api/services/transactions-analytics-api.service.ts` with all 5 endpoint methods
- [x] 1.5 Register analytics service instance in `packages/shared/src/api/server-api.ts` with auth interceptor

## 2. Dashboard Constants and Hooks

- [x] 2.1 Create dashboard constants file (`dashboard/constants/dashboard.ts`) with default currency, chart colors, granularity, top category limit, and `getDefaultDateRange()` helper
- [x] 2.2 Create `use-widget-data.ts` generic fetch hook in `dashboard/hooks/`
- [x] 2.3 Create `use-dashboard-filters.ts` hook in `dashboard/hooks/` managing dateFrom, dateTo, type, and currencyCode state

## 3. Server Actions

- [x] 3.1 Create `fetch-summary.ts` server action
- [x] 3.2 Create `fetch-category-breakdown.ts` server action
- [x] 3.3 Create `fetch-trends.ts` server action
- [x] 3.4 Create `fetch-top-category-list.ts` server action
- [x] 3.5 Create `fetch-daily-spending.ts` server action

## 4. Install Dependencies

- [x] 4.1 Install `recharts` as exact version in `apps/money-tracker/package.json`

## 5. Widget Components

- [x] 5.1 Create `WidgetCard` wrapper component with loading skeleton, empty state, and content modes
- [x] 5.2 Create `DashboardFilterBar` component with date range, type filter, and currency inputs
- [x] 5.3 Create `SummaryWidget` with 4 stat cards (total income, total expenses, net balance, transaction count)
- [x] 5.4 Create `TopCategoryList` with ranked items and CSS percentage bars
- [x] 5.5 Create `RecentTransactionList` with transaction rows and "View all" link

## 6. Chart Widgets

- [x] 6.1 Create `CategoryBreakdownChart` with recharts PieChart
- [x] 6.2 Create `TrendsChart` with recharts grouped BarChart (income vs expenses)
- [x] 6.3 Create `DailySpendingChart` with recharts BarChart (single bar per day)

## 7. Page Assembly

- [x] 7.1 Add/update i18n messages in `messages/en/dashboard-page.json` and `messages/uk/dashboard-page.json`
- [x] 7.2 Rewrite `dashboard/page.content.tsx` composing all widgets with filter state
- [x] 7.3 Rewrite `dashboard/page.module.scss` with responsive CSS Grid layout

## 8. Verification

- [x] 8.1 Run `pnpm type-check` and fix any TypeScript errors
- [x] 8.2 Run `pnpm lint` and `pnpm stylelint` and fix any issues
- [x] 8.3 Run `pnpm build` and verify successful production build
