### Requirement: Redirect unonboarded users to onboarding

The system SHALL redirect authenticated users whose profile has `onboardingCompleted` equal to `false` (or absent) to the `/onboarding` route when they attempt to access any app route (dashboard, transactions, categories, budgets, settings).

#### Scenario: Unonboarded user tries to access dashboard

- **WHEN** an authenticated user with `onboardingCompleted: false` navigates to `/dashboard`
- **THEN** the system redirects them to `/onboarding`

#### Scenario: Unonboarded user tries to access any app route

- **WHEN** an authenticated user with `onboardingCompleted: false` navigates to `/transactions`, `/categories`, `/budgets`, or `/settings`
- **THEN** the system redirects them to `/onboarding`

### Requirement: Allow onboarded users to access app routes

The system SHALL allow authenticated users whose profile has `onboardingCompleted` equal to `true` to access all app routes without redirection to onboarding.

#### Scenario: Onboarded user accesses dashboard

- **WHEN** an authenticated user with `onboardingCompleted: true` navigates to `/dashboard`
- **THEN** the system renders the dashboard normally without redirection

### Requirement: Prevent onboarded users from accessing onboarding

The system SHALL redirect authenticated users whose profile has `onboardingCompleted` equal to `true` away from the `/onboarding` route to `/dashboard`.

#### Scenario: Onboarded user navigates to onboarding

- **WHEN** an authenticated user with `onboardingCompleted: true` navigates to `/onboarding`
- **THEN** the system redirects them to `/dashboard`

### Requirement: Cache onboarding status

The system SHALL cache the `onboardingCompleted` status in a cookie after the first profile fetch to avoid repeated API calls in middleware. The cookie SHALL be updated when the profile is updated (e.g., when onboarding is completed).

#### Scenario: Subsequent requests use cached status

- **WHEN** an authenticated user makes a second request after their profile was already fetched
- **THEN** the system reads `onboardingCompleted` from the cached cookie instead of fetching the profile again

#### Scenario: Cache is invalidated on profile update

- **WHEN** the user completes onboarding and the profile is updated with `onboardingCompleted: true`
- **THEN** the cached cookie is updated to reflect the new status

### Requirement: Public routes bypass onboarding gate

The system SHALL NOT apply onboarding redirect logic to public routes (`/sign-in`, `/sign-up`, `/verify-email`) or to the `/onboarding` route itself.

#### Scenario: Unauthenticated user accesses sign-in

- **WHEN** an unauthenticated user navigates to `/sign-in`
- **THEN** the system renders the sign-in page without any onboarding redirect
