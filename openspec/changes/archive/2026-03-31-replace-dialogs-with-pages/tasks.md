## 1. Infrastructure

- [x] 1.1 Add `categoriesCreate`, `transactionsCreate` to `PATHS` and add `getCategoriesEditPath(id)`, `getTransactionsEditPath(id)` helper functions in `apps/money-tracker/src/constants/paths.ts`
- [x] 1.2 Create `fetchCategory(id)` read function in `apps/money-tracker/src/actions/fetch-category.ts` using `rscCategoryApiService.fetchCategoryById(id)`
- [x] 1.3 Create `fetchTransaction(id)` read function in `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/actions/fetch-transaction.ts` using `rscTransactionApiService.fetchTransactionById(id)`
- [x] 1.4 Add i18n keys (`createPageTitle`, `editPageTitle`, `backToList`, `save`, `metadata.createTitle`, `metadata.editTitle`) to `messages/en/categories-page.json` and `messages/uk/categories-page.json`
- [x] 1.5 Add i18n keys (`createPageTitle`, `editPageTitle`, `backToList`, `save`, `metadata.createTitle`, `metadata.editTitle`) to `messages/en/transactions-page.json` and `messages/uk/transactions-page.json`

## 2. Category Form Page

- [x] 2.1 Create `CategoryFormPage.tsx` client component and `CategoryFormPage.module.scss` at `categories/components/category-form-page/` — extract form from `CategoryForm.tsx`, remove AlertDialog wrapper, add page header with back link, redirect on success
- [x] 2.2 Create `categories/create/page.tsx` server component — fetch parent categories, render `CategoryFormPage` with `category={null}`
- [x] 2.3 Create `categories/[id]/edit/page.tsx` server component — fetch category + category list in parallel, call `notFound()` if missing, render `CategoryFormPage` with fetched data

## 3. Transaction Form Page

- [x] 3.1 Create `use-transaction-form-page.ts` hook at `transactions/components/transaction-form-page/hooks/` — adapt from `use-transaction-form.ts`, remove `isOpen` dependency, use `router.push` instead of `onSuccess` callback
- [x] 3.2 Create `TransactionFormPage.tsx` client component and `TransactionFormPage.module.scss` at `transactions/components/transaction-form-page/` — extract form from `TransactionForm.tsx`, remove AlertDialog wrapper, add page header with back link, use new hook
- [x] 3.3 Create `transactions/create/page.tsx` server component — fetch category list, render `TransactionFormPage` with `transaction={null}`
- [x] 3.4 Create `transactions/[id]/edit/page.tsx` server component — fetch transaction + category list in parallel, call `notFound()` if missing, render `TransactionFormPage` with fetched data

## 4. Update List Pages

- [x] 4.1 Update `categories/components/category-tree/CategoryTree.tsx` — remove `onEdit` prop, replace edit `Button` with `Link` to `getCategoriesEditPath(category.id)` styled as ghost icon button
- [x] 4.2 Update `categories/page.content.tsx` — remove `CategoryForm`, `useCategoryDialogs`; replace "Create" button with `Link` to `PATHS.categoriesCreate`; simplify delete state to inline `useState`
- [x] 4.3 Update `transactions/components/transaction-list/TransactionList.tsx` — remove `onEdit` prop, replace edit `Button` with `Link` to `getTransactionsEditPath(transaction.id)` styled as ghost icon button
- [x] 4.4 Update `transactions/page.content.tsx` — remove `TransactionForm`, `useTransactionDialogs`; replace "Create" button with `Link` to `PATHS.transactionsCreate`; simplify delete state to inline `useState`

## 5. Cleanup

- [x] 5.1 Delete `categories/components/category-form/` directory (CategoryForm.tsx + module.scss)
- [x] 5.2 Delete `categories/hooks/use-category-management.ts`
- [x] 5.3 Delete `transactions/components/transaction-form/` directory (TransactionForm.tsx + module.scss + hooks/)
- [x] 5.4 Delete `transactions/hooks/use-transaction-dialogs.ts`
- [x] 5.5 Grep for any remaining imports to deleted files and fix

## 6. Verification

- [x] 6.1 Run `pnpm type-check` and fix any TypeScript errors
- [x] 6.2 Run `pnpm lint` and fix any linting issues
- [x] 6.3 Run `pnpm build` and verify successful build
