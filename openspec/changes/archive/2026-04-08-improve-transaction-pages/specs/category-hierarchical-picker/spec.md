## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: CategoryPicker "All Categories" reset option

When `showAllOption` is enabled, the CategoryPicker SHALL display an "All Categories" entry at the top of the main category list. Selecting it SHALL call `onValueChange('')` to clear the category filter.

#### Scenario: All Categories option clears filter

- **WHEN** `showAllOption` is enabled and the user clicks "All Categories"
- **THEN** the component SHALL call `onValueChange` with an empty string and close the picker

#### Scenario: All Categories option not shown in form mode

- **WHEN** `showAllOption` is not enabled (default)
- **THEN** the "All Categories" entry SHALL NOT appear in the main category list
