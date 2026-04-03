## 1. API Service Layer

- [x] 1.1 Add `fetchTransactionsByCategory(categoryId: string)` method to `TransactionApiService` in `packages/shared/src/api/services/transaction-api.service.ts`
- [x] 1.2 Add `transactionsByCategory` path and `getTransactionsByCategoryPath` helper to `apps/money-tracker/src/constants/paths.ts`

## 2. Data Fetching

- [x] 2.1 Create `fetch-transactions-by-category.ts` in the by-category feature actions directory — plain async function using `rscTransactionApiService`

## 3. Category List Page (`/transactions/by-category`)

- [x] 3.1 Create route directory `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/by-category/`
- [x] 3.2 Create `page.tsx` with metadata generation and Suspense boundary
- [x] 3.3 Create `CategoryListServer` server component that fetches categories via `fetchCategoryList` and filters for top-level (`parentCategoryId === null`)
- [x] 3.4 Create `page.content.tsx` client component displaying clickable category items with name and type
- [x] 3.5 Add page styles in `page.module.scss`

## 4. Category Detail Page (`/transactions/by-category/[categoryId]`)

- [x] 4.1 Create route directory `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/by-category/[categoryId]/`
- [x] 4.2 Create `page.tsx` with metadata generation and Suspense boundary
- [x] 4.3 Create `TransactionsByCategoryServer` server component that fetches data via `fetchTransactionsByCategory`
- [x] 4.4 Create `page.content.tsx` client component displaying subcategory groups with transactions and per-currency totals
- [x] 4.5 Add back navigation link to `/transactions/by-category`
- [x] 4.6 Add page styles in `page.module.scss`
- [x] 4.7 Handle error states (category not found, subcategory ID provided)

## 5. Navigation & i18n

- [x] 5.1 Add sidebar navigation entry in `AppSidebar.tsx` with LayoutList icon between Transactions and Recurring Transactions
- [x] 5.2 Add i18n translation keys for both pages (metadata, content labels, empty states, error messages) in all locale files

## 6. Verification

- [x] 6.1 Run `pnpm type-check` to verify no TypeScript errors
- [x] 6.2 Run `pnpm build` to verify the build succeeds
