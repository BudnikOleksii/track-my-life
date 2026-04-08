## MODIFIED Requirements

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
