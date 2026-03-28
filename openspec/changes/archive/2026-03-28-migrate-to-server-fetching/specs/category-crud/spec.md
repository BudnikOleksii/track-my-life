## MODIFIED Requirements

### Requirement: Server actions wrap API service calls

The system SHALL provide Next.js server actions for create, update, and delete operations in feature-scoped `actions/` files. The `fetchCategoryList` function SHALL be converted to a plain async function (without `'use server'` directive) callable from server components. Mutation actions (create, update, delete) SHALL remain as server actions.

#### Scenario: Fetch category list from server component

- **WHEN** a server component calls `fetchCategoryList`
- **THEN** it SHALL execute as a plain async function on the server, returning the category list without server action serialization overhead

#### Scenario: Create category action

- **WHEN** the `createCategory` server action is invoked with form data
- **THEN** it SHALL validate input with Zod, call `categoryApiService.createCategory()`, revalidate the category list path, and return the result or error

#### Scenario: Update category action

- **WHEN** the `updateCategory` server action is invoked with an ID and form data
- **THEN** it SHALL validate input with Zod, call `categoryApiService.updateCategory()`, revalidate the category list path, and return the result or error

#### Scenario: Delete category action

- **WHEN** the `deleteCategory` server action is invoked with a category ID
- **THEN** it SHALL call `categoryApiService.deleteCategory()`, revalidate the category list path, and return success or error
