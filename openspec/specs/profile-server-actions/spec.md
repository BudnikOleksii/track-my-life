## ADDED Requirements

### Requirement: Update profile server action

The system SHALL provide a server action `updateProfile` that validates input with zod, calls the profile API service, and revalidates the settings page path.

#### Scenario: Successful profile update

- **WHEN** the action receives valid `UpdateProfileDto` data
- **THEN** it SHALL call `profileApiService.updateProfile`, revalidate the current path, and return the updated profile data

#### Scenario: Validation failure

- **WHEN** the action receives invalid input
- **THEN** it SHALL return null without calling the API

#### Scenario: API error

- **WHEN** the API returns an error
- **THEN** the action SHALL return null

### Requirement: Change password server action

The system SHALL provide a server action `changePassword` that validates input and calls the profile API service.

#### Scenario: Successful password change

- **WHEN** the action receives valid `ChangePasswordDto` data
- **THEN** it SHALL call `profileApiService.changePassword` and return the success message

#### Scenario: Invalid current password from API

- **WHEN** the API returns a 401/403 error for incorrect current password
- **THEN** the action SHALL return null

### Requirement: Delete account server action

The system SHALL provide a server action `deleteAccount` that validates the password, calls the profile API service, and redirects to sign-in.

#### Scenario: Successful account deletion

- **WHEN** the action receives valid `DeleteAccountDto` data and the API confirms deletion
- **THEN** it SHALL redirect the user to the sign-in page

#### Scenario: Incorrect password

- **WHEN** the API rejects the password
- **THEN** the action SHALL return null without redirecting

### Requirement: Fetch profile read function

The system SHALL provide a plain async function `fetchProfile` (not a server action) that fetches the user's profile using the RSC API service instance, callable from server components.

#### Scenario: Successful profile fetch

- **WHEN** `fetchProfile` is called from a server component
- **THEN** it SHALL return the `ProfileResponseDto` from the API

#### Scenario: API error on fetch

- **WHEN** the profile API returns an error
- **THEN** `fetchProfile` SHALL return null
