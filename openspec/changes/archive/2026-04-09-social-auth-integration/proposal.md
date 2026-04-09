## Why

The backend now supports Google and GitHub OAuth. The frontend already has placeholder OAuth buttons on sign-in/sign-up pages but they are not wired to any endpoint. Users need the ability to authenticate via social providers as an alternative to email/password.

## What Changes

- Wire existing Google and GitHub OAuth buttons to initiate the backend OAuth flow (`GET /api/auth/google`, `GET /api/auth/github`)
- Remove LinkedIn OAuth button entirely (provider not supported)
- Create a new `/auth/callback` route to handle the OAuth redirect: read the authorization `code`, exchange it via `POST /api/auth/social/exchange`, store the access token, and redirect to the app
- Display error messages when social auth fails (email already exists via different method, provider rejection, unknown errors)
- Add `exchangeSocialCode()` and `getProviders()` methods to `AuthApiService`
- Add `/auth/callback` as a public path in middleware so unauthenticated users can reach it

## Capabilities

### New Capabilities

- `social-auth-callback`: OAuth callback page that exchanges authorization codes for access tokens and handles error states
- `social-auth-buttons`: Wired OAuth provider buttons that initiate the social login flow via backend redirect

### Modified Capabilities

- `middleware-auth-gate`: Add `/auth/callback` to public paths so the callback route is accessible without authentication

## Impact

- **Auth layout pages**: sign-in and sign-up pages lose the LinkedIn button prop, gain working Google/GitHub buttons
- **Auth API service**: new methods for social code exchange and provider listing
- **Middleware**: new public path entry for `/auth/callback`
- **i18n**: new translation keys for social auth error messages
- **Constants**: new `authCallback` path in `PATHS`
