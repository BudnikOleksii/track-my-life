## ADDED Requirements

### Requirement: Transaction list display

The system SHALL display transactions in a list/table format showing date, category name, description, type badge (income/expense), and formatted amount with currency.

#### Scenario: Transactions exist

- **WHEN** the user navigates to the transactions page and transactions exist
- **THEN** the system SHALL display a list of transactions with date, category, description, type badge, and amount

#### Scenario: No transactions

- **WHEN** the user navigates to the transactions page and no transactions exist
- **THEN** the system SHALL display an empty state message

### Requirement: Transaction list pagination

The system SHALL paginate the transaction list using URL search params (page, pageSize) managed via nuqs.

#### Scenario: Navigate between pages

- **WHEN** the user clicks a pagination control (next/previous/page number)
- **THEN** the URL search params SHALL update and the list SHALL display the corresponding page of transactions

#### Scenario: Default pagination

- **WHEN** the user first loads the transactions page with no pagination params
- **THEN** the system SHALL display the first page with a default page size

### Requirement: Transaction type filter

The system SHALL allow filtering transactions by type (All, Income, Expense) using URL search params.

#### Scenario: Filter by type

- **WHEN** the user selects a type filter (e.g., "Income")
- **THEN** the URL params SHALL update, the list SHALL show only transactions of that type, and pagination SHALL reset to page 1

#### Scenario: Clear filter

- **WHEN** the user selects "All" filter
- **THEN** the list SHALL show all transactions regardless of type

### Requirement: Transaction date range filter

The system SHALL allow filtering transactions by date range using URL search params.

#### Scenario: Set date range

- **WHEN** the user sets a start date and/or end date
- **THEN** the URL params SHALL update and the list SHALL show only transactions within that range

### Requirement: Create transaction button

The page SHALL display a "Create Transaction" button in the page header.

#### Scenario: Click create button

- **WHEN** the user clicks the "Create Transaction" button
- **THEN** the transaction form dialog SHALL open in create mode
