## ADDED Requirements

### Requirement: Copy transaction button in list

The system SHALL display a copy icon button in the actions area of each transaction row in the main transaction list.

#### Scenario: Copy button visible

- **WHEN** a transaction row is displayed in the transaction list
- **THEN** a copy button with a Copy icon SHALL appear alongside the edit and delete buttons

#### Scenario: Copy button navigates to create page

- **WHEN** the user clicks the copy button on a transaction row
- **THEN** the system SHALL navigate to `/transactions/create?copyFrom={transactionId}`

### Requirement: Create page accepts copyFrom param

The create transaction page SHALL accept a `copyFrom` search param containing a transaction ID. When present, the server component SHALL fetch the source transaction and pass it to the form component.

#### Scenario: Create page with copyFrom param

- **WHEN** a user navigates to `/transactions/create?copyFrom={id}`
- **THEN** the server component SHALL fetch the transaction by ID and pass it as `sourceTransaction` to the form

#### Scenario: Create page with invalid copyFrom

- **WHEN** a user navigates to `/transactions/create?copyFrom={invalidId}`
- **THEN** the server component SHALL render the form without source data (standard create mode)

### Requirement: Form prefill from copied transaction

When the form receives a `sourceTransaction` prop (copy mode), it SHALL prefill form fields from the source transaction but use today's date and current time.

#### Scenario: Copy mode prefills fields

- **WHEN** the form renders with `sourceTransaction` and no `transaction` (not editing)
- **THEN** the type field SHALL be set to the source transaction's type
- **AND** the categoryId field SHALL be set to the source transaction's categoryId
- **AND** the amount field SHALL be set to the source transaction's amount
- **AND** the description field SHALL be set to the source transaction's description
- **AND** the date field SHALL be set to today's date
- **AND** the time field SHALL be set to the current time

#### Scenario: Copy mode shows create title

- **WHEN** the form is in copy mode
- **THEN** the page title SHALL show "Create Transaction" (not "Edit Transaction")
- **AND** the submit button SHALL show "Create" (not "Save")
