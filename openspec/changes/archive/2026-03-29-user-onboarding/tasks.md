## 1. Profile Model & API

- [x] 1.1 Add `onboardingCompleted` field to the profile type in the shared API client (update OpenAPI spec or generated types)
- [x] 1.2 Update `ProfileApiService` to include `onboardingCompleted` in fetch and update operations
- [x] 1.3 Verify settings profile form preserves `onboardingCompleted` when submitting other fields

## 2. Onboarding Gate (Middleware)

- [x] 2.1 Add `/onboarding` to the known routes in `paths.ts` constants
- [x] 2.2 Extend `proxy.ts` to fetch profile and check `onboardingCompleted` after token validation
- [x] 2.3 Implement onboarding status cookie caching to avoid repeated profile fetches
- [x] 2.4 Add redirect logic: unonboarded users → `/onboarding`, onboarded users on `/onboarding` → `/dashboard`
- [x] 2.5 Ensure public routes (`/sign-in`, `/sign-up`, `/verify-email`) bypass the onboarding gate

## 3. Onboarding Layout & Route

- [x] 3.1 Create `(onboarding-layout)` route group with a centered layout (no sidebar/header)
- [x] 3.2 Create `/onboarding` page with search param-based step routing (`welcome`, `profile`, `complete`)

## 4. Onboarding Wizard UI

- [x] 4.1 Create step indicator component (3-step dots/progress)
- [x] 4.2 Implement welcome step with app name, welcome message, and "Get Started" button
- [x] 4.3 Implement profile step reusing `profileFormSchema` with first name, last name, country combobox, and currency combobox
- [x] 4.4 Create profile update server action for the onboarding flow
- [x] 4.5 Implement completion step with success message and "Go to Dashboard" button
- [x] 4.6 Implement "Skip" link on all steps that sets `onboardingCompleted: true` and redirects to dashboard

## 5. Internationalization

- [x] 5.1 Create `onboarding` i18n namespace with EN translations
- [x] 5.2 Add UK (Ukrainian) translations for the onboarding namespace
- [x] 5.3 Register the onboarding namespace in the i18n configuration

## 6. Testing & Verification

- [x] 6.1 Verify onboarding gate redirects work correctly for unonboarded and onboarded users
- [x] 6.2 Verify wizard step navigation (welcome → profile → complete)
- [x] 6.3 Verify profile submission from the wizard updates the profile correctly
- [x] 6.4 Verify skip flow sets `onboardingCompleted` and redirects to dashboard
- [x] 6.5 Verify existing users are not affected (treated as onboarded)
