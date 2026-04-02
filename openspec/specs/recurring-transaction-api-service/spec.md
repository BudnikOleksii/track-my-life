## ADDED Requirements

### Requirement: RecurringTransactionApiService class

The system SHALL provide a `RecurringTransactionApiService` class in `packages/shared/src/api/services/recurring-transaction-api.service.ts` that extends `ApiClient` and exposes methods for all recurring transaction API endpoints.

#### Scenario: Service exports its own instance

- **WHEN** the service module is imported
- **THEN** it SHALL export a pre-configured `recurringTransactionApiService` instance (no central registry)

#### Scenario: Service exports RSC-specific instance

- **WHEN** server components need to fetch recurring transaction data
- **THEN** the service SHALL export an `rscRecurringTransactionApiService` instance configured for RSC usage

### Requirement: Fetch recurring transaction list

The service SHALL provide a `fetchRecurringTransactionList` method that calls `GET /api/recurring-transactions` with optional query parameters for status, frequency, page, and pageSize.

#### Scenario: Fetch with filters

- **WHEN** `fetchRecurringTransactionList` is called with `{ status: 'ACTIVE', frequency: 'MONTHLY', page: 1, pageSize: 10 }`
- **THEN** the service SHALL send a GET request to `/api/recurring-transactions` with those query parameters and return `RecurringTransactionListResponseDto`

### Requirement: Fetch recurring transaction by ID

The service SHALL provide a `fetchRecurringTransactionById` method that calls `GET /api/recurring-transactions/{id}`.

#### Scenario: Fetch existing recurring transaction

- **WHEN** `fetchRecurringTransactionById` is called with a valid ID
- **THEN** the service SHALL return `RecurringTransactionResponseDto`

### Requirement: Create recurring transaction

The service SHALL provide a `createRecurringTransaction` method that calls `POST /api/recurring-transactions` with a `CreateRecurringTransactionDto` body.

#### Scenario: Create with valid data

- **WHEN** `createRecurringTransaction` is called with valid body data
- **THEN** the service SHALL send a POST request and return the created `RecurringTransactionResponseDto`

### Requirement: Update recurring transaction

The service SHALL provide an `updateRecurringTransaction` method that calls `PATCH /api/recurring-transactions/{id}` with an `UpdateRecurringTransactionDto` body.

#### Scenario: Update with partial data

- **WHEN** `updateRecurringTransaction` is called with an ID and partial body
- **THEN** the service SHALL send a PATCH request and return the updated `RecurringTransactionResponseDto`

### Requirement: Delete recurring transaction

The service SHALL provide a `deleteRecurringTransaction` method that calls `DELETE /api/recurring-transactions/{id}`.

#### Scenario: Delete existing recurring transaction

- **WHEN** `deleteRecurringTransaction` is called with a valid ID
- **THEN** the service SHALL send a DELETE request and return void on success

### Requirement: Pause recurring transaction

The service SHALL provide a `pauseRecurringTransaction` method that calls `PATCH /api/recurring-transactions/{id}/pause`.

#### Scenario: Pause an active recurring transaction

- **WHEN** `pauseRecurringTransaction` is called with a valid ID
- **THEN** the service SHALL return the updated `RecurringTransactionResponseDto` with status `PAUSED`

### Requirement: Resume recurring transaction

The service SHALL provide a `resumeRecurringTransaction` method that calls `PATCH /api/recurring-transactions/{id}/resume`.

#### Scenario: Resume a paused recurring transaction

- **WHEN** `resumeRecurringTransaction` is called with a valid ID
- **THEN** the service SHALL return the updated `RecurringTransactionResponseDto` with status `ACTIVE`
