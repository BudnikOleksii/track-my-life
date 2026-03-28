## 1. Convert fetch actions to plain async functions

- [x] 1.1 Convert `apps/money-tracker/src/actions/fetch-category-list.ts` from server action to plain async function (remove `'use server'` directive)
- [x] 1.2 Convert `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/actions/fetch-transaction-list.ts` from server action to plain async function
- [x] 1.3 Convert all dashboard fetch actions (`fetch-summary.ts`, `fetch-trends.ts`, `fetch-category-breakdown.ts`, `fetch-daily-spending.ts`, `fetch-top-category-list.ts`) from server actions to plain async functions

## 2. Migrate Categories page to server fetching

- [x] 2.1 Create async server wrapper component `CategoryListServer` that calls `fetchCategoryList` and renders the client category list with data as props
- [x] 2.2 Refactor `categories/page.content.tsx` to accept category list data as props instead of fetching via `useCategoryManagement` hook
- [x] 2.3 Split `useCategoryManagement` hook — remove fetch logic, keep only mutation state (create/update/delete handlers, dialog state)
- [x] 2.4 Update `categories/page.tsx` to be an async server component that wraps `CategoryListServer` in a `<Suspense>` boundary with skeleton fallback
- [x] 2.5 Verify categories page: list renders, create/update/delete mutations work, loading skeleton displays

## 3. Migrate Transactions page to server fetching

- [x] 3.1 Create async server wrapper component `TransactionListServer` that reads searchParams (page, pageSize, type, dateFrom, dateTo) and calls `fetchTransactionList`
- [x] 3.2 Refactor `transactions/page.content.tsx` to accept transaction list data and pagination info as props
- [x] 3.3 Split `useTransactionManagement` hook — remove fetch logic, keep only mutation state (create/update/delete handlers, dialog state)
- [x] 3.4 Update filter controls to use `router.push`/`router.replace` for URL param changes instead of client-side state, resetting page to 1 on filter changes
- [x] 3.5 Update `transactions/page.tsx` to be an async server component with `<Suspense>` boundary, reading searchParams and passing to `TransactionListServer`
- [x] 3.6 Verify transactions page: list renders, pagination works via URL, filters trigger server re-fetch, CRUD mutations work

## 4. Migrate Dashboard page to server fetching

- [x] 4.1 Create async server wrapper components for each widget: `SummaryWidgetServer`, `TrendsChartServer`, `CategoryBreakdownServer`, `DailySpendingServer`, `TopCategoryListServer`, `RecentTransactionsServer`
- [x] 4.2 Refactor each dashboard widget client component to accept data as props instead of using `useWidgetData` hook
- [x] 4.3 Remove `useWidgetData` hook
- [x] 4.4 Update dashboard filter controls to use `router.push`/`router.replace` for URL param changes, replacing `useDashboardFilters` hook
- [x] 4.5 Update `dashboard/page.tsx` to be an async server component that reads searchParams, wraps each widget server component in its own `<Suspense>` boundary with skeleton fallback
- [x] 4.6 Refactored `useDashboardFilters` hook — kept for URL state management in `DashboardFilterBarClient`, removed filter parsing (moved to constants)
- [x] 4.7 Verify dashboard page: all 6 widgets render with data, filter changes trigger server re-fetch with skeleton fallbacks, streaming works independently per widget

## 5. Cleanup

- [x] 5.1 Remove unused client-side fetch hooks (`useWidgetData`, fetch portions of `useTransactionManagement` and `useCategoryManagement`) if fully replaced
- [x] 5.2 Verify no remaining `'use server'` directives on fetch-only functions
- [x] 5.3 Run `pnpm type-check` and fix any TypeScript errors
- [x] 5.4 Run `pnpm lint` and fix any linting issues
- [x] 5.5 Run `pnpm build` to verify production build succeeds
