## 1. API Services & Shared Layer

- [x] 1.1 Create `OnboardingApiService` in `packages/shared/src/api/services/onboarding-api.service.ts` with `fetchStatus()`, `complete(body)`, and `assignDefaultCategories()` methods
- [x] 1.2 Add `verifyEmail(token: string)` method to existing `AuthApiService` calling `GET /api/auth/verify-email?token=`
- [x] 1.3 Register `onboardingApiService` instances in `rsc-api.ts` and `server-api.ts` (and middleware service setup)

## 2. Middleware — Onboarding Gate Updates

- [x] 2.1 Update `checkOnboardingStatus` in `apps/money-tracker/src/utils/middleware/onboarding.ts` to call `OnboardingApiService.fetchStatus()` instead of `ProfileApiService.fetchProfile()`
- [x] 2.2 Change cookie caching from boolean string to JSON `{ emailVerified, onboardingCompleted }` with updated cookie name (`onboarding_status_<userId>`)
- [x] 2.3 Update `handleOnboardingRedirect` to implement two-tier redirect: unverified email → `/verify-email`, unonboarded → `/onboarding`
- [x] 2.4 Add `/verify-email` awareness to middleware: redirect verified+unonboarded users from `/verify-email` to `/onboarding`, redirect fully onboarded users from `/verify-email` to `/dashboard`
- [x] 2.5 Update `COOKIE` constant in `apps/money-tracker/src/constants/cookie.ts` (rename `ONBOARDING_COMPLETED` to `ONBOARDING_STATUS`)

## 3. Email Verification Page

- [x] 3.1 Update `/verify-email` page server component to read `token` search param and call `authApiService.verifyEmail(token)` when present
- [x] 3.2 Update `VerifyEmailPageContent` to handle three states: waiting (no token), success (valid token), error (invalid token)
- [x] 3.3 Add success state with "Email verified" message and link/redirect to sign-in
- [x] 3.4 Add error state with "Invalid or expired token" message and link to sign-in
- [x] 3.5 Update i18n translations (EN and UK) for new verify-email states

## 4. Onboarding Server Actions

- [x] 4.1 Create `fetchOnboardingStatus` async function in `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/actions/` calling `onboardingApiService.fetchStatus()`
- [x] 4.2 Create `assignDefaultCategories` server action calling `onboardingApiService.assignDefaultCategories()` with categories cache revalidation
- [x] 4.3 Rewrite `completeOnboarding` server action to call `onboardingApiService.complete({ baseCurrencyCode, password? })`, delete status cookie, redirect to `/dashboard`
- [x] 4.4 Remove old `updateOnboardingProfile` server action (no longer needed)

## 5. Onboarding Wizard UI — Currency Step

- [x] 5.1 Create `CurrencyStep` component with searchable currency combobox (reuse `CURRENCY_OPTION_LIST`) and "Continue" button
- [x] 5.2 Add Zod validation schema for currency step (baseCurrencyCode required from `CURRENCY_CODE_LIST`)
- [x] 5.3 Wire "Continue" to navigate to `?step=categories&currency=<code>`

## 6. Onboarding Wizard UI — Categories Step

- [x] 6.1 Create `CategoriesStep` component with two options: "Use default categories" button and file import section
- [x] 6.2 Implement "Use default categories" button calling `assignDefaultCategories` server action, advancing to next step on success
- [x] 6.3 Implement file import section reusing `importTransactionList` server action with file input accepting `.csv` and `.json`
- [x] 6.4 Handle error states (categories already exist, invalid file) with appropriate messages

## 7. Onboarding Wizard UI — Password Step

- [x] 7.1 Create `PasswordStep` component with password and confirm password fields
- [x] 7.2 Add Zod validation schema (min length from `MIN_PASSWORD_LENGTH`, confirm must match)
- [x] 7.3 Wire "Set password" to store password value and trigger onboarding completion
- [x] 7.4 Add "Skip" link to complete onboarding without password

## 8. Onboarding Page & Step Routing

- [x] 8.1 Update onboarding `page.tsx` server component to fetch onboarding status and pass to client components
- [x] 8.2 Implement step routing logic: read `step` and `currency` from search params, redirect to `?step=currency` if `currency` param missing on later steps
- [x] 8.3 Conditionally show password step based on `hasPassword` from onboarding status
- [x] 8.4 Update `StepIndicator` component to reflect new step count (2 or 3 based on `hasPassword`)
- [x] 8.5 Wire final step submission to call `completeOnboarding` server action with collected data

## 9. Cleanup & Removal

- [x] 9.1 Remove `WelcomeStep` component and related files
- [x] 9.2 Remove `ProfileStep` component and related files (including `useOnboardingProfileForm` hook)
- [x] 9.3 Remove `CompleteStep` component and related files
- [x] 9.4 Remove `SkipButton` component from onboarding
- [x] 9.5 Remove old `update-onboarding-profile` and old `complete-onboarding` action files

## 10. i18n Translations

- [x] 10.1 Add/update EN translations for new onboarding steps (currency, categories, password) in `onboarding` namespace
- [x] 10.2 Add/update UK translations for new onboarding steps
- [x] 10.3 Add/update EN and UK translations for verify-email states (waiting, success, error)
