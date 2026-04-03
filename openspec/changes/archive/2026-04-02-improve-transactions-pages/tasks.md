## 1. Sidebar Navigation

- [x] 1.1 Add `recurringTransactions` label to `messages/en/navigation.json` and `messages/uk/navigation.json`
- [x] 1.2 Add Recurring Transactions nav item to `NAVIGATION_ITEM_LIST` in `AppSidebar.tsx` (Repeat icon, between Transactions and Categories)
- [x] 1.3 Add `PATHS.recurringTransactions` entry to `PATH_TO_LABEL_KEY` in `AppHeader.tsx`

## 2. Month Navigator Component

- [x] 2.1 Create `month-navigation.ts` constants file with `getMonthDateRange`, `getCurrentYearMonth`, `parseMonthFromDateRange` helpers
- [x] 2.2 Create `MonthNavigator.tsx` component (left/right arrows + localized month/year label)
- [x] 2.3 Create `MonthNavigator.module.scss` styles

## 3. Extend Filter Infrastructure

- [x] 3.1 Add `categoryId`, `currencyCode`, `sortBy`, `sortOrder` to `TransactionFilterUpdate` interface and search param mappings in `useTransactionFilters.ts`
- [x] 3.2 Add new params to `FetchTransactionListParams` in `fetch-transaction-list.ts` and pass them to the API call
- [x] 3.3 Update `parseTransactionSearchParams` in `TransactionListServer.tsx` to parse new params and default dateFrom/dateTo to current month
- [x] 3.4 Update `TransactionListServerProps` to include new filter fields and pass them through to `TransactionsPageContent`

## 4. Sort Filter Component

- [x] 4.1 Create `sort.ts` constants file with `SORT_BY_OPTION_LIST` and `SORT_ORDER_OPTION_LIST`
- [x] 4.2 Create `TransactionSortFilter.tsx` component (sortBy dropdown + sortOrder toggle button)
- [x] 4.3 Create `TransactionSortFilter.module.scss` styles

## 5. Category and Currency Filter Components

- [x] 5.1 Create `TransactionCategoryFilter.tsx` component (select dropdown with "All categories" option)
- [x] 5.2 Create `TransactionCurrencyFilter.tsx` component (select dropdown with "All currencies" option)
- [x] 5.3 Update `TransactionListServer.tsx` to fetch category list in parallel with transactions via `Promise.all`
- [x] 5.4 Pass `categoryList` and filter values to `TransactionsPageContent`

## 6. Transaction List Date Grouping

- [x] 6.1 Add `groupTransactionListByDate` helper function in `TransactionList.tsx`
- [x] 6.2 Update `TransactionList` render to iterate over date groups with date section headers
- [x] 6.3 Add `dateHeader` and date group styles to `TransactionList.module.scss`

## 7. Page Content Integration

- [x] 7.1 Update `TransactionFilters` interface in `page.content.tsx` to include all new filter fields
- [x] 7.2 Replace `TransactionDateFilter` with `MonthNavigator` in the primary filter row
- [x] 7.3 Add `TransactionSortFilter` to the primary filter row
- [x] 7.4 Add secondary filter row with `TransactionCategoryFilter` and `TransactionCurrencyFilter`
- [x] 7.5 Wire all new filters to `handleFilterChange` callbacks

## 8. Cleanup and i18n

- [x] 8.1 Add new i18n keys to `messages/en/transactions-page.json` (sort, category, currency, month nav labels)
- [x] 8.2 Add new i18n keys to `messages/uk/transactions-page.json`
- [x] 8.3 Remove `TransactionDateFilter` component directory
- [x] 8.4 Update `page.module.scss` for new filter row layout

## 9. Verification

- [x] 9.1 Run `pnpm type-check` and fix any type errors
- [x] 9.2 Run `pnpm lint` and fix any lint issues
- [x] 9.3 Run `pnpm build` and verify successful build
