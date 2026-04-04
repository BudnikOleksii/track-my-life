## Why

Users need to export their transaction data in CSV or JSON format for external analysis, record-keeping, or backup. A new backend endpoint (`/api/transactions/export`) is already available and needs to be integrated into the frontend.

## What Changes

- Generate updated API types from the new export endpoint
- Add an export/download button on the **transactions list page** allowing users to download all transactions or only those matching the current date range filter
- Add an export/download button on the **transactions by category detail page** allowing users to download transactions for that specific category
- Add a new `exportTransactionList` method to the `TransactionApiService` that returns a file blob
- Add a client-side download utility to trigger browser file downloads from blob responses

## Capabilities

### New Capabilities

- `transaction-export`: Covers the API service method for exporting transactions, download trigger utility, UI buttons on both pages, and format selection (CSV/JSON)

### Modified Capabilities

_None_

## Impact

- **API client** (`packages/shared`): New generated types, new service method on `TransactionApiService`
- **Transactions page** (`apps/money-tracker`): New download button in header, passes current `dateFrom`/`dateTo`/`format` query params
- **By-category detail page** (`apps/money-tracker`): New download button in header, passes `categoryId` and `format`
- **i18n**: New translation keys for export button labels in both `transactionsPage` and `transactionsByCategoryPage` namespaces
