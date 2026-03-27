## ADDED Requirements

### Requirement: Transaction API service

The system SHALL provide a `TransactionApiService` class in `packages/shared/src/api/services/` that extends `ApiClient` and exposes methods for all transaction CRUD operations.

#### Scenario: Fetch transaction list

- **WHEN** `fetchTransactionList` is called with optional query params (page, pageSize, type, dateFrom, dateTo)
- **THEN** the service SHALL send a GET request to `/api/transactions` with the query params and return a `TransactionListResponseDto`

#### Scenario: Fetch transaction by ID

- **WHEN** `fetchTransactionById` is called with a transaction ID
- **THEN** the service SHALL send a GET request to `/api/transactions/:id` and return a `TransactionResponseDto`

#### Scenario: Create transaction

- **WHEN** `createTransaction` is called with a `CreateTransactionDto` body
- **THEN** the service SHALL send a POST request to `/api/transactions` and return the created `TransactionResponseDto`

#### Scenario: Update transaction

- **WHEN** `updateTransaction` is called with an ID and `UpdateTransactionDto` body
- **THEN** the service SHALL send a PATCH request to `/api/transactions/:id` and return the updated `TransactionResponseDto`

#### Scenario: Delete transaction

- **WHEN** `deleteTransaction` is called with a transaction ID
- **THEN** the service SHALL send a DELETE request to `/api/transactions/:id`

### Requirement: Transaction service instance

The system SHALL export a `transactionApiService` instance from `packages/shared/src/api/server-api.ts` configured with the API base URL and auth interceptor.

#### Scenario: Service available for server actions

- **WHEN** a server action imports `transactionApiService`
- **THEN** it SHALL be a pre-configured instance ready to make authenticated API calls

### Requirement: Server actions for transaction CRUD

The system SHALL provide server actions in the transactions page directory for each CRUD operation: `fetchTransactionList`, `createTransaction`, `updateTransaction`, `deleteTransaction`.

#### Scenario: Create transaction server action

- **WHEN** `createTransaction` server action is called with form data
- **THEN** it SHALL validate the input with Zod, call the API service, revalidate the transactions path, and return the created transaction or null on error

#### Scenario: Update transaction server action

- **WHEN** `updateTransaction` server action is called with an ID and form data
- **THEN** it SHALL validate input, call the API service, revalidate the path, and return the updated transaction or null on error

#### Scenario: Delete transaction server action

- **WHEN** `deleteTransaction` server action is called with a transaction ID
- **THEN** it SHALL call the API service, revalidate the path, and return success or null on error

### Requirement: Transaction form validation schema

The system SHALL provide a Zod schema for transaction form validation covering categoryId (required string), type (INCOME or EXPENSE), amount (required positive string), currencyCode (required string), date (required string), and description (optional string).

#### Scenario: Valid transaction data

- **WHEN** valid transaction form data is parsed with the schema
- **THEN** validation SHALL succeed and return the parsed data

#### Scenario: Missing required fields

- **WHEN** transaction form data is missing categoryId, type, amount, currencyCode, or date
- **THEN** validation SHALL fail with appropriate error messages
