## Why

The middleware validates JWTs by manually base64-decoding the payload and checking only the `exp` claim — no signature verification, no issuer/audience checks. Additionally, all 17 protected server actions lack explicit auth guards, relying entirely on middleware and the API interceptor. If middleware is bypassed (e.g., direct server action invocation) or a tampered token is presented, unauthenticated or forged requests can reach business logic.

## What Changes

- Replace manual JWT base64 decoding in `proxy.ts` with proper `jose` library verification (signature, `exp`, `iss`, `aud` claims)
- Extract JWT verification config (secret, issuer, audience) into environment variables
- Create a reusable `requireAuth()` guard utility for server actions that verifies the access token cookie exists and is valid before proceeding
- Add `requireAuth()` call to all 17 protected server actions (categories, transactions, settings, onboarding)
- Redirect to sign-in when auth guard fails in server actions

## Capabilities

### New Capabilities

- `server-action-auth-guard`: A reusable auth guard function for server actions that verifies authentication before executing business logic

### Modified Capabilities

- `middleware-auth-gate`: JWT validation upgraded from manual base64 decode to cryptographic signature verification with standard claim checks

## Impact

- **Files modified**: `apps/money-tracker/src/proxy.ts`, all 17 protected server action files
- **Files added**: auth guard utility module
- **Dependencies**: `jose` library (lightweight, Edge-compatible JWT verification — no Node.js crypto dependency)
- **Environment**: New env vars for JWT secret, issuer, audience
- **Breaking**: None — behavior is unchanged for valid tokens; only invalid/tampered tokens are now properly rejected
