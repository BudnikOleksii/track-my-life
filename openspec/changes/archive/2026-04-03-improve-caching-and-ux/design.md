## Context

The money-tracker app currently has zero caching — every page load, navigation, or tab switch triggers fresh API calls for categories, transactions, profile, and analytics data. All data is per-user (authenticated via JWT bearer tokens stored in httpOnly cookies). The app uses a custom `ApiClient` with `RscTokenProvider` for RSC reads and `ServerActionTokenProvider` for mutations. Mutations already call `revalidatePath()` for invalidation. Non-dashboard pages wrap entire content in a single Suspense boundary, and transaction forms hardcode currency options instead of using the user's profile `baseCurrencyCode`.

## Goals / Non-Goals

**Goals:**

- Cache all read operations per-user using Next.js fetch cache with `next.revalidate` and `next.tags` options
- Deduplicate fetch calls within a single render using React `cache()`
- Enable targeted cache invalidation via `revalidateTag` replacing `revalidatePath`
- Use the user's `baseCurrencyCode` from their cached profile as the default in transaction forms
- Render page titles, filter bars, and action buttons immediately (outside Suspense) on all pages

**Non-Goals:**

- Client-side caching (SWR, React Query, etc.)
- `"use cache"` directive — incompatible with per-user authenticated data since it cannot call `cookies()` anywhere in its call chain, and the `ApiClient` reads cookies via `RscTokenProvider`
- Multi-currency per-transaction support — we simplify to use the user's base currency
- Changing the dashboard page Suspense structure — it already has granular boundaries
- Caching mutation operations — only reads are cached

## Decisions

### 1. Extend `ApiClient.request()` to support Next.js fetch cache options

The `ApiClient` already uses native `fetch()`. We extend `RequestOptions` with an optional `next` field (`{ revalidate?: number; tags?: string[] }`) and pipe it into the `fetch()` call's `init` object. This enables Next.js's built-in fetch-level caching without changing the API service layer or the interceptor chain.

The cache key is automatically derived from URL + headers (including the `Authorization` header added by `AuthInterceptor`), so per-user isolation is guaranteed.

**Why not `"use cache"`?** The `"use cache"` directive cannot call `cookies()` anywhere in its execution. The `RscTokenProvider` reads the access_token cookie inside the auth interceptor, deep in the `ApiClient` call chain. Bypassing the API client with raw `fetch()` would duplicate URL construction, response parsing, error handling, and lose the interceptor chain.

**Why not `"use cache: private"`?** It allows `cookies()` but only caches per-request in browser memory — equivalent to React `cache()` for deduplication only, no cross-request caching.

### 2. Wrap fetch action functions with React `cache()` for request deduplication

Each fetch action function (e.g., `fetchCategoryList`, `fetchProfile`) is wrapped with React's `cache()` to deduplicate calls within a single render tree. For example, if `fetchCategoryList` is called by both `TransactionListServer` and a form page's server wrapper in the same request, it runs once.

This complements the fetch-level caching — `cache()` deduplicates within a request, `next.revalidate`/`next.tags` caches across requests.

### 3. Pass `next` cache options from fetch action functions to API services

Each fetch action function passes `next: { revalidate, tags }` when calling the rsc API service. The API service pipes this through to `ApiClient.request()`, which passes it to `fetch()`.

| Data type              | `revalidate` (seconds) | `tags`                       | Rationale                         |
| ---------------------- | ---------------------- | ---------------------------- | --------------------------------- |
| Profile                | 86400 (1 day)          | `['profile']`                | Rarely changes                    |
| Categories             | 3600 (1 hour)          | `['categories']`             | Changes infrequently              |
| Transaction list       | 300 (5 min)            | `['transactions']`           | Changes with each new transaction |
| Single transaction     | 300 (5 min)            | `['transactions']`           | Same lifecycle                    |
| Analytics/trends       | 300 (5 min)            | `['analytics']`              | Derived from transactions         |
| Recurring transactions | 3600 (1 hour)          | `['recurring-transactions']` | Changes infrequently              |

### 4. Replace `revalidatePath` with `revalidateTag` in all mutations

Each mutation server action will call `revalidateTag()` with the relevant tags instead of `revalidatePath()`. For example, creating a transaction invalidates both `'transactions'` and `'analytics'` tags.

**Why?** `revalidateTag` is more granular — creating a transaction shouldn't invalidate the category cache. It pairs with the `tags` on fetch cache entries.

### 5. Remove currency selector from transaction forms, use profile's baseCurrencyCode

Transaction form server wrappers (create and edit pages) will fetch the user's cached profile and pass `baseCurrencyCode` as a prop. The form will use this as the fixed currency value. The currency Select field will be replaced with a read-only display of the user's base currency.

**Why remove the selector?** The hardcoded 4-currency list was incomplete (the app supports 180+ currencies). Rather than showing all 180, using the profile's base currency simplifies UX — most personal finance tracking happens in a single currency.

**Alternative considered:** Showing the full currency list in a Combobox. Rejected as overcomplicating the form for a niche use case. Users can change their base currency in settings.

### 6. Suspense boundary restructuring pattern

For non-dashboard pages, extract static UI (title, filters, action buttons) into the page.tsx server component directly, and wrap only the data-fetching server component in Suspense:

```
page.tsx (server component)
├── <header> Title + back link (immediate)
├── <FilterBar /> (client, immediate — uses URL params)
└── <Suspense fallback={<PageSkeleton />}>
    └── <DataListServer filters={filters} />
```

This matches the pattern already used in the dashboard page.

## Risks / Trade-offs

**[Risk] Cache staleness for transaction list with 5-min revalidate** → Users may not see their latest transaction for up to 5 minutes if they open a new tab. Mitigated by `revalidateTag('transactions')` on every create/update/delete mutation, which immediately invalidates the cache.

**[Trade-off] Cache key includes Authorization header** → When the access token rotates (refresh), the cache key changes and a fresh fetch happens. Acceptable since token rotation is infrequent relative to navigation, and the revalidate window handles staleness regardless.

**[Trade-off] Removing currency selector reduces flexibility** → Users who transact in multiple currencies lose per-transaction currency selection. This is acceptable for the current single-currency scope; multi-currency support can be added later as a separate capability.

**[Trade-off] Changes to shared `ApiClient`** → The `RequestOptions` extension touches `packages/shared`, affecting all apps. The change is additive (optional `next` field), so existing callers are unaffected.
