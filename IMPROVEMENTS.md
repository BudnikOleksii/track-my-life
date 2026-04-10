# Track My Life - Improvement Roadmap

> Updated: 2026-04-09 | Analyzed by: architect-reviewer, nextjs-developer, performance-engineer, qa-expert, react-specialist, security-auditor, typescript-pro

## Progress Tracker

| #   | Task                                                                                                                                             | Impact | Effort | Agent(s)                               | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------ | -------------------------------------- | ------ |
| 1   | [Strengthen `requireAuth` — verify JWT, not just cookie presence](#1-strengthen-requireauth--verify-jwt-not-just-cookie-presence)                | 5      | S      | security-auditor                       | Done   |
| 2   | [Add startup validation for JWT_SECRET](#2-add-startup-validation-for-jwt_secret)                                                                | 5      | S      | security-auditor                       | Done   |
| 3   | [Return structured errors from server actions (not null)](#3-return-structured-errors-from-server-actions-not-null)                              | 5      | M      | architect-reviewer, qa-expert          | Todo   |
| 4   | [Add consistent Zod validation to all mutation server actions](#4-add-consistent-zod-validation-to-all-mutation-server-actions)                  | 4      | S      | security-auditor, architect-reviewer   | Done   |
| 5   | [Fix form error i18n — forms may display raw keys](#5-fix-form-error-i18n--forms-may-display-raw-keys)                                           | 4      | S      | react-specialist                       | Todo   |
| 6   | [Add `aria-invalid` to Input component](#6-add-aria-invalid-to-input-component)                                                                  | 4      | S      | react-specialist                       | Todo   |
| 7   | [Make CategoryPicker keyboard-accessible](#7-make-categorypicker-keyboard-accessible)                                                            | 4      | M      | react-specialist                       | Todo   |
| 8   | [Remove type re-export from `CategoryTypeFilter` client file](#8-remove-type-re-export-from-categorytypefilter-client-file)                      | 4      | S      | react-specialist                       | Done   |
| 9   | [Verify ThemeProvider has `attribute="data-theme"`](#9-verify-themeprovider-has-attributedata-theme)                                             | 4      | S      | performance-engineer                   | Todo   |
| 10  | [Convert dashboard widgets to RSC](#10-convert-dashboard-widgets-to-rsc)                                                                         | 4      | M      | performance-engineer                   | Todo   |
| 11  | [Wire Storybook test runner to `pnpm test`](#11-wire-storybook-test-runner-to-pnpm-test)                                                         | 4      | S      | qa-expert                              | Todo   |
| 12  | [Add test job to GitHub Actions PR workflow](#12-add-test-job-to-github-actions-pr-workflow)                                                     | 4      | S      | qa-expert                              | Todo   |
| 13  | [Make `ApiResponse<T>` a discriminated union](#13-make-apiresponset-a-discriminated-union)                                                       | 4      | M      | typescript-pro                         | Todo   |
| 14  | [Add runtime guard to auth interceptor token refresh](#14-add-runtime-guard-to-auth-interceptor-token-refresh)                                   | 4      | S      | typescript-pro                         | Done   |
| 15  | [Fix profileFormSchema — use CountryCode union](#15-fix-profileformschema--use-countrycode-union)                                                | 4      | S      | typescript-pro                         | Todo   |
| 16  | [Replace CSP `unsafe-inline` with nonce-based script-src](#16-replace-csp-unsafe-inline-with-nonce-based-script-src)                             | 4      | L      | security-auditor, nextjs-developer     | Todo   |
| 17  | [Tighten security headers (CSP connect-src, Permissions-Policy)](#17-tighten-security-headers-csp-connect-src-permissions-policy)                | 3      | S      | security-auditor                       | Done   |
| 18  | [Set onboarding status cookie to httpOnly](#18-set-onboarding-status-cookie-to-httponly)                                                         | 3      | M      | security-auditor                       | Todo   |
| 19  | [Add rate limiting on auth endpoints](#19-add-rate-limiting-on-auth-endpoints)                                                                   | 3      | M      | security-auditor                       | Todo   |
| 20  | [Validate entity ID params in server actions](#20-validate-entity-id-params-in-server-actions)                                                   | 3      | S      | security-auditor                       | Done   |
| 21  | [Remove redundant `revalidatePath` alongside `updateTag`](#21-remove-redundant-revalidatepath-alongside-updatetag)                               | 3      | S      | nextjs-developer, performance-engineer | Todo   |
| 22  | [Stop invalidating CATEGORIES cache on transaction mutations](#22-stop-invalidating-categories-cache-on-transaction-mutations)                   | 3      | S      | performance-engineer                   | Todo   |
| 23  | [Cache Intl formatter instances in formatAmount/formatDate](#23-cache-intl-formatter-instances-in-formatamountformatdate)                        | 3      | S      | performance-engineer                   | Todo   |
| 24  | [Add `display: 'swap'` to Google Fonts](#24-add-display-swap-to-google-fonts)                                                                    | 3      | S      | nextjs-developer, performance-engineer | Todo   |
| 25  | [Add missing loading.tsx and error.tsx for sub-routes](#25-add-missing-loadingtsx-and-errortsx-for-sub-routes)                                   | 3      | S      | nextjs-developer                       | Todo   |
| 26  | [Complete SEO setup (metadata, sitemap, robots)](#26-complete-seo-setup-metadata-sitemap-robots)                                                 | 3      | M      | nextjs-developer                       | Todo   |
| 27  | [Replace hand-rolled dropdowns with Radix](#27-replace-hand-rolled-dropdowns-with-radix)                                                         | 3      | S      | nextjs-developer, react-specialist     | Todo   |
| 28  | [Fix useProfileForm — direct defaultValues instead of useEffect+reset](#28-fix-useprofileform--direct-defaultvalues-instead-of-useeffectreset)   | 3      | S      | react-specialist                       | Todo   |
| 29  | [Link RecurringFrequency Zod enum to generated type](#29-link-recurringfrequency-zod-enum-to-generated-type)                                     | 3      | S      | typescript-pro                         | Todo   |
| 30  | [Fix CurrencyStep — don't cast empty string to CurrencyCode](#30-fix-currencystep--dont-cast-empty-string-to-currencycode)                       | 3      | S      | typescript-pro                         | Todo   |
| 31  | [Extract duplicated cache config constants](#31-extract-duplicated-cache-config-constants)                                                       | 3      | S      | architect-reviewer                     | Todo   |
| 32  | [Enable a11y checks in Storybook](#32-enable-a11y-checks-in-storybook)                                                                           | 3      | S      | qa-expert                              | Todo   |
| 33  | [Fix missing i18n keys + add parity check to CI](#33-fix-missing-i18n-keys--add-parity-check-to-ci)                                              | 3      | S      | qa-expert                              | Todo   |
| 34  | [Cache .next/cache in CI between builds](#34-cache-nextcache-in-ci-between-builds)                                                               | 3      | S      | performance-engineer                   | Todo   |
| 35  | [Convert more components to RSC (by-category pages, WidgetCard)](#35-convert-more-components-to-rsc-by-category-pages-widgetcard)                | 2      | S      | nextjs-developer, performance-engineer | Todo   |
| 36  | [Remove unnecessary `router.refresh()` in recurring transaction hooks](#36-remove-unnecessary-routerrefresh-in-recurring-transaction-hooks)      | 2      | S      | nextjs-developer, react-specialist     | Todo   |
| 37  | [Refactor useCategoryFilters to use useUrlFilters](#37-refactor-usecategoryfilters-to-use-useurlfilters)                                         | 2      | S      | react-specialist                       | Todo   |
| 38  | [Wrap getTimezoneOffset/RscTokenProvider in React cache()](#38-wrap-gettimezoneoffsetrsctokenprovider-in-react-cache)                            | 2      | S      | performance-engineer                   | Todo   |
| 39  | [Add `generateStaticParams` for locale segments](#39-add-generatestaticparams-for-locale-segments)                                               | 2      | S      | nextjs-developer                       | Todo   |
| 40  | [Clean up TypeScript casts (NextRequestInit, type predicates, sameSite)](#40-clean-up-typescript-casts-nextrequestinit-type-predicates-samesite) | 2      | S      | typescript-pro                         | Todo   |
| 41  | [Document `next-shared` in CLAUDE.md + extract error boundary](#41-document-next-shared-in-claudemd--extract-error-boundary)                     | 2      | S      | architect-reviewer                     | Todo   |
| 42  | [Fix turbo.json task dependencies](#42-fix-turbojson-task-dependencies)                                                                          | 2      | S      | architect-reviewer                     | Todo   |
| 43  | [Deduplicate TransactionTypeFilter/CategoryTypeFilter](#43-deduplicate-transactiontypefiltercategorytypefilter)                                  | 2      | S      | react-specialist, performance-engineer | Todo   |
| 44  | [AppSidebar/TimePicker/RecurringTransactions minor fixes](#44-appsidebartimepickerrecurringtransactions-minor-fixes)                             | 2      | S      | react-specialist                       | Todo   |
| 45  | [Deduplicate option lists + add Recharts loading fallbacks](#45-deduplicate-option-lists--add-recharts-loading-fallbacks)                        | 2      | S      | performance-engineer                   | Todo   |
| 46  | [Add missing Storybook stories](#46-add-missing-storybook-stories)                                                                               | 2      | S      | qa-expert                              | Todo   |

## Previous Improvements (Done)

Items completed in the previous improvement cycle (2026-04-05):

| Task                                                    | Status |
| ------------------------------------------------------- | ------ |
| Add Security Headers                                    | Done   |
| Add Error Boundaries and Loading States                 | Done   |
| Add Build and Format Check to CI                        | Done   |
| Fix JWT Validation in Middleware                        | Done   |
| Add File Upload Validation                              | Done   |
| Lazy-Load Recharts                                      | Done   |
| Use Zod Enums Instead of Strings for Union Types        | Done   |
| Fix Combobox Accessibility                              | Done   |
| Decouple `packages/shared` from Next.js                 | Done   |
| Fix Unsafe `query as Record<string, unknown>` Casts     | Done   |
| Add Auth Guards to Server Actions                       | Done   |
| Add Dashboard `revalidatePath` to Transaction Mutations | Done   |
| Extract `useUrlFilters` Shared Hook                     | Done   |
| Create `FormField` Wrapper for FieldError               | Done   |
| Extract CategoryFormPage Logic to Hook                  | Done   |
| Enable `exactOptionalPropertyTypes`                     | Done   |
| Lazy-Load papaparse                                     | Done   |
| Deduplicate `lucide-react`                              | Done   |
| Enable Turborepo Cache for Lint/Type-Check              | Done   |
| Add Exhaustive Union Checking Pattern                   | Done   |
| Adopt React 19 APIs (useActionState, useFormStatus)     | Done   |
| Fix Font Class Composition                              | Done   |

## Backlog (Carried Over)

| Task                              | Reason                                                      |
| --------------------------------- | ----------------------------------------------------------- |
| Make Access Token Cookie HttpOnly | Need to brainstorm BFF pattern for browser token management |
| Add Tests (Currently 0% Coverage) | Large effort; start with pure utils in packages/shared      |
| Commit OpenAPI Spec File          | Active development, need sync strategy                      |

## Recommended Execution Order

**Sprint 1 — Critical Security (S effort, Impact 5):** #1, #2
**Sprint 2 — Quick Security + Validation (S effort, Impact 3-4):** #4, #8, #14, #17, #20
**Sprint 3 — Accessibility + UX (S-M effort, Impact 4):** #5, #6, #7, #27
**Sprint 4 — Architecture (M effort, Impact 4-5):** #3, #13
**Sprint 5 — Performance Quick Wins (S effort, Impact 2-3):** #9, #21, #22, #23, #24, #34, #38
**Sprint 6 — RSC Conversion + Next.js (S-M effort, Impact 2-4):** #10, #25, #26, #35, #39
**Sprint 7 — TypeScript Hardening (S effort, Impact 2-4):** #15, #29, #30, #40
**Sprint 8 — QA Infrastructure (S effort, Impact 3-4):** #11, #12, #32, #33, #46
**Sprint 9 — Polish + DX (S effort, Impact 2-3):** #28, #31, #36, #37, #41-45

---

## Detailed Findings

### 1. Strengthen `requireAuth` — verify JWT, not just cookie presence

**Impact:** 5 | **Effort:** S | **Agent:** security-auditor

`requireAuth()` only checks that the `access_token` cookie exists via `cookies().get()`. It does not verify the JWT signature or expiration. Server actions can be called directly, bypassing middleware where JWT verification actually happens.

**Files:**

- `apps/money-tracker/src/actions/require-auth.ts`

**Action:** Call `verifyToken()` from `packages/shared/src/utils/jwt.ts` inside `requireAuth` to validate the JWT before allowing the action to proceed.

---

### 2. Add startup validation for JWT_SECRET

**Impact:** 5 | **Effort:** S | **Agent:** security-auditor

`.env.local` has a weak placeholder `JWT_SECRET="your-secret-key-change-me-in-production-min-32-chars"`. No build-time or startup-time check enforces that this has been changed. If deployed with the default, attackers can forge JWTs.

**Files:**

- `apps/money-tracker/.env.local`
- `packages/shared/src/utils/jwt.ts` (only warns, does not throw)

**Action:** Add a check in `instrumentation.ts` or `next.config.ts` that throws if `JWT_SECRET` is unset or matches the placeholder pattern.

---

### 3. Return structured errors from server actions (not null)

**Impact:** 5 | **Effort:** M | **Agents:** architect-reviewer, qa-expert

Every mutation server action returns `null` on any error. The API's `ProblemDetailsDto` (status, title, type) is discarded. Users always see a generic error toast, and failures are not logged server-side.

**Files:**

- All action files under `(app-layout)/transactions/actions/`, `categories/actions/`, `settings/actions/`

**Action:** Define a discriminated union return type: `{ ok: true; data: T } | { ok: false; error: string }`. The import action already follows this pattern. Add `console.error` for 5xx errors.

---

### 4. Add consistent Zod validation to all mutation server actions

**Impact:** 4 | **Effort:** S | **Agents:** security-auditor, architect-reviewer

`createTransaction` and `updateTransaction` pass input directly to the API without Zod validation. `updateCategory` validates with `safeParse` but then sends the raw `body` (not `validated.data`) to the API. Other actions (`createCategory`, `updateProfile`, recurring transactions) validate correctly.

**Files:**

- `transactions/actions/create-transaction.ts` (no validation)
- `transactions/actions/update-transaction.ts` (no validation)
- `categories/actions/update-category.ts:23` (uses `body` instead of `validated.data`)
- `auth/callback/action.ts` (`exchangeSocialCode` — no validation on `code` param)

**Action:** Add `safeParse` to all mutation actions. Fix `updateCategory` to use `validated.data`. Add basic validation to `exchangeSocialCode`.

---

### 5. Fix form error i18n — forms may display raw keys

**Impact:** 4 | **Effort:** S | **Agent:** react-specialist

Zod error messages are i18n keys (e.g., `'categoryRequired'`). `ChangePasswordForm` translates them via `tErrors(errors.field.message)`, but `TransactionFormPage` and `CategoryFormPage` pass raw error objects to `FormField` without translation — the user may see the raw key string.

**Files:**

- `transactions/components/transaction-form-page/TransactionFormPage.tsx:88`
- `categories/components/category-form-page/CategoryFormPage.tsx:86`
- `settings/components/change-password-form/ChangePasswordForm.tsx` (correct pattern)

**Action:** Apply the `tErrors()` translation pattern consistently in all forms, matching `ChangePasswordForm`.

---

### 6. Add `aria-invalid` to Input component

**Impact:** 4 | **Effort:** S | **Agent:** react-specialist

`Input` applies CSS `styles.error` when `error={true}` but does not set `aria-invalid`. `SelectTrigger` correctly applies `aria-invalid`. Without it, screen readers cannot detect invalid input state.

**Files:**

- `packages/ui/src/components/atoms/input/input.tsx` (missing)
- `packages/ui/src/components/atoms/select/select.tsx:25` (correct)

**Action:** Add `aria-invalid={error || undefined}` to the `<input>` element. Also add `aria-describedby` support for `FieldError` association.

---

### 7. Make CategoryPicker keyboard-accessible

**Impact:** 4 | **Effort:** M | **Agent:** react-specialist

`CategoryPicker` has a custom two-column dropdown with no keyboard navigation, no ARIA `listbox`/`option` roles, no `aria-expanded`, and no Escape-to-close.

**Files:**

- `transactions/components/category-picker/CategoryPicker.tsx`

**Action:** Add `role="listbox"` to the container, `role="option"` to each item, arrow key navigation, Enter to select, and Escape to close. Consider wrapping the popover portion with Radix Popover.

---

### 8. Remove type re-export from `CategoryTypeFilter` client file

**Impact:** 4 | **Effort:** S | **Agent:** react-specialist

`CategoryTypeFilter.tsx:17` re-exports `FilterValue` from a `'use client'` file. This can cause a runtime `ReferenceError` if a server component imports from this path.

**Files:**

- `categories/components/category-type-filter/CategoryTypeFilter.tsx:17`

**Action:** Remove the re-export. Callers should import `FilterValue` from `@/constants/transaction` directly.

---

### 9. Verify ThemeProvider has `attribute="data-theme"`

**Impact:** 4 | **Effort:** S | **Agent:** performance-engineer

Theme CSS uses `[data-theme="light"]` / `[data-theme="dark"]` selectors, but `next-themes` defaults to `class` strategy. If `ThemeProvider` is not configured with `attribute="data-theme"`, all theme CSS variables are dead code.

**Files:**

- `packages/ui/src/styles/tokens/theme.scss`
- `apps/money-tracker/src/app/[locale]/layout.tsx:55`

**Action:** Verify `<ThemeProvider attribute="data-theme">` is set. If not, add it.

---

### 10. Convert dashboard widgets to RSC

**Impact:** 4 | **Effort:** M | **Agent:** performance-engineer

`SummaryWidget`, `TopCategoryList`, and `RecentTransactionList` are marked `'use client'` but contain zero interactivity — only `useTranslations` and `useLocale`. They can be RSC by passing translated strings as props from their `*Server.tsx` wrappers.

**Files:**

- `dashboard/components/summary-widget/SummaryWidget.tsx`
- `dashboard/components/top-category-list/TopCategoryList.tsx`
- `dashboard/components/recent-transaction-list/RecentTransactionList.tsx`

**Action:** Pass translated strings as props from the Server components. Remove `'use client'` and `useTranslations`/`useLocale` calls.

---

### 11. Wire Storybook test runner to `pnpm test`

**Impact:** 4 | **Effort:** S | **Agent:** qa-expert

`@storybook/addon-vitest` and Playwright are fully configured in `apps/storybook/vite.config.ts`, but the package has no `"test"` script. The Storybook tests never run via `pnpm test`.

**Files:**

- `apps/storybook/package.json` (missing `"test"` script)
- `apps/storybook/vite.config.ts` (fully configured)

**Action:** Add `"test": "vitest run"` to `apps/storybook/package.json`.

---

### 12. Add test job to GitHub Actions PR workflow

**Impact:** 4 | **Effort:** S | **Agent:** qa-expert

The PR workflow runs `lint`, `type-check`, `stylelint`, `build`, and `fmt:check` — but has no `test` job. Tests are not enforced on PRs.

**Files:**

- `.github/workflows/pull-request.yml`

**Action:** Add a `test` job parallel to `lint` and `type-check`.

---

### 13. Make `ApiResponse<T>` a discriminated union

**Impact:** 4 | **Effort:** M | **Agent:** typescript-pro

`ApiResponse<T>` has `{ data: T | null; error: ProblemDetailsDto | null }` — both can be `null` simultaneously. A discriminated union (`{ ok: true; data: T } | { ok: false; error: ProblemDetailsDto }`) would make every call site properly narrowed.

**Files:**

- `packages/shared/src/api/client/types.ts:26-30`

**Action:** Refactor to a discriminated union with an `ok` field. Update `parseResponseBody` and all call sites.

---

### 14. Add runtime guard to auth interceptor token refresh

**Impact:** 4 | **Effort:** S | **Agent:** typescript-pro

`auth-interceptor.ts:42` casts `await refreshResponse.json() as AuthResponseDto` without runtime validation. If the refresh endpoint returns an error body, `tokenData.accessToken` would be `undefined` at runtime while TypeScript believes it's `string`.

**Files:**

- `packages/shared/src/api/client/interceptors/auth-interceptor.ts:42`

**Action:** Add a guard: `if (typeof body?.accessToken === 'string')` before casting.

---

### 15. Fix profileFormSchema — use CountryCode union

**Impact:** 4 | **Effort:** S | **Agent:** typescript-pro

`profileFormSchema` uses `z.string().optional()` for `countryCode`, accepting any string. `UpdateProfileDto.countryCode` is `CountryCode` (a union of ~170 literals). The cast `as UpdateProfileDto` papers over the mismatch.

**Files:**

- `settings/constants/profile-form-schema.ts:7`
- `settings/actions/update-profile.ts:23`

**Action:** Use `z.enum([...countryCodeList]).optional()` for `countryCode` in the schema.

---

### 16. Replace CSP `unsafe-inline` with nonce-based script-src

**Impact:** 4 | **Effort:** L | **Agents:** security-auditor, nextjs-developer

CSP includes `script-src 'self' 'unsafe-inline'` in production. Any XSS that injects inline scripts would execute freely.

**Files:**

- `apps/money-tracker/next.config.ts:12`

**Action:** Implement nonce-based CSP via middleware. Generate a nonce per request, set it in headers, reference via `'strict-dynamic'`.

---

### 17. Tighten security headers (CSP connect-src, Permissions-Policy)

**Impact:** 3 | **Effort:** S | **Agent:** security-auditor

`connect-src` includes a trailing `https:` wildcard allowing connections to any HTTPS origin. No `Permissions-Policy` header restricts browser features.

**Files:**

- `apps/money-tracker/next.config.ts:12` (CSP)
- `apps/money-tracker/next.config.ts:9-30` (headers)

**Action:** Remove `https:` from `connect-src`; whitelist only the API domain. Add `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`.

---

### 18. Set onboarding status cookie to httpOnly

**Impact:** 3 | **Effort:** M | **Agent:** security-auditor

The onboarding status cookie is `httpOnly: false` and stores `{ emailVerified, onboardingCompleted }`. A user can manually set this cookie to bypass onboarding redirection.

**Files:**

- `apps/money-tracker/src/utils/middleware/onboarding.ts:86-93`

**Action:** Set `httpOnly: true`. Pass onboarding status to client via RSC props if needed.

---

### 19. Add rate limiting on auth endpoints

**Impact:** 3 | **Effort:** M | **Agent:** security-auditor

No rate limiting on sign-in, sign-up, or password change actions at the Next.js layer.

**Files:**

- `(auth-layout)/sign-in/action.ts`, `sign-up/action.ts`, `settings/actions/change-password.ts`

**Action:** Implement rate limiting in middleware or confirm backend enforces it.

---

### 20. Validate entity ID params in server actions

**Impact:** 3 | **Effort:** S | **Agent:** security-auditor

`deleteTransaction`, `deleteCategory`, `pauseRecurringTransaction`, etc. accept raw `id: string` without format validation.

**Files:**

- `transactions/actions/delete-transaction.ts:9`, `categories/actions/delete-category.ts:10`, and 5+ others

**Action:** Add Zod UUID or pattern validation for `id` parameters.

---

### 21. Remove redundant `revalidatePath` alongside `updateTag`

**Impact:** 3 | **Effort:** S | **Agents:** nextjs-developer, performance-engineer

`revalidateTransactionCaches` and 10+ other action files call both `updateTag` and `revalidatePath`. Per the project's own convention, `updateTag` is sufficient.

**Files:**

- `transactions/actions/revalidate-transaction-caches.ts:7-11`
- All category, profile, and recurring transaction action files

**Action:** Remove `revalidatePath` calls; keep `updateTag` only.

---

### 22. Stop invalidating CATEGORIES cache on transaction mutations

**Impact:** 3 | **Effort:** S | **Agent:** performance-engineer

`revalidateTransactionCaches` calls `updateTag(CACHE_TAG.CATEGORIES)` on every transaction mutation. Categories don't change when transactions change.

**Files:**

- `transactions/actions/revalidate-transaction-caches.ts:9`

**Action:** Remove `updateTag(CACHE_TAG.CATEGORIES)` from transaction cache invalidation.

---

### 23. Cache Intl formatter instances in formatAmount/formatDate

**Impact:** 3 | **Effort:** S | **Agent:** performance-engineer

`formatAmount` creates a `new Intl.NumberFormat(locale, {...})` on every call. `Intl.NumberFormat` construction is expensive (locale negotiation + pattern compilation). Called 6+ times on dashboard, once per row in transaction list.

**Files:**

- `packages/shared/src/utils/format-amount.ts:1-7`
- `packages/shared/src/utils/date/format.ts:14-19`

**Action:** Add a module-level `Map<string, Intl.NumberFormat>` keyed by `${locale}:${currency}`.

---

### 24. Add `display: 'swap'` to Google Fonts

**Impact:** 3 | **Effort:** S | **Agents:** nextjs-developer, performance-engineer

`Poppins` and `Outfit` are loaded without `display: 'swap'`. Next.js defaults to `'optional'`, which may cause invisible text during font load.

**Files:**

- `apps/money-tracker/src/app/[locale]/layout.tsx:18-27`

**Action:** Add `display: 'swap'` to both font configurations.

---

### 25. Add missing loading.tsx and error.tsx for sub-routes

**Impact:** 3 | **Effort:** S | **Agent:** nextjs-developer

No `loading.tsx` for `transactions/recurring`, `transactions/by-category`, `transactions/import`, `transactions/create`, `categories/create`. No `error.tsx` for `(home-layout)` and `(onboarding-layout)`.

**Files:**

- Missing files under the above route directories

**Action:** Add `loading.tsx` (reuse `PageSkeleton`) and `error.tsx` (redirect to appropriate home path) per route group.

---

### 26. Complete SEO setup (metadata, sitemap, robots)

**Impact:** 3 | **Effort:** M | **Agent:** nextjs-developer

No `metadataBase`, `openGraph`, `twitter`, `sitemap.ts`, or `robots.ts`. Public routes are crawlable but not listed.

**Files:**

- `apps/money-tracker/src/app/[locale]/layout.tsx:29-35` (minimal metadata)
- `apps/money-tracker/src/app/` (missing sitemap.ts, robots.ts)

**Action:** Add `metadataBase`, OG/Twitter metadata to root layout. Create `sitemap.ts` and `robots.ts`.

---

### 27. Replace hand-rolled dropdowns with Radix

**Impact:** 3 | **Effort:** S | **Agents:** nextjs-developer, react-specialist

`ExportTransactionButton` and `UserMenu` implement custom dropdowns with `useRef`, `useState`, `useEffect` + `document.addEventListener('mousedown')`. No keyboard navigation, no Escape handling.

**Files:**

- `transactions/components/export-transaction-button/ExportTransactionButton.tsx:66-154`
- `(app-layout)/components/user-menu/UserMenu.tsx:21-28`

**Action:** Replace with Radix `DropdownMenu` from `@track-my-life/ui`.

---

### 28. Fix useProfileForm — direct defaultValues instead of useEffect+reset

**Impact:** 3 | **Effort:** S | **Agent:** react-specialist

`useProfileForm` initializes `useForm` with empty string defaults, then overrides them via `useEffect` + `reset()`. This causes a flash of empty inputs.

**Files:**

- `settings/components/profile-form/hooks/use-profile-form.ts:36-50`

**Action:** Pass profile data directly to `defaultValues`. Remove the `useEffect` + `reset`.

---

### 29. Link RecurringFrequency Zod enum to generated type

**Impact:** 3 | **Effort:** S | **Agent:** typescript-pro

Local `RECURRING_FREQUENCY` constant duplicates the generated `RecurringFrequency` type. Three files cast `frequency as RecurringFrequency`. If the API adds a new frequency, the Zod schema won't catch it.

**Files:**

- `transactions/recurring/constants/recurring-transaction-form-schema.ts:10-15`
- `transactions/recurring/actions/create-recurring-transaction.ts:31`

**Action:** Use `z.enum([...] satisfies [RecurringFrequency, ...RecurringFrequency[]])` to create a compile-time link.

---

### 30. Fix CurrencyStep — don't cast empty string to CurrencyCode

**Impact:** 3 | **Effort:** S | **Agent:** typescript-pro

`CurrencyStep.tsx:42` casts `(defaultCurrency ?? '') as CurrencyStepValues['baseCurrencyCode']`. Empty string `''` is not a valid `CurrencyCode`.

**Files:**

- `(onboarding-layout)/onboarding/components/currency-step/CurrencyStep.tsx:42`

**Action:** Change prop type to `CurrencyCode | undefined` and use `?? undefined` instead of `?? ''`.

---

### 31. Extract duplicated cache config constants

**Impact:** 3 | **Effort:** S | **Agent:** architect-reviewer

`ANALYTICS_CACHE = { revalidate: 300, tags: [CACHE_TAG.ANALYTICS] }` is defined identically in 5 dashboard action files. `TRANSACTIONS_CACHE` is duplicated in 3 files.

**Files:**

- All `dashboard/actions/fetch-*.ts` files
- `transactions/actions/fetch-transaction-list.ts`, `fetch-transaction.ts`, `by-category/actions/fetch-transactions-by-category.ts`

**Action:** Move to `apps/money-tracker/src/constants/cache-tag.ts` alongside existing `CACHE_TAG` definitions.

---

### 32. Enable a11y checks in Storybook

**Impact:** 3 | **Effort:** S | **Agent:** qa-expert

`@storybook/addon-a11y` is installed but `preview.ts` sets `a11y: { test: 'todo' }`, suppressing all axe-core violations.

**Files:**

- `apps/storybook/.storybook/preview.ts:47`

**Action:** Change to `a11y: { test: 'error' }`. Audit violations first by running Storybook interactively.

---

### 33. Fix missing i18n keys + add parity check to CI

**Impact:** 3 | **Effort:** S | **Agent:** qa-expert

`errorGeneric` key exists in `en/auth-shared.json` but is missing from `uk/auth-shared.json`. No automated check ensures locale key parity.

**Files:**

- `apps/money-tracker/messages/en/auth-shared.json`
- `apps/money-tracker/messages/uk/auth-shared.json`

**Action:** Add the missing key. Create a CI script that diffs flattened keys between locales.

---

### 34. Cache .next/cache in CI between builds

**Impact:** 3 | **Effort:** S | **Agent:** performance-engineer

`turbo.json` excludes `.next/cache/**` from outputs (correct for artifacts), but CI never caches this directory separately. Full recompilation on every CI run.

**Files:**

- `turbo.json:12`
- `.github/workflows/pull-request.yml`

**Action:** Add `.next/cache` to CI caching (e.g., GitHub Actions cache step).

---

### 35. Convert more components to RSC (by-category pages, WidgetCard)

**Impact:** 2 | **Effort:** S | **Agents:** nextjs-developer, performance-engineer

`TransactionsByCategoryPageContent`, `CategoryDetailContent`, and `WidgetCard` are `'use client'` only for `useTranslations`. Pass translations as props from server wrappers.

**Files:**

- `transactions/by-category/page.content.tsx`
- `transactions/by-category/[categoryId]/page.content.tsx`
- `dashboard/components/widget-card/WidgetCard.tsx`

**Action:** Accept translation strings as props, remove `'use client'`. Also remove dead `isLoading` prop from `WidgetCard`.

---

### 36. Remove unnecessary `router.refresh()` in recurring transaction hooks

**Impact:** 2 | **Effort:** S | **Agents:** nextjs-developer, react-specialist

`use-recurring-transaction-actions.ts` calls `router.refresh()` after both `handlePause` and `handleResume`. This is redundant with `updateTag`/`revalidatePath` in the server actions.

**Files:**

- `transactions/recurring/[id]/hooks/use-recurring-transaction-actions.ts:53,64`

**Action:** Remove both `router.refresh()` calls.

---

### 37. Refactor useCategoryFilters to use useUrlFilters

**Impact:** 2 | **Effort:** S | **Agent:** react-specialist

`useCategoryFilters` manually builds `URLSearchParams` and calls `router.replace` — duplicating logic already in `useUrlFilters`.

**Files:**

- `categories/hooks/use-category-filters.ts`
- `src/hooks/use-url-filters.ts`

**Action:** Refactor to `useUrlFilters<{ type: FilterValue }>`.

---

### 38. Wrap getTimezoneOffset/RscTokenProvider in React cache()

**Impact:** 2 | **Effort:** S | **Agent:** performance-engineer

`getTimezoneOffset` opens the cookie store 6x per dashboard render (once per widget). `RscTokenProvider.getAccessToken` also reads cookies independently per RSC render.

**Files:**

- `apps/money-tracker/src/utils/get-timezone-offset.ts`
- `packages/next-shared/src/api/client/token/rsc-token-provider.ts`

**Action:** Wrap both with `cache()` from `'react'` to deduplicate per request.

---

### 39. Add `generateStaticParams` for locale segments

**Impact:** 2 | **Effort:** S | **Agent:** nextjs-developer

`[locale]` segments are fully dynamic. The locale list is known at build time from routing config.

**Files:**

- `apps/money-tracker/src/app/[locale]/layout.tsx`

**Action:** Add `generateStaticParams` returning supported locale codes.

---

### 40. Clean up TypeScript casts (NextRequestInit, type predicates, sameSite)

**Impact:** 2 | **Effort:** S | **Agent:** typescript-pro

Multiple small type safety issues:

- `api-client.ts:110-137` — define a `NextRequestInit` interface to eliminate `fetchInit as RequestInit` and `next` property casts
- `fetch-category.ts`, `fetch-transaction.ts`, `fetch-recurring-transaction.ts` — use named type predicates instead of inline `'id' in data` + `as T`
- `forward-response-cookie-list.ts:37` — validate sameSite value before casting

**Action:** Address each cast individually.

---

### 41. Document `next-shared` in CLAUDE.md + extract error boundary

**Impact:** 2 | **Effort:** S | **Agent:** architect-reviewer

`@track-my-life/next-shared` is actively used but absent from CLAUDE.md's structure diagram. Three error boundary files (`(app-layout)/error.tsx`, `[locale]/error.tsx`, `(auth-layout)/error.tsx`) are near-identical.

**Action:** Add `next-shared` to CLAUDE.md. Extract shared `AppErrorBoundary` component accepting a `homePath` prop.

---

### 42. Fix turbo.json task dependencies

**Impact:** 2 | **Effort:** S | **Agent:** architect-reviewer

- `build:storybook` depends on `^build:storybook` (resolves to nothing since no package has that script)
- `test:e2e` has no `dependsOn: ["build"]` — may test against stale build
- `type-check` depends on `^build` which forces full package build unnecessarily

**Files:**

- `turbo.json:13-16,19`

**Action:** Fix `build:storybook` to depend on `^build`. Add `build` dependency to `test:e2e`. Evaluate whether `type-check` needs `^build`.

---

### 43. Deduplicate TransactionTypeFilter/CategoryTypeFilter

**Impact:** 2 | **Effort:** S | **Agents:** react-specialist, performance-engineer

Both components are structurally identical — same props, same render logic, only the `useTranslations` namespace differs.

**Files:**

- `transactions/components/transaction-type-filter/TransactionTypeFilter.tsx`
- `categories/components/category-type-filter/CategoryTypeFilter.tsx`

**Action:** Create a single `TypeFilter` component accepting a `labelList` prop. Or promote to `packages/ui` without i18n dependency.

---

### 44. AppSidebar/TimePicker/RecurringTransactions minor fixes

**Impact:** 2 | **Effort:** S | **Agent:** react-specialist

- AppSidebar backdrop has `onKeyDown={undefined}` — not keyboard-dismissable. Add `aria-hidden="true"` or Escape handler
- `NAVIGATION_ITEM_LIST` creates `<Icon />` elements at module load — store component references instead
- TimePicker has hardcoded English `aria-label="Hours"`/`"Minutes"` — add `hoursLabel`/`minutesLabel` props
- `RecurringTransactionsPageContent` pause/resume has no loading feedback — wrap in `useTransition`

**Files:**

- `(app-layout)/components/app-sidebar/AppSidebar.tsx:139,42-73`
- `packages/ui/src/components/atoms/time-picker/time-picker.tsx:111,118`
- `transactions/recurring/page.content.tsx:45-63`

---

### 45. Deduplicate option lists + add Recharts loading fallbacks

**Impact:** 2 | **Effort:** S | **Agent:** performance-engineer

- `CURRENCY_OPTION_LIST` in settings duplicates `CURRENCY_CODE_LIST` from shared — derive instead of maintaining separately
- `COUNTRY_OPTION_LIST` (250 entries) could live in `packages/shared`
- Three Recharts `dynamic()` imports have no `loading` prop — flash in without skeleton

**Files:**

- `settings/constants/currency-option-list.ts`, `settings/constants/country-option-list.ts`
- `dashboard/components/*Server.tsx` (dynamic imports)

---

### 46. Add missing Storybook stories

**Impact:** 2 | **Effort:** S | **Agent:** qa-expert

`Typography`, `Card`, `Separator`, and `UnderlineLink` have no stories, violating the project's storybook rule.

**Files:**

- `packages/ui/src/components/atoms/typography/`, `molecules/card/`, `atoms/separator/`, `atoms/underline-link/`

**Action:** Create CSF3 stories with `tags: ['autodocs']` for each.
