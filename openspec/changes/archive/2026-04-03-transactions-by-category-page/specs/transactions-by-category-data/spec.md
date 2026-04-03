## ADDED Requirements

### Requirement: API service method for transactions by category

The `TransactionApiService` SHALL expose a `fetchTransactionsByCategory(categoryId: string)` method that calls `GET /api/transactions/by-category/{categoryId}` and returns a typed response of `TransactionsByCategoryResponseDto`.

#### Scenario: Successful fetch

- **WHEN** `fetchTransactionsByCategory` is called with a valid parent category ID
- **THEN** the method SHALL return a `TransactionsByCategoryResponseDto` containing `groups` array of `TransactionGroupDto`

#### Scenario: Category not found

- **WHEN** `fetchTransactionsByCategory` is called with a non-existent category ID
- **THEN** the method SHALL propagate the 404 error response

### Requirement: Server-side data fetching function

A plain async function `fetchTransactionsByCategory` SHALL exist in the by-category feature's actions directory, callable from React Server Components via the `rscTransactionApiService` instance.

#### Scenario: RSC fetches transactions by category

- **WHEN** a server component calls the fetch function with a category ID
- **THEN** it SHALL return the `TransactionsByCategoryResponseDto` data using the RSC API service instance

### Requirement: Category list reuse

The category list page SHALL reuse the existing `fetchCategoryList` function from `apps/money-tracker/src/actions/fetch-category-list.ts` to retrieve top-level categories.

#### Scenario: Fetching categories for the list page

- **WHEN** the category list page renders on the server
- **THEN** it SHALL call the shared `fetchCategoryList` and filter for top-level categories (where `parentCategoryId === null`)
