## ADDED Requirements

### Requirement: Transaction create page route

The system SHALL render a transaction creation form at `/transactions/create` within the `(app-layout)` route group. The page SHALL use a server component for data fetching and a client component for the form.

#### Scenario: Navigate to create transaction page

- **WHEN** a user navigates to `/transactions/create`
- **THEN** the system SHALL display a full-page form with a back link to `/transactions`, a "Create Transaction" title, and form fields for type, category, amount, currency, date, and description

#### Scenario: Server-side data fetching for create page

- **WHEN** the create page server component renders
- **THEN** it SHALL fetch the category list and pass it to the form component

### Requirement: Transaction edit page route

The system SHALL render a transaction editing form at `/transactions/[id]/edit` within the `(app-layout)` route group. The form SHALL be pre-populated with the existing transaction data.

#### Scenario: Navigate to edit transaction page

- **WHEN** a user navigates to `/transactions/[id]/edit` with a valid transaction ID
- **THEN** the system SHALL display a full-page form pre-filled with the transaction's type, category, amount, currency, date, and description

#### Scenario: Transaction not found

- **WHEN** a user navigates to `/transactions/[id]/edit` with a non-existent transaction ID
- **THEN** the system SHALL render a 404 not-found page

#### Scenario: Server-side data fetching for edit page

- **WHEN** the edit page server component renders
- **THEN** it SHALL fetch both the transaction by ID and the category list in parallel, passing both to the form component

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

### Requirement: Transaction form submission with redirect

The form page SHALL call the existing create/update server actions and redirect to the transaction list on success.

#### Scenario: Successful creation

- **WHEN** the user submits a valid create form
- **THEN** the system SHALL call the create server action, and on success navigate to `/transactions`

#### Scenario: Successful update

- **WHEN** the user submits a valid edit form
- **THEN** the system SHALL call the update server action, and on success navigate to `/transactions`

#### Scenario: Validation errors

- **WHEN** the user submits the form with invalid data
- **THEN** the form SHALL display inline error messages without navigating

#### Scenario: API error on submit

- **WHEN** the server action returns null (API error)
- **THEN** the form SHALL display a toast notification with an error message

### Requirement: Category filtering by transaction type on form page

The category combobox on the form page SHALL only show categories matching the selected transaction type.

#### Scenario: Switch transaction type

- **WHEN** the user changes the transaction type
- **THEN** the category combobox SHALL clear its selection and show only categories of the new type

### Requirement: Transaction form page i18n

All user-facing strings on the transaction form pages SHALL use the `transactionsPage` i18n namespace.

#### Scenario: Translated page titles

- **WHEN** the user views the create or edit transaction page in any supported locale
- **THEN** the page title, back link label, form labels, and submit button text SHALL display translated text
