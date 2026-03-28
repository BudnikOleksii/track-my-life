## 1. API Service Layer

- [x] 1.1 Create `TransactionApiService` in `packages/shared/src/api/services/transaction-api.service.ts` with methods: `fetchTransactionList`, `fetchTransactionById`, `createTransaction`, `updateTransaction`, `deleteTransaction`
- [x] 1.2 Export `transactionApiService` instance from `packages/shared/src/api/server-api.ts` with auth interceptor

## 2. Transaction Form Schema & Constants

- [x] 2.1 Create Zod validation schema in `transactions/constants/transaction-form-schema.ts` covering categoryId, type, amount, currencyCode, date, description
- [x] 2.2 Define filter constants and default pagination values

## 3. Server Actions

- [x] 3.1 Create `fetch-transaction-list.ts` server action with support for page, pageSize, type, dateFrom, dateTo params
- [x] 3.2 Create `create-transaction.ts` server action with Zod validation and path revalidation
- [x] 3.3 Create `update-transaction.ts` server action with Zod validation and path revalidation
- [x] 3.4 Create `delete-transaction.ts` server action with path revalidation
- [x] 3.5 Create `fetch-category-list.ts` server action for populating the category combobox in the form

## 4. State Management

- [x] 4.1 Create `useTransactionManagement` hook managing list state, dialog open/close, editing/deleting transaction references, and CRUD callbacks
- [x] 4.2 Integrate filter state management via React state (page, pageSize, type, dateFrom, dateTo)

## 5. UI Components

- [x] 5.1 Create `TransactionTypeFilter` component (All / Income / Expense toggle)
- [x] 5.2 Create `TransactionDateFilter` component (date range inputs)
- [x] 5.3 Create `TransactionList` component rendering transaction rows with date, category, description, type badge, and amount
- [x] 5.4 Create pagination controls component for navigating pages
- [x] 5.5 Create `TransactionForm` dialog component with type toggle, category combobox (filtered by type), amount, currency select, date input, description textarea
- [x] 5.6 Create `DeleteTransactionDialog` component using AlertDialog with confirmation

## 6. Page Assembly

- [x] 6.1 Update `TransactionsPageContent` to compose all components: header with create button, filters, list, form dialog, delete dialog
- [x] 6.2 Update `page.tsx` server component with proper metadata generation

## 7. Internationalization

- [x] 7.1 Expand `messages/en/transactions-page.json` with all translation keys (metadata, list labels, form labels, error messages, empty states, filter labels, pagination)
- [x] 7.2 Add corresponding translations in `messages/uk/transactions-page.json`
