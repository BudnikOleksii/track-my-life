## ADDED Requirements

### Requirement: Middleware proactively refreshes tokens before RSC rendering

The system SHALL wire the existing `proxy.ts` as Next.js middleware so that token refresh happens before the request reaches server components. The middleware SHALL verify JWT signatures cryptographically using the `jose` library before accepting tokens as valid.

#### Scenario: Valid access token with valid signature passes through

- **WHEN** a request arrives with an access token that has a valid cryptographic signature, valid issuer, valid audience, and is not expired
- **THEN** the middleware SHALL pass the request through to the Next.js router without modification

#### Scenario: Token with invalid signature triggers refresh

- **WHEN** a request arrives with an access token that has an invalid or tampered cryptographic signature
- **THEN** the middleware SHALL treat the token as expired and attempt token refresh

#### Scenario: Token with wrong issuer triggers refresh

- **WHEN** a request arrives with an access token where the `iss` claim does not match the expected issuer
- **THEN** the middleware SHALL treat the token as invalid and attempt token refresh

#### Scenario: Token with wrong audience triggers refresh

- **WHEN** a request arrives with an access token where the `aud` claim does not match the expected audience
- **THEN** the middleware SHALL treat the token as invalid and attempt token refresh

#### Scenario: Expired token triggers refresh

- **WHEN** a request arrives with an access token that has a valid signature but the `exp` claim is in the past
- **THEN** the middleware SHALL attempt token refresh

#### Scenario: Missing access token triggers refresh

- **WHEN** a request arrives without an access token but with a valid refresh token
- **THEN** the middleware SHALL refresh the token pair, set updated cookies on the response, and allow the request to proceed

#### Scenario: Refresh failure redirects to sign-in

- **WHEN** token refresh fails (invalid refresh token, backend unavailable)
- **THEN** the middleware SHALL clear both token cookies and redirect to the sign-in page

#### Scenario: No tokens on public route passes through

- **WHEN** a request arrives for a public route (sign-in, sign-up, verify-email, auth/callback) without tokens
- **THEN** the middleware SHALL allow the request through without any auth checks

#### Scenario: Graceful fallback when JWT secret is not configured

- **WHEN** the `JWT_SECRET` environment variable is not set
- **THEN** the middleware SHALL fall back to expiration-only validation (current behavior) and log a warning

### Requirement: Middleware uses ReadWriteTokenProvider for cookie management

The middleware SHALL use `MiddlewareTokenProvider` (implementing `ReadWriteTokenProvider`) to read and write token cookies on the middleware request/response objects.

#### Scenario: Refreshed tokens persisted via middleware cookies

- **WHEN** the middleware successfully refreshes a token pair
- **THEN** it SHALL call `setTokenPair` on the `MiddlewareTokenProvider` to set `access_token` and `refresh_token` as httpOnly cookies on the response
