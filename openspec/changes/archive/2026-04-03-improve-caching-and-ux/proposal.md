## Why

Every page load and navigation re-fetches all data from the API (categories, transactions, profile, analytics) with zero caching, causing unnecessary latency and server load. Additionally, non-dashboard pages wrap entire content in a single Suspense boundary (hiding titles and filters until data loads), and transaction forms hardcode currency options instead of using the user's configured base currency.

## What Changes

- Extend the shared `ApiClient` to support Next.js fetch cache options (`next.revalidate`, `next.tags`), enabling cross-request caching at the fetch level per-user (keyed by URL + Authorization header)
- Wrap fetch action functions with React `cache()` for request-level deduplication
- Replace all `revalidatePath()` calls in mutation server actions with `revalidateTag()` for granular cache invalidation
- Use the user's `baseCurrencyCode` from their profile as the default currency in transaction and recurring transaction forms, removing the hardcoded USD/EUR/GBP/UAH selector
- Restructure non-dashboard pages to render titles, filter bars, and action buttons outside Suspense boundaries, wrapping only data-dependent server components in Suspense

## Capabilities

### New Capabilities

- `server-caching`: Extend `ApiClient` with Next.js fetch cache options, add `next.revalidate`/`next.tags` to all read API service methods, wrap fetch actions with React `cache()`, and replace `revalidatePath` with `revalidateTag` in all mutations
- `profile-currency-default`: Fetch cached user profile in transaction form server wrappers and use `baseCurrencyCode` as the default currency, removing hardcoded currency selector

### Modified Capabilities

- `server-data-loading`: Suspense boundaries on non-dashboard pages will be restructured so static UI (titles, filters, actions) renders immediately outside Suspense, with only data-fetching server components wrapped in Suspense
- `transaction-form-page`: Currency field defaults to user's `baseCurrencyCode` instead of hardcoded 'USD', currency selector removed or disabled
- `recurring-transaction-form-page`: Same currency changes as transaction form

## Impact

- **Shared ApiClient**: `packages/shared/src/api/client/api-client.ts` and `types.ts` — add `next` field to `RequestOptions`, pass to `fetch()`
- **API services**: All service classes in `packages/shared/src/api/services/` — accept and forward `next` options on read methods
- **Fetch functions**: All `fetch*` action files across settings, categories, transactions, dashboard, recurring transactions — pass `next` cache options, wrap with `cache()`
- **Mutation actions**: All `create*`, `update*`, `delete*` server actions — replace `revalidatePath()` with `revalidateTag()`
- **Page files**: transactions, categories, settings, recurring transactions, by-category pages — restructure Suspense boundaries
- **Form components**: TransactionFormPage, RecurringTransactionFormPage and their hooks — accept `baseCurrencyCode` prop, remove hardcoded currency
- **Dependencies**: No new packages required; `revalidateTag` from `next/cache`, `cache` from `react`
