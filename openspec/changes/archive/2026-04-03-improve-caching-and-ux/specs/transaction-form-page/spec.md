## MODIFIED Requirements

### Requirement: Transaction form page layout

The transaction form page component SHALL display a page header with back navigation and the form fields below it.

#### Scenario: Back navigation

- **WHEN** the user clicks the back link on the form page
- **THEN** the system SHALL navigate to `/transactions`

#### Scenario: Form fields

- **WHEN** the form page renders
- **THEN** it SHALL display fields for: type (select), category (combobox filtered by type), amount (number input), currency (read-only display of user's baseCurrencyCode), date (date input), and description (optional text input)

### Requirement: Transaction form receives baseCurrencyCode prop

The `TransactionFormPage` component SHALL accept a `baseCurrencyCode` prop of type `CurrencyCode` and use it as the fixed currency value for the transaction.

#### Scenario: New transaction defaults to baseCurrencyCode

- **WHEN** the form renders for a new transaction
- **THEN** the `currencyCode` form field SHALL be initialized to the `baseCurrencyCode` prop value

#### Scenario: Existing transaction displays its currency as read-only

- **WHEN** the form renders for an existing transaction
- **THEN** the `currencyCode` form field SHALL display the transaction's existing currency code as read-only

#### Scenario: Currency displayed as read-only text

- **WHEN** the form renders in either create or edit mode
- **THEN** the currency field SHALL display as a read-only Input (disabled) showing the currency code, replacing the previous Select dropdown
