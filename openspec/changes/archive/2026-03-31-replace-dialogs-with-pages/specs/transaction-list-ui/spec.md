## MODIFIED Requirements

### Requirement: Create transaction button

The page SHALL display a "Create Transaction" link styled as a button in the page header that navigates to the create page.

#### Scenario: Click create button

- **WHEN** the user clicks the "Create Transaction" button
- **THEN** the system SHALL navigate to `/transactions/create`

### Requirement: Transaction list display

The system SHALL display transactions in a list format showing date, category name, description, type badge, and formatted amount with currency. Each transaction row SHALL have an edit link that navigates to the edit page and a delete button that opens a confirmation dialog.

#### Scenario: Click edit on a transaction

- **WHEN** the user clicks the edit action on a transaction row
- **THEN** the system SHALL navigate to `/transactions/[id]/edit`

#### Scenario: Transactions exist

- **WHEN** the user navigates to the transactions page and the server wrapper fetches transaction data
- **THEN** the system SHALL display a list of transactions with date, category, description, type badge, and amount

#### Scenario: No transactions

- **WHEN** the server wrapper returns no transactions for the current filters
- **THEN** the system SHALL display an empty state message
