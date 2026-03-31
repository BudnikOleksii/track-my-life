## ADDED Requirements

### Requirement: Categories settings page route

The system SHALL render a categories management page at `/categories` within the `(app-layout)` route group. The page SHALL use the standard `page.tsx` + `page.content.tsx` pattern.

#### Scenario: Navigate to categories page

- **WHEN** a user navigates to `/categories`
- **THEN** the system SHALL display the categories management page with a category tree and controls for filtering, creating, editing, and deleting categories

### Requirement: Category tree displays parent-child hierarchy

The system SHALL render a `CategoryTree` component that groups categories by type and displays parent categories as expandable `Accordion` sections with nested subcategories.

#### Scenario: Display categories grouped by type

- **WHEN** the categories page loads with categories of both INCOME and EXPENSE types
- **THEN** the tree SHALL display categories grouped under their respective type, with parent categories expandable to reveal subcategories

#### Scenario: Empty state

- **WHEN** no categories exist (or none match the active filter)
- **THEN** the tree SHALL display an empty state message encouraging the user to create their first category

### Requirement: Category type filter

The system SHALL render a `CategoryTypeFilter` component that allows toggling between ALL, INCOME, and EXPENSE views.

#### Scenario: Filter by type

- **WHEN** the user selects EXPENSE from the type filter
- **THEN** the tree SHALL display only EXPENSE categories and their subcategories

#### Scenario: Default filter state

- **WHEN** the categories page loads
- **THEN** the type filter SHALL default to ALL, showing both INCOME and EXPENSE categories

### Requirement: Create category via navigation

The categories list page SHALL navigate to `/categories/create` when the user initiates category creation, instead of opening a modal dialog.

#### Scenario: Open create form

- **WHEN** the user clicks the "Create Category" button on the categories page
- **THEN** the system SHALL navigate to `/categories/create`

### Requirement: Edit category via navigation

The categories list page SHALL navigate to `/categories/[id]/edit` when the user initiates category editing, instead of opening a modal dialog.

#### Scenario: Open edit form

- **WHEN** the user clicks the edit action on a category in the tree
- **THEN** the system SHALL navigate to `/categories/[id]/edit`

### Requirement: Delete category with confirmation

The system SHALL render a `DeleteCategoryDialog` using the existing `AlertDialog` component to confirm category deletion.

#### Scenario: Confirm deletion

- **WHEN** the user clicks delete on a category and confirms in the dialog
- **THEN** the system SHALL call the delete server action, close the dialog, and refresh the category tree

#### Scenario: Cancel deletion

- **WHEN** the user clicks delete on a category and cancels in the dialog
- **THEN** the system SHALL close the dialog without making any changes

### Requirement: Full i18n support

All user-facing strings on the categories settings page SHALL use the `categoriesPage` i18n namespace via next-intl.

#### Scenario: Translated content

- **WHEN** the user views the categories page in any supported locale
- **THEN** all labels, buttons, messages, and form fields SHALL display translated text from the `categoriesPage` namespace
