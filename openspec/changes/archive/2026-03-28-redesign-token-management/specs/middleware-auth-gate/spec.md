## ADDED Requirements

### Requirement: Middleware proactively refreshes tokens before RSC rendering

The system SHALL wire the existing `proxy.ts` as Next.js middleware so that token refresh happens before the request reaches server components.

#### Scenario: Valid access token passes through

- **WHEN** a request arrives with a valid, non-expired access token
- **THEN** the middleware SHALL pass the request through to the Next.js router without modification

#### Scenario: Missing access token triggers refresh

- **WHEN** a request arrives without an access token but with a valid refresh token
- **THEN** the middleware SHALL refresh the token pair, set updated cookies on the response, and allow the request to proceed

#### Scenario: Refresh failure redirects to sign-in

- **WHEN** token refresh fails (invalid refresh token, backend unavailable)
- **THEN** the middleware SHALL clear both token cookies and redirect to the sign-in page

#### Scenario: No tokens on public route passes through

- **WHEN** a request arrives for a public route (sign-in, sign-up, verify-email) without tokens
- **THEN** the middleware SHALL allow the request through without any auth checks

### Requirement: Middleware uses ReadWriteTokenProvider for cookie management

The middleware SHALL use `MiddlewareTokenProvider` (implementing `ReadWriteTokenProvider`) to read and write token cookies on the middleware request/response objects.

#### Scenario: Refreshed tokens persisted via middleware cookies

- **WHEN** the middleware successfully refreshes a token pair
- **THEN** it SHALL call `setTokenPair` on the `MiddlewareTokenProvider` to set `access_token` and `refresh_token` as httpOnly cookies on the response
