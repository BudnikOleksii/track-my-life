## MODIFIED Requirements

### Requirement: Recurring transactions list content

The system SHALL provide a client content component (`page.content.tsx`) that displays recurring transactions as cards with filtering and pagination controls.

#### Scenario: Display recurring transaction cards

- **WHEN** the list has recurring transactions
- **THEN** each card SHALL display: amount with currency, status badge, frequency label, next occurrence date, category name (formatted as "Parent / Subcategory" when a parent category exists, otherwise just the category name), and description

#### Scenario: Empty list

- **WHEN** the list has no recurring transactions
- **THEN** the system SHALL display an empty state with a prompt to create the first recurring transaction

#### Scenario: Category info displayed in row

- **WHEN** a recurring transaction row is rendered
- **THEN** the row SHALL display the category name in the secondary info area
- **AND** if the transaction has a parent category, the display SHALL be "Parent / Subcategory"
- **AND** if the transaction has no parent category, the display SHALL be just the category name
