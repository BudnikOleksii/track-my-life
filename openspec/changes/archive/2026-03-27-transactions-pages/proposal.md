## Why

The transactions page is currently a stub with only a title. Users need full CRUD functionality to record, view, edit, and delete financial transactions — the core feature of a money tracker app. Without this, the app cannot fulfill its primary purpose.

## What Changes

- Add transaction list view with pagination, filtering by type (income/expense), and date range filtering
- Add create transaction form (category, type, amount, currency, date, description)
- Add edit transaction capability via the same form
- Add delete transaction with confirmation dialog
- Create transaction API service in shared packages
- Add server actions for all CRUD operations
- Expand i18n translations for the transactions page (en + uk)

## Capabilities

### New Capabilities

- `transaction-crud`: Server actions and API service layer for creating, reading, updating, and deleting transactions
- `transaction-list-ui`: Transaction list view with pagination, type filtering, and date range filtering
- `transaction-form-ui`: Create/edit transaction form with validation (category selector, type, amount, currency, date, description)
- `transaction-delete-ui`: Delete transaction confirmation dialog

### Modified Capabilities

None

## Impact

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/` — full page implementation replacing the stub
- `packages/shared/src/api/services/` — new `transaction-api.service.ts`
- `packages/shared/src/api/server-api.ts` — export new transaction service instance
- `apps/money-tracker/messages/en/` and `uk/` — expanded `transactions-page.json`
