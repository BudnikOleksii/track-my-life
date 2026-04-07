## Context

`packages/shared` currently depends on `next@16.2.2` and `next-intl@4.8.2` as production dependencies. Six files import from these packages: i18n navigation/routing, translation error utilities, the `NextIntlProvider` component, the `TranslateFn` type, and `MiddlewareTokenProvider`. The remaining ~40 files (API services, constants, utilities, JWT helpers) are framework-agnostic. Only `apps/money-tracker` consumes `@track-my-life/shared` today.

## Goals / Non-Goals

**Goals:**

- Remove `next` and `next-intl` from `packages/shared/package.json`
- Create `packages/next-shared` (`@track-my-life/next-shared`) owning all Next.js/next-intl code
- Keep all existing functionality working with only import path changes
- Maintain a clean dependency graph: `next-shared` → `shared`, never the reverse

**Non-Goals:**

- Changing any runtime behavior or API surfaces
- Refactoring the i18n navigation or token provider patterns
- Supporting non-Next.js apps yet (no concrete consumer exists)
- Moving `NavigationLink.tsx` if it only depends on React (not next-intl directly)

## Decisions

### 1. Package name: `@track-my-life/next-shared` at `packages/next-shared`

**Rationale:** Follows existing naming convention (`@track-my-life/<dir-name>`). Name clearly communicates "shared code that requires Next.js". Alternatives considered:

- `packages/next-utils` — too vague, doesn't convey "shared across apps"
- `packages/i18n` — too narrow, package also contains `MiddlewareTokenProvider`
- `packages/next-intl-config` — excludes the middleware token provider

### 2. Files to move (6 files)

| File                                                 | Reason                                                  |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `src/i18n/navigation/navigation.ts`                  | Imports `next-intl/navigation`, `next-intl/routing`     |
| `src/i18n/utils/get-translation-message-fallback.ts` | Imports `IntlErrorCode` from `next-intl`                |
| `src/i18n/utils/on-translate-error.ts`               | Imports `IntlError` type from `next-intl`               |
| `src/providers/NextIntlProvider.tsx`                 | Imports `NextIntlClientProvider` from `next-intl`       |
| `src/types/translate-fn.ts`                          | Imports `useTranslations` type from `next-intl`         |
| `src/api/client/token/middleware-token-provider.ts`  | Imports `NextRequest`/`NextResponse` from `next/server` |

**Files staying in `packages/shared`:**

- `src/i18n/navigation/NavigationLink.tsx` — needs review; if it only imports from `navigation.ts` (which moves), it should move too
- `src/i18n/constants/locale-code.ts` — framework-agnostic constants
- `src/i18n/types/localization-messages.ts` — plain TypeScript types
- All API services, constants, utilities, JWT helpers

### 3. Directory structure in `packages/next-shared`

Mirror the source structure from `packages/shared` to minimize cognitive overhead:

```
packages/next-shared/
├── package.json
├── tsconfig.json
└── src/
    ├── api/
    │   └── client/
    │       └── token/
    │           └── middleware-token-provider.ts
    ├── i18n/
    │   ├── navigation/
    │   │   └── navigation.ts
    │   └── utils/
    │       ├── get-translation-message-fallback.ts
    │       └── on-translate-error.ts
    ├── providers/
    │   └── NextIntlProvider.tsx
    └── types/
        └── translate-fn.ts
```

**Rationale:** Preserving directory structure means consumers only need to change the package name in imports, not the subpath. Alternative of flattening everything into `src/` was rejected — current structure is already well-organized.

### 4. `packages/next-shared` depends on `packages/shared`

The moved files import framework-agnostic code from `packages/shared` (e.g., `LOCALE_CODE` constants). `packages/next-shared` will declare `@track-my-life/shared` as a workspace dependency and import these directly.

### 5. No barrel re-exports from `next-shared` → `shared`

`packages/next-shared` will NOT re-export everything from `@track-my-life/shared`. Apps that need both import from both packages explicitly. This keeps the dependency direction clear and avoids circular confusion.

**Rationale:** Re-exporting would create an illusion that `next-shared` is a superset of `shared`, encouraging apps to import everything from `next-shared` and defeating the purpose of the split.

### 6. Turborepo and build configuration

`packages/next-shared` will use the same `@track-my-life/typescript-config` base. No separate build step needed — Next.js transpiles workspace packages via `transpilePackages` or its built-in monorepo support. Add to `pnpm-workspace.yaml` packages list (already uses `packages/*` glob, so no change needed).

## Risks / Trade-offs

- **Import churn across ~30 files** → One-time mechanical change, easy to verify with TypeScript compiler. No runtime risk.
- **`NavigationLink.tsx` dependency chain** → Must verify whether it imports from the moved `navigation.ts`. If so, it moves too. → Check imports before implementing.
- **Two packages to import instead of one** → Slightly more verbose imports for Next.js apps. Acceptable trade-off for framework independence.
- **Storybook may need updates** → If `apps/storybook` imports i18n-related code from `@track-my-life/shared`, those imports need updating. → Check during implementation.
