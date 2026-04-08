## ADDED Requirements

### Requirement: Recurring transactions list page

The system SHALL provide a server page at `/recurring-transactions` (`page.tsx`) that fetches the recurring transaction list using search params and renders the content component within a Suspense boundary.

#### Scenario: Page loads with default params

- **WHEN** user navigates to `/recurring-transactions`
- **THEN** the page SHALL fetch the recurring transaction list with default pagination and render the list content

#### Scenario: Page loads with filter params

- **WHEN** user navigates to `/recurring-transactions?status=ACTIVE&frequency=MONTHLY`
- **THEN** the page SHALL pass those filters to the fetch function and render filtered results

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

### Requirement: Status filter

The system SHALL provide a filter control to filter recurring transactions by status (ALL, ACTIVE, PAUSED, CANCELLED).

#### Scenario: Filter by active status

- **WHEN** user selects "Active" from the status filter
- **THEN** the URL search params SHALL update with `status=ACTIVE` and the list SHALL re-fetch with that filter

### Requirement: Create button navigation

The system SHALL display a "Create" button that navigates to `/recurring-transactions/create`.

#### Scenario: User clicks create button

- **WHEN** user clicks the create recurring transaction button
- **THEN** the app SHALL navigate to `/recurring-transactions/create`

### Requirement: Pagination

The system SHALL provide pagination controls when the total count exceeds the page size.

#### Scenario: Navigate to next page

- **WHEN** user clicks the next page button
- **THEN** the URL search params SHALL update with the new page number and the list SHALL re-fetch

### Requirement: i18n support

The system SHALL use the `recurringTransactionsPage` i18n namespace for all user-facing text, with translations in both `en` and `uk` locales.

#### Scenario: Switch locale

- **WHEN** the app locale is set to `uk`
- **THEN** all recurring transactions list page text SHALL render in Ukrainian
