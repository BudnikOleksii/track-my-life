## ADDED Requirements

### Requirement: CategoryPicker two-panel layout

The CategoryPicker component SHALL render a two-column layout with main categories on the left and subcategories on the right.

#### Scenario: Main categories display

- **WHEN** the CategoryPicker renders with a list of categories
- **THEN** the left panel SHALL display only categories where `parentCategoryId` is null, filtered by the current transaction type

#### Scenario: Subcategories display

- **WHEN** a user selects a main category in the left panel
- **THEN** the right panel SHALL display all categories whose `parentCategoryId` matches the selected main category's ID

#### Scenario: No subcategories

- **WHEN** a user selects a main category that has no subcategories
- **THEN** the right panel SHALL be empty and the main category's ID SHALL be used as the selected `categoryId`

### Requirement: CategoryPicker selection behavior

The CategoryPicker SHALL allow selecting either a main category or a subcategory as the transaction's category. When `showAllOption` is enabled and a parent category has subcategories, an "All [Parent Name]" entry SHALL appear at the top of the subcategory panel that selects the parent category ID directly.

#### Scenario: Select main category

- **WHEN** a user clicks a main category in the left panel that has no subcategories
- **THEN** the component SHALL set `categoryId` to that main category's ID and close the picker

#### Scenario: Select subcategory

- **WHEN** a user clicks a subcategory in the right panel
- **THEN** the component SHALL set `categoryId` to the subcategory's ID, keeping the parent category highlighted

#### Scenario: Select "All" for parent category with subcategories

- **WHEN** `showAllOption` is enabled and a user clicks "All [Parent Name]" at the top of the subcategory panel
- **THEN** the component SHALL set `categoryId` to the parent category's ID and close the picker

#### Scenario: Category display in form

- **WHEN** a category is selected and the picker is collapsed
- **THEN** the form field SHALL display the selected category name (subcategory name prefixed with parent if a subcategory was selected, otherwise the main category name)

### Requirement: CategoryPicker toggle behavior

The CategoryPicker SHALL be expandable/collapsible inline within the form.

#### Scenario: Expand picker

- **WHEN** a user clicks the category form field
- **THEN** the two-panel picker SHALL expand below the field

#### Scenario: Collapse picker on selection

- **WHEN** a user selects a main category with no subcategories or selects a subcategory
- **THEN** the picker SHALL collapse

### Requirement: CategoryPicker type filtering

The CategoryPicker SHALL only show categories matching the current transaction type.

#### Scenario: Type change clears selection

- **WHEN** the transaction type changes from INCOME to EXPENSE (or vice versa)
- **THEN** the CategoryPicker SHALL clear the selected category and filter to show only categories of the new type

### Requirement: CategoryPicker "All Categories" reset option

When `showAllOption` is enabled, the CategoryPicker SHALL display an "All Categories" entry at the top of the main category list. Selecting it SHALL call `onValueChange('')` to clear the category filter.

#### Scenario: All Categories option clears filter

- **WHEN** `showAllOption` is enabled and the user clicks "All Categories"
- **THEN** the component SHALL call `onValueChange` with an empty string and close the picker

#### Scenario: All Categories option not shown in form mode

- **WHEN** `showAllOption` is not enabled (default)
- **THEN** the "All Categories" entry SHALL NOT appear in the main category list
