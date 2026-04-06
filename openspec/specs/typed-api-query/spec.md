## ADDED Requirements

### Requirement: Generic query type on RequestOptions

The `RequestOptions` interface SHALL accept a generic type parameter `TQuery` that defaults to `Record<string, unknown>`. The `query` property SHALL be typed as `TQuery` instead of `Record<string, unknown>`.

#### Scenario: Service method passes typed query without casting

- **WHEN** an API service method (e.g., `fetchTransactionList`) passes a typed query object to `this.request()`
- **THEN** the query object SHALL be accepted without an `as Record<string, unknown>` cast

#### Scenario: Backward compatibility for untyped callers

- **WHEN** a caller uses `RequestOptions` without specifying a query type
- **THEN** the `query` property SHALL default to `Record<string, unknown>`

### Requirement: Generic query type on ApiClient.request

The `ApiClient.request()` method SHALL accept a second generic type parameter `TQuery` and pass it through to `RequestOptions`. The `requestBlob()` method SHALL also accept the `TQuery` generic.

#### Scenario: request method signature

- **WHEN** `request<TData, TQuery>()` is called with a typed query
- **THEN** the query parameter in the options object SHALL be typed as `TQuery`

### Requirement: Zero unsafe query casts in API services

All `as Record<string, unknown>` casts on query parameters SHALL be removed from API service files: `transaction-api.service.ts`, `category-api.service.ts`, `recurring-transaction-api.service.ts`, and `transactions-analytics-api.service.ts`.

#### Scenario: Transaction API service query typing

- **WHEN** `fetchTransactionList` or `exportTransactionList` is called
- **THEN** the typed query object SHALL be passed directly to `request()` without any type assertion

#### Scenario: Analytics API service query typing

- **WHEN** any analytics service method (fetchSummary, fetchCategoryBreakdown, fetchTrends, fetchTopCategories, fetchDailySpending) is called
- **THEN** the typed query object SHALL be passed directly to `request()` without any type assertion

### Requirement: Safe type narrowing in data validation functions

All `(value as Record<string, unknown>).property` patterns in data validation functions SHALL be replaced with a `checkIsObject` type guard that safely narrows `unknown` to `Record<string, unknown>`.

#### Scenario: Type guard narrows unknown to object

- **WHEN** `checkIsObject(value)` is called with a non-null object
- **THEN** it SHALL return `true` and narrow the type to `Record<string, unknown>`

#### Scenario: Type guard rejects non-objects

- **WHEN** `checkIsObject(value)` is called with `null`, `undefined`, a string, or an array
- **THEN** it SHALL return `false`

#### Scenario: Validation functions use type guard

- **WHEN** a fetch action validates an API response (e.g., `fetch-transaction-list.ts`)
- **THEN** it SHALL use `checkIsObject(value)` before accessing properties, with no `as` cast
