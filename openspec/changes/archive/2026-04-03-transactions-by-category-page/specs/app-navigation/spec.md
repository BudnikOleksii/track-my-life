## MODIFIED Requirements

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
