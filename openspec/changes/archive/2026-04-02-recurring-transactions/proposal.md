## Why

The money-tracker app needs recurring transactions so users can automate repeating financial entries (rent, subscriptions, salary). The backend API is fully built with endpoints for CRUD, pause/resume, and batch processing — the frontend just needs to be wired up. This is Phase 6 in the overview plan, with transactions (Phase 3) already complete.

## What Changes

- New `/recurring-transactions` route group under `(app-layout)` with list, create, detail, and edit pages
- New `RecurringTransactionApiService` in `packages/shared/src/api/services/`
- New server actions for create, update, delete, pause, and resume operations
- New shared data fetching functions for recurring transaction list and detail
- New `recurringTransactionsPage` i18n namespace (en + uk)
- New Zod form schema for recurring transaction create/edit validation
- Feature components: card list, form with frequency selector, status badge, pause/resume controls

## Capabilities

### New Capabilities

- `recurring-transaction-api-service`: API service layer with methods for all recurring transaction endpoints (CRUD + pause/resume)
- `recurring-transaction-crud`: Server actions and data fetching for create, update, delete, pause, resume operations
- `recurring-transaction-list-ui`: List page with status filtering, pagination, and recurring transaction cards
- `recurring-transaction-form-page`: Dedicated create/edit pages with frequency, interval, date range, category, and amount fields
- `recurring-transaction-detail-ui`: Detail page showing full recurring transaction info with pause/resume and delete actions

### Modified Capabilities

_None — this is a new feature with no changes to existing specs._

## Impact

- **Routes**: 5 new pages under `(app-layout)/recurring-transactions/`
- **API**: New service in `packages/shared` consuming `/api/recurring-transactions` endpoints
- **Server actions**: 5 new action files (create, update, delete, pause, resume)
- **i18n**: New `recurringTransactionsPage` namespace in both `en` and `uk` locales
- **Navigation**: Recurring Transactions link already planned in app navbar
- **Dependencies**: No new packages — reuses existing UI primitives (`Badge`, `Select`, `Pagination`, etc.)
