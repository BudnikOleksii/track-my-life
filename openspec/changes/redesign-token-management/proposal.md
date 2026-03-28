## Why

The current `TokenProvider` interface requires all implementations to declare `setTokenPair` and `clearTokenPair`, but RSC cannot write cookies. `RscTokenProvider` stubs these as no-ops, meaning token refresh silently fails in RSC context — new tokens are fetched but never persisted. There is no compile-time safety to prevent wiring a read-only provider into a context that expects write access.

## What Changes

- **BREAKING**: Split `TokenProvider` into `ReadOnlyTokenProvider` (get-only) and `ReadWriteTokenProvider` (get + set + clear)
- Update `RscTokenProvider` to implement `ReadOnlyTokenProvider` only
- Update `ServerActionTokenProvider` and `MiddlewareTokenProvider` to implement `ReadWriteTokenProvider`
- Add `checkIsReadWriteTokenProvider` type guard for runtime discrimination
- Update `AuthInterceptor` to skip token refresh when given a read-only provider (return 401 directly)
- Wire `proxy.ts` into Next.js middleware as the primary proactive token refresh point

## Capabilities

### New Capabilities

- `token-provider-split`: Split TokenProvider into read-only and read-write interfaces with compile-time and runtime discrimination
- `middleware-auth-gate`: Wire existing proxy.ts as Next.js middleware to proactively refresh tokens before RSC rendering

### Modified Capabilities

- `server-data-loading`: RSC data fetching will no longer attempt silent token refresh; relies on middleware for valid tokens

## Impact

- `packages/shared/src/api/client/token/` — interface and all provider implementations change
- `packages/shared/src/api/client/interceptors/auth-interceptor.ts` — conditional refresh logic
- `packages/shared/src/api/rsc-api.ts` — type narrows to ReadOnlyTokenProvider
- `packages/shared/src/api/server-api.ts` — type narrows to ReadWriteTokenProvider
- `apps/money-tracker/middleware.ts` — new file wiring proxy
- `apps/money-tracker/src/proxy.ts` — align with new provider types
