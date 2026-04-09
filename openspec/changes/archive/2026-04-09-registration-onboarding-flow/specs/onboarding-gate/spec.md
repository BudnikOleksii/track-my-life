## MODIFIED Requirements

### Requirement: Redirect unonboarded users to onboarding

The system SHALL redirect authenticated users whose onboarding status has `onboardingCompleted` equal to `false` to the `/onboarding` route when they attempt to access any app route (dashboard, transactions, categories, budgets, settings). The system SHALL fetch onboarding status from `GET /api/onboarding/status` instead of the profile endpoint.

#### Scenario: Unonboarded user tries to access dashboard

- **WHEN** an authenticated user with `onboardingCompleted: false` and `emailVerified: true` navigates to `/dashboard`
- **THEN** the system redirects them to `/onboarding`

#### Scenario: Unonboarded user tries to access any app route

- **WHEN** an authenticated user with `onboardingCompleted: false` and `emailVerified: true` navigates to `/transactions`, `/categories`, `/budgets`, or `/settings`
- **THEN** the system redirects them to `/onboarding`

### Requirement: Cache onboarding status

The system SHALL cache the onboarding status in a cookie as JSON (`{ emailVerified, onboardingCompleted }`) after the first status fetch to avoid repeated API calls in middleware. The cookie SHALL be keyed by user ID (`onboarding_status_<userId>`). The cookie SHALL be updated when onboarding is completed.

#### Scenario: Subsequent requests use cached status

- **WHEN** an authenticated user makes a second request after their onboarding status was already fetched
- **THEN** the system reads the cached JSON cookie instead of calling the onboarding status endpoint again

#### Scenario: Cache is invalidated on onboarding completion

- **WHEN** the user completes onboarding via `POST /api/onboarding/complete`
- **THEN** the onboarding status cookie is deleted so the next middleware check fetches fresh status

### Requirement: Public routes bypass onboarding gate

The system SHALL NOT apply onboarding redirect logic to public routes (`/sign-in`, `/sign-up`, `/verify-email`) or to the `/onboarding` route itself.

#### Scenario: Unauthenticated user accesses sign-in

- **WHEN** an unauthenticated user navigates to `/sign-in`
- **THEN** the system renders the sign-in page without any onboarding redirect

### Requirement: Allow onboarded users to access app routes

The system SHALL allow authenticated users whose onboarding status has `onboardingCompleted` equal to `true` to access all app routes without redirection to onboarding.

#### Scenario: Onboarded user accesses dashboard

- **WHEN** an authenticated user with `onboardingCompleted: true` navigates to `/dashboard`
- **THEN** the system renders the dashboard normally without redirection

### Requirement: Prevent onboarded users from accessing onboarding

The system SHALL redirect authenticated users whose onboarding status has `onboardingCompleted` equal to `true` away from the `/onboarding` route to `/dashboard`.

#### Scenario: Onboarded user navigates to onboarding

- **WHEN** an authenticated user with `onboardingCompleted: true` navigates to `/onboarding`
- **THEN** the system redirects them to `/dashboard`

## ADDED Requirements

### Requirement: Redirect unverified email users to verify-email page

The system SHALL redirect authenticated users whose onboarding status has `emailVerified` equal to `false` to the `/verify-email` route when they attempt to access any app route or the onboarding route. This check SHALL take priority over the onboarding completion check.

#### Scenario: Unverified user tries to access dashboard

- **WHEN** an authenticated user with `emailVerified: false` navigates to `/dashboard`
- **THEN** the system redirects them to `/verify-email`

#### Scenario: Unverified user tries to access onboarding

- **WHEN** an authenticated user with `emailVerified: false` navigates to `/onboarding`
- **THEN** the system redirects them to `/verify-email`

#### Scenario: Verified user is not redirected to verify-email

- **WHEN** an authenticated user with `emailVerified: true` navigates to `/dashboard`
- **THEN** the system does NOT redirect them to `/verify-email` (proceeds with normal onboarding check)

### Requirement: Use onboarding status endpoint instead of profile

The middleware SHALL call `GET /api/onboarding/status` (via `OnboardingApiService.fetchStatus()`) to check both `emailVerified` and `onboardingCompleted` fields, replacing the previous `GET /api/profile` call.

#### Scenario: Middleware fetches onboarding status

- **WHEN** an authenticated user makes a request to a protected route and no cached status exists
- **THEN** the middleware calls `GET /api/onboarding/status` and uses the response to determine redirect behavior

### Requirement: Verify-email path added to onboarding gate awareness

The middleware SHALL recognize `/verify-email` as a special path. When a user with `emailVerified: true` but `onboardingCompleted: false` navigates to `/verify-email`, the system SHALL redirect them to `/onboarding`. When a user with `emailVerified: true` and `onboardingCompleted: true` navigates to `/verify-email`, the system SHALL redirect them to `/dashboard`.

#### Scenario: Verified but unonboarded user on verify-email page

- **WHEN** an authenticated user with `emailVerified: true` and `onboardingCompleted: false` navigates to `/verify-email`
- **THEN** the system redirects them to `/onboarding`

#### Scenario: Fully onboarded user on verify-email page

- **WHEN** an authenticated user with `emailVerified: true` and `onboardingCompleted: true` navigates to `/verify-email`
- **THEN** the system redirects them to `/dashboard`
