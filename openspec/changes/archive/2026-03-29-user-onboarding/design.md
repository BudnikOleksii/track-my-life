## Context

The money-tracker app currently drops users onto the dashboard immediately after first login. The profile (name, country, base currency) defaults to empty, and no categories exist yet. Users must discover the settings page on their own to configure essentials. The app uses Next.js 16 App Router with `proxy.ts` middleware handling auth token management and route protection.

Key existing pieces:

- `proxy.ts` already checks auth tokens and redirects unauthenticated users to `/sign-in`
- Profile API service (`ProfileApiService`) supports fetch and update operations
- Settings page has a working profile form with country/currency comboboxes
- i18n is namespace-based with EN + UK locales

## Goals / Non-Goals

**Goals:**

- Guide new users through essential setup (name, country, currency) before they use the app
- Provide a welcoming first experience with a multi-step wizard
- Allow users to skip onboarding if they prefer
- Track onboarding completion to avoid showing the wizard again

**Non-Goals:**

- Forced category creation during onboarding (prompt only, link to categories page)
- Onboarding for existing users (only new registrations)
- Tutorial/guided tour of app features (out of scope for this change)
- Backend API changes (the `onboardingCompleted` field will be managed client-side via the profile update endpoint)

## Decisions

### 1. Onboarding state tracked via profile field

Store `onboardingCompleted: boolean` on the user profile model. The backend profile endpoint already supports arbitrary profile updates via `PATCH /api/profile`.

**Why over localStorage/cookie**: Persists across devices and browsers. If user logs in from another device, they won't see onboarding again. Single source of truth.

**Alternative considered**: Cookie-based flag. Rejected because it's device-specific and doesn't survive cookie clears.

### 2. Dedicated route group `(onboarding-layout)` under `[locale]`

Create a new route group `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/` with its own layout (no sidebar/header). The wizard lives at `/onboarding`.

**Why over modal overlay**: A dedicated route is bookmarkable, works with browser navigation, and keeps the wizard isolated from the app shell. Simpler to gate in middleware.

**Alternative considered**: Modal on top of dashboard. Rejected because it couples onboarding to the app layout and complicates the redirect logic.

### 3. Gate logic in `proxy.ts` middleware

Extend the existing `proxy.ts` to check `onboardingCompleted` from the profile after successful token validation. If `false`, redirect to `/onboarding`. The profile data is already fetched or can be fetched once and cached in the middleware flow.

**Why over client-side redirect**: Prevents flash of dashboard content. Consistent with existing auth redirect pattern. Server-side guarantees the user never sees app routes without completing onboarding.

**Trade-off**: Adds a profile fetch to middleware for authenticated requests. Mitigated by only checking on first load (the redirect is permanent once onboarding is done) and caching the profile response.

**Alternative considered**: Client-side `useEffect` redirect in app layout. Rejected due to flash of content and inconsistency with existing server-side auth pattern.

### 4. Multi-step wizard with URL-based step tracking

Steps tracked via URL search params (`/onboarding?step=profile`). Steps:

1. **welcome** (default) - Welcome message, brief app description
2. **profile** - Name, country, base currency (reuses existing form schema/validation)
3. **complete** - Success message, link to dashboard

**Why 3 steps instead of more**: Minimizes friction. Profile setup is the only essential step. Category creation is better done in-context on the categories page.

**Why URL params over component state**: Supports browser back/forward, survives page refresh, enables deep linking for debugging.

### 5. Reuse existing profile form components

The onboarding profile step reuses the validation schema (`profileFormSchema`) and field components from settings. The form layout will differ (wizard card vs settings page), but validation and submission logic are shared.

**Why**: Avoids duplication, ensures consistent validation rules, reduces maintenance burden.

## Risks / Trade-offs

- **[Risk] Profile fetch in middleware adds latency** → Mitigate by caching profile in a cookie after first fetch; subsequent requests check the cookie. Once `onboardingCompleted` is `true`, the cookie persists and no extra API call is needed.

- **[Risk] Backend may not support `onboardingCompleted` field yet** → Mitigate by adding the field to the profile update/fetch. If the backend ignores unknown fields, the client can fall back to checking if profile fields (firstName, countryCode, baseCurrencyCode) are populated as a proxy for "onboarded".

- **[Trade-off] Skip button allows incomplete profiles** → Acceptable. Users can always complete their profile later via settings. The skip sets `onboardingCompleted: true` without filling fields.

- **[Trade-off] No onboarding for existing users** → Users who registered before this feature won't see onboarding. Their `onboardingCompleted` will default to `true` (or be absent, treated as `true`). This is intentional to avoid disrupting existing users.
