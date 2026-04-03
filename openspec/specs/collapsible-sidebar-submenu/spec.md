### Requirement: Collapsible submenu for parent navigation items

Navigation items with `children` SHALL render as a collapsible group: a parent button with a chevron indicator and an expandable list of child navigation links below it. The parent button SHALL NOT navigate — it only toggles the submenu open/closed.

#### Scenario: Parent item toggles submenu

- **WHEN** user clicks a parent navigation item that has children
- **THEN** the submenu expands to show all child links if it was collapsed, or collapses to hide them if it was expanded

#### Scenario: Chevron indicator reflects submenu state

- **WHEN** a parent navigation item is rendered
- **THEN** a chevron icon SHALL point down when the submenu is expanded and right when collapsed

### Requirement: Auto-expand submenu on active child

When the current route matches a child item, the parent submenu SHALL be automatically expanded so the active child is visible.

#### Scenario: Navigate to a child route

- **WHEN** user navigates to a route that matches a child navigation item (e.g., `/transactions/by-category`)
- **THEN** the parent submenu SHALL be expanded and the matching child item SHALL display an active visual state

#### Scenario: Direct URL visit to child route

- **WHEN** user loads the app directly on a child route URL
- **THEN** the parent submenu SHALL be expanded on initial render with the active child visible

### Requirement: Collapsed sidebar hides submenu children

When the sidebar is in collapsed (icons-only) mode, parent items with children SHALL display only their icon without the chevron or child items.

#### Scenario: Sidebar collapses while submenu is open

- **WHEN** the sidebar transitions to collapsed state while a submenu is expanded
- **THEN** the submenu children and chevron SHALL be hidden, showing only the parent icon

#### Scenario: Sidebar expands with active child

- **WHEN** the sidebar transitions from collapsed to expanded state and the current route matches a child item
- **THEN** the parent submenu SHALL auto-expand to show the active child

### Requirement: Child items indented under parent

Child navigation links SHALL be visually indented relative to top-level items to communicate hierarchy.

#### Scenario: Submenu children rendered with indent

- **WHEN** a submenu is expanded in the sidebar
- **THEN** each child link SHALL be rendered with a left indent greater than top-level navigation items

### Requirement: Mobile sidebar closes on child click

When a child navigation link is clicked in the mobile sidebar overlay, the sidebar SHALL close (same behavior as top-level items).

#### Scenario: Click child link on mobile

- **WHEN** user taps a child navigation link in the mobile sidebar
- **THEN** the sidebar overlay closes and the user navigates to the selected page
