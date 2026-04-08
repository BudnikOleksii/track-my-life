## ADDED Requirements

### Requirement: Transaction create page route

The system SHALL render a transaction creation form at `/transactions/create` within the `(app-layout)` route group. The page SHALL use a server component for data fetching and a client component for the form. The page SHALL accept an optional `copyFrom` search param; when present, it SHALL fetch the source transaction by ID and pass it as `sourceTransaction` to the form.

#### Scenario: Navigate to create transaction page

- **WHEN** a user navigates to `/transactions/create`
- **THEN** the system SHALL display a full-page form with a back link to `/transactions`, a "Create Transaction" title, and form fields for type, category, amount, date, time, and description

#### Scenario: Server-side data fetching for create page

- **WHEN** the create page server component renders
- **THEN** it SHALL fetch the category list and user profile, and pass them to the form component

#### Scenario: Create page with copyFrom param

- **WHEN** a user navigates to `/transactions/create?copyFrom={id}`
- **THEN** the server component SHALL also fetch the source transaction by ID and pass it as `sourceTransaction` to the form

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

### Requirement: Form fields

- **WHEN** the form page renders
- **THEN** it SHALL display fields for: type (RadioGroup with pill buttons), category (hierarchical CategoryPicker), amount (number input with currency symbol prefix from user's baseCurrencyCode), date (date input), time (TimePicker defaulting to current time), and description (optional text input)

#### Scenario: Copy mode prefills from source

- **WHEN** the form renders with `sourceTransaction` prop
- **THEN** the type, categoryId, amount, and description fields SHALL be prefilled from the source transaction
- **AND** the date SHALL default to today and time to current time (not the source transaction's date/time)

#### Scenario: Type field uses RadioGroup

- **WHEN** the form renders
- **THEN** the type selector SHALL be a RadioGroup with "Income" and "Expense" options displayed as pill-style buttons

#### Scenario: Amount field shows currency prefix

- **WHEN** the form renders
- **THEN** the amount input SHALL display the user's base currency code as an inline prefix

#### Scenario: Date and time fields

- **WHEN** the form renders for a new transaction (no source)
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
