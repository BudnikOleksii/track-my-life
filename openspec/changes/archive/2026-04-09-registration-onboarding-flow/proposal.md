## Why

The current registration flow skips email verification enforcement and the onboarding wizard collects first/last name instead of the essential setup steps (currency, categories, optional password). Users can reach the dashboard without a verified email or configured categories, leading to an empty and confusing first experience. The backend now exposes dedicated onboarding endpoints (`/api/onboarding/status`, `/api/onboarding/complete`, `/api/onboarding/assign-default-categories`) that support a proper guided setup flow.

## What Changes

- **Registration redirects to verify-email page** that tells users to check their inbox; clicking the verification link hits `GET /api/auth/verify-email?token=...` and redirects to the frontend onboarding page.
- **Onboarding wizard is redesigned** with new steps:
  1. **Currency step** - select default base currency (required).
  2. **Categories step** - either import CSV/JSON (reuses existing transaction import flow) or click a button to assign base/default categories via `POST /api/onboarding/assign-default-categories`.
  3. **Password step** (optional) - for social-auth users to set a password so they can also log in with email+password. Uses the `password` field in `CompleteOnboardingDto`.
- **First name / last name fields removed** from onboarding (can still be set in profile settings).
- **Welcome step removed** - onboarding starts directly with the currency step.
- **Complete step removed** - completing happens automatically after submitting categories step (calls `POST /api/onboarding/complete`).
- **Onboarding gate middleware updated** to also check `emailVerified` status from `OnboardingStatusResponseDto` and redirect unverified users back to verify-email page.
- **Social auth callback** redirects new users to onboarding instead of dashboard (already handled by middleware gate, but verify it works with the new email verification check - social auth users have email pre-verified by provider).

## Capabilities

### New Capabilities

- `email-verification-flow`: Covers the email verification page UI (waiting state), the verify-email callback handling (token exchange + redirect to onboarding), and the middleware enforcement that unverified-email users cannot proceed past verify-email.
- `onboarding-category-setup`: Covers the new onboarding step where users choose between importing a CSV/JSON file or assigning base default categories. Includes the "assign default categories" button calling `POST /api/onboarding/assign-default-categories`.
- `onboarding-password-setup`: Covers the optional password setup step for social-auth users during onboarding. Uses the `password` field in `CompleteOnboardingDto`.
- `onboarding-completion-api`: Covers the integration with `POST /api/onboarding/complete` and `GET /api/onboarding/status` endpoints, replacing the old profile-update-based completion.

### Modified Capabilities

- `onboarding-wizard-ui`: Remove welcome step, remove complete step, remove first/last name from profile step, restructure steps to: currency -> categories -> password (optional) -> auto-complete.
- `onboarding-gate`: Add email verification check - unverified users redirect to verify-email page. Use `GET /api/onboarding/status` instead of profile fetch for status checks.

## Impact

- **Routes**: New verify-email callback route or update existing `/verify-email` page to handle `?token=` param. Onboarding page steps change from `welcome/profile/complete` to `currency/categories/password`.
- **Middleware**: `checkOnboardingStatus()` in `apps/money-tracker/src/utils/middleware/onboarding.ts` changes to call onboarding status endpoint and check `emailVerified` field.
- **API services**: New `onboarding-api.service.ts` in `packages/shared` for onboarding endpoints (`getStatus`, `complete`, `assignDefaultCategories`). New `verify-email` endpoint integration in auth service.
- **Server actions**: New actions for onboarding completion, default category assignment. Remove/update `update-onboarding-profile` and `complete-onboarding` actions.
- **Components**: Onboarding step components rewritten. Import transaction components may be reused/extracted for the categories step.
- **Cookies**: Onboarding status cookie caching may need updates to include email verification state.
- **i18n**: New translation keys for verification messages, new onboarding step labels, category setup options.
