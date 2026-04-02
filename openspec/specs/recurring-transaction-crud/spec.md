## ADDED Requirements

### Requirement: Create recurring transaction server action

The system SHALL provide a `createRecurringTransaction` server action in `recurring-transactions/create/action.ts` that validates input with Zod, calls the API service, revalidates the recurring transactions path, and redirects to the list page.

#### Scenario: Successful creation

- **WHEN** the server action receives valid form data (categoryId, type, amount, currencyCode, frequency, interval, startDate)
- **THEN** it SHALL validate with `recurringTransactionFormSchema`, call `recurringTransactionApiService.createRecurringTransaction()`, revalidate the path, and redirect to `/recurring-transactions`

#### Scenario: Validation failure

- **WHEN** the server action receives invalid form data
- **THEN** it SHALL return validation errors without calling the API

### Requirement: Update recurring transaction server action

The system SHALL provide an `updateRecurringTransaction` server action in `recurring-transactions/[id]/edit/action.ts` that validates input, calls the API service with the transaction ID, and revalidates.

#### Scenario: Successful update

- **WHEN** the server action receives valid form data and a recurring transaction ID
- **THEN** it SHALL call `recurringTransactionApiService.updateRecurringTransaction()`, revalidate the path, and redirect to the detail page

### Requirement: Delete recurring transaction server action

The system SHALL provide a `deleteRecurringTransaction` server action in `recurring-transactions/actions/delete-recurring-transaction.ts`.

#### Scenario: Successful deletion

- **WHEN** the server action receives a valid recurring transaction ID
- **THEN** it SHALL call `recurringTransactionApiService.deleteRecurringTransaction()`, revalidate the path, and redirect to the list page

### Requirement: Pause recurring transaction server action

The system SHALL provide a `pauseRecurringTransaction` server action in `recurring-transactions/actions/pause-recurring-transaction.ts`.

#### Scenario: Successful pause

- **WHEN** the server action receives a valid recurring transaction ID
- **THEN** it SHALL call `recurringTransactionApiService.pauseRecurringTransaction()` and revalidate the path

### Requirement: Resume recurring transaction server action

The system SHALL provide a `resumeRecurringTransaction` server action in `recurring-transactions/actions/resume-recurring-transaction.ts`.

#### Scenario: Successful resume

- **WHEN** the server action receives a valid recurring transaction ID
- **THEN** it SHALL call `recurringTransactionApiService.resumeRecurringTransaction()` and revalidate the path

### Requirement: Fetch recurring transaction list wrapper

The system SHALL provide a `fetchRecurringTransactionList` async function in `recurring-transactions/actions/fetch-recurring-transaction-list.ts` for use in RSC pages.

#### Scenario: Fetch with search params

- **WHEN** the function is called with parsed search params (status, frequency, page)
- **THEN** it SHALL call `rscRecurringTransactionApiService.fetchRecurringTransactionList()`, validate the response with a type guard, and return data or null

### Requirement: Fetch recurring transaction by ID wrapper

The system SHALL provide a `fetchRecurringTransactionById` async function in `recurring-transactions/actions/fetch-recurring-transaction-by-id.ts` for use in RSC pages.

#### Scenario: Fetch existing item

- **WHEN** the function is called with a valid ID
- **THEN** it SHALL call `rscRecurringTransactionApiService.fetchRecurringTransactionById()` and return the response DTO or null

### Requirement: Recurring transaction form schema

The system SHALL provide a Zod validation schema in `recurring-transactions/constants/recurring-transaction-form-schema.ts` covering all form fields.

#### Scenario: Valid form data

- **WHEN** form data includes categoryId, type (INCOME/EXPENSE), amount (decimal string), currencyCode, frequency (DAILY/WEEKLY/MONTHLY/YEARLY), interval (positive integer), and startDate
- **THEN** the schema SHALL pass validation

#### Scenario: Invalid amount format

- **WHEN** form data includes a non-numeric amount
- **THEN** the schema SHALL reject with a localized error key
