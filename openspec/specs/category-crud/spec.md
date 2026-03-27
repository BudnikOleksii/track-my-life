## ADDED Requirements

### Requirement: CategoryApiService provides CRUD operations

The system SHALL expose a `CategoryApiService` class extending `ApiClient` in `packages/shared/src/api/services/category-api.service.ts` with methods for all category CRUD operations. A pre-configured instance SHALL be exported from `packages/shared/src/api/server-api.ts`.

#### Scenario: Fetch category list

- **WHEN** `fetchCategoryList(query)` is called with optional query parameters (type filter, parent ID)
- **THEN** the service SHALL send a GET request to `/api/transaction-categories` with the provided query parameters and return the list of categories

#### Scenario: Fetch category by ID

- **WHEN** `fetchCategoryById(id)` is called with a category ID
- **THEN** the service SHALL send a GET request to `/api/transaction-categories/{id}` and return the single category object

#### Scenario: Create category

- **WHEN** `createCategory(body)` is called with a valid category payload (name, type, optional parentId, icon, color)
- **THEN** the service SHALL send a POST request to `/api/transaction-categories` with the body and return the created category

#### Scenario: Update category

- **WHEN** `updateCategory(id, body)` is called with a category ID and partial update payload
- **THEN** the service SHALL send a PATCH request to `/api/transaction-categories/{id}` with the body and return the updated category

#### Scenario: Delete category

- **WHEN** `deleteCategory(id)` is called with a category ID
- **THEN** the service SHALL send a DELETE request to `/api/transaction-categories/{id}` and return void

### Requirement: Server actions wrap API service calls

The system SHALL provide Next.js server actions for create, update, and delete operations in feature-scoped `actions/` files. Each action SHALL call the `CategoryApiService` server-side, handle errors, and revalidate the categories data.

#### Scenario: Create category action

- **WHEN** the `createCategory` server action is invoked with form data
- **THEN** it SHALL validate input with Zod, call `categoryApiService.createCategory()`, revalidate the category list path, and return the result or error

#### Scenario: Update category action

- **WHEN** the `updateCategory` server action is invoked with an ID and form data
- **THEN** it SHALL validate input with Zod, call `categoryApiService.updateCategory()`, revalidate the category list path, and return the result or error

#### Scenario: Delete category action

- **WHEN** the `deleteCategory` server action is invoked with a category ID
- **THEN** it SHALL call `categoryApiService.deleteCategory()`, revalidate the category list path, and return success or error

### Requirement: Category form validation schema

The system SHALL define a Zod schema in `constants/category-form-schema.ts` that validates category form input: name (required, non-empty string), type (INCOME or EXPENSE), parentId (optional string), icon (optional string), and color (optional string from predefined palette).

#### Scenario: Valid category input

- **WHEN** a form submission includes a non-empty name and a valid type
- **THEN** the schema SHALL parse successfully

#### Scenario: Invalid category input

- **WHEN** a form submission is missing name or has an invalid type value
- **THEN** the schema SHALL return validation errors
