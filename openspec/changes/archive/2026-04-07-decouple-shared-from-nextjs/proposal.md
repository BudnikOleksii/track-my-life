## Why

`packages/shared` depends on `next` and `next-intl` as production dependencies, making it impossible to reuse in non-Next.js contexts (CLI tools, backend services, React Native). The package's description says "shared constants and types" but it bundles framework-specific navigation, i18n providers, and middleware token handling. Separating these concerns makes `packages/shared` truly framework-agnostic.

## What Changes

- Create a new `packages/next-shared` package (`@track-my-life/next-shared`) containing all Next.js and next-intl dependent code:
  - `i18n/navigation/` (routing config, `Link`, `redirect`, `useRouter`, `usePathname`)
  - `i18n/utils/` (`getTranslationMessageFallback`, `onTranslateError`)
  - `providers/NextIntlProvider.tsx`
  - `types/translate-fn.ts` (`TranslateFn` type)
  - `api/client/token/middleware-token-provider.ts` (`MiddlewareTokenProvider`)
- Remove `next` and `next-intl` from `packages/shared/package.json` dependencies
- `packages/next-shared` re-exports `@track-my-life/shared` so apps can import framework-agnostic code from either package
- Update all imports in `apps/money-tracker` to use `@track-my-life/next-shared` for the moved modules

## Capabilities

### New Capabilities

- `next-shared-package`: New `packages/next-shared` package that owns all Next.js and next-intl specific code (navigation, i18n provider, middleware token provider, translation utilities)

### Modified Capabilities

- `app-navigation`: Navigation imports (`Link`, `redirect`, `useRouter`, `usePathname`) move from `@track-my-life/shared` to `@track-my-life/next-shared`
- `token-provider-split`: `MiddlewareTokenProvider` moves to `@track-my-life/next-shared`; browser/RSC/server-action providers stay in `@track-my-life/shared`

## Impact

- **Dependencies**: `next` and `next-intl` removed from `packages/shared`, added to new `packages/next-shared`
- **Imports**: ~30 files in `apps/money-tracker` need import path updates (navigation, provider, translation utilities)
- **Build**: Turborepo config needs new package; `packages/next-shared` depends on `packages/shared`
- **No runtime behavior changes**: Pure code organization refactor
