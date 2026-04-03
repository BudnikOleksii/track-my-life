## Why

When visiting a sub-route such as `/transactions/by-category`, the sidebar marks both the "Transactions" and "Transactions by Category" items as active because `checkIsActive` uses a prefix match (`pathname.startsWith`). Additionally, `/recurring-transactions` is a separate top-level route despite being conceptually part of transactions, making the sidebar flat and harder to scan as more transaction views are added. Grouping transaction-related routes under a collapsible submenu fixes the double-active bug and improves navigation hierarchy (GitHub issue #29).

## What Changes

- **BREAKING**: Move `/recurring-transactions` route to `/transactions/recurring` so all transaction views live under `/transactions/*`
- Refactor `NAVIGATION_ITEM_LIST` to support nested children on navigation items
- Add collapsible submenu rendering in `AppSidebar` — parent "Transactions" item expands to show three children: By Date, By Category, Recurring
- Replace prefix-based `checkIsActive` with a longest-match strategy so only one nav item is active at a time
- Auto-expand the Transactions submenu when any child route is active
- Hide submenu children when sidebar is collapsed (icons-only mode)
- Update EN/UK translation files with new navigation labels

## Capabilities

### New Capabilities

- `collapsible-sidebar-submenu`: Sidebar navigation items can have nested children rendered as a collapsible submenu with expand/collapse toggle, auto-expand on active child, and proper collapsed-sidebar behavior

### Modified Capabilities

- `app-navigation`: Navigation item list changes from flat to nested structure for transactions; active-state logic changes to longest-match; recurring transactions route moves from `/recurring-transactions` to `/transactions/recurring`

## Impact

- **Routes**: `/recurring-transactions`, `/recurring-transactions/create`, `/recurring-transactions/:id`, `/recurring-transactions/:id/edit` all move under `/transactions/recurring/*`
- **Code**: `AppSidebar.tsx`, `AppSidebar.module.scss`, `paths.ts`, navigation translation files (EN/UK)
- **File system**: `recurring-transactions/` folder moves to `transactions/recurring/`
- **Dependencies**: No new dependencies; uses existing Radix/Lucide icons
- **Breaking**: Any bookmarks or external links to `/recurring-transactions` will break
