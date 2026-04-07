## 1. Scaffold `packages/next-shared`

- [x] 1.1 Create `packages/next-shared/package.json` with `@track-my-life/next-shared` name, `next`, `next-intl`, `react`, `react-dom` as dependencies, and `@track-my-life/shared` as workspace dependency
- [x] 1.2 Create `packages/next-shared/tsconfig.json` extending `@track-my-life/typescript-config`
- [x] 1.3 Create `packages/next-shared/src/` directory structure mirroring moved files

## 2. Move Next.js-dependent files to `packages/next-shared`

- [x] 2.1 Move `src/i18n/navigation/navigation.ts` — update imports of `LOCALE_CODE`/`LOCALE_CODE_LIST` to reference `@track-my-life/shared`
- [x] 2.2 Move `src/i18n/utils/get-translation-message-fallback.ts` and `src/i18n/utils/on-translate-error.ts`
- [x] 2.3 Move `src/providers/NextIntlProvider.tsx` — update internal imports to reference moved utils
- [x] 2.4 Move `src/types/translate-fn.ts`
- [x] 2.5 Move `src/api/client/token/middleware-token-provider.ts` — update imports of token types to reference `@track-my-life/shared`
- [x] 2.6 Move `src/i18n/navigation/NavigationLink.tsx` — imports from moved `navigation.ts`
- [x] 2.7 Move `src/api/client/token/rsc-token-provider.ts` — uses dynamic `import('next/headers')`
- [x] 2.8 Move `src/api/client/token/server-action-token-provider.ts` — uses dynamic `import('next/headers')`
- [x] 2.9 Move `src/api/client/token/forward-response-cookie-list.ts` — uses dynamic `import('next/headers')`
- [x] 2.10 Move `src/api/server-api.ts` — orchestrates Next.js-specific token providers
- [x] 2.11 Move `src/api/rsc-api.ts` — orchestrates Next.js-specific token providers

## 3. Clean up `packages/shared`

- [x] 3.1 Remove `next` and `next-intl` from `packages/shared/package.json` dependencies
- [x] 3.2 Remove empty directories left behind after file moves
- [x] 3.3 No barrel exports exist in this project — no updates needed

## 4. Update imports in `apps/money-tracker`

- [x] 4.1 Add `@track-my-life/next-shared` as dependency in `apps/money-tracker/package.json`
- [x] 4.2 Update all imports of `Link`, `redirect`, `useRouter`, `usePathname`, `routing` to `@track-my-life/next-shared`
- [x] 4.3 Update all imports of `NextIntlProvider` to `@track-my-life/next-shared`
- [x] 4.4 Update all imports of `TranslateFn` to `@track-my-life/next-shared`
- [x] 4.5 Update all imports of `getTranslationMessageFallback`, `onTranslateError` to `@track-my-life/next-shared`
- [x] 4.6 Update all imports of `MiddlewareTokenProvider` to `@track-my-life/next-shared`
- [x] 4.7 Update `NavigationLink` imports — moved to next-shared
- [x] 4.8 Update all imports of `server-api`, `rsc-api`, `forward-response-cookie-list` to `@track-my-life/next-shared`

## 5. Update `apps/storybook` (if affected)

- [x] 5.1 Storybook does not import any moved modules — no changes needed

## 6. Verify

- [x] 6.1 Run `pnpm type-check` — zero errors
- [x] 6.2 Run `pnpm build` — all packages and apps build successfully
- [x] 6.3 Run `pnpm lint` — no lint errors
- [x] 6.4 Verify no `next` or `next-intl` imports remain in `packages/shared/src/`
