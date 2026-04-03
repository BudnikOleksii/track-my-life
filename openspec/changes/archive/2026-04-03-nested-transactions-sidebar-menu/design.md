## Context

The sidebar in `AppSidebar.tsx` renders a flat list of `NAVIGATION_ITEM_LIST` items. Each item has `href`, `icon`, and `labelKey`. Active state is determined by `checkIsActive(href)` which returns true when `pathname === href || pathname.startsWith(`${href}/`)`. This causes `/transactions` to also appear active when the user is on `/transactions/by-category` since the latter starts with `/transactions/`.

Currently, recurring transactions live at `/recurring-transactions` — a top-level route separate from other transaction views. The sidebar has 7 flat top-level items with no grouping.

## Goals / Non-Goals

**Goals:**

- Group transaction-related navigation under a single collapsible parent item
- Move `/recurring-transactions` to `/transactions/recurring` so all transaction views share the `/transactions` prefix
- Fix double-active state by using longest-match active detection
- Maintain collapsed sidebar (icons-only) behavior — hide children when collapsed
- Auto-expand submenu when any child route is active

**Non-Goals:**

- Redirect from old `/recurring-transactions` URLs (no redirect middleware)
- Generic multi-level nesting (only one level of children needed)
- Persisting submenu open/closed state to localStorage
- Animating submenu expand/collapse transitions (CSS height animation is optional polish)

## Decisions

### 1. Navigation data structure: add optional `children` array

Extend the `NavigationItem` interface with an optional `children?: NavigationItem[]` field. Parent items with children will not be links themselves — they act as group toggles. The parent's `href` field will be used only for active-state prefix detection, not for navigation.

**Alternative considered**: Separate `NavigationGroup` and `NavigationLink` types via discriminated union. Rejected because a single interface with optional `children` is simpler and the rendering logic can branch on `item.children` presence.

### 2. Active state: longest-match from flattened list

Flatten all navigation items (parents without children + all children) into a single list, filter by prefix match, and pick the longest `href`. This ensures `/transactions/by-category` wins over `/transactions` when the user is on a by-category page.

**Alternative considered**: The issue suggested using `sort` on each render. Instead, a single `reduce` finding the max-length match avoids an allocation. Both are negligible performance-wise at 7-10 items, but reduce is cleaner.

### 3. Submenu rendering: inline in AppSidebar with local state

Use a `useState` set (`openSubmenuList`) to track which parent items are expanded. Auto-expand when a child is active. Render children as indented links below the parent button.

**Alternative considered**: Using the Radix Accordion component from `packages/ui`. Rejected because the sidebar nav has custom styling (icons, collapse behavior, mobile close on click) that would fight Accordion's built-in behavior. Plain state + conditional rendering is simpler.

### 4. Route move: rename folder, update PATHS constant

Physically move `recurring-transactions/` to `transactions/recurring/` in the filesystem. Update `PATHS.recurringTransactions` from `/recurring-transactions` to `/transactions/recurring`. Update all derived path helpers.

**Alternative considered**: Using Next.js `redirects` in `next.config.ts`. Skipped as a non-goal — this is an internal app with no public URLs to preserve.

### 5. Collapsed sidebar behavior

When `isCollapsed` is true, render only the parent icon for items with children — no expand/collapse, no children. This matches the current behavior where collapsed sidebar shows icons only.

## Risks / Trade-offs

- **[Breaking route change]** `/recurring-transactions` URLs stop working → Mitigation: internal app only, no external links expected. Update all internal references.
- **[Submenu discoverability]** Users may not notice the expand arrow → Mitigation: auto-expand when a child is active; the chevron icon is a standard affordance.
- **[Translation churn]** New label keys needed (e.g., `transactionsByDate`) → Mitigation: small change, only EN and UK files affected.
