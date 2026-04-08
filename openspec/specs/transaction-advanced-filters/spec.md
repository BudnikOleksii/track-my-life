### Requirement: Sort by filter

The system SHALL display a sort-by dropdown with options: Date, Amount, Created At. The selected value SHALL be stored in the `sortBy` URL search param.

#### Scenario: Default sort

- **WHEN** the user loads the transactions page without a sortBy param
- **THEN** the sort-by dropdown SHALL show "Date" as the default

#### Scenario: Change sort field

- **WHEN** the user selects "Amount" from the sort-by dropdown
- **THEN** the URL sortBy param SHALL update to "amount", the server SHALL re-fetch with the new sort, and pagination SHALL reset to page 1

### Requirement: Sort order toggle

The system SHALL display a sort order toggle button that switches between ascending and descending. The value SHALL be stored in the `sortOrder` URL search param.

#### Scenario: Default sort order

- **WHEN** the user loads the transactions page without a sortOrder param
- **THEN** the sort order SHALL default to descending (newest/largest first)

#### Scenario: Toggle sort order

- **WHEN** the user clicks the sort order toggle
- **THEN** the sortOrder param SHALL flip between "asc" and "desc", the server SHALL re-fetch, and pagination SHALL reset to page 1

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
