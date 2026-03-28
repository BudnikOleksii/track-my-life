## Context

The money-tracker app uses a pattern where all pages are `'use client'` components that fetch data via hooks calling server actions. For example, the dashboard uses `useWidgetData` hooks that call `fetchSummary`, `fetchTrends`, etc. server actions inside `useEffect`. Transactions use `useTransactionManagement` which fetches the list client-side. Categories use `useCategoryManagement` similarly.

This means every page ships JavaScript for data fetching logic, manages loading states manually, and creates client-side fetch waterfalls (page loads → JS executes → fetch fires → data renders). Next.js 16 with React 19 supports async Server Components that can fetch data before sending HTML to the client, with Suspense for streaming.

## Goals / Non-Goals

**Goals:**

- Fetch read data at the server component level, eliminating client-side fetch waterfalls
- Use `<Suspense>` boundaries with skeleton fallbacks for streaming
- Keep mutation logic (create/update/delete) as server actions called from client components
- Preserve URL-driven filtering via `searchParams` (already used, but processed server-side)
- Reduce client JavaScript bundle by moving fetch logic out of client components
- Maintain current UX behavior: loading skeletons, filter controls, pagination

**Non-Goals:**

- Rewriting the API client layer (`packages/shared/src/api/`)
- Changing the backend API endpoints
- Adding client-side caching (e.g., React Query, SWR) — server fetching replaces the need
- Modifying auth flow or token management
- Changing mutation patterns — `createTransaction`, `updateTransaction`, etc. remain as server actions
- SSG or ISR — all pages remain dynamically rendered (user-specific data)

## Decisions

### 1. Convert fetch server actions to plain async functions

**Decision**: Remove `'use server'` from fetch-only actions (e.g., `fetchTransactionList`, `fetchSummary`) and convert them to plain async functions importable by server components.

**Rationale**: Server actions add overhead (serialization, POST request) that is unnecessary when the caller is already on the server. Plain async functions are simpler and faster for RSC usage.

**Alternative considered**: Keep server actions and call them from RSC. This works but adds unnecessary serialization overhead and blurs the distinction between server-callable and client-callable functions.

### 2. Page-level server components with async data fetching

**Decision**: Each `page.tsx` becomes an async server component that reads `searchParams`, calls data-fetching functions, and passes results as props to client components.

**Rationale**: This is the standard Next.js App Router pattern. The page component is the natural boundary where URL params are available and data dependencies are known.

**Alternative considered**: Layout-level fetching. Rejected because filters are page-specific and layouts don't receive `searchParams` in Next.js.

### 3. Granular Suspense boundaries per widget/section

**Decision**: Wrap each independent data-fetching section in its own `<Suspense>` boundary with a skeleton fallback. For example, the dashboard will have separate Suspense boundaries for summary, trends, category breakdown, etc.

**Rationale**: Granular boundaries allow independent streaming — faster widgets render first without waiting for slower ones. This preserves the current UX where each widget has its own loading skeleton.

**Alternative considered**: Single Suspense boundary per page. Rejected because it would block the entire page until the slowest query completes, degrading UX compared to current behavior.

### 4. Async server wrapper components for parallel data fetching

**Decision**: Create thin async server components (e.g., `SummaryWidgetServer`, `TransactionListServer`) that fetch their own data and render the client component with props. The page composes these inside Suspense boundaries.

**Rationale**: This enables parallel data fetching — React will initiate all sibling Suspense children concurrently. Each wrapper is self-contained: it knows what to fetch and what to render.

**Alternative considered**: Fetch all data in `page.tsx` with `Promise.all`. This works but creates a single blocking point — all queries must complete before any UI renders. The wrapper pattern streams results as they arrive.

### 5. Client components receive data as props, own only interactivity

**Decision**: Existing `page.content.tsx` components become pure client components that receive fetched data as props. They retain ownership of interactive state: form dialogs, optimistic mutation updates, client-side re-sorting.

**Rationale**: Clear separation — server components own data loading, client components own interactivity. This reduces client bundle size while preserving interactive UX.

### 6. URL searchParams for server-side filtering

**Decision**: Filters (date range, type, currency, pagination) continue to live in URL searchParams. Server components read them directly from the `searchParams` page prop and pass them to fetch functions.

**Rationale**: URL state is already the pattern in use. Moving filter processing server-side means filter changes trigger a server re-render (via `router.push` or `<Link>`) instead of a client-side refetch. This works naturally with Next.js navigation.

**Alternative considered**: Client-side state with `useRouter.refresh()`. Rejected because it doesn't leverage server-side data fetching and adds complexity.

### 7. Refresh after mutations via `revalidatePath`

**Decision**: After mutations (create/update/delete), use `revalidatePath` in server actions to invalidate the cached page data. The server will re-fetch on next navigation/revalidation.

**Rationale**: This is already the pattern used by mutation server actions. No change needed — it naturally integrates with server-fetched data.

## Risks / Trade-offs

**[Filter changes trigger full server round-trip]** → This is a tradeoff vs. instant client-side filtering. Mitigation: Suspense boundaries with skeleton fallbacks keep the UX responsive. For most filter operations, the server response is fast enough. If needed in the future, client-side transitions with `useTransition` can show pending UI.

**[Loss of optimistic list updates for mutations]** → Currently, hooks update local state optimistically after mutations. With server-fetched data, the list refreshes via `revalidatePath`. Mitigation: Use `useOptimistic` from React 19 for delete/create operations where instant feedback matters. For most CRUD operations, `revalidatePath` + Suspense is sufficient.

**[Increased server load]** → Data fetching moves from client browsers to the server. Mitigation: This is a standard Next.js pattern. The server is already proxying these requests via server actions. The load difference is negligible since the same API calls are made, just from a different origin.

**[Migration complexity — gradual rollout]** → Changing all pages at once is risky. Mitigation: Migrate one page at a time (categories first as simplest, then transactions, then dashboard). Each page can be migrated independently since they share no client-side fetch state.
