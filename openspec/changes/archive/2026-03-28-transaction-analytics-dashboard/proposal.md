## Why

The dashboard page is currently a placeholder (welcome card + logout button) despite the backend already providing 5 comprehensive analytics endpoints at `/api/transactions-analytics/`. Users have no way to visualize their financial data — income vs expenses, spending trends, category breakdowns, or daily spending patterns. Building the analytics dashboard transforms the app from a basic transaction ledger into a useful personal finance tool.

## What Changes

- Replace the placeholder dashboard page with a full analytics overview containing 6 widgets: summary stats, category breakdown pie chart, income vs expense trends bar chart, top categories ranked list, daily spending bar chart, and recent transactions list
- Add shared filter controls (date range, transaction type, currency) that drive all widgets
- Install `recharts` as a chart library dependency in the money-tracker app
- Create a `Skeleton` UI atom in `packages/ui` for loading states across all widgets
- Create `TransactionsAnalyticsApiService` in `packages/shared` to consume the 5 analytics endpoints
- Add 5 server actions for dashboard data fetching following existing patterns
- Add responsive CSS Grid layout (1-col mobile, 2-col tablet, 3-col desktop)
- Add i18n messages for dashboard labels in both en and uk locales

## Capabilities

### New Capabilities

- `dashboard-analytics`: Dashboard page with financial summary widgets, chart visualizations (category breakdown, trends, daily spending), top categories list, recent transactions, and shared filter controls
- `skeleton-ui`: Reusable Skeleton loading-state atom component for `packages/ui`
- `analytics-api-service`: API service layer for the 5 transactions-analytics endpoints with server actions

### Modified Capabilities

_None — existing specs are unaffected._

## Impact

- **New dependency**: `recharts` added to `apps/money-tracker`
- **New shared component**: Skeleton atom in `packages/ui` (needs Storybook story)
- **New shared service**: `TransactionsAnalyticsApiService` in `packages/shared`, registered in `server-api.ts`
- **Modified pages**: Dashboard `page.content.tsx` and `page.module.scss` fully rewritten
- **i18n**: Dashboard message files rewritten with ~20 new keys per locale
- **No breaking changes** to existing transaction or category features
