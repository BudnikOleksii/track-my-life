## ADDED Requirements

### Requirement: TransactionsAnalyticsApiService provides methods for all 5 analytics endpoints

The `packages/shared` library SHALL provide a `TransactionsAnalyticsApiService` class extending `ApiClient` with methods for: `fetchSummary`, `fetchCategoryBreakdown`, `fetchTrends`, `fetchTopCategories`, and `fetchDailySpending`.

#### Scenario: fetchSummary returns summary data

- **WHEN** `fetchSummary` is called with query params (currencyCode, dateFrom, dateTo, type, categoryId)
- **THEN** it makes a GET request to `/api/transactions-analytics/summary` and returns `SummaryResponseDto`

#### Scenario: fetchCategoryBreakdown returns breakdown data

- **WHEN** `fetchCategoryBreakdown` is called with query params
- **THEN** it makes a GET request to `/api/transactions-analytics/category-breakdown` and returns `CategoryBreakdownResponseDto`

#### Scenario: fetchTrends returns trend data

- **WHEN** `fetchTrends` is called with query params including granularity (weekly|monthly)
- **THEN** it makes a GET request to `/api/transactions-analytics/trends` and returns `TrendsResponseDto`

#### Scenario: fetchTopCategories returns ranked categories

- **WHEN** `fetchTopCategories` is called with query params
- **THEN** it makes a GET request to `/api/transactions-analytics/top-categories` and returns `TopCategoriesResponseDto`

#### Scenario: fetchDailySpending returns daily data

- **WHEN** `fetchDailySpending` is called with year, month, currencyCode, and optional type
- **THEN** it makes a GET request to `/api/transactions-analytics/daily-spending` and returns `DailySpendingResponseDto`

### Requirement: Analytics service is registered with auth interceptor

The `TransactionsAnalyticsApiService` instance SHALL be exported from `server-api.ts` and configured with the auth interceptor, following the same pattern as `transactionApiService`.

#### Scenario: Service instance is available with authentication

- **WHEN** a server action imports the analytics service from `server-api.ts`
- **THEN** all requests made through the service include authentication headers via the auth interceptor

### Requirement: Server actions wrap analytics service calls

Five server actions SHALL be created in the dashboard actions directory, each calling the corresponding analytics service method, performing type-guard validation, and returning typed data or `null`.

#### Scenario: Server action returns typed data on success

- **WHEN** a dashboard server action is called and the API returns a valid response
- **THEN** the action returns the typed DTO after passing the type-guard check

#### Scenario: Server action returns null on failure

- **WHEN** a dashboard server action is called and the API returns an error or invalid response
- **THEN** the action returns `null`
