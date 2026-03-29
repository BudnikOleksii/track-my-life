### Requirement: Onboarding wizard route and layout

The system SHALL render the onboarding wizard at the `/onboarding` route under a dedicated `(onboarding-layout)` route group. The layout SHALL NOT include the app sidebar or header. The layout SHALL center the wizard card vertically and horizontally on the page.

#### Scenario: User navigates to onboarding route

- **WHEN** an authenticated user navigates to `/onboarding`
- **THEN** the system displays a centered wizard card without the app sidebar or header

### Requirement: Welcome step

The system SHALL display a welcome step as the first step of the wizard. The welcome step SHALL include the app name, a brief welcome message, and a "Get Started" button that advances to the profile step.

#### Scenario: User sees welcome step on first load

- **WHEN** the onboarding wizard loads without a `step` search param (or `step=welcome`)
- **THEN** the system displays the welcome message and a "Get Started" button

#### Scenario: User advances from welcome

- **WHEN** the user clicks "Get Started" on the welcome step
- **THEN** the URL updates to `?step=profile` and the profile step is displayed

### Requirement: Profile setup step

The system SHALL display a profile setup step with fields for first name, last name, country, and base currency. The step SHALL reuse the existing `profileFormSchema` validation. Country and currency fields SHALL use searchable combobox components. The step SHALL include a "Continue" button that submits the profile and advances to the completion step.

#### Scenario: User fills out profile and continues

- **WHEN** the user fills in valid profile data and clicks "Continue"
- **THEN** the system calls the profile update endpoint with the form data and navigates to `?step=complete`

#### Scenario: User submits invalid profile data

- **WHEN** the user clicks "Continue" with invalid or missing required fields
- **THEN** the system displays inline validation errors and does NOT advance to the next step

### Requirement: Completion step

The system SHALL display a completion step with a success message and a "Go to Dashboard" button. Clicking "Go to Dashboard" SHALL set `onboardingCompleted` to `true` on the profile and redirect the user to `/dashboard`.

#### Scenario: User completes onboarding

- **WHEN** the user clicks "Go to Dashboard" on the completion step
- **THEN** the system updates the profile with `onboardingCompleted: true` and redirects to `/dashboard`

### Requirement: Skip onboarding

The system SHALL display a "Skip" link on every step of the wizard. Clicking "Skip" SHALL set `onboardingCompleted` to `true` on the profile and redirect to `/dashboard`.

#### Scenario: User skips onboarding from any step

- **WHEN** the user clicks "Skip" on any wizard step
- **THEN** the system updates the profile with `onboardingCompleted: true` and redirects to `/dashboard`

### Requirement: Step indicator

The system SHALL display a step indicator (e.g., dots or progress bar) showing the current step position within the wizard. The indicator SHALL reflect 3 steps: welcome, profile, complete.

#### Scenario: Step indicator reflects current step

- **WHEN** the user is on the profile step
- **THEN** the step indicator highlights step 2 of 3

### Requirement: Internationalization

All onboarding wizard text (headings, descriptions, buttons, validation messages) SHALL use `next-intl` translations under a dedicated `onboarding` namespace. Translations SHALL be provided for EN and UK locales.

#### Scenario: Wizard displays in user locale

- **WHEN** the user's locale is set to UK (Ukrainian)
- **THEN** all wizard text is displayed in Ukrainian
