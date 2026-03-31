## ADDED Requirements

### Requirement: Category create page route

The system SHALL render a category creation form at `/categories/create` within the `(app-layout)` route group. The page SHALL use a server component for data fetching and a client component for the form.

#### Scenario: Navigate to create category page

- **WHEN** a user navigates to `/categories/create`
- **THEN** the system SHALL display a full-page form with a back link to `/categories`, a "Create Category" title, and form fields for name, type, and optional parent category

#### Scenario: Server-side data fetching for create page

- **WHEN** the create page server component renders
- **THEN** it SHALL fetch the category list and pass filtered parent categories to the form component

### Requirement: Category edit page route

The system SHALL render a category editing form at `/categories/[id]/edit` within the `(app-layout)` route group. The form SHALL be pre-populated with the existing category data.

#### Scenario: Navigate to edit category page

- **WHEN** a user navigates to `/categories/[id]/edit` with a valid category ID
- **THEN** the system SHALL display a full-page form pre-filled with the category's name, type, and parent category, with the type field disabled

#### Scenario: Category not found

- **WHEN** a user navigates to `/categories/[id]/edit` with a non-existent category ID
- **THEN** the system SHALL render a 404 not-found page

#### Scenario: Server-side data fetching for edit page

- **WHEN** the edit page server component renders
- **THEN** it SHALL fetch both the category by ID and the full category list in parallel, passing the category and filtered parent categories to the form component

### Requirement: Category form page layout

The category form page component SHALL display a page header with back navigation and the form fields below it.

#### Scenario: Back navigation

- **WHEN** the user clicks the back link on the form page
- **THEN** the system SHALL navigate to `/categories`

#### Scenario: Form fields match existing form

- **WHEN** the form page renders
- **THEN** it SHALL display the same fields as the previous dialog form: name (text input), type (select, disabled on edit), and parent category (combobox, shown only when parent categories exist)

### Requirement: Category form submission with redirect

The form page SHALL call the existing create/update server actions and redirect to the category list on success.

#### Scenario: Successful creation

- **WHEN** the user submits a valid create form
- **THEN** the system SHALL call the create server action, and on success navigate to `/categories`

#### Scenario: Successful update

- **WHEN** the user submits a valid edit form
- **THEN** the system SHALL call the update server action, and on success navigate to `/categories`

#### Scenario: Validation errors

- **WHEN** the user submits the form with invalid data
- **THEN** the form SHALL display inline error messages without navigating

### Requirement: Category form page i18n

All user-facing strings on the category form pages SHALL use the `categoriesPage` i18n namespace.

#### Scenario: Translated page titles

- **WHEN** the user views the create or edit category page in any supported locale
- **THEN** the page title, back link label, form labels, and submit button text SHALL display translated text
