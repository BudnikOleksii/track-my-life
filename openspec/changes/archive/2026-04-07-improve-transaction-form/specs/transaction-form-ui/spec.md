## MODIFIED Requirements

### Requirement: Form validation

The form SHALL validate all required fields before submission using the Zod schema.

#### Scenario: Submit with missing fields

- **WHEN** the user submits the form with empty required fields
- **THEN** the form SHALL display inline error messages for each invalid field without submitting

#### Scenario: Submit valid form

- **WHEN** the user submits a valid form
- **THEN** the form SHALL combine the date and time fields into a single ISO datetime string, call the appropriate server action (create or update), and navigate to `/transactions` on success

#### Scenario: Schema fields

- **WHEN** the form schema validates input
- **THEN** it SHALL require: `categoryId` (non-empty string), `type` (INCOME or EXPENSE), `amount` (positive decimal string), `date` (YYYY-MM-DD string), `time` (HH:mm string), and optional `description`

#### Scenario: Currency code excluded from form

- **WHEN** the form submits
- **THEN** the `currencyCode` SHALL NOT be part of the form values — it SHALL be injected by the server action from the user's profile

## ADDED Requirements

### Requirement: Time field default value

The form SHALL initialize the time field with the current local time.

#### Scenario: New transaction time default

- **WHEN** the form renders for a new transaction
- **THEN** the time field SHALL be set to the current local time in HH:mm format

#### Scenario: Edit transaction time

- **WHEN** the form renders for an existing transaction
- **THEN** the time field SHALL be set to the time extracted from the transaction's date ISO string

### Requirement: Date and time combination on submit

The form submit handler SHALL combine the separate date and time fields into a single ISO datetime string.

#### Scenario: Combine date and time

- **WHEN** the form submits with date "2026-04-07" and time "17:52"
- **THEN** the handler SHALL construct "2026-04-07T17:52:00" and convert it to a UTC ISO string before sending to the server action
