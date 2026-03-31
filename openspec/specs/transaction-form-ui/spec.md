## ADDED Requirements

### Requirement: Category filtering by transaction type

The category combobox SHALL only show categories matching the selected transaction type.

#### Scenario: Switch transaction type

- **WHEN** the user changes the transaction type from Income to Expense (or vice versa)
- **THEN** the category combobox SHALL clear its selection and update to show only categories of the new type

### Requirement: Form validation

The form SHALL validate all required fields before submission using the Zod schema.

#### Scenario: Submit with missing fields

- **WHEN** the user submits the form with empty required fields
- **THEN** the form SHALL display inline error messages for each invalid field without submitting

#### Scenario: Submit valid form

- **WHEN** the user submits a valid form
- **THEN** the form SHALL call the appropriate server action (create or update), close the dialog on success, and update the transaction list

### Requirement: Form error handling

The form SHALL handle API errors gracefully.

#### Scenario: API error on submit

- **WHEN** the server action returns null (API error)
- **THEN** the form SHALL display a toast notification with an error message
