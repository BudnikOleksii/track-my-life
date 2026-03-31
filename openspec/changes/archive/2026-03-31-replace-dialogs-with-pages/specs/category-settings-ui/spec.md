## MODIFIED Requirements

### Requirement: Create category via modal form

The categories list page SHALL navigate to `/categories/create` when the user initiates category creation, instead of opening a modal dialog.

#### Scenario: Open create form

- **WHEN** the user clicks the "Create Category" button on the categories page
- **THEN** the system SHALL navigate to `/categories/create`

### Requirement: Edit category via modal form

The categories list page SHALL navigate to `/categories/[id]/edit` when the user initiates category editing, instead of opening a modal dialog.

#### Scenario: Open edit form

- **WHEN** the user clicks the edit action on a category in the tree
- **THEN** the system SHALL navigate to `/categories/[id]/edit`

## REMOVED Requirements

### Requirement: Create category via modal form

**Reason**: Modal form replaced by dedicated create page at `/categories/create` for better mobile usability
**Migration**: Category creation now happens on a separate page route; the `CategoryForm` dialog component and `useCategoryDialogs` hook are removed

### Requirement: Edit category via modal form

**Reason**: Modal form replaced by dedicated edit page at `/categories/[id]/edit` for better mobile usability
**Migration**: Category editing now happens on a separate page route; edit buttons in the category tree become navigation links
