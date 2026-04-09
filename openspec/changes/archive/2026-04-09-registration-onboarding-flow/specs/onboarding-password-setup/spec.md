## ADDED Requirements

### Requirement: Password step is shown only for social auth users without a password

The onboarding wizard SHALL display the password step (`?step=password`) only when the onboarding status indicates `hasPassword: false`. If the user already has a password (registered with email/password), the system SHALL skip this step entirely.

#### Scenario: Social auth user sees password step

- **WHEN** a social auth user (with `hasPassword: false`) completes the categories step
- **THEN** the system navigates to `?step=password` and displays the password setup form

#### Scenario: Email/password user skips password step

- **WHEN** an email/password user (with `hasPassword: true`) completes the categories step
- **THEN** the system skips the password step and calls the onboarding complete endpoint directly

### Requirement: Password step allows setting a password

The password step SHALL display a form with "Password" and "Confirm password" fields. The step SHALL include a "Set password" submit button and a "Skip" link to complete onboarding without setting a password.

#### Scenario: User sets a password successfully

- **WHEN** the user fills in matching valid passwords and clicks "Set password"
- **THEN** the system stores the password value to include in the onboarding complete call and proceeds to complete onboarding

#### Scenario: Passwords do not match

- **WHEN** the user enters non-matching passwords and clicks "Set password"
- **THEN** the system displays a validation error and does NOT proceed

#### Scenario: User skips password setup

- **WHEN** the user clicks "Skip" on the password step
- **THEN** the system proceeds to complete onboarding without a password

### Requirement: Password validation

The password field SHALL enforce a minimum length matching `MIN_PASSWORD_LENGTH` from the existing auth form schema. The confirm password field SHALL match the password field exactly.

#### Scenario: Password too short

- **WHEN** the user enters a password shorter than the minimum length
- **THEN** the system displays a validation error indicating the minimum password length

### Requirement: Password step uses i18n translations

All password step text SHALL use `next-intl` translations under the `onboarding` namespace.

#### Scenario: Password step displays in user locale

- **WHEN** the user's locale is UK (Ukrainian)
- **THEN** all password step text is displayed in Ukrainian
