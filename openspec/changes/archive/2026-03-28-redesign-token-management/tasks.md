## 1. Split TokenProvider Interface

- [x] 1.1 Replace `TokenProvider` in `packages/shared/src/api/client/token/types.ts` with `ReadOnlyTokenProvider` and `ReadWriteTokenProvider` interfaces, plus `checkIsReadWriteTokenProvider` type guard
- [x] 1.2 Update `RscTokenProvider` to implement `ReadOnlyTokenProvider` only (remove `setTokenPair`/`clearTokenPair` stubs)
- [x] 1.3 Update `ServerActionTokenProvider` to implement `ReadWriteTokenProvider`
- [x] 1.4 Update `MiddlewareTokenProvider` to implement `ReadWriteTokenProvider`

## 2. Update AuthInterceptor

- [x] 2.1 Change `AuthInterceptor` constructor to accept `ReadOnlyTokenProvider | ReadWriteTokenProvider`
- [x] 2.2 Update response interceptor to skip refresh logic when provider is read-only (return 401 directly)
- [x] 2.3 Guard `setTokenPair`/`clearTokenPair` calls with `checkIsReadWriteTokenProvider`

## 3. Update API Setup Files

- [x] 3.1 Update `packages/shared/src/api/rsc-api.ts` to use `ReadOnlyTokenProvider` type (no change needed — class already implements correct interface)
- [x] 3.2 Update `packages/shared/src/api/server-api.ts` to use `ReadWriteTokenProvider` type (no change needed — class already implements correct interface)

## 4. Wire Middleware Auth Gate

- [x] 4.1 Update `apps/money-tracker/src/proxy.ts` to use `ReadWriteTokenProvider` types from the new interface (no change needed — class already implements correct interface)
- [x] 4.2 Verify `apps/money-tracker/src/proxy.ts` is already wired as Next.js 16 proxy (proxy.ts replaced middleware.ts in Next.js 16)

## 5. Verification

- [x] 5.1 Run type-check (`pnpm type-check`) to verify no compile errors
- [x] 5.2 Run build (`pnpm build`) to verify successful build
