## MODIFIED Requirements

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
