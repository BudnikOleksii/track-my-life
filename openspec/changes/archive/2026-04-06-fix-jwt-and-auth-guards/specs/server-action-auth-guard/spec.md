## ADDED Requirements

### Requirement: Server actions require authentication before executing business logic

The system SHALL provide a `requireAuth()` function that verifies the caller is authenticated by checking the access token cookie. All protected server actions SHALL call `requireAuth()` as their first operation.

#### Scenario: Authenticated user with valid token

- **WHEN** a server action calls `requireAuth()` and the access token cookie is present
- **THEN** the function SHALL return without error and the server action SHALL proceed with its business logic

#### Scenario: Unauthenticated user without token

- **WHEN** a server action calls `requireAuth()` and the access token cookie is missing
- **THEN** the function SHALL redirect to the sign-in page using `redirect()` from `next/navigation`

#### Scenario: Empty access token cookie

- **WHEN** a server action calls `requireAuth()` and the access token cookie exists but is an empty string
- **THEN** the function SHALL redirect to the sign-in page

### Requirement: All protected server actions use the auth guard

The system SHALL add `requireAuth()` to every protected server action. The following server actions SHALL be guarded:

- Category actions: create, update, delete
- Transaction actions: create, update, delete, import
- Recurring transaction actions: create, update, delete, pause, resume
- Settings actions: change password, update profile, delete account
- Onboarding actions: complete onboarding, update onboarding profile

#### Scenario: Category creation requires auth

- **WHEN** an unauthenticated caller invokes the create category server action
- **THEN** the action SHALL redirect to sign-in before any API call is made

#### Scenario: Transaction deletion requires auth

- **WHEN** an unauthenticated caller invokes the delete transaction server action
- **THEN** the action SHALL redirect to sign-in before any API call is made

#### Scenario: Settings change requires auth

- **WHEN** an unauthenticated caller invokes the change password server action
- **THEN** the action SHALL redirect to sign-in before any API call is made

### Requirement: Auth-related server actions are NOT guarded

The sign-in, sign-up, and sign-out server actions SHALL NOT use `requireAuth()` since they handle authentication flow themselves.

#### Scenario: Sign-in action accessible without token

- **WHEN** an unauthenticated caller invokes the sign-in server action
- **THEN** the action SHALL proceed without any auth guard check

#### Scenario: Sign-up action accessible without token

- **WHEN** an unauthenticated caller invokes the sign-up server action
- **THEN** the action SHALL proceed without any auth guard check
