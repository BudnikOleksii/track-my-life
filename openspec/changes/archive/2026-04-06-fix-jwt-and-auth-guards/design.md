## Context

The middleware (`proxy.ts`) currently validates JWTs by base64-decoding the payload and checking the `exp` claim. This means any string that looks like a JWT with a future expiration will pass validation, even if the signature is invalid or the token was crafted by an attacker. Server actions have no auth checks at all — they rely on middleware running first and the backend API rejecting unauthorized requests.

The app uses a NestJS backend that issues JWTs. The middleware runs on the Edge runtime (Next.js middleware constraint). There are 20 server action files total: 3 are auth-related (sign-in, sign-up, sign-out) and 17 are protected.

## Goals / Non-Goals

**Goals:**

- Verify JWT signature in middleware, not just expiration
- Validate standard claims (`exp`, `iss`, `aud`) in middleware
- Add a reusable auth guard for server actions that checks token presence
- Apply the guard to all 17 protected server actions

**Non-Goals:**

- Making access token cookie HttpOnly (backlog item #2 — separate concern)
- Role-based or permission-based authorization (not needed yet)
- Validating JWTs cryptographically in server actions (middleware handles this; server actions just check token existence since the backend API does its own full validation)
- Changing the token refresh flow

## Decisions

### Decision 1: Use `jose` for JWT verification

**Choice**: `jose` library over `jsonwebtoken`

**Rationale**: `jose` is Edge-runtime compatible (no Node.js `crypto` dependency), actively maintained, and supports all standard JWT operations. `jsonwebtoken` requires Node.js `crypto` module which is unavailable in Edge middleware. `jose` is already the standard choice for Next.js middleware JWT verification.

### Decision 2: Server action auth guard checks token existence only (no cryptographic verification)

**Choice**: The `requireAuth()` guard in server actions will check that an access token cookie exists and redirect to sign-in if missing. It will NOT perform cryptographic signature verification.

**Rationale**: Middleware already runs before server actions and performs full JWT verification. The server action guard is defense-in-depth for the case where middleware is bypassed or misconfigured. The backend API performs its own full JWT validation on every request. Adding crypto verification in server actions would add latency to every mutation without meaningful security benefit given this double-gate architecture.

### Decision 3: Auth guard uses `redirect()` from `next/navigation`

**Choice**: On missing token, the guard calls `redirect('/sign-in')` which throws a Next.js redirect.

**Rationale**: Server actions that fail auth should redirect to sign-in, matching the middleware behavior. Using `redirect()` is the idiomatic Next.js pattern and automatically handles the redirect response for both RSC and client component invocations.

### Decision 4: Place auth guard in `apps/money-tracker/src/actions/`

**Choice**: Create `require-auth.ts` in the app-level shared actions directory.

**Rationale**: The guard is app-specific (uses `next/navigation` redirect and app-specific routes). It's used across multiple features (categories, transactions, settings, onboarding). This matches the project's shared code placement guide for app-wide utilities used across features.

### Decision 5: JWT secret, issuer, and audience from environment variables

**Choice**: Read `JWT_SECRET`, `JWT_ISSUER`, `JWT_AUDIENCE` from `process.env` at verification time.

**Rationale**: These values are deployment-specific. The backend already defines these; the frontend middleware needs matching values to verify signatures. Using env vars follows standard practice and allows different values per environment.

## Risks / Trade-offs

- **[Risk] JWT secret must be shared between backend and middleware** → The backend's JWT signing secret must be available to the Next.js app as an env var. This is standard for symmetric JWT verification but requires secure secret management.
- **[Risk] `jose` adds a new dependency** → `jose` is lightweight (~30KB), zero-dependency, and widely adopted. The risk is minimal.
- **[Trade-off] Server action guard doesn't verify signatures** → Accepted because middleware + backend API both verify. Adding a third verification point adds latency without proportional security gain.
- **[Risk] Existing valid sessions may be invalidated if env vars are misconfigured** → Mitigation: if `JWT_SECRET` is not set, fall back to current behavior (expiration-only check) and log a warning. This prevents a deploy misconfiguration from locking out all users.
