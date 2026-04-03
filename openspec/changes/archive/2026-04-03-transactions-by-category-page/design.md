## Context

The app has a transactions page (`/transactions`) for flat transaction lists and a categories page (`/categories`) for managing categories. There is no way to view transactions organized by category. The backend already provides `GET /api/transactions/by-category/{categoryId}` which returns `TransactionsByCategoryResponseDto` — transactions grouped by subcategory with per-currency totals.

The existing `TransactionApiService` in `packages/shared` does not yet have a method for this endpoint.

## Goals / Non-Goals

**Goals:**

- Provide a category-centric view of transactions at `/transactions/by-category`
- Allow users to select a top-level category and see transactions grouped by subcategory
- Display per-currency totals for each subcategory group
- Follow existing patterns: RSC data fetching, Suspense boundaries, `page.content.tsx` client component

**Non-Goals:**

- No editing/deleting transactions from this page (users navigate to existing edit pages)
- No filtering by date range or currency on this page (first iteration)
- No aggregated totals across all categories (just per-category detail)

## Decisions

### Route structure: nested dynamic route under transactions

Place the page at `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/by-category/` for the category list, and `transactions/by-category/[categoryId]/` for the detail view.

**Rationale**: Keeps category-view logically grouped under transactions. The `[categoryId]` dynamic segment maps directly to the API endpoint path parameter.

**Alternative considered**: Separate top-level route `/by-category` — rejected because it's conceptually a view of transactions, not a new domain.

### Two-page approach: list page + detail page

- `/transactions/by-category` — server-rendered list of top-level categories (reuses `fetchCategoryList` from `src/actions/`)
- `/transactions/by-category/[categoryId]` — server-fetched detail using the by-category endpoint

**Rationale**: Follows Next.js routing conventions and allows each page to have its own loading state via Suspense. Simpler than a single page with client-side state management for the selected category.

**Alternative considered**: Single page with accordion/expandable rows — rejected because it would require multiple API calls on the client and doesn't match the existing page patterns in the app.

### API service method addition

Add `fetchTransactionsByCategory(categoryId: string)` to `TransactionApiService` class.

**Rationale**: Each service file exports its own instance (per project convention). The method returns `TransactionsByCategoryResponseDto`.

### Data fetching: RSC pattern with server wrapper

Create `fetch-transactions-by-category.ts` in the detail page's `actions/` folder as a plain async function (no `'use server'`), callable from RSC. Wrap in a `TransactionsByCategoryServer` component with Suspense.

## Risks / Trade-offs

- [Categories with many transactions] → The endpoint returns all transactions for a category without pagination. For the first iteration this is acceptable; pagination can be added when the backend supports it.
- [No existing by-category service method] → Need to add to `TransactionApiService` and rebuild shared package. Low risk, standard process.
