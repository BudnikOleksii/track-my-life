## 1. Extend ApiClient with Next.js Fetch Cache Support

- [x] 1.1 Add optional `next?: { revalidate?: number; tags?: string[] }` to `RequestOptions` in `packages/shared/src/api/client/types.ts`
- [x] 1.2 Update `ApiClient.request()` in `packages/shared/src/api/client/api-client.ts` to pass `next` options to the `fetch()` call
- [x] 1.3 Update all API service read methods to accept and forward an optional `next` parameter (CategoryApiService, ProfileApiService, TransactionApiService, TransactionsAnalyticsApiService, RecurringTransactionApiService)

## 2. Add Cache Options to Fetch Action Functions

- [x] 2.1 Update `fetchProfile` to pass `next: { revalidate: 86400, tags: ['profile'] }` and wrap with React `cache()`
- [x] 2.2 Update `fetchCategoryList` to pass `next: { revalidate: 3600, tags: ['categories'] }` and wrap with React `cache()`
- [x] 2.3 Update transaction fetch functions (`fetchTransactionList`, `fetchTransaction`, `fetchTransactionsByCategory`) to pass `next: { revalidate: 300, tags: ['transactions'] }` and wrap with React `cache()`
- [x] 2.4 Update analytics fetch functions (`fetchSummary`, `fetchTrends`, `fetchCategoryBreakdown`, `fetchTopCategoryList`, `fetchDailySpending`) to pass `next: { revalidate: 300, tags: ['analytics'] }` and wrap with React `cache()`
- [x] 2.5 Update recurring transaction fetch functions (`fetchRecurringTransactionList`, `fetchRecurringTransaction`) to pass `next: { revalidate: 3600, tags: ['recurring-transactions'] }` and wrap with React `cache()`

## 3. Replace revalidatePath with revalidateTag in Mutations

- [x] 3.1 Replace `revalidatePath` with `revalidateTag('transactions')` and `revalidateTag('analytics')` in transaction create/update/delete server actions
- [x] 3.2 Replace `revalidatePath` with `revalidateTag('categories')` in category create/update/delete server actions
- [x] 3.3 Replace `revalidatePath` with `revalidateTag('profile')` in profile update server action
- [x] 3.4 Replace `revalidatePath` with `revalidateTag('recurring-transactions')` in recurring transaction create/update/delete/pause/resume server actions

## 4. Profile Currency in Transaction Forms

- [x] 4.1 Update transaction create page server component to fetch profile (cached) and pass `baseCurrencyCode` to `TransactionFormPage`
- [x] 4.2 Update transaction edit page server component to fetch profile (cached) and pass `baseCurrencyCode` to `TransactionFormPage`
- [x] 4.3 Add `baseCurrencyCode` prop to `TransactionFormPage` interface and update `useTransactionFormPage` hook to use it as default currency instead of `'USD'`
- [x] 4.4 Replace currency Select dropdown with read-only disabled Input displaying the currency code in `TransactionFormPage`
- [x] 4.5 Update recurring transaction create page server component to fetch profile (cached) and pass `baseCurrencyCode` to the form
- [x] 4.6 Update recurring transaction edit page server component to fetch profile (cached) and pass `baseCurrencyCode` to the form
- [x] 4.7 Add `baseCurrencyCode` prop to recurring transaction form component and update its hook to use it as default currency
- [x] 4.8 Replace currency Select dropdown with read-only disabled Input in recurring transaction form

## 5. Improve Suspense Boundaries

- [x] 5.1 Restructure transactions `page.tsx` — move title and filter bar outside Suspense, wrap only `TransactionListServer` in Suspense
- [x] 5.2 Restructure categories `page.tsx` — move title and action button outside Suspense, wrap only `CategoryListServer` in Suspense
- [x] 5.3 Restructure settings `page.tsx` — move title outside Suspense, wrap only `SettingsPageServer` in Suspense
- [x] 5.4 Restructure recurring transactions `page.tsx` — move title and filter bar outside Suspense, wrap only the list server component in Suspense
- [x] 5.5 Restructure transactions by-category list `page.tsx` — move title outside Suspense, wrap only data server component in Suspense
- [x] 5.6 Restructure transactions by-category detail `page.tsx` — move title and back link outside Suspense, wrap only data server component in Suspense
- [x] 5.7 Restructure budgets `page.tsx` — no changes needed, already renders title at page level with no Suspense

## 6. Verification

- [x] 6.1 Run `pnpm type-check` to verify all TypeScript types are correct after changes
- [x] 6.2 Run `pnpm lint` and `pnpm stylelint` to verify no lint errors
- [x] 6.3 Run `pnpm build` to verify the application builds successfully
