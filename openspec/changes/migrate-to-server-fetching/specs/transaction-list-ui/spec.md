## MODIFIED Requirements

### Requirement: Transaction list display

The system SHALL display transactions in a list/table format showing date, category name, description, type badge (income/expense), and formatted amount with currency. Transaction data SHALL be fetched by an async server wrapper component and passed as props to the client list component.

#### Scenario: Transactions exist

- **WHEN** the user navigates to the transactions page and the server wrapper fetches transaction data
- **THEN** the system SHALL display a list of transactions with date, category, description, type badge, and amount

#### Scenario: No transactions

- **WHEN** the server wrapper returns no transactions for the current filters
- **THEN** the system SHALL display an empty state message

### Requirement: Transaction list pagination

The system SHALL paginate the transaction list using URL search params (page, pageSize). The server component SHALL read pagination params and pass them to the fetch function.

#### Scenario: Navigate between pages

- **WHEN** the user clicks a pagination control (next/previous/page number)
- **THEN** the URL search params SHALL update and the server component SHALL re-render with the corresponding page of transactions

#### Scenario: Default pagination

- **WHEN** the user first loads the transactions page with no pagination params
- **THEN** the server component SHALL apply default values (page = 1, default pageSize) and the list SHALL display the first page

### Requirement: Transaction type filter

The system SHALL allow filtering transactions by type (All, Income, Expense) using URL search params processed by the server component.

#### Scenario: Filter by type

- **WHEN** the user selects a type filter (e.g., "Income")
- **THEN** the URL params SHALL update, the server component SHALL re-fetch with the new type, and pagination SHALL reset to page 1

#### Scenario: Clear filter

- **WHEN** the user selects "All" filter
- **THEN** the server component SHALL fetch all transactions regardless of type

### Requirement: Transaction date range filter

The system SHALL allow filtering transactions by date range using URL search params processed by the server component.

#### Scenario: Set date range

- **WHEN** the user sets a start date and/or end date
- **THEN** the URL params SHALL update and the server component SHALL re-fetch transactions within that range
