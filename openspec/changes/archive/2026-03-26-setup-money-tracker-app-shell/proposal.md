## Why

The money-tracker app currently has authentication flows and a bare dashboard page, but no actual app shell to support the core money tracking experience. Users who sign in land on an empty dashboard with no navigation, no layout structure, and no way to move between features. Before building individual features (transactions, categories, budgets), the app needs a foundational shell with navigation, layout, and routing scaffolding.

## What Changes

- Add a persistent app shell layout within the `(app)` route group with sidebar navigation and a top header bar
- Create navigation sidebar with links to: Dashboard, Transactions, Categories, Budgets, Settings
- Add a responsive top header bar with user avatar/menu and page title
- Set up new route stubs for Transactions, Categories, Budgets, and Settings pages
- Add mobile-responsive navigation (collapsible sidebar / bottom nav)
- Add i18n message files for navigation labels and page titles

## Capabilities

### New Capabilities

- `app-shell-layout`: Persistent layout with sidebar navigation, top header bar, and main content area for the authenticated app experience
- `app-navigation`: Sidebar and mobile navigation with route links, active state indicators, and collapsible behavior
- `route-scaffolding`: Stub pages for Transactions, Categories, Budgets, and Settings with proper route group structure

### Modified Capabilities

None.

## Impact

- `apps/money-tracker/src/app/[locale]/(app)/` - New layout and route structure
- `packages/ui/` - Potential new atoms/molecules for navigation components
- `apps/money-tracker/messages/` - New i18n message files for navigation and page titles
- `apps/money-tracker/src/constants/paths.ts` - New path constants for added routes
