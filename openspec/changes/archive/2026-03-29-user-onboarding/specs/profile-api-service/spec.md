## MODIFIED Requirements

### Requirement: Profile data model

The profile data model SHALL include an `onboardingCompleted` boolean field. The field SHALL default to `false` for new users and `true` for existing users (to avoid triggering onboarding for users who registered before this feature). The `fetchProfile` response SHALL include the `onboardingCompleted` field. The `updateProfile` request SHALL accept the `onboardingCompleted` field.

#### Scenario: New user profile includes onboardingCompleted

- **WHEN** a new user registers and their profile is fetched
- **THEN** the profile response includes `onboardingCompleted: false`

#### Scenario: Existing user profile defaults to onboarded

- **WHEN** an existing user's profile is fetched and the `onboardingCompleted` field was not previously set
- **THEN** the profile response includes `onboardingCompleted: true` (or the field is absent, treated as `true` by the client)

#### Scenario: Profile update sets onboardingCompleted

- **WHEN** the client sends `PATCH /api/profile` with `{ onboardingCompleted: true }`
- **THEN** the profile is updated and subsequent fetches return `onboardingCompleted: true`
