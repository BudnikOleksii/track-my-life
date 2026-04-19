## ADDED Requirements

### Requirement: Generated bulk-delete types exported from `@track-my-life/shared`

The system SHALL regenerate the OpenAPI client in `packages/shared/src/api/generated/` so that `BulkDeleteDto`, `BulkDeleteResponseDto`, `BulkDeleteFailureDto`, and the four `*ControllerBulkDelete*` operation types (transactions, transaction categories, recurring transactions, budgets) are available for import by consumers.

#### Scenario: Bulk-delete request DTO is exported

- **WHEN** a consumer imports `BulkDeleteDto` from `@track-my-life/shared/src/api/generated/types.gen`
- **THEN** the imported type SHALL be an object with a single required property `ids: string[]`

#### Scenario: Bulk-delete response DTO is exported

- **WHEN** a consumer imports `BulkDeleteResponseDto` from the same module
- **THEN** the imported type SHALL be an object with required properties `deleted: number`, `failed: BulkDeleteFailureDto[]`, and `message: string`

#### Scenario: Per-resource operation response types are exported

- **WHEN** a consumer imports `TransactionsControllerBulkDeleteResponses`, `TransactionCategoriesControllerBulkDeleteResponses`, or `RecurringTransactionsControllerBulkDeleteResponses`
- **THEN** each SHALL include `200: BulkDeleteResponseDto`

### Requirement: `TransactionApiService.bulkDelete`

The system SHALL add a `bulkDelete` method to `TransactionApiService` in `packages/shared/src/api/services/transaction-api.service.ts` with the signature `bulkDelete(idList: string[])` that POSTs to `/api/transactions/batch` with a `BulkDeleteDto` body and returns a typed `TransactionsControllerBulkDeleteResponses[200]`.

#### Scenario: Sends a single POST request to the batch endpoint

- **WHEN** `bulkDelete(['id-1', 'id-2'])` is called on `TransactionApiService`
- **THEN** the service SHALL issue a `POST` request to `/api/transactions/batch` and the typed response SHALL be `TransactionsControllerBulkDeleteResponses[200]`

#### Scenario: Maps the `idList` parameter onto the `ids` DTO field

- **WHEN** `bulkDelete(['id-1', 'id-2'])` is called
- **THEN** the request body SHALL be `{ ids: ['id-1', 'id-2'] }` — the service SHALL NOT send `idList` as a key, introduce wrapper fields, or reorder the array

#### Scenario: Empty list is forwarded to the backend without synthesis

- **WHEN** `bulkDelete([])` is called on `TransactionApiService`
- **THEN** the service SHALL issue a `POST` request with body `{ ids: [] }` and return whatever the backend returns
- **AND** the service SHALL NOT synthesise a success response, SHALL NOT throw client-side, and SHALL NOT short-circuit the network call

### Requirement: `CategoryApiService.bulkDelete`

The system SHALL add a `bulkDelete` method to `CategoryApiService` in `packages/shared/src/api/services/category-api.service.ts` with the signature `bulkDelete(idList: string[])` that POSTs to `/api/transaction-categories/batch` and returns a typed `TransactionCategoriesControllerBulkDeleteResponses[200]`.

#### Scenario: Sends a single POST request to the category batch endpoint

- **WHEN** `bulkDelete(['cat-1', 'cat-2'])` is called on `CategoryApiService`
- **THEN** the service SHALL issue a `POST` request to `/api/transaction-categories/batch` with body `{ ids: ['cat-1', 'cat-2'] }`

### Requirement: `RecurringTransactionApiService.bulkDelete`

The system SHALL add a `bulkDelete` method to `RecurringTransactionApiService` in `packages/shared/src/api/services/recurring-transaction-api.service.ts` with the signature `bulkDelete(idList: string[])` that POSTs to `/api/recurring-transactions/batch` and returns a typed `RecurringTransactionsControllerBulkDeleteResponses[200]`.

#### Scenario: Sends a single POST request to the recurring batch endpoint

- **WHEN** `bulkDelete(['r-1'])` is called on `RecurringTransactionApiService`
- **THEN** the service SHALL issue a `POST` request to `/api/recurring-transactions/batch` with body `{ ids: ['r-1'] }`

### Requirement: `bulkDelete` is NOT added to any other service in this change

The system SHALL NOT add a `bulkDelete` method to `AuthApiService`, `ProfileApiService`, `OnboardingApiService`, `TransactionsAnalyticsApiService`, or any budget service in this change, even though the generated types include `BudgetsControllerBulkDelete*`. A budget bulk-delete capability will be introduced when the budgets feature ships.

#### Scenario: Budgets service bulk-delete stays deferred

- **WHEN** a reviewer inspects the diff in `packages/shared/src/api/services/` after this change
- **THEN** there SHALL be no `bulkDelete` method added to any service except the three named above

### Requirement: Existing service instances remain unchanged in shape

The `bulkDelete` method SHALL be added without altering the constructor signature, base URL, or existing method signatures of `TransactionApiService`, `CategoryApiService`, or `RecurringTransactionApiService`, and the existing instances exported from `packages/next-shared/src/api/server-api.ts` SHALL expose the new method without requiring re-registration.

#### Scenario: Existing interceptor registration continues to work

- **WHEN** `transactionApiService.bulkDelete([...])` is called from a server action
- **THEN** the call SHALL pass through the same auth interceptor chain already configured for `fetchTransactionList`, `createTransaction`, and `deleteTransaction`
