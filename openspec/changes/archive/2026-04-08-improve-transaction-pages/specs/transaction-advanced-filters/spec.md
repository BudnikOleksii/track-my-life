## REMOVED Requirements

### Requirement: Currency filter

**Reason**: Multi-currency is not planned. The currency filter adds unnecessary UI complexity.
**Migration**: Remove `currencyCode` from `TransactionFilters` interface, URL search params parsing, filter hook reset keys, and server component params. Delete `TransactionCurrencyFilter` component.

## MODIFIED Requirements

### Requirement: Category filter

The system SHALL display a hierarchical CategoryPicker (instead of a flat select dropdown) for filtering transactions by category. The CategoryPicker SHALL show the `showAllOption` to allow selecting "All Categories" (clears filter) and selecting a parent category directly via "All [Parent Name]". The selected value SHALL be stored in the `categoryId` URL search param.

#### Scenario: Filter by category

- **WHEN** the user selects a category from the CategoryPicker
- **THEN** the URL categoryId param SHALL update, the server SHALL re-fetch with the category filter, and pagination SHALL reset to page 1

#### Scenario: Filter by parent category

- **WHEN** the user selects "All [Parent Name]" in the CategoryPicker subcategory panel
- **THEN** the URL categoryId param SHALL update to the parent category's ID and the server SHALL filter to show all transactions under that parent (including subcategories)

#### Scenario: Clear category filter

- **WHEN** the user selects "All Categories" in the CategoryPicker
- **THEN** the categoryId param SHALL be removed from the URL and all categories SHALL be shown

### Requirement: Filter layout

Sort controls SHALL appear in the primary filter row alongside the type filter and month navigator. The category filter SHALL appear in the secondary filter row below the primary row, without a currency filter.

#### Scenario: Secondary filter row

- **WHEN** the user views the transactions page
- **THEN** the secondary row SHALL contain only the category filter (CategoryPicker)
