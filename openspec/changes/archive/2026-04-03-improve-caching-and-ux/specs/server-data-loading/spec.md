## MODIFIED Requirements

### Requirement: Suspense boundaries wrap each server data-fetching component

The system SHALL wrap each async server wrapper component in a `<Suspense>` boundary with a skeleton fallback component matching the widget's loading UI. Static page UI (titles, back links, filter bars, action buttons) SHALL render outside and above the Suspense boundary so they appear immediately without waiting for data.

#### Scenario: Data is loading

- **WHEN** the async server wrapper has not yet resolved
- **THEN** the Suspense boundary SHALL render the skeleton fallback component while the page title, filter bar, and action buttons are already visible

#### Scenario: Data has loaded

- **WHEN** the async server wrapper resolves with data
- **THEN** the Suspense boundary SHALL replace the skeleton with the rendered client component containing data

#### Scenario: Parallel streaming of sibling widgets

- **WHEN** multiple Suspense-wrapped server wrappers are siblings in the page tree
- **THEN** each SHALL resolve and stream independently, rendering as soon as its own data is available

#### Scenario: Transactions page renders title and filters immediately

- **WHEN** the transactions page loads
- **THEN** the page title and filter bar SHALL render immediately, with only the `TransactionListServer` wrapped in a Suspense boundary

#### Scenario: Categories page renders title and action button immediately

- **WHEN** the categories page loads
- **THEN** the page title and "Create Category" action button SHALL render immediately, with only the `CategoryListServer` wrapped in a Suspense boundary

#### Scenario: Settings page renders title immediately

- **WHEN** the settings page loads
- **THEN** the page title SHALL render immediately, with only the `SettingsPageServer` wrapped in a Suspense boundary

#### Scenario: Recurring transactions page renders title and filters immediately

- **WHEN** the recurring transactions page loads
- **THEN** the page title and filter bar SHALL render immediately, with only the recurring transaction list server component wrapped in a Suspense boundary

#### Scenario: Transactions by category pages render title immediately

- **WHEN** the transactions by category list or detail page loads
- **THEN** the page title and back navigation SHALL render immediately, with only the data list server component wrapped in a Suspense boundary

#### Scenario: Budgets page renders title immediately

- **WHEN** the budgets page loads
- **THEN** the page title SHALL render immediately, with only the budget data server component wrapped in a Suspense boundary
