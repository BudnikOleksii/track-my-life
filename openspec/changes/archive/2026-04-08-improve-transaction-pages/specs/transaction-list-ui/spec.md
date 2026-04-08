## MODIFIED Requirements

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
