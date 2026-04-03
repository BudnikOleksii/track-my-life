## ADDED Requirements

### Requirement: ApiClient supports Next.js fetch cache options

The `ApiClient.request()` method SHALL accept an optional `next` field in `RequestOptions` with `revalidate` (number of seconds) and `tags` (string array). When present, these SHALL be passed to the underlying `fetch()` call as `{ next: { revalidate, tags } }`.

#### Scenario: Request with cache options

- **WHEN** `ApiClient.request()` is called with `next: { revalidate: 3600, tags: ['categories'] }`
- **THEN** the underlying `fetch()` call SHALL include `{ next: { revalidate: 3600, tags: ['categories'] } }` in its init options

#### Scenario: Request without cache options

- **WHEN** `ApiClient.request()` is called without a `next` field
- **THEN** the underlying `fetch()` call SHALL behave as before with no `next` options

### Requirement: API service methods accept next cache options

All API service read methods (e.g., `fetchCategoryList`, `fetchProfile`, `fetchTransactionList`) SHALL accept an optional `next` parameter and pass it through to `ApiClient.request()`.

#### Scenario: Service method passes cache options

- **WHEN** `rscCategoryApiService.fetchCategoryList(query, { next: { revalidate: 3600, tags: ['categories'] } })` is called
- **THEN** the cache options SHALL be forwarded to `ApiClient.request()`

### Requirement: Fetch action functions pass cache tags and revalidate durations

Each fetch action function SHALL pass appropriate `next.revalidate` and `next.tags` options when calling the rsc API service.

#### Scenario: fetchProfile passes cache options

- **WHEN** `fetchProfile()` is called
- **THEN** it SHALL call the API service with `next: { revalidate: 86400, tags: ['profile'] }`

#### Scenario: fetchCategoryList passes cache options

- **WHEN** `fetchCategoryList()` is called
- **THEN** it SHALL call the API service with `next: { revalidate: 3600, tags: ['categories'] }`

#### Scenario: Transaction fetch functions pass cache options

- **WHEN** `fetchTransactionList()`, `fetchTransaction()`, or `fetchTransactionsByCategory()` is called
- **THEN** it SHALL call the API service with `next: { revalidate: 300, tags: ['transactions'] }`

#### Scenario: Analytics fetch functions pass cache options

- **WHEN** any analytics fetch function (`fetchSummary`, `fetchTrends`, `fetchCategoryBreakdown`, `fetchTopCategoryList`, `fetchDailySpending`) is called
- **THEN** it SHALL call the API service with `next: { revalidate: 300, tags: ['analytics'] }`

#### Scenario: Recurring transaction fetch functions pass cache options

- **WHEN** `fetchRecurringTransactionList()` or `fetchRecurringTransaction()` is called
- **THEN** it SHALL call the API service with `next: { revalidate: 3600, tags: ['recurring-transactions'] }`

### Requirement: Fetch action functions are wrapped with React cache()

Each fetch action function SHALL be wrapped with React's `cache()` for request-level deduplication. If the same function is called multiple times with the same arguments within a single render, only one actual fetch SHALL be made.

#### Scenario: Duplicate calls in same render are deduplicated

- **WHEN** `fetchCategoryList()` is called twice within the same server render tree
- **THEN** only one API request SHALL be made

### Requirement: Mutations invalidate cache via revalidateTag

All mutation server actions SHALL replace `revalidatePath()` calls with `revalidateTag()` calls targeting the appropriate cache tags.

#### Scenario: Transaction mutation invalidates transaction and analytics caches

- **WHEN** a transaction is created, updated, or deleted
- **THEN** the server action SHALL call `revalidateTag('transactions')` and `revalidateTag('analytics')`

#### Scenario: Category mutation invalidates category cache

- **WHEN** a category is created, updated, or deleted
- **THEN** the server action SHALL call `revalidateTag('categories')`

#### Scenario: Profile mutation invalidates profile cache

- **WHEN** the user profile is updated
- **THEN** the server action SHALL call `revalidateTag('profile')`

#### Scenario: Recurring transaction mutation invalidates recurring transaction cache

- **WHEN** a recurring transaction is created, updated, deleted, paused, or resumed
- **THEN** the server action SHALL call `revalidateTag('recurring-transactions')`
