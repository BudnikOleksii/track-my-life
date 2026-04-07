## MODIFIED Requirements

### Requirement: Form fields

- **WHEN** the form page renders
- **THEN** it SHALL display fields for: type (RadioGroup with pill buttons), category (hierarchical CategoryPicker), amount (number input with currency symbol prefix from user's baseCurrencyCode), date (date input), time (TimePicker defaulting to current time), and description (optional text input)

#### Scenario: Type field uses RadioGroup

- **WHEN** the form renders
- **THEN** the type selector SHALL be a RadioGroup with "Income" and "Expense" options displayed as pill-style buttons

#### Scenario: Amount field shows currency prefix

- **WHEN** the form renders
- **THEN** the amount input SHALL display the user's base currency code as an inline prefix (e.g., "UAH" or "$") and SHALL NOT have a separate currency field

#### Scenario: Category field uses hierarchical picker

- **WHEN** the user clicks the category field
- **THEN** a two-panel CategoryPicker SHALL expand showing main categories on the left and subcategories on the right

#### Scenario: Date and time fields

- **WHEN** the form renders for a new transaction
- **THEN** the date field SHALL default to today's date and the time field SHALL default to the current time

#### Scenario: Date and time on edit

- **WHEN** the form renders for an existing transaction
- **THEN** the date field SHALL show the transaction's date and the time field SHALL show the transaction's time

### Requirement: Transaction form receives baseCurrencyCode prop

The `TransactionFormPage` component SHALL accept a `baseCurrencyCode` prop of type `CurrencyCode` and use it to display the currency prefix in the amount field.

#### Scenario: New transaction shows currency prefix

- **WHEN** the form renders for a new transaction with `baseCurrencyCode="UAH"`
- **THEN** the amount input SHALL show "UAH" as a prefix

#### Scenario: Edit transaction shows currency prefix

- **WHEN** the form renders for an existing transaction
- **THEN** the amount input SHALL show the `baseCurrencyCode` as a prefix

## REMOVED Requirements

### Requirement: Currency field display

**Reason**: Multi-currency is not supported. The currency is now shown as a prefix in the amount field instead of a separate read-only input.
**Migration**: Currency code is injected server-side in the create/update server actions from the user's profile.
