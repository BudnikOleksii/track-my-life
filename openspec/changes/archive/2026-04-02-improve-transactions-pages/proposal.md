## Why

The transactions page lacks month-based navigation, date grouping, and several API-supported filters (category, currency, sort). Additionally, recurring transactions are not accessible from the sidebar navigation, forcing users to navigate there manually.

## What Changes

- Add recurring-transactions navigation item to the app sidebar (between Transactions and Categories) and app header title mapping
- Replace the date range filter with a month-by-month navigator (left/right arrows + month label), defaulting to the current month
- Add sorting controls (sortBy: date/amount/createdAt, sortOrder: asc/desc) to the transactions filter bar
- Add category and currency filter dropdowns to the transactions page
- Group the transaction list by date with date section headers for better readability
- Pass new filter/sort parameters through the data fetching layer to the API

## Capabilities

### New Capabilities

- `month-navigation`: Month-by-month navigator component that replaces date range inputs and controls dateFrom/dateTo params
- `transaction-date-grouping`: Client-side grouping of transaction list by date with section headers
- `transaction-advanced-filters`: Category filter, currency filter, and sort controls for the transactions page

### Modified Capabilities

- `app-navigation`: Add recurring-transactions item to sidebar and header title mapping
- `transaction-list-ui`: Update list rendering to support date-grouped layout
- `server-side-filtering`: Extend filter params to include categoryId, currencyCode, sortBy, sortOrder

## Impact

- **Sidebar/Header**: `AppSidebar.tsx`, `AppHeader.tsx`, navigation i18n files (en/uk)
- **Transactions page**: `page.content.tsx`, `TransactionListServer.tsx`, `TransactionList.tsx`, `useTransactionFilters.ts`
- **Data layer**: `fetch-transaction-list.ts` params interface
- **Removed**: `TransactionDateFilter` component (replaced by month navigator)
- **New components**: `MonthNavigator`, `TransactionSortFilter`, `TransactionCategoryFilter`, `TransactionCurrencyFilter`
- **i18n**: New keys in `transactions-page.json` (en/uk) and `navigation.json` (en/uk)
