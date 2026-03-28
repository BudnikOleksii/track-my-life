## Why

The money-tracker app currently fetches all data through client-side hooks (`useEffect` + `useState`) that call server actions, resulting in client-side loading waterfalls, unnecessary JavaScript shipped to the browser, and no leveraging of React Server Components for initial data loading. Migrating read operations to server-side fetching (RSC data loading + Suspense boundaries) will improve initial page load performance, reduce client bundle size, and align with Next.js 16 / React 19 best practices.

## What Changes

- Move all read/fetch server actions into RSC-level `async` data fetching, passing data as props to client components
- Replace `useWidgetData`, `useTransactionManagement` (fetch portion), and `useCategoryManagement` (fetch portion) with server-fetched data + Suspense boundaries
- Convert page content components from fully `'use client'` to a hybrid model: server components for data loading, client components only for interactivity (forms, filters, optimistic updates)
- Keep mutation server actions (`create-*`, `update-*`, `delete-*`) and auth actions unchanged — they are already correctly implemented
- Introduce `searchParams`-based server-side filtering for transactions and dashboard, replacing client-side URL state hooks
- Add proper `<Suspense>` boundaries with skeleton fallbacks for each data-fetching section

## Capabilities

### New Capabilities

- `server-data-loading`: Pattern for fetching data in RSC pages/layouts and passing to client components via props, including Suspense boundaries and error handling
- `server-side-filtering`: URL searchParams-driven filtering at the server component level for transactions and dashboard, replacing client-side filter state management

### Modified Capabilities

- `dashboard-analytics`: Dashboard widgets will receive data from server components instead of fetching via client-side hooks
- `transaction-list-ui`: Transaction list will receive initial data and pagination from server components instead of client-side hook fetching
- `category-crud`: Category list will be server-fetched and passed as props instead of loaded via client-side hook

## Impact

- **Pages affected**: Dashboard, Transactions, Categories (all pages under `(app-layout)`)
- **Hooks to refactor/remove**: `useWidgetData`, `useTransactionManagement` (split into server fetch + client mutation), `useCategoryManagement` (split into server fetch + client mutation), `useDashboardFilters`
- **Server actions affected**: All `fetch-*` server actions will be converted to plain async functions (remove `'use server'` directive) callable from RSC
- **Components affected**: All `page.content.tsx` files will be split into server wrapper + client interactive portions
- **No breaking API changes**: Backend API remains unchanged
- **No dependency changes**: Uses existing Next.js/React capabilities
