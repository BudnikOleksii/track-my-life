## 1. API Service Layer

- [x] 1.1 Create `RecurringTransactionApiService` class in `packages/shared/src/api/services/recurring-transaction-api.service.ts` extending `ApiClient` with methods: `fetchRecurringTransactionList`, `fetchRecurringTransactionById`, `createRecurringTransaction`, `updateRecurringTransaction`, `deleteRecurringTransaction`, `pauseRecurringTransaction`, `resumeRecurringTransaction`
- [x] 1.2 Export `recurringTransactionApiService` and `rscRecurringTransactionApiService` instances from the service file

## 2. i18n Setup

- [x] 2.1 Add `recurringTransactionsPage` and `recurringTransactionsFormPage` to the i18n namespace constants
- [x] 2.2 Create `messages/en/recurring-transactions-page.json` with all list and detail page translations
- [x] 2.3 Create `messages/en/recurring-transactions-form-page.json` with form labels, placeholders, and validation messages
- [x] 2.4 Create `messages/uk/recurring-transactions-page.json` with Ukrainian translations
- [x] 2.5 Create `messages/uk/recurring-transactions-form-page.json` with Ukrainian translations
- [x] 2.6 Register new namespaces in the i18n request config and message loading

## 3. Form Schema and Constants

- [x] 3.1 Create `recurring-transaction-form-schema.ts` Zod schema in `recurring-transactions/constants/` with fields: categoryId, type, amount, currencyCode, description, frequency, interval, startDate, endDate
- [x] 3.2 Add recurring transaction paths to the `PATHS` constant (`recurringTransactions`, `recurringTransactionCreate`)

## 4. Server Actions and Data Fetching

- [x] 4.1 Create `fetch-recurring-transaction-list.ts` async function using `rscRecurringTransactionApiService` with type guard validation
- [x] 4.2 Create `fetch-recurring-transaction-by-id.ts` async function using `rscRecurringTransactionApiService`
- [x] 4.3 Create `create/action.ts` server action with Zod validation, API call, revalidatePath, and redirect
- [x] 4.4 Create `[id]/edit/action.ts` server action for updating a recurring transaction
- [x] 4.5 Create `actions/delete-recurring-transaction.ts` server action
- [x] 4.6 Create `actions/pause-recurring-transaction.ts` server action
- [x] 4.7 Create `actions/resume-recurring-transaction.ts` server action

## 5. List Page UI

- [x] 5.1 Create `recurring-transactions/page.tsx` server page with search params parsing, data fetching, Suspense boundary, and metadata
- [x] 5.2 Create `recurring-transactions/page.content.tsx` client content component with card list, status filter, pagination, empty state, and create button
- [x] 5.3 Create `recurring-transactions/page.module.scss` styles
- [x] 5.4 Create `RecurringTransactionCard` component displaying amount, frequency, next occurrence, and status badge
- [x] 5.5 Create status filter component for ALL/ACTIVE/PAUSED/CANCELLED filtering via URL search params

## 6. Form Page UI

- [x] 6.1 Create `RecurringTransactionForm` component with react-hook-form, Zod resolver, category select (filtered by type), amount input, frequency select, interval input, date pickers
- [x] 6.2 Create `recurring-transactions/create/page.tsx` and `create/page.content.tsx` for the create form page
- [x] 6.3 Create `recurring-transactions/[id]/edit/page.tsx` and `[id]/edit/page.content.tsx` for the edit form page with pre-populated data
- [x] 6.4 Create form page styles

## 7. Detail Page UI

- [x] 7.1 Create `recurring-transactions/[id]/page.tsx` server page that fetches by ID
- [x] 7.2 Create `recurring-transactions/[id]/page.content.tsx` client content with full detail display, status badge, pause/resume button, edit button, and delete with confirmation dialog
- [x] 7.3 Create detail page styles

## 8. Verification

- [x] 8.1 Run `pnpm type-check` and fix any TypeScript errors
- [x] 8.2 Run `pnpm lint` and `pnpm stylelint` and fix any linting issues
- [x] 8.3 Run `pnpm build` and verify successful production build
