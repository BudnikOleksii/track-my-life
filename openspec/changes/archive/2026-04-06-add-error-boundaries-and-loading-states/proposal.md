## Why

The app currently has zero error boundaries and zero route-level loading states. Any unhandled server error renders a raw Next.js error page, and navigating between routes shows no loading feedback — both hurt perceived quality and make debugging harder. Adding these is a high-impact resilience improvement.

## What Changes

- Add `error.tsx` files at key route-group levels (`(app-layout)`, `(auth-layout)`, root `[locale]`) to catch and display errors gracefully with a retry option
- Add `loading.tsx` files for data-heavy routes (dashboard, transactions, categories, budgets, settings) to show skeleton placeholders during navigation
- Add `not-found.tsx` at the `[locale]` level for custom 404 pages
- Create a reusable `ErrorState` UI component in `packages/ui` for consistent error presentation across boundaries
- Create route-specific skeleton compositions in each route's loading file using the existing `Skeleton` atom from `packages/ui`

## Capabilities

### New Capabilities

- `error-boundary-ui`: Reusable error state UI component and route-level error.tsx files that catch and display errors with retry/navigation actions
- `route-loading-states`: Route-level loading.tsx files with skeleton compositions for each major app section

### Modified Capabilities

## Impact

- `packages/ui` — new `ErrorState` component added
- `apps/money-tracker/src/app/[locale]/` — new error.tsx, not-found.tsx at locale level
- `apps/money-tracker/src/app/[locale]/(app-layout)/` — new error.tsx, loading.tsx files for app routes
- `apps/money-tracker/src/app/[locale]/(auth-layout)/` — new error.tsx for auth routes
- No breaking changes, no API modifications, no dependency additions (uses existing Radix UI primitives and Skeleton component)
