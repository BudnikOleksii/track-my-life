## ADDED Requirements

### Requirement: OnboardingApiService in packages/shared

The system SHALL provide an `OnboardingApiService` class in `packages/shared/src/api/services/onboarding-api.service.ts` following the existing service pattern. The service SHALL expose three methods: `fetchStatus()`, `complete(body)`, and `assignDefaultCategories()`.

#### Scenario: Service instances are created per file

- **WHEN** the onboarding API service is imported
- **THEN** each service file (rsc-api.ts, server-api.ts) exports its own `onboardingApiService` instance, following the existing pattern

### Requirement: Fetch onboarding status

The `fetchStatus()` method SHALL call `GET /api/onboarding/status` and return `OnboardingStatusResponseDto` containing `onboardingCompleted`, `emailVerified`, `hasBaseCurrency`, `hasCategories`, and `hasPassword`.

#### Scenario: Fetch onboarding status for authenticated user

- **WHEN** `onboardingApiService.fetchStatus()` is called with a valid access token
- **THEN** the service returns `OnboardingStatusResponseDto` with the current onboarding state

### Requirement: Complete onboarding

The `complete(body)` method SHALL call `POST /api/onboarding/complete` with `CompleteOnboardingDto` containing `baseCurrencyCode` (required) and `password` (optional). On success it SHALL return `OnboardingStatusResponseDto`.

#### Scenario: Complete onboarding with currency only

- **WHEN** `onboardingApiService.complete({ baseCurrencyCode: 'USD' })` is called
- **THEN** the service sends `POST /api/onboarding/complete` with `{ baseCurrencyCode: 'USD' }` and returns the updated status

#### Scenario: Complete onboarding with currency and password

- **WHEN** `onboardingApiService.complete({ baseCurrencyCode: 'EUR', password: 'secret123' })` is called
- **THEN** the service sends `POST /api/onboarding/complete` with both fields and returns the updated status

### Requirement: Complete onboarding server action

The system SHALL provide a `completeOnboarding` server action that calls `onboardingApiService.complete()` with the collected `baseCurrencyCode` and optional `password`. On success, the action SHALL delete onboarding status cookies and redirect to `/dashboard`.

#### Scenario: Server action completes onboarding and redirects

- **WHEN** the `completeOnboarding` action is invoked with `{ baseCurrencyCode: 'USD' }`
- **THEN** the action calls the complete endpoint, deletes the onboarding status cookie, and redirects to `/dashboard`

### Requirement: Assign default categories server action

The system SHALL provide an `assignDefaultCategories` server action that calls `onboardingApiService.assignDefaultCategories()`. On success, the action SHALL revalidate the categories cache tag.

#### Scenario: Server action assigns default categories

- **WHEN** the `assignDefaultCategories` action is invoked
- **THEN** the action calls the assign-default-categories endpoint and revalidates the `CATEGORIES` cache tag

### Requirement: Fetch onboarding status server action

The system SHALL provide a `fetchOnboardingStatus` server action or async function that calls `onboardingApiService.fetchStatus()` and returns the status for use by the onboarding page components.

#### Scenario: Onboarding page fetches status on load

- **WHEN** the onboarding page server component renders
- **THEN** it calls `fetchOnboardingStatus()` and passes the status to client step components
