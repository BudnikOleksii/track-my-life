## ADDED Requirements

### Requirement: Sort by filter

The system SHALL display a sort-by dropdown with options: Date, Amount, Created At. The selected value SHALL be stored in the `sortBy` URL search param.

#### Scenario: Default sort

- **WHEN** the user loads the transactions page without a sortBy param
- **THEN** the sort-by dropdown SHALL show "Date" as the default

#### Scenario: Change sort field

- **WHEN** the user selects "Amount" from the sort-by dropdown
- **THEN** the URL sortBy param SHALL update to "amount", the server SHALL re-fetch with the new sort, and pagination SHALL reset to page 1

### Requirement: Sort order toggle

The system SHALL display a sort order toggle button that switches between ascending and descending. The value SHALL be stored in the `sortOrder` URL search param.

#### Scenario: Default sort order

- **WHEN** the user loads the transactions page without a sortOrder param
- **THEN** the sort order SHALL default to descending (newest/largest first)

#### Scenario: Toggle sort order

- **WHEN** the user clicks the sort order toggle
- **THEN** the sortOrder param SHALL flip between "asc" and "desc", the server SHALL re-fetch, and pagination SHALL reset to page 1

### Requirement: Category filter

The system SHALL display a category dropdown populated with the user's categories (fetched server-side). The selected value SHALL be stored in the `categoryId` URL search param. An "All categories" option SHALL clear the filter.

#### Scenario: Filter by category

- **WHEN** the user selects a category from the dropdown
- **THEN** the URL categoryId param SHALL update, the server SHALL re-fetch with the category filter, and pagination SHALL reset to page 1

#### Scenario: Clear category filter

- **WHEN** the user selects "All categories"
- **THEN** the categoryId param SHALL be removed from the URL and all categories SHALL be shown

### Requirement: Currency filter

The system SHALL display a currency dropdown with available currency codes. The selected value SHALL be stored in the `currencyCode` URL search param. An "All currencies" option SHALL clear the filter.

#### Scenario: Filter by currency

- **WHEN** the user selects a currency (e.g., "USD")
- **THEN** the URL currencyCode param SHALL update and the server SHALL re-fetch with the currency filter

#### Scenario: Clear currency filter

- **WHEN** the user selects "All currencies"
- **THEN** the currencyCode param SHALL be removed from the URL

### Requirement: Filter layout

Sort controls SHALL appear in the primary filter row alongside the type filter and month navigator. Category and currency filters SHALL appear in a secondary filter row below the primary row.

#### Scenario: Both filter rows visible

- **WHEN** the user views the transactions page
- **THEN** the primary row SHALL contain type filter, month navigator, and sort controls, and the secondary row SHALL contain category and currency filters
