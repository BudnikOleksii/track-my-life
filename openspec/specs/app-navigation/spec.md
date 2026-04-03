## ADDED Requirements

### Requirement: Sidebar navigation links

The sidebar SHALL display navigation links to: Dashboard, Transactions, Transactions by Category, Recurring Transactions, Categories, Budgets, and Settings. Each link SHALL display an icon and a label (when sidebar is expanded). The Transactions by Category link SHALL use the LayoutList icon and appear between Transactions and Recurring Transactions.

#### Scenario: All navigation links visible

- **WHEN** user views the sidebar in expanded state
- **THEN** all seven navigation links are visible with their respective icons and localized labels, in order: Dashboard, Transactions, Transactions by Category, Recurring Transactions, Categories, Budgets, Settings

#### Scenario: Collapsed sidebar shows icons only

- **WHEN** sidebar is in collapsed state on desktop
- **THEN** navigation links display only their icons without labels

#### Scenario: Active state on transactions by category page

- **WHEN** user is on `/transactions/by-category` or a sub-route like `/transactions/by-category/{id}`
- **THEN** the Transactions by Category nav item SHALL display an active visual state

#### Scenario: Header title for transactions by category

- **WHEN** user navigates to `/transactions/by-category`
- **THEN** the app header SHALL display "Transactions by Category" as the page title

#### Scenario: Active state on recurring transactions page

- **WHEN** user is on `/recurring-transactions` or a sub-route like `/recurring-transactions/create`
- **THEN** the Recurring Transactions nav item SHALL display an active visual state

#### Scenario: Header title for recurring transactions

- **WHEN** user navigates to `/recurring-transactions`
- **THEN** the app header SHALL display "Recurring Transactions" as the page title

### Requirement: Active route indicator

The currently active navigation link SHALL be visually distinguished from inactive links.

#### Scenario: Active link highlighted on current route

- **WHEN** user is on `/transactions`
- **THEN** the Transactions nav item displays an active visual state (distinct background/color) and all other nav items display their default state

#### Scenario: Active state updates on navigation

- **WHEN** user clicks a different navigation link
- **THEN** the active indicator moves to the clicked link and the previous link returns to its default state

### Requirement: Sidebar collapse toggle

The sidebar SHALL provide a toggle control to collapse/expand the sidebar on desktop viewports.

#### Scenario: User collapses sidebar

- **WHEN** user clicks the collapse toggle on desktop
- **THEN** the sidebar transitions from expanded (240px with labels) to collapsed (64px icons-only) state

#### Scenario: User expands sidebar

- **WHEN** user clicks the expand toggle on a collapsed sidebar
- **THEN** the sidebar transitions from collapsed to expanded state with labels visible

### Requirement: Mobile navigation

On mobile viewports (<768px), the sidebar SHALL be hidden by default and togglable via a hamburger button in the header.

#### Scenario: Sidebar hidden on mobile

- **WHEN** viewport width is <768px
- **THEN** the sidebar is not visible and a hamburger menu button appears in the header

#### Scenario: Mobile sidebar opens as overlay

- **WHEN** user taps the hamburger button on mobile
- **THEN** the sidebar opens as an overlay on top of the content with a backdrop

#### Scenario: Mobile sidebar closes on navigation

- **WHEN** user taps a navigation link in the mobile sidebar
- **THEN** the sidebar closes and the user navigates to the selected page

### Requirement: User menu in header

The user menu dropdown SHALL provide a sign-out action.

#### Scenario: User opens menu

- **WHEN** user clicks the avatar in the header
- **THEN** a dropdown menu appears with at least a "Sign out" option

#### Scenario: User signs out

- **WHEN** user clicks "Sign out" in the dropdown
- **THEN** the user is logged out and redirected to the sign-in page
