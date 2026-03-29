## ADDED Requirements

### Requirement: Profile API service class

The system SHALL provide a `ProfileApiService` class in `packages/shared/src/api/services/profile-api.service.ts` that extends `ApiClient` and exposes methods for all profile endpoints.

#### Scenario: Fetch user profile

- **WHEN** `fetchProfile()` is called
- **THEN** the service SHALL send a `GET` request to `/api/profile` and return `ProfileResponseDto`

#### Scenario: Update user profile

- **WHEN** `updateProfile(body)` is called with an `UpdateProfileDto`
- **THEN** the service SHALL send a `PATCH` request to `/api/profile` with the body and return `ProfileResponseDto`

#### Scenario: Change password

- **WHEN** `changePassword(body)` is called with a `ChangePasswordDto`
- **THEN** the service SHALL send a `POST` request to `/api/profile/password` with the body and return `MessageResponseDto`

#### Scenario: Delete account

- **WHEN** `deleteAccount(body)` is called with a `DeleteAccountDto`
- **THEN** the service SHALL send a `DELETE` request to `/api/profile` with the body and return `MessageResponseDto`

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

### Requirement: Service instances for RSC and server actions

The system SHALL export a `ProfileApiService` instance from both `rsc-api.ts` and `server-api.ts` in the money-tracker app, following the existing pattern for other services.

#### Scenario: RSC instance available

- **WHEN** a React Server Component imports the profile service from `rsc-api.ts`
- **THEN** it SHALL receive a `ProfileApiService` instance configured with read-only token access

#### Scenario: Server action instance available

- **WHEN** a server action imports the profile service from `server-api.ts`
- **THEN** it SHALL receive a `ProfileApiService` instance configured with read-write token access
