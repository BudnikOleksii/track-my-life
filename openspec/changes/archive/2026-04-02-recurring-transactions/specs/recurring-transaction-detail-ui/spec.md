## ADDED Requirements

### Requirement: Recurring transaction detail page

The system SHALL provide a server page at `/recurring-transactions/[id]` that fetches the recurring transaction by ID and renders a detail view.

#### Scenario: Page loads with valid ID

- **WHEN** user navigates to `/recurring-transactions/{id}`
- **THEN** the page SHALL fetch the recurring transaction and display all fields: type, category, amount, currency, description, frequency, interval, start date, end date, next occurrence, status, created/updated timestamps

#### Scenario: Recurring transaction not found

- **WHEN** user navigates to `/recurring-transactions/{id}` with an invalid ID
- **THEN** the page SHALL display a not-found state

### Requirement: Status badge display

The system SHALL display a status badge showing the current status (ACTIVE, PAUSED, CANCELLED) with appropriate visual styling.

#### Scenario: Active status badge

- **WHEN** the recurring transaction has status `ACTIVE`
- **THEN** the badge SHALL display "Active" with a success/green visual style

#### Scenario: Paused status badge

- **WHEN** the recurring transaction has status `PAUSED`
- **THEN** the badge SHALL display "Paused" with a warning/yellow visual style

### Requirement: Pause/Resume action

The system SHALL provide a toggle button to pause or resume the recurring transaction from the detail page.

#### Scenario: Pause an active recurring transaction

- **WHEN** user clicks "Pause" on an active recurring transaction
- **THEN** the system SHALL call the pause server action and update the status to PAUSED

#### Scenario: Resume a paused recurring transaction

- **WHEN** user clicks "Resume" on a paused recurring transaction
- **THEN** the system SHALL call the resume server action and update the status to ACTIVE

### Requirement: Edit navigation

The system SHALL provide an "Edit" button that navigates to `/recurring-transactions/[id]/edit`.

#### Scenario: User clicks edit

- **WHEN** user clicks the edit button on the detail page
- **THEN** the app SHALL navigate to the edit page for that recurring transaction

### Requirement: Delete action with confirmation

The system SHALL provide a delete button that shows a confirmation dialog before deleting the recurring transaction.

#### Scenario: Confirm deletion

- **WHEN** user clicks delete and confirms in the dialog
- **THEN** the system SHALL call the delete server action and redirect to the list page

#### Scenario: Cancel deletion

- **WHEN** user clicks delete but cancels in the dialog
- **THEN** the system SHALL close the dialog and take no action

### Requirement: i18n support for detail page

The system SHALL use the `recurringTransactionsPage` i18n namespace for all detail page text in both `en` and `uk` locales.

#### Scenario: Detail page in Ukrainian

- **WHEN** the locale is `uk`
- **THEN** all detail page text SHALL render in Ukrainian
