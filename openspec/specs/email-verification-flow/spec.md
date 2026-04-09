### Requirement: Verify-email page shows waiting state after registration

The system SHALL display a "check your email" message with the app logo when the `/verify-email` page loads without a `token` query parameter. The page SHALL include a link to the sign-in page.

#### Scenario: User sees waiting state after registration

- **WHEN** an authenticated user navigates to `/verify-email` without a `token` param
- **THEN** the system displays a card with a title, a message instructing the user to check their inbox, and a link to sign-in

### Requirement: Verify-email page handles token verification

The system SHALL verify the email when the `/verify-email` page loads with a `token` query parameter. The page server component SHALL call `GET /api/auth/verify-email?token=` during render. On success, the page SHALL display a success message and a link to sign-in. On error, the page SHALL display an error message with a link to sign-in.

#### Scenario: Valid verification token

- **WHEN** the `/verify-email` page loads with a valid `token` query parameter
- **THEN** the system calls the verify-email endpoint, displays a success message ("Email verified"), and shows a link to sign-in

#### Scenario: Invalid or expired verification token

- **WHEN** the `/verify-email` page loads with an invalid or expired `token` query parameter
- **THEN** the system displays an error message indicating the token is invalid or expired, and shows a link to sign-in

### Requirement: Auth API service exposes verify-email method

The `AuthApiService` in `packages/shared` SHALL expose a `verifyEmail(token: string)` method that calls `GET /api/auth/verify-email?token=`.

#### Scenario: Auth service calls verify-email endpoint

- **WHEN** `authApiService.verifyEmail(token)` is called
- **THEN** the service sends `GET /api/auth/verify-email?token=<token>` to the backend and returns the response

### Requirement: Registration redirects to verify-email page

The sign-up server action SHALL redirect to `/verify-email` after successful registration (existing behavior, no change).

#### Scenario: Successful registration redirects to verify-email

- **WHEN** a user submits valid registration credentials
- **THEN** the system registers the user, stores the access token, and redirects to `/verify-email`

### Requirement: Verify-email page uses i18n translations

All verify-email page text (title, messages, links) SHALL use `next-intl` translations under the `verifyEmail` namespace.

#### Scenario: Verify-email page displays in user locale

- **WHEN** the user's locale is UK (Ukrainian)
- **THEN** all verify-email text is displayed in Ukrainian
