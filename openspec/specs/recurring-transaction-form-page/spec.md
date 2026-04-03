## ADDED Requirements

### Requirement: Create recurring transaction page

The system SHALL provide a server page at `/recurring-transactions/create` that renders the recurring transaction form for creating a new entry.

#### Scenario: Page loads with empty form

- **WHEN** user navigates to `/recurring-transactions/create`
- **THEN** the page SHALL render the recurring transaction form with default values (frequency: MONTHLY, interval: 1)

### Requirement: Edit recurring transaction page

The system SHALL provide a server page at `/recurring-transactions/[id]/edit` that fetches the existing recurring transaction and renders the form pre-filled.

#### Scenario: Page loads with existing data

- **WHEN** user navigates to `/recurring-transactions/{id}/edit`
- **THEN** the page SHALL fetch the recurring transaction by ID and render the form with all fields pre-populated

#### Scenario: Recurring transaction not found

- **WHEN** user navigates to `/recurring-transactions/{id}/edit` with an invalid ID
- **THEN** the page SHALL display a not-found state or redirect

### Requirement: Recurring transaction form component

The system SHALL provide a `RecurringTransactionForm` component using react-hook-form with the Zod schema, including fields for: type (INCOME/EXPENSE), category (filtered by type), amount, currency (read-only from user's baseCurrencyCode), description, frequency, interval, start date, and optional end date.

#### Scenario: Submit valid form for creation

- **WHEN** user fills all required fields and submits the form
- **THEN** the form SHALL call the create server action with validated data

#### Scenario: Submit valid form for editing

- **WHEN** user modifies fields and submits the edit form
- **THEN** the form SHALL call the update server action with the ID and validated data

#### Scenario: Category list filters by transaction type

- **WHEN** user selects "EXPENSE" as the transaction type
- **THEN** the category dropdown SHALL only show expense categories

#### Scenario: Validation error display

- **WHEN** user submits the form with invalid data (e.g., empty amount)
- **THEN** the form SHALL display localized validation error messages inline

### Requirement: Recurring transaction form receives baseCurrencyCode prop

The recurring transaction form component SHALL accept a `baseCurrencyCode` prop of type `CurrencyCode` and use it as the fixed currency value.

#### Scenario: New recurring transaction defaults to baseCurrencyCode

- **WHEN** the form renders for a new recurring transaction
- **THEN** the `currencyCode` form field SHALL be initialized to the `baseCurrencyCode` prop value

#### Scenario: Existing recurring transaction displays its currency as read-only

- **WHEN** the form renders for an existing recurring transaction
- **THEN** the `currencyCode` form field SHALL display the existing currency code as read-only

#### Scenario: Currency displayed as read-only text

- **WHEN** the form renders in either create or edit mode
- **THEN** the currency field SHALL display as a read-only Input (disabled) showing the currency code, replacing the previous Select dropdown

### Requirement: Frequency selector

The system SHALL provide a frequency selection control with options: Daily, Weekly, Monthly, Yearly.

#### Scenario: Select frequency

- **WHEN** user selects "Weekly" from the frequency dropdown
- **THEN** the form field SHALL update to `WEEKLY`

### Requirement: Interval input

The system SHALL provide a numeric interval input (e.g., "every 2 weeks").

#### Scenario: Set interval

- **WHEN** user sets interval to 2 with frequency WEEKLY
- **THEN** the form SHALL represent "every 2 weeks" recurrence

### Requirement: i18n support for form pages

The system SHALL use the `recurringTransactionsFormPage` i18n namespace for form labels, placeholders, and validation messages in both `en` and `uk` locales.

#### Scenario: Form labels in Ukrainian

- **WHEN** the locale is `uk`
- **THEN** all form labels and button text SHALL render in Ukrainian
