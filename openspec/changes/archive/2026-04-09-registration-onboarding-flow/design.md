## Context

The money-tracker app has a 3-step onboarding wizard (welcome -> profile with name/country/currency -> complete) that marks `onboardingCompleted: true` via a profile update. The backend now exposes dedicated onboarding endpoints (`/api/onboarding/status`, `/api/onboarding/complete`, `/api/onboarding/assign-default-categories`) and email verification (`GET /api/auth/verify-email?token=`). The current verify-email page is display-only with no token handling. The middleware gate checks onboarding status by fetching the profile, not the dedicated onboarding status endpoint.

## Goals / Non-Goals

**Goals:**

- Enforce email verification before onboarding access
- Replace the profile-based onboarding completion with the dedicated onboarding API
- Redesign onboarding steps: currency (required) -> categories (required, via import or base categories) -> password (optional, social-auth users only)
- Remove first/last name and welcome/complete steps from onboarding
- Create `OnboardingApiService` in `packages/shared` for the three new endpoints
- Integrate email verification token handling on the verify-email page

**Non-Goals:**

- Resend verification email functionality (backend doesn't expose this yet)
- Password strength meter or password requirements display
- Changing the settings profile page (name fields remain there)
- Modifying the admin default-categories management
- Changing the social auth OAuth flow itself (Google/GitHub buttons stay the same)

## Decisions

### 1. Onboarding status source: dedicated endpoint vs profile

Use `GET /api/onboarding/status` returning `OnboardingStatusResponseDto` (with `emailVerified`, `hasBaseCurrency`, `hasCategories`, `hasPassword`) instead of `GET /api/profile`. This gives granular status without over-fetching profile data.

**Alternative**: Continue using profile endpoint. Rejected because profile only has `onboardingCompleted` boolean without breakdown of which steps are done.

### 2. Email verification handling: same verify-email page with token query param

The existing `/verify-email` page handles two states:

- No `token` param: show "check your email" message (current behavior after registration)
- With `token` param: call `GET /api/auth/verify-email?token=` via server action, show success/error, then redirect to `/onboarding`

**Alternative**: Separate `/verify-email/callback` route. Rejected to keep the route structure simple — one page, two states.

### 3. Verify-email as a protected "semi-public" path

The `/verify-email` page needs to be accessible:

- After registration (user has token, email not verified)
- When clicking the verification link (might not have token if session expired)

Keep `/verify-email` in the public paths list. The verification link from email includes a `token` query param. When the token is validated successfully by the backend, the user needs to log in (or already has a session) and gets redirected to onboarding.

### 4. Middleware gate: two-tier check (email verified + onboarding completed)

Update `checkOnboardingStatus` to call the onboarding status endpoint and return a richer result:

- If `emailVerified: false` → redirect to `/verify-email`
- If `onboardingCompleted: false` → redirect to `/onboarding`
- If `onboardingCompleted: true` → allow access

Cache the full status in the cookie (encode as JSON: `{ emailVerified, onboardingCompleted }`) instead of just a boolean string.

**Alternative**: Two separate cookies. Rejected because a single JSON cookie is simpler and the two values are always checked together.

### 5. Onboarding step navigation: URL search params

Keep the existing `?step=` URL pattern. Steps become: `currency` (default), `categories`, `password`. The onboarding page reads `step` from search params and renders the corresponding component. The `password` step is only shown if `hasPassword: false` (social auth user without password).

### 6. Categories step: two paths in one step

The categories step shows two options:

1. "Use default categories" button → calls `POST /api/onboarding/assign-default-categories` server action → on success moves to next step
2. "Import from file" button → navigates to `/transactions/import` with a return URL param (e.g., `?returnTo=/onboarding?step=password`)

For the import path, the existing `/transactions/import` page is inside `(app-layout)` which requires onboarding completed. Instead of moving that page, add `/onboarding?step=categories` with an inline import UI that reuses the import server action (`importTransactionList`) but renders within the onboarding layout. This avoids the circular dependency of needing to access an app route before onboarding is complete.

**Alternative**: Move import page out of app-layout. Rejected because it would affect the existing import page's layout and routing.

### 7. Onboarding completion: auto-complete after categories

After the categories step (either base categories assigned or file imported), the system calls `POST /api/onboarding/complete` with `{ baseCurrencyCode }` (collected in step 1) and optionally `password` (from step 3 if social user). This happens in the final submit action — either after the password step or after categories if the user already has a password.

Step flow:

1. Currency step → stores `baseCurrencyCode` in form state
2. Categories step → assigns categories (base or import)
3. Password step (only if `!hasPassword`) → collects optional password
4. Final action: `POST /api/onboarding/complete` with `{ baseCurrencyCode, password? }` → redirects to `/dashboard`

If user has a password already (email/password registration), skip the password step and call complete after categories.

### 8. OnboardingApiService placement

Create `packages/shared/src/api/services/onboarding-api.service.ts` following the existing service pattern (each service file exports its own instance). Methods: `fetchStatus()`, `complete(body)`, `assignDefaultCategories()`.

### 9. Verify email token exchange: server component approach

The verify-email page with `?token=` param uses an RSC that calls the backend `GET /api/auth/verify-email?token=` during server render. On success, show a success message with a link/redirect to sign-in or onboarding. On error, show an error message. No server action needed for this — it's a GET endpoint triggered by clicking an email link.

## Risks / Trade-offs

- **[Risk] Import within onboarding layout** — Reusing the import logic inside onboarding means duplicating some UI (file input, preview table) or extracting shared components. → Mitigation: Extract the import UI into reusable components that both the onboarding categories step and the app-layout import page can use. Only extract what's needed (file input + action trigger), the preview table can stay in the app-layout import page.
- **[Risk] Cookie size with JSON status** — JSON cookie `{ emailVerified, onboardingCompleted }` is slightly larger than a boolean string. → Mitigation: The JSON is tiny (~50 bytes), well within cookie size limits.
- **[Risk] Social auth users and email verification** — Social auth users get their email verified by the provider, so `emailVerified` should already be `true` after social auth registration. → Mitigation: The middleware check handles this — social users skip the verify-email page naturally.
- **[Risk] Multi-step form state loss on refresh** — Currency value selected in step 1 needs to persist to the final completion call. → Mitigation: Store the `baseCurrencyCode` in URL search params (e.g., `?step=categories&currency=USD`) or a small cookie. URL params are preferred for simplicity and bookmark-ability.
