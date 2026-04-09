## Context

The money-tracker app uses email/password authentication with JWT access tokens stored in cookies. The backend has been updated to support Google and GitHub OAuth via three new endpoints: `GET /api/auth/google` (redirect to Google), `GET /api/auth/github` (redirect to GitHub), and `POST /api/auth/social/exchange` (exchange authorization code for tokens). A `GET /api/auth/providers` endpoint lists enabled providers.

The OAuth flow is backend-driven: the frontend navigates the browser to the backend's provider endpoint, the backend handles the full OAuth dance, then redirects back to a configured `SOCIAL_AUTH_REDIRECT_URL` with an authorization code. The frontend exchanges that code for an access token.

Existing placeholder OAuth buttons exist in `OAuthProviderButtons.tsx` but are not wired up. LinkedIn is not supported.

## Goals / Non-Goals

**Goals:**

- Enable Google and GitHub social login on sign-in and sign-up pages
- Handle the OAuth callback redirect at `/auth/callback`, exchange the code, store the token, and redirect to the app
- Display meaningful error messages when social auth fails
- Remove LinkedIn button since the provider is not supported

**Non-Goals:**

- LinkedIn OAuth support
- Account linking UI (connecting social accounts to existing email/password accounts)
- Provider management in user settings
- Fetching available providers dynamically from `GET /api/auth/providers` (all buttons shown statically for now)

## Decisions

### 1. Browser navigation to backend OAuth endpoint (not API call)

The OAuth flow requires a full-page redirect to the provider's consent screen. The frontend will navigate the browser directly to `NEXT_PUBLIC_API_BASE_URL + /api/auth/google` (or `/github`) using `window.location.href`. This is the standard OAuth redirect approach — AJAX calls cannot follow cross-origin redirects to OAuth consent screens.

**Alternative considered:** Using a Next.js API route as a proxy. Rejected because it adds unnecessary complexity — the backend already handles the full redirect chain.

### 2. Callback page as a client component with server action

The `/auth/callback` page will be a client component that:

1. Reads `code` / `error` / `reason` from `useSearchParams()`
2. On mount (via `useEffect`), calls a server action `exchangeSocialCode` that posts the code to the backend, stores the access token cookie, and returns success/error
3. On success, redirects to dashboard using `router.replace`
4. On error, displays the error message with a link back to sign-in

Using a server action for the exchange ensures the access token cookie is set server-side (same pattern as `signIn` action). The client component is needed because the callback URL comes from the browser redirect and we need to read search params client-side.

**Alternative considered:** RSC page reading searchParams. Viable but would require the exchange + redirect in a single server render. The client component approach gives better UX with a loading state and clear error display.

### 3. Callback route inside auth-layout route group

The callback page at `apps/money-tracker/src/app/[locale]/(auth-layout)/auth/callback/` shares the auth layout (centered card design). This is consistent with sign-in/sign-up pages.

### 4. Static provider buttons (no dynamic provider fetching)

The OAuth buttons will be rendered statically (Google and GitHub). The `GET /api/auth/providers` endpoint exists but fetching it on every page load adds latency for a configuration that rarely changes. This can be added later if needed.

### 5. Error handling strategy

Social auth errors arrive as query parameters: `?error=auth_failed&reason=email_exists|unauthorized|unknown`. The callback page maps these to user-friendly i18n messages. The `email_exists` case gets a specific message guiding users to sign in with their original method.

## Risks / Trade-offs

- **[Risk] Backend unavailable during code exchange** -> The callback page shows a generic error with a retry link (back to sign-in). The server action returns an error object similar to the existing auth pattern.
- **[Risk] Stale authorization code** -> Codes are single-use and short-lived. If the user navigates to an old callback URL, the exchange will fail and the error state is shown.
- **[Trade-off] Static vs dynamic provider buttons** -> We show Google/GitHub buttons even if the backend has them disabled. Acceptable for a single-user app; revisit if multi-tenant support is added.
