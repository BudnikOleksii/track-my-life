## MODIFIED Requirements

### Requirement: Middleware proactively refreshes tokens before RSC rendering

The system SHALL wire the existing `proxy.ts` as Next.js middleware so that token refresh happens before the request reaches server components. The middleware SHALL verify JWT signatures cryptographically using the `jose` library before accepting tokens as valid.

#### Scenario: No tokens on public route passes through

- **WHEN** a request arrives for a public route (sign-in, sign-up, verify-email, auth/callback) without tokens
- **THEN** the middleware SHALL allow the request through without any auth checks
