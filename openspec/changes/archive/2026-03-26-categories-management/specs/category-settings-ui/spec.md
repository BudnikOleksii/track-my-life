## ADDED Requirements

### Requirement: Categories settings page route

The system SHALL render a categories management page at `/settings/categories` within the `(settings-layout)` route group. The page SHALL use the standard `page.tsx` + `page.content.tsx` pattern.

#### Scenario: Navigate to categories settings

- **WHEN** a user navigates to `/settings/categories`
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

### Requirement: Create category via modal form

The system SHALL render a `CategoryForm` inside a Radix `Dialog` modal for creating new categories. The form SHALL use react-hook-form with the Zod validation schema.

#### Scenario: Open create form

- **WHEN** the user clicks the "Add category" button
- **THEN** a modal SHALL appear with an empty form containing fields for name, type, parent (optional), icon, and color

#### Scenario: Submit valid category

- **WHEN** the user fills in required fields and submits the form
- **THEN** the system SHALL call the create server action, close the modal on success, and refresh the category tree

#### Scenario: Submit invalid category

- **WHEN** the user submits the form with validation errors (e.g., empty name)
- **THEN** the form SHALL display inline error messages without closing the modal

### Requirement: Edit category via modal form

The system SHALL allow editing an existing category by opening the `CategoryForm` modal pre-filled with the category's current values.

#### Scenario: Open edit form

- **WHEN** the user clicks the edit action on a category in the tree
- **THEN** a modal SHALL appear with the form pre-filled with the category's name, type, parent, icon, and color

#### Scenario: Submit edited category

- **WHEN** the user modifies fields and submits the form
- **THEN** the system SHALL call the update server action, close the modal on success, and refresh the category tree

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
