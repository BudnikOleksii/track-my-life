## Why

Users currently add transactions one-by-one through the form UI. When migrating from another tracker or importing bank exports, this is impractical for hundreds of rows. A bulk import from JSON/CSV files removes this friction and enables data portability.

## What Changes

- New import page at `/transactions/import` with file upload (JSON and CSV), client-side parsing, row validation preview, and bulk submission
- New `importTransactionList` method on `TransactionApiService` calling `POST /api/transactions/import`
- New generated types from the backend import endpoint (via `pnpm generate:api`)
- New Zod schema for validating imported row shape (Date, Category, Type, Amount, Currency, optional Subcategory)
- New server action wrapping the import API call with revalidation
- New i18n keys for the import page labels, errors, and success/failure messages

## Capabilities

### New Capabilities

- `transaction-import`: File upload (JSON/CSV), client-side row parsing and validation with error details, preview table with valid/invalid indicators, and bulk import via `POST /api/transactions/import`

### Modified Capabilities

_(none — no existing spec requirements change)_

## Impact

- **API layer** (`packages/shared`): new generated types after `pnpm generate:api`, new method on `TransactionApiService`
- **App routes** (`apps/money-tracker`): new `/transactions/import` page and supporting components
- **Navigation**: new sidebar/menu entry linking to import page
- **i18n**: new translation keys in `en.json` / `uk.json`
- **Dependencies**: may add a lightweight CSV parsing library (e.g., `papaparse`) or implement minimal CSV parser inline
