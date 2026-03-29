## Why

New users land directly on the dashboard after first login with no profile configured (no name, country, or base currency). This means the app displays incomplete data and the user misses critical setup steps. A guided onboarding wizard after registration ensures users configure their profile and understand key features before using the app, leading to better data quality and a smoother first experience.

## What Changes

- Add a multi-step onboarding wizard that appears after first login (before reaching the dashboard)
- Wizard steps: welcome screen, profile setup (name, country, base currency), initial category setup prompt, and a completion screen with quick feature overview
- Add an `onboardingCompleted` flag to the user profile to track whether onboarding has been finished
- Add middleware/route logic to redirect unonboarded users to the onboarding flow
- Allow users to skip onboarding (marks as completed without full setup)

## Capabilities

### New Capabilities

- `onboarding-wizard-ui`: Multi-step onboarding wizard with welcome, profile setup, category prompt, and completion steps
- `onboarding-gate`: Route guard that redirects unonboarded users to the onboarding flow and prevents access to app routes until onboarding is completed or skipped

### Modified Capabilities

- `profile-api-service`: Add `onboardingCompleted` field to the profile model and update/fetch endpoints
- `profile-settings-ui`: Profile form should reflect the `onboardingCompleted` state (no functional change, but the field exists on the model now)

## Impact

- **Routes**: New `/onboarding` route group under `(auth-layout)` or a new `(onboarding-layout)`
- **Middleware/Proxy**: `proxy.ts` needs to check `onboardingCompleted` and redirect accordingly
- **API**: Profile endpoints need to support the `onboardingCompleted` field
- **i18n**: New translation namespace for onboarding messages (EN + UK)
- **Shared package**: Profile type in generated API client will include the new field
