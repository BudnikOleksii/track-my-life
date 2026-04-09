## REMOVED Requirements

### Requirement: Welcome step

**Reason**: The onboarding wizard no longer starts with a welcome step. Users go directly to the currency step.
**Migration**: Remove `WelcomeStep` component and `?step=welcome` handling.

### Requirement: Profile setup step

**Reason**: Replaced by dedicated currency step. First name, last name, and country are no longer collected during onboarding (available in settings).
**Migration**: Remove `ProfileStep` component. Currency selection moves to the new currency step.

### Requirement: Completion step

**Reason**: Onboarding completion is now automatic after the final step (categories or password). No separate confirmation screen needed.
**Migration**: Remove `CompleteStep` component. Completion logic moves to the server action triggered by the final step.

### Requirement: Skip onboarding

**Reason**: Onboarding is now mandatory — users must set a currency and categories before accessing the app.
**Migration**: Remove `SkipButton` component and skip logic from all steps.

## MODIFIED Requirements

### Requirement: Onboarding wizard route and layout

The system SHALL render the onboarding wizard at the `/onboarding` route under a dedicated `(onboarding-layout)` route group. The layout SHALL NOT include the app sidebar or header. The layout SHALL center the wizard card vertically and horizontally on the page.

#### Scenario: User navigates to onboarding route

- **WHEN** an authenticated user with verified email navigates to `/onboarding`
- **THEN** the system displays a centered wizard card without the app sidebar or header

### Requirement: Step indicator

The system SHALL display a step indicator showing the current step position within the wizard. The indicator SHALL reflect the active steps: currency, categories, and optionally password (shown only for social auth users without a password).

#### Scenario: Step indicator for email/password user

- **WHEN** an email/password user (with `hasPassword: true`) is on the categories step
- **THEN** the step indicator highlights step 2 of 2

#### Scenario: Step indicator for social auth user

- **WHEN** a social auth user (with `hasPassword: false`) is on the categories step
- **THEN** the step indicator highlights step 2 of 3

### Requirement: Internationalization

All onboarding wizard text (headings, descriptions, buttons, validation messages) SHALL use `next-intl` translations under a dedicated `onboarding` namespace. Translations SHALL be provided for EN and UK locales.

#### Scenario: Wizard displays in user locale

- **WHEN** the user's locale is set to UK (Ukrainian)
- **THEN** all wizard text is displayed in Ukrainian

## ADDED Requirements

### Requirement: Currency step as the first onboarding step

The system SHALL display a currency selection step as the first step of the onboarding wizard. The step SHALL render when the onboarding page loads without a `step` search param (or `step=currency`). The step SHALL include a searchable combobox with the full currency list and a "Continue" button. The `baseCurrencyCode` value SHALL be passed forward via URL search params (e.g., `?step=categories&currency=USD`).

#### Scenario: User selects currency and continues

- **WHEN** the user selects a currency from the combobox and clicks "Continue"
- **THEN** the URL updates to `?step=categories&currency=<code>` and the categories step is displayed

#### Scenario: User tries to continue without selecting currency

- **WHEN** the user clicks "Continue" without selecting a currency
- **THEN** the system displays a validation error and does NOT advance

### Requirement: Onboarding step routing

The system SHALL route between steps using the `step` URL search parameter. Valid values are `currency` (default), `categories`, and `password`. The `currency` param SHALL persist across step transitions to carry the selected base currency code. Invalid step values SHALL default to the `currency` step.

#### Scenario: Direct navigation to categories step without currency

- **WHEN** the user navigates to `?step=categories` without a `currency` param
- **THEN** the system redirects back to `?step=currency`

#### Scenario: Back navigation preserves state

- **WHEN** the user is on the categories step and navigates back
- **THEN** the currency step loads with the previously selected currency value from the URL param

### Requirement: Onboarding page fetches status from server

The onboarding page server component SHALL fetch onboarding status via `GET /api/onboarding/status` and pass the `OnboardingStatusResponseDto` to the client step components. The status determines which steps to show (e.g., `hasPassword` controls password step visibility).

#### Scenario: Status determines step flow

- **WHEN** the onboarding page renders for a social auth user
- **THEN** the server component fetches status with `hasPassword: false` and the client renders all three steps (currency, categories, password)
