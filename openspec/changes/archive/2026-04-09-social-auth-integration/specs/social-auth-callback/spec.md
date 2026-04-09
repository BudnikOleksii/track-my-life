## ADDED Requirements

### Requirement: OAuth callback page exchanges authorization code for access token

The system SHALL provide a page at `/auth/callback` that reads the `code` query parameter from the URL, exchanges it with the backend via `POST /api/auth/social/exchange`, stores the resulting access token in a cookie, and redirects the user to the dashboard.

#### Scenario: Successful code exchange redirects to dashboard

- **WHEN** the callback page loads with a `code` query parameter
- **THEN** the system SHALL call the `exchangeSocialCode` server action with the code, store the access token cookie, forward response cookies, and redirect to the dashboard

#### Scenario: Successful code exchange for new user triggers onboarding

- **WHEN** the callback page loads with a valid `code` and the user has not completed onboarding
- **THEN** the middleware onboarding gate SHALL redirect the user to the onboarding page after token exchange (existing middleware behavior)

### Requirement: OAuth callback page displays social auth errors

The system SHALL display user-friendly error messages when the callback URL contains `?error=auth_failed` with a `reason` parameter.

#### Scenario: Email already exists error

- **WHEN** the callback page loads with `?error=auth_failed&reason=email_exists`
- **THEN** the system SHALL display a message indicating the email is already registered via a different sign-in method, with a link to the sign-in page

#### Scenario: Unknown error

- **WHEN** the callback page loads with `?error=auth_failed&reason=unknown` or any unrecognized reason
- **THEN** the system SHALL display a generic error message with a link to retry sign-in

#### Scenario: Code exchange fails

- **WHEN** the callback page loads with a `code` but the `POST /api/auth/social/exchange` request fails
- **THEN** the system SHALL display a generic error message with a link to the sign-in page

### Requirement: OAuth callback page shows loading state during exchange

The system SHALL display a loading indicator while the authorization code exchange is in progress.

#### Scenario: Loading state during code exchange

- **WHEN** the callback page initiates the code exchange
- **THEN** the system SHALL display a loading spinner or message until the exchange completes or fails

### Requirement: Auth API service supports social code exchange

The `AuthApiService` SHALL expose an `exchangeSocialCode` method that calls `POST /api/auth/social/exchange` with an `ExchangeSocialCodeDto` body and returns an `AuthControllerExchangeSocialCodeResponse`.

#### Scenario: Exchange social code API call

- **WHEN** `exchangeSocialCode({ code })` is called
- **THEN** the service SHALL send a POST request to `/api/auth/social/exchange` with `credentials: 'include'` and return the typed response

### Requirement: Callback route i18n translations

The system SHALL provide i18n translations for all social auth callback error messages in both `en` and `uk` locales.

#### Scenario: Error messages are translated

- **WHEN** a social auth error is displayed on the callback page
- **THEN** the error message SHALL use translated strings from the `authShared` i18n namespace
