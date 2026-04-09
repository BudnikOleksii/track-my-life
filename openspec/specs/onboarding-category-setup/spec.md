### Requirement: Categories step displays two setup options

The onboarding categories step SHALL display two options for setting up categories:

1. A "Use default categories" button that assigns base categories from the backend
2. An "Import from file" section that allows uploading a CSV/JSON file to create transactions with categories

#### Scenario: User sees both category setup options

- **WHEN** the user navigates to the onboarding categories step (`?step=categories`)
- **THEN** the system displays a "Use default categories" button and an "Import from file" section with a file input

### Requirement: Assign default categories via onboarding endpoint

The system SHALL call `POST /api/onboarding/assign-default-categories` when the user clicks "Use default categories". On success, the system SHALL advance to the next step (password step if social user, or complete onboarding). On error (e.g., categories already exist), the system SHALL display the error message and still allow advancing.

#### Scenario: User assigns default categories successfully

- **WHEN** the user clicks "Use default categories" and the backend responds with success
- **THEN** the system advances to the next onboarding step

#### Scenario: Categories already exist

- **WHEN** the user clicks "Use default categories" and the backend responds with 400 (categories already exist)
- **THEN** the system displays an informational message and allows the user to continue to the next step

### Requirement: Import file creates transactions with categories

The system SHALL reuse the existing `importTransactionList` server action to handle CSV/JSON file uploads during onboarding. The file input SHALL accept `.csv` and `.json` files. On successful import, the system SHALL advance to the next step.

#### Scenario: User imports a valid CSV file

- **WHEN** the user selects a valid CSV file and submits the import
- **THEN** the system calls the import transaction list endpoint, creates transactions with categories, and advances to the next step

#### Scenario: User imports an invalid file

- **WHEN** the user selects an invalid file (wrong format, too large, or containing invalid rows)
- **THEN** the system displays validation errors and does NOT advance to the next step

### Requirement: OnboardingApiService exposes assignDefaultCategories method

The `OnboardingApiService` in `packages/shared` SHALL expose an `assignDefaultCategories()` method that calls `POST /api/onboarding/assign-default-categories`.

#### Scenario: Service calls assign-default-categories endpoint

- **WHEN** `onboardingApiService.assignDefaultCategories()` is called
- **THEN** the service sends `POST /api/onboarding/assign-default-categories` to the backend

### Requirement: Categories step uses i18n translations

All categories step text SHALL use `next-intl` translations under the `onboarding` namespace.

#### Scenario: Categories step displays in user locale

- **WHEN** the user's locale is UK (Ukrainian)
- **THEN** all categories step text is displayed in Ukrainian
