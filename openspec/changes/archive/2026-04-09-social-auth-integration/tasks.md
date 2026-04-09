## 1. Auth API Service

- [x] 1.1 Add `exchangeSocialCode()` method to `AuthApiService` — POST to `/api/auth/social/exchange` with `ExchangeSocialCodeDto` body, `credentials: 'include'`, returning `AuthControllerExchangeSocialCodeResponse`
- [x] 1.2 Add `EXCHANGE_SOCIAL_CODE` endpoint constant to `AuthApiService.ENDPOINTS`

## 2. OAuth Callback Route

- [x] 2.1 Add `authCallback: '/auth/callback'` to `PATHS` in `apps/money-tracker/src/constants/paths.ts`
- [x] 2.2 Add `authCallbackPage` namespace to `I18N_NAMESPACE` and create corresponding message files (`en/auth-callback-page.json`, `uk/auth-callback-page.json`) with error messages for `email_exists`, `unknown`, and `exchange_failed`
- [x] 2.3 Register the new i18n namespace in `localization-messages-file-name-by-namespace.ts`
- [x] 2.4 Create server action `exchangeSocialCode` at `apps/money-tracker/src/app/[locale]/(auth-layout)/auth/callback/action.ts` — validates code, calls `authApiService.exchangeSocialCode()`, stores access token via `serverActionTokenProvider`, forwards response cookies
- [x] 2.5 Create callback page component at `apps/money-tracker/src/app/[locale]/(auth-layout)/auth/callback/page.content.tsx` — client component that reads `code`/`error`/`reason` from search params, calls the exchange action on mount, shows loading state, displays error with link to sign-in on failure, redirects to dashboard on success
- [x] 2.6 Create callback page at `apps/money-tracker/src/app/[locale]/(auth-layout)/auth/callback/page.tsx` with metadata and rendering the content component
- [x] 2.7 Create `page.module.scss` for callback page styling (reuse auth-layout card pattern)

## 3. OAuth Provider Buttons

- [x] 3.1 Remove LinkedIn button, `linkedinLabel` prop, and `linkedin_oidc` type from `OAuthProviderButtons.tsx`
- [x] 3.2 Wire Google button to navigate to `NEXT_PUBLIC_API_BASE_URL + /api/auth/google` via `window.location.href`
- [x] 3.3 Wire GitHub button to navigate to `NEXT_PUBLIC_API_BASE_URL + /api/auth/github` via `window.location.href`
- [x] 3.4 Update sign-in `page.content.tsx` — remove `linkedinLabel` prop from `OAuthProviderButtons`
- [x] 3.5 Update sign-up `page.content.tsx` — remove `linkedinLabel` prop from `OAuthProviderButtons`
- [x] 3.6 Remove `continueWithLinkedIn` key from `en/auth-shared.json` and `uk/auth-shared.json`
- [x] 3.7 Add social auth error translations to `en/auth-shared.json` and `uk/auth-shared.json` (`socialAuthEmailExists`, `socialAuthFailed`)

## 4. Middleware

- [x] 4.1 Add `PATHS.authCallback` to `PUBLIC_PATH_LIST` in `apps/money-tracker/src/utils/middleware/path.ts`

## 5. Verification

- [x] 5.1 Run `pnpm type-check` to verify no TypeScript errors
- [x] 5.2 Run `pnpm lint` and `pnpm fmt` to ensure code quality
