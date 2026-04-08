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

The CategoryPicker SHALL allow selecting either a main category or a subcategory as the transaction's category.

#### Scenario: Select main category

- **WHEN** a user clicks a main category in the left panel
- **THEN** the component SHALL set `categoryId` to that main category's ID and highlight it as active

#### Scenario: Select subcategory

- **WHEN** a user clicks a subcategory in the right panel
- **THEN** the component SHALL set `categoryId` to the subcategory's ID, keeping the parent category highlighted

#### Scenario: Category display in form

- **WHEN** a category is selected and the picker is collapsed
- **THEN** the form field SHALL display the selected category name (subcategory name if a subcategory was selected, otherwise the main category name)

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
