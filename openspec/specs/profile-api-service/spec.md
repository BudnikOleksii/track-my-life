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

### Requirement: Service instances for RSC and server actions

The system SHALL export a `ProfileApiService` instance from both `rsc-api.ts` and `server-api.ts` in the money-tracker app, following the existing pattern for other services.

#### Scenario: RSC instance available

- **WHEN** a React Server Component imports the profile service from `rsc-api.ts`
- **THEN** it SHALL receive a `ProfileApiService` instance configured with read-only token access

#### Scenario: Server action instance available

- **WHEN** a server action imports the profile service from `server-api.ts`
- **THEN** it SHALL receive a `ProfileApiService` instance configured with read-write token access
