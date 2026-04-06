## 1. Setup

- [x] 1.1 Install `jose` dependency in `apps/money-tracker`
- [x] 1.2 Add `JWT_SECRET`, `JWT_ISSUER`, `JWT_AUDIENCE` to `.env.example` and environment config

## 2. Middleware JWT Verification

- [x] 2.1 Replace `checkIsTokenExpired()` in `proxy.ts` with `jose` `jwtVerify()` — verify signature, `exp`, `iss`, `aud` claims
- [x] 2.2 Add graceful fallback: if `JWT_SECRET` env var is not set, fall back to expiration-only check with console warning
- [x] 2.3 Update `extractUserIdFromToken()` to use the verified payload from `jose` instead of manual base64 decoding

## 3. Server Action Auth Guard

- [x] 3.1 Create `require-auth.ts` in `apps/money-tracker/src/actions/` with `requireAuth()` function that checks access token cookie and redirects to sign-in if missing
- [x] 3.2 Add `requireAuth()` to category server actions: `create-category.ts`, `update-category.ts`, `delete-category.ts`
- [x] 3.3 Add `requireAuth()` to transaction server actions: `create-transaction.ts`, `update-transaction.ts`, `delete-transaction.ts`, `import-transaction-list.ts`
- [x] 3.4 Add `requireAuth()` to recurring transaction server actions: `create-recurring-transaction.ts`, `update-recurring-transaction.ts`, `delete-recurring-transaction.ts`, `pause-recurring-transaction.ts`, `resume-recurring-transaction.ts`
- [x] 3.5 Add `requireAuth()` to settings server actions: `change-password.ts`, `update-profile.ts`, `delete-account.ts`
- [x] 3.6 Add `requireAuth()` to onboarding server actions: `complete-onboarding.ts`, `update-onboarding-profile.ts`

## 4. Verification

- [x] 4.1 Run type-check, lint, and build to verify no regressions
