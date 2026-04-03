## MODIFIED Requirements

### Requirement: Sidebar navigation links

The sidebar SHALL display navigation links to: Dashboard, Transactions (collapsible group), Categories, Budgets, and Settings. The Transactions group SHALL contain three child links: By Date, By Category, and Recurring. Each link SHALL display an icon and a label (when sidebar is expanded). The Transactions parent item SHALL use the ArrowLeftRight icon. Child items: By Date SHALL use the CalendarDays icon, By Category SHALL use the LayoutList icon, Recurring SHALL use the Repeat icon.

#### Scenario: All navigation links visible

- **WHEN** user views the sidebar in expanded state with the Transactions submenu expanded
- **THEN** all navigation items are visible with their respective icons and localized labels, in order: Dashboard, Transactions (parent), By Date (child), By Category (child), Recurring (child), Categories, Budgets, Settings

#### Scenario: Collapsed sidebar shows icons only

- **WHEN** sidebar is in collapsed state on desktop
- **THEN** navigation items display only their icons without labels, and the Transactions parent shows only its icon without chevron or children

#### Scenario: Active state on transactions by date page

- **WHEN** user is on `/transactions` or a sub-route like `/transactions/create` or `/transactions/{id}/edit`
- **THEN** the By Date child nav item SHALL display an active visual state and the Transactions submenu SHALL be expanded

#### Scenario: Active state on transactions by category page

- **WHEN** user is on `/transactions/by-category` or a sub-route like `/transactions/by-category/{id}`
- **THEN** the By Category child nav item SHALL display an active visual state and the Transactions submenu SHALL be expanded

#### Scenario: Active state on recurring transactions page

- **WHEN** user is on `/transactions/recurring` or a sub-route like `/transactions/recurring/create`
- **THEN** the Recurring child nav item SHALL display an active visual state and the Transactions submenu SHALL be expanded

#### Scenario: Header title for transactions by category

- **WHEN** user navigates to `/transactions/by-category`
- **THEN** the app header SHALL display "Transactions by Category" as the page title

#### Scenario: Header title for recurring transactions

- **WHEN** user navigates to `/transactions/recurring`
- **THEN** the app header SHALL display "Recurring Transactions" as the page title

### Requirement: Active route indicator

The currently active navigation link SHALL be visually distinguished from inactive links. When multiple href prefixes match the current pathname, only the longest-matching href SHALL be marked active.

#### Scenario: Active link highlighted on current route

- **WHEN** user is on `/transactions`
- **THEN** the By Date nav item displays an active visual state and all other nav items display their default state

#### Scenario: Active state updates on navigation

- **WHEN** user clicks a different navigation link
- **THEN** the active indicator moves to the clicked link and the previous link returns to its default state

#### Scenario: No double-active on nested routes

- **WHEN** user is on `/transactions/by-category`
- **THEN** only the By Category child item is active; the By Date child item is NOT active despite `/transactions` being a prefix of the current path

### Requirement: Recurring transactions route path

Recurring transactions SHALL be accessible at `/transactions/recurring` instead of `/recurring-transactions`. All sub-routes (create, detail, edit) SHALL follow the same base path.

#### Scenario: Recurring transactions list page

- **WHEN** user navigates to `/transactions/recurring`
- **THEN** the recurring transactions list page is displayed

#### Scenario: Create recurring transaction page

- **WHEN** user navigates to `/transactions/recurring/create`
- **THEN** the create recurring transaction form page is displayed

#### Scenario: Recurring transaction detail page

- **WHEN** user navigates to `/transactions/recurring/{id}`
- **THEN** the recurring transaction detail page is displayed

#### Scenario: Edit recurring transaction page

- **WHEN** user navigates to `/transactions/recurring/{id}/edit`
- **THEN** the edit recurring transaction form page is displayed
