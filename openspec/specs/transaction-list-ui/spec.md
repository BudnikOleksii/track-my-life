## ADDED Requirements

### Requirement: Transaction list display

The system SHALL display transactions in a date-grouped list format. Each date group SHALL have a date section header followed by transaction rows showing amount with currency, type badge, category name (formatted as "Parent / Subcategory" when a parent category exists, otherwise just the category name), and description. Each transaction row SHALL have a copy button that navigates to the create page with prefilled data, an edit link that navigates to the edit page, and a delete button that opens a confirmation dialog.

#### Scenario: Transactions exist with multiple dates

- **WHEN** the user navigates to the transactions page and the server wrapper fetches transaction data spanning multiple dates
- **THEN** the system SHALL display transactions grouped by date, with a date header above each group

#### Scenario: No transactions

- **WHEN** the server wrapper returns no transactions for the current filters
- **THEN** the system SHALL display an empty state message without any date headers

#### Scenario: Category info displayed in row

- **WHEN** a transaction row is rendered
- **THEN** the row SHALL display the category name in the secondary info area
- **AND** if the transaction has a parent category, the display SHALL be "Parent / Subcategory"
- **AND** if the transaction has no parent category, the display SHALL be just the category name

#### Scenario: Click edit on a transaction

- **WHEN** the user clicks the edit action on a transaction row
- **THEN** the system SHALL navigate to `/transactions/[id]/edit`

#### Scenario: Click copy on a transaction

- **WHEN** the user clicks the copy action on a transaction row
- **THEN** the system SHALL navigate to `/transactions/create?copyFrom=[id]`

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

The system SHALL allow filtering transactions by month using a month navigator component that sets dateFrom and dateTo URL search params. The default view SHALL show the current month's transactions.

#### Scenario: Default month view

- **WHEN** the user navigates to the transactions page without date params
- **THEN** the system SHALL display the current month's transactions and the month navigator SHALL show the current month

#### Scenario: Navigate months

- **WHEN** the user clicks the previous/next arrow on the month navigator
- **THEN** the URL params SHALL update to the selected month's date range and the server component SHALL re-fetch transactions for that month

### Requirement: Create transaction button

The page SHALL display a "Create Transaction" link styled as a button in the page header that navigates to the create page.

#### Scenario: Click create button

- **WHEN** the user clicks the "Create Transaction" button
- **THEN** the system SHALL navigate to `/transactions/create`
