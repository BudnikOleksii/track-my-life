## ADDED Requirements

### Requirement: Package identity and metadata

The system SHALL provide a `packages/next-shared` workspace package named `@track-my-life/next-shared` that declares `next`, `next-intl`, `react`, and `react-dom` as production dependencies, and `@track-my-life/shared` as a workspace dependency.

#### Scenario: Package is recognized in monorepo

- **WHEN** `pnpm install` is run at the workspace root
- **THEN** `@track-my-life/next-shared` SHALL be resolved as a workspace package and its dependencies installed

#### Scenario: TypeScript configuration extends shared base

- **WHEN** `pnpm type-check` is run
- **THEN** `packages/next-shared` SHALL type-check successfully using `@track-my-life/typescript-config` as its base tsconfig

### Requirement: i18n navigation exports

The package SHALL export routing configuration and locale-aware navigation utilities: `routing`, `Link`, `redirect`, `usePathname`, and `useRouter` from `src/i18n/navigation/navigation.ts`.

#### Scenario: App imports navigation utilities

- **WHEN** an app imports `{ Link, redirect, useRouter, usePathname, routing }` from `@track-my-life/next-shared`
- **THEN** the imports SHALL resolve to next-intl's `createNavigation` output configured with the project's locale routing

#### Scenario: Routing config uses shared locale constants

- **WHEN** `routing` is created via `defineRouting`
- **THEN** it SHALL use `LOCALE_CODE` and `LOCALE_CODE_LIST` imported from `@track-my-life/shared`

### Requirement: Translation error utilities

The package SHALL export `getTranslationMessageFallback` and `onTranslateError` functions that handle next-intl translation errors.

#### Scenario: Missing translation returns key

- **WHEN** `getTranslationMessageFallback` is called with an error whose code is `MISSING_MESSAGE`
- **THEN** it SHALL return the translation key string

#### Scenario: Translation error is logged

- **WHEN** `onTranslateError` is called with an `IntlError`
- **THEN** it SHALL log the error code and original message to `console.error`

### Requirement: NextIntlProvider component

The package SHALL export a `NextIntlProvider` client component that wraps `NextIntlClientProvider` from `next-intl` with the project's error handling and fallback configuration.

#### Scenario: Provider configures error handling

- **WHEN** `NextIntlProvider` is rendered
- **THEN** it SHALL pass `getTranslationMessageFallback` as `getMessageFallback` and `onTranslateError` as `onError` to the underlying `NextIntlClientProvider`

### Requirement: TranslateFn type export

The package SHALL export the `TranslateFn` type derived from `next-intl`'s `useTranslations` return type.

#### Scenario: Type is usable for component props

- **WHEN** a component declares a prop typed as `TranslateFn`
- **THEN** the TypeScript compiler SHALL accept the return value of `useTranslations()` as a valid argument

### Requirement: MiddlewareTokenProvider export

The package SHALL export `MiddlewareTokenProvider` class that implements `ReadWriteTokenProvider` using Next.js `NextRequest` and `NextResponse` objects.

#### Scenario: Token read from middleware request

- **WHEN** `getAccessToken()` is called on a `MiddlewareTokenProvider` instance
- **THEN** it SHALL read the access token from the `NextRequest` cookies

#### Scenario: Token written to middleware response

- **WHEN** `setAccessToken(token)` is called on a `MiddlewareTokenProvider` instance
- **THEN** it SHALL set the access token cookie on the `NextResponse` object

### Requirement: packages/shared has no Next.js dependencies

After the split, `packages/shared/package.json` SHALL NOT list `next` or `next-intl` as dependencies (production or dev). The `src/` directory SHALL NOT contain any files that import from `next` or `next-intl`.

#### Scenario: Shared package installs without Next.js

- **WHEN** `packages/shared` is installed in a non-Next.js context
- **THEN** installation SHALL succeed without requiring `next` or `next-intl` peer dependencies

#### Scenario: No next imports remain in shared

- **WHEN** `grep -r "from 'next" packages/shared/src/` is run
- **THEN** it SHALL return zero matches
