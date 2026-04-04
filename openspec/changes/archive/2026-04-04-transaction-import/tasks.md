## 1. API Layer (packages/shared)

- [x] 1.1 Run `pnpm generate:api` from `packages/shared/` to generate types for `POST /api/transactions/import` endpoint, then run `pnpm fmt` from root
- [x] 1.2 Add `importTransactionList` method to `TransactionApiService` that POSTs to `/api/transactions/import`

## 2. Import Row Schema and Parsing

- [x] 2.1 Install `papaparse` (and `@types/papaparse`) in `apps/money-tracker`
- [x] 2.2 Create Zod schema `importRowSchema` in `transactions/import/constants/` for validating raw import rows (Date, Category, Type, Amount, Currency, Subcategory)
- [x] 2.3 Create `parseImportFile` utility in `transactions/import/constants/` that accepts a File, detects JSON/CSV by extension, parses content, and returns array of raw row objects
- [x] 2.4 Create `validateImportRowList` utility that validates each row against the schema and returns arrays of valid/invalid rows with per-row errors

## 3. Server Action

- [x] 3.1 Create `import-transaction-list` server action in `transactions/import/actions/` that calls the API service method and handles revalidation

## 4. Import Page UI

- [x] 4.1 Create the import page route at `transactions/import/page.tsx` with page title
- [x] 4.2 Create `ImportTransactionPage` client component with file input accepting `.json` and `.csv`
- [x] 4.3 Create `ImportPreviewTable` component displaying parsed rows with valid/invalid status indicators and per-row error details
- [x] 4.4 Create `ImportSummary` component showing total/valid/invalid row counts
- [x] 4.5 Add import button with loading state that submits valid rows via the server action, shows success toast, and redirects to transactions list
- [x] 4.6 Add error states: unsupported file type, malformed JSON, empty file

## 5. Navigation and Routing

- [x] 5.1 Add `transactionsImport: '/transactions/import'` to `PATHS` constant
- [x] 5.2 Add "Import" item to the transactions submenu in the sidebar `NAVIGATION_ITEM_LIST`

## 6. i18n

- [x] 6.1 Create `transactions-import-page` i18n namespace with English translations
- [x] 6.2 Create Ukrainian translations for the same namespace
- [x] 6.3 Register the new namespace in the i18n namespace constants

## 7. Formatting and Verification

- [x] 7.1 Run `pnpm fmt` to format all new files
- [x] 7.2 Run `pnpm type-check` to verify no TypeScript errors
- [x] 7.3 Run `pnpm lint` to verify no linting issues
