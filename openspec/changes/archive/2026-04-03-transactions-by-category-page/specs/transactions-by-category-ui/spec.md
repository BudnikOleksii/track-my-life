## ADDED Requirements

### Requirement: Category list page

The system SHALL display a page at `/transactions/by-category` showing all top-level categories (where `parentCategoryId` is null). Each category SHALL be displayed as a clickable item showing the category name and type (INCOME/EXPENSE).

#### Scenario: Page displays top-level categories only

- **WHEN** user navigates to `/transactions/by-category`
- **THEN** the page SHALL display only categories with `parentCategoryId === null`, excluding subcategories

#### Scenario: Empty category list

- **WHEN** user navigates to `/transactions/by-category` and has no categories
- **THEN** the page SHALL display an empty state message

#### Scenario: Category click navigates to detail

- **WHEN** user clicks on a category item
- **THEN** the browser SHALL navigate to `/transactions/by-category/{categoryId}`

### Requirement: Category detail page with subcategory groups

The system SHALL display a page at `/transactions/by-category/{categoryId}` showing transactions grouped by subcategory. Each group SHALL display the subcategory name (or "Uncategorized" for transactions directly under the parent), a list of transactions, and per-currency totals.

#### Scenario: Transactions grouped by subcategory

- **WHEN** user views the detail page for a category that has subcategories with transactions
- **THEN** the page SHALL display separate groups for each subcategory, each showing the subcategory name, its transactions, and totals per currency

#### Scenario: Transactions without subcategory

- **WHEN** a `TransactionGroupDto` has `subcategory: null`
- **THEN** the group SHALL be displayed with a label indicating these are direct transactions (not assigned to a subcategory)

#### Scenario: Per-currency totals displayed

- **WHEN** a subcategory group has transactions in multiple currencies
- **THEN** the group SHALL display a separate total for each currency code

#### Scenario: Transaction details in each group

- **WHEN** user views a subcategory group
- **THEN** each transaction SHALL display: amount with currency, date, description (if present), and transaction type

#### Scenario: Back navigation to category list

- **WHEN** user is on the detail page
- **THEN** a back link/button SHALL be visible that navigates to `/transactions/by-category`

### Requirement: Category detail error handling

The system SHALL handle error responses from the by-category endpoint gracefully.

#### Scenario: Category not found

- **WHEN** user navigates to `/transactions/by-category/{categoryId}` with an invalid category ID
- **THEN** the page SHALL display a not-found error state

#### Scenario: Subcategory ID provided instead of parent

- **WHEN** user navigates with a subcategory ID (400 error from API)
- **THEN** the page SHALL display an appropriate error message

### Requirement: Loading states

The system SHALL display skeleton loading states while data is being fetched.

#### Scenario: Category list loading

- **WHEN** the category list page is loading
- **THEN** a skeleton fallback SHALL be displayed via Suspense

#### Scenario: Category detail loading

- **WHEN** the category detail page is loading
- **THEN** a skeleton fallback SHALL be displayed via Suspense
