## Context

The money-tracker app has a placeholder dashboard page (welcome card + logout) while the backend already exposes 5 analytics endpoints under `/api/transactions-analytics/`. The transaction CRUD, category management, and app shell layout are complete. All API DTOs are auto-generated in `packages/shared/src/api/generated/types.gen.ts`. The phase-4-dashboard.md doc in `apps/money-tracker/docs/` provides a detailed implementation reference.

## Goals / Non-Goals

**Goals:**

- Deliver a functional analytics dashboard with 6 widgets driven by backend analytics APIs
- Reuse established patterns (API service, server actions, hooks, SCSS modules) for consistency
- Provide responsive layout from mobile (1-col) to large desktop (3-col)
- Support shared filter controls (date range, type, currency) across all widgets

**Non-Goals:**

- Real-time / WebSocket data updates
- Custom date presets (last 7 days, last month, etc.) — plain date inputs only
- Budget tracking integration (separate future phase)
- Server-side rendering of chart data — charts render client-side only
- Exporting or printing dashboard data

## Decisions

### Chart library: recharts

**Choice**: Install `recharts` in `apps/money-tracker` only.
**Rationale**: Recharts is built on React and D3, provides responsive containers and declarative chart components (PieChart, BarChart) out of the box. Keeping it app-local avoids bloating `packages/ui` with app-specific visualization dependencies.
**Alternatives**: Chart.js (canvas-based, less React-idiomatic), Nivo (heavier bundle), custom SVG (too much effort for standard charts).

### Data fetching: client-side via server actions + useEffect

**Choice**: Each widget independently fetches data using a generic `useWidgetData` hook that calls server actions.
**Rationale**: Matches the existing `useTransactionManagement` pattern. Widgets re-fetch when filters change. Independent fetching means one slow endpoint doesn't block the others.
**Alternatives**: Server Components with Suspense (would require restructuring the filter state management away from client state), React Query/SWR (adds another dependency for a pattern already handled).

### Filter state: useState in a custom hook

**Choice**: `useDashboardFilters` hook manages filter state with `useState`.
**Rationale**: Matches the transactions page pattern. No URL state sync needed since the dashboard is a single-page view without shareable filter URLs.
**Alternatives**: `nuqs` for URL state (not installed, overkill for dashboard filters).

### Skeleton loading component: shared UI atom

**Choice**: Create `Skeleton` in `packages/ui/src/components/atoms/skeleton/`.
**Rationale**: Loading skeletons are universally needed across the app. Following the existing atom pattern (like Badge) keeps the UI library consistent and reusable.

### Widget architecture: WidgetCard wrapper

**Choice**: Each widget is wrapped in a `WidgetCard` component that handles loading/empty/error states uniformly.
**Rationale**: Avoids duplicating loading skeleton and empty state logic across 6 widgets. Single place to enforce consistent card styling.

### Analytics API service: separate service class

**Choice**: Create `TransactionsAnalyticsApiService` extending `ApiClient`, registered in `server-api.ts` with auth interceptor.
**Rationale**: Follows the established pattern where each service file exports its own instance. Keeps analytics endpoints decoupled from transaction CRUD endpoints.

## Risks / Trade-offs

- **Bundle size increase from recharts** → Acceptable for an app-specific dependency; recharts tree-shakes well and only the used chart types are bundled.
- **No caching / deduplication of API calls** → Each widget fetches independently, so changing filters triggers up to 6 parallel requests. Acceptable for a single-user app; can add SWR-style caching later if needed.
- **Daily spending endpoint uses year/month params instead of dateFrom/dateTo** → Widget must extract year/month from the filter's date range, which may not perfectly align with the selected range. Mitigated by deriving from `dateTo` and documenting the behavior.
- **No error toasts for failed widget fetches** → Widgets show empty state on failure (server actions return `null`). Acceptable for v1; error handling can be improved incrementally.
