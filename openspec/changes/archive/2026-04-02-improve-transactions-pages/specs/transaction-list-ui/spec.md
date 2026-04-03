## MODIFIED Requirements

### Requirement: Transaction list display

The system SHALL display transactions in a date-grouped list format. Each date group SHALL have a date section header followed by transaction rows showing category name, description, type badge, and formatted amount with currency. Each transaction row SHALL have an edit link that navigates to the edit page and a delete button that opens a confirmation dialog.

#### Scenario: Transactions exist with multiple dates

- **WHEN** the user navigates to the transactions page and the server wrapper fetches transaction data spanning multiple dates
- **THEN** the system SHALL display transactions grouped by date, with a date header above each group

#### Scenario: No transactions

- **WHEN** the server wrapper returns no transactions for the current filters
- **THEN** the system SHALL display an empty state message without any date headers

#### Scenario: Click edit on a transaction

- **WHEN** the user clicks the edit action on a transaction row
- **THEN** the system SHALL navigate to `/transactions/[id]/edit`

## MODIFIED Requirements

### Requirement: Transaction date range filter

The system SHALL allow filtering transactions by month using a month navigator component that sets dateFrom and dateTo URL search params. The default view SHALL show the current month's transactions.

#### Scenario: Default month view

- **WHEN** the user navigates to the transactions page without date params
- **THEN** the system SHALL display the current month's transactions and the month navigator SHALL show the current month

#### Scenario: Navigate months

- **WHEN** the user clicks the previous/next arrow on the month navigator
- **THEN** the URL params SHALL update to the selected month's date range and the server component SHALL re-fetch transactions for that month
