## Why

Users need a way to view their transactions organized by category to understand spending patterns. The backend already exposes a `GET /api/transactions/by-category/{categoryId}` endpoint that returns transactions grouped by subcategory with per-currency totals. This page gives users a category-level overview with drill-down into detailed transaction breakdowns.

## What Changes

- Add a new "Transactions by Category" page at `/transactions/by-category` under the `(app-layout)` route group
- The page displays a list of top-level categories (those with `parentCategoryId === null`)
- Clicking a category navigates to `/transactions/by-category/{categoryId}`, which calls the existing API endpoint and displays:
  - Transaction groups organized by subcategory (or ungrouped for direct transactions)
  - Per-currency totals for each subcategory group
  - Individual transaction details within each group
- Add a `fetchTransactionsByCategory` method to `TransactionApiService`
- Add sidebar navigation entry for the new page
- Add i18n translation keys for the new page

## Capabilities

### New Capabilities

- `transactions-by-category-ui`: Page UI showing category list and category detail view with subcategory-grouped transactions and totals
- `transactions-by-category-data`: Server-side data fetching and API service method for the by-category endpoint

### Modified Capabilities

- `app-navigation`: Add sidebar link for the new transactions-by-category page

## Impact

- **Code**: New page route under `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/by-category/`
- **API Service**: New method in `packages/shared/src/api/services/transaction-api.service.ts`
- **Navigation**: Updated sidebar in `AppSidebar.tsx` and `paths.ts`
- **i18n**: New translation namespace and keys for the page
