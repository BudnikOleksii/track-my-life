## Context

The app uses a custom `ApiClient` with interceptor-based auth. Three `TokenProvider` implementations exist for different Next.js execution contexts (RSC, server actions, middleware). All implement the same interface, but RSC cannot write cookies — so `RscTokenProvider` stubs `setTokenPair`/`clearTokenPair` as no-ops. This means token refresh in RSC silently discards new tokens.

The `AuthInterceptor` handles 401 responses by refreshing tokens and retrying. It has no way to know if the provider can actually persist the refreshed tokens, leading to wasted refresh calls and inconsistent state.

A `proxy.ts` middleware file exists with proactive token refresh logic but is not wired into Next.js middleware.

## Goals / Non-Goals

**Goals:**

- Compile-time safety: prevent wiring a read-only provider where write access is needed
- Runtime discrimination: `AuthInterceptor` skips refresh when provider is read-only
- Proactive refresh: middleware refreshes tokens before RSC runs, so RSCs rarely see expired tokens
- Minimal disruption: preserve existing interceptor architecture, only refine the type contracts

**Non-Goals:**

- Client-side token management (no client-side API calls exist)
- Changing cookie configuration (httpOnly, sameSite, secure settings stay the same)
- Changing the refresh token rotation strategy on the backend
- Adding retry/backoff to the refresh flow

## Decisions

### 1. Two interfaces instead of one

Split `TokenProvider` into `ReadOnlyTokenProvider` (get-only) and `ReadWriteTokenProvider` (extends with set/clear).

**Why over alternatives:**

- A single interface with optional methods loses compile-time guarantees
- A capability flag (`canWrite: boolean`) requires runtime checks everywhere with no type narrowing
- Two interfaces give both compile-time errors and clean runtime discrimination via type guard

### 2. Type guard function for runtime discrimination

Add `checkIsReadWriteTokenProvider(provider): provider is ReadWriteTokenProvider` that checks for the presence of `setTokenPair` method.

**Why:** The `AuthInterceptor` receives the provider at construction time and needs to branch at runtime. A type guard is idiomatic TypeScript and follows the project's `check` prefix convention.

### 3. AuthInterceptor accepts the union type

`AuthInterceptor` constructor accepts `ReadOnlyTokenProvider | ReadWriteTokenProvider`. On 401:

- If read-write: refresh + persist + retry (current behavior)
- If read-only: return the 401 response immediately (no refresh attempt)

**Why over separate interceptor classes:** The request interceptor (injecting Authorization header) is identical for both. Only the response interceptor differs. Branching inside one class is simpler than maintaining two classes with duplicated request logic.

### 4. Middleware as the primary refresh point

Wire `proxy.ts` as Next.js middleware. It proactively checks token expiration and refreshes before the request reaches RSC rendering.

**Why:** RSC cannot write cookies, so it cannot be the refresh point. Middleware runs before every request, has access to request/response objects for cookie manipulation, and is the natural place for auth gating in Next.js.

## Risks / Trade-offs

- **[Breaking change]** → All code referencing `TokenProvider` must update to the new interface names. Mitigated by the fact that usage is contained within `packages/shared` — no external consumers.
- **[Middleware refresh timing]** → If middleware refresh fails (backend down), RSC will get a 401 with no retry. → Acceptable: middleware already redirects to sign-in on refresh failure.
- **[Race condition between middleware and server action refresh]** → A server action could attempt refresh concurrently with a subsequent middleware refresh. → Mitigated by existing `refreshPromise` deduplication within each interceptor instance, and by the fact that refresh token rotation on the backend handles concurrent refresh gracefully.
