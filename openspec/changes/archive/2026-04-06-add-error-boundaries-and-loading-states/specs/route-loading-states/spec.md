## ADDED Requirements

### Requirement: Dashboard loading state shows skeleton grid

The `(app-layout)/dashboard/loading.tsx` SHALL render a skeleton layout that approximates the dashboard grid structure.

#### Scenario: Navigating to dashboard route

- **WHEN** the user navigates to the dashboard route
- **THEN** a skeleton grid with placeholder widgets SHALL be displayed until the page resolves

### Requirement: Transactions loading state shows skeleton list

The `(app-layout)/transactions/loading.tsx` SHALL render a skeleton layout with a header area and list items.

#### Scenario: Navigating to transactions route

- **WHEN** the user navigates to the transactions route
- **THEN** a skeleton with a page header and list item placeholders SHALL be displayed

### Requirement: Categories loading state shows skeleton list

The `(app-layout)/categories/loading.tsx` SHALL render a skeleton layout with a header area and list items.

#### Scenario: Navigating to categories route

- **WHEN** the user navigates to the categories route
- **THEN** a skeleton with a page header and list item placeholders SHALL be displayed

### Requirement: Budgets loading state shows skeleton placeholder

The `(app-layout)/budgets/loading.tsx` SHALL render a skeleton layout appropriate for the budgets page.

#### Scenario: Navigating to budgets route

- **WHEN** the user navigates to the budgets route
- **THEN** a skeleton placeholder SHALL be displayed until the page resolves

### Requirement: Settings loading state shows skeleton form

The `(app-layout)/settings/loading.tsx` SHALL render a skeleton layout that approximates form fields.

#### Scenario: Navigating to settings route

- **WHEN** the user navigates to the settings route
- **THEN** a skeleton with form field placeholders SHALL be displayed

### Requirement: Loading states use existing skeleton components

All loading.tsx files SHALL compose their skeletons using the existing `Skeleton` atom from `packages/ui` and/or the `PageSkeleton` component from the app-layout shared components.

#### Scenario: Loading state renders skeleton components

- **WHEN** any loading.tsx file renders
- **THEN** it SHALL use `Skeleton` or `PageSkeleton` components without introducing new skeleton primitives
