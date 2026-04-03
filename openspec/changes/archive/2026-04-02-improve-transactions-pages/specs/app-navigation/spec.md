## MODIFIED Requirements

### Requirement: Sidebar navigation links

The sidebar SHALL display navigation links to: Dashboard, Transactions, Recurring Transactions, Categories, Budgets, and Settings. Each link SHALL display an icon and a label (when sidebar is expanded). The Recurring Transactions link SHALL use the Repeat icon and appear between Transactions and Categories.

#### Scenario: All navigation links visible

- **WHEN** user views the sidebar in expanded state
- **THEN** all six navigation links are visible with their respective icons and localized labels, in order: Dashboard, Transactions, Recurring Transactions, Categories, Budgets, Settings

#### Scenario: Collapsed sidebar shows icons only

- **WHEN** sidebar is in collapsed state on desktop
- **THEN** navigation links display only their icons without labels

#### Scenario: Active state on recurring transactions page

- **WHEN** user is on `/recurring-transactions` or a sub-route like `/recurring-transactions/create`
- **THEN** the Recurring Transactions nav item SHALL display an active visual state

#### Scenario: Header title for recurring transactions

- **WHEN** user navigates to `/recurring-transactions`
- **THEN** the app header SHALL display "Recurring Transactions" as the page title
