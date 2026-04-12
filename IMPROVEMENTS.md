# Track My Life - Improvement Roadmap

> Updated: 2026-04-12 | Analyzed by: architect-reviewer, nextjs-developer, performance-engineer, qa-expert, react-specialist, security-auditor, typescript-pro, accessibility-tester, build-engineer, dependency-manager, dx-optimizer, seo-specialist, refactoring-specialist

## Progress Tracker

| #   | Task                                                                                                                                              | Impact | Effort | Agent(s)                        | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------------------------------- | ------ |
| 34  | [Cache .next/cache in CI between builds](#34-cache-nextcache-in-ci-between-builds)                                                                | 3      | S      | performance-engineer            | Todo   |
| 43  | [Combobox trigger button missing accessible name](#43-combobox-trigger-button-missing-accessible-name)                                            | 4      | S      | accessibility-tester            | Todo   |
| 44  | [Onboarding route group cross-imports into app-layout](#44-onboarding-route-group-cross-imports-into-app-layout)                                  | 4      | M      | architect-reviewer              | Todo   |
| 45  | [FormField doesn't associate labels with Combobox/Select](#45-formfield-doesnt-associate-labels-with-comboboxselect)                              | 4      | M      | accessibility-tester            | Todo   |
| 48  | [CSP missing object-src, base-uri, form-action directives](#48-csp-missing-object-src-base-uri-form-action-directives)                            | 3      | S      | security-auditor                | Todo   |
| 49  | [completeOnboarding server action has no Zod validation](#49-completeonboarding-server-action-has-no-zod-validation)                              | 3      | S      | security-auditor                | Todo   |
| 50  | [deleteAccount server action lacks rate limiting](#50-deleteaccount-server-action-lacks-rate-limiting)                                            | 3      | S      | security-auditor                | Todo   |
| 51  | [redirectUnauthorized uses non-i18n redirect](#51-redirectunauthorized-uses-non-i18n-redirect)                                                    | 3      | S      | architect-reviewer, nextjs-dev  | Todo   |
| 52  | [fetchCategory missing React cache() and cache tags](#52-fetchcategory-missing-react-cache-and-cache-tags)                                        | 3      | S      | architect-reviewer              | Todo   |
| 53  | [withCache uses unbounded Map with no eviction](#53-withcache-uses-unbounded-map-with-no-eviction)                                                | 3      | S      | architect-reviewer              | Todo   |
| 54  | [groupTransactionListByDate runs without memoization](#54-grouptransactionlistbydate-runs-without-memoization)                                    | 3      | S      | performance-engineer            | Todo   |
| 55  | [CURRENCY_CODE_LIST missing satisfies constraint](#55-currency_code_list-missing-satisfies-constraint)                                            | 3      | S      | typescript-pro                  | Todo   |
| 56  | [importTransactionList uses ad-hoc return shape](#56-importtransactionlist-uses-ad-hoc-return-shape)                                              | 3      | S      | typescript-pro, nextjs-dev      | Todo   |
| 57  | [Unsafe as unknown as AuthResponseDto cast](#57-unsafe-as-unknown-as-authresponsedto-cast)                                                        | 3      | S      | typescript-pro                  | Todo   |
| 58  | [DeleteAccountSection imports from next/dist internal path](#58-deleteaccountsection-imports-from-nextdist-internal-path)                         | 3      | S      | react-specialist                | Todo   |
| 59  | [Deduplicate FREQUENCY/STATUS label and badge constants](#59-deduplicate-frequencystatus-label-and-badge-constants)                               | 3      | S      | react-specialist, refactoring   | Todo   |
| 60  | [ImportPreviewTable missing aria-label](#60-importpreviewtable-missing-aria-label)                                                                | 3      | S      | accessibility-tester            | Todo   |
| 61  | [generate:api and generate:theme not runnable from repo root](#61-generateapi-and-generatetheme-not-runnable-from-repo-root)                      | 3      | S      | dx-optimizer                    | Todo   |
| 62  | [Clarify lint/stylelint caching in turbo.json](#62-clarify-lintstylelint-caching-in-turbojson)                                                    | 3      | S      | build-engineer                  | Todo   |
| 63  | [DashboardFilterBar renders full 160+ currency entries](#63-dashboardfilterbar-renders-full-160-currency-entries)                                 | 3      | M      | performance-engineer            | Todo   |
| 64  | [Rate limiter trusts spoofable X-Forwarded-For header](#64-rate-limiter-trusts-spoofable-x-forwarded-for-header)                                  | 3      | M      | security-auditor                | Todo   |
| 65  | [TransactionFilters sortBy/sortOrder typed as string](#65-transactionfilters-sortbysortorder-typed-as-string)                                     | 3      | M      | typescript-pro                  | Todo   |
| 66  | [API service classes inheritance coupling to ApiClient](#66-api-service-classes-inheritance-coupling-to-apiclient)                                | 3      | M      | architect-reviewer              | Todo   |
| 68  | [Refactor updateRecurringTransaction to remove oxlint-disable](#68-refactor-updaterecurringtransaction-to-remove-oxlint-disable)                  | 3      | M      | nextjs-dev, refactoring         | Todo   |
| 69  | [Missing canonical URL for i18n routes](#69-missing-canonical-url-for-i18n-routes)                                                                | 3      | M      | seo-specialist                  | Todo   |
| 70  | [Redundant redirectIfNotOnboarded calls in every page](#70-redundant-redirectifnotonboarded-calls-in-every-page)                                  | 2      | S      | architect-reviewer              | Todo   |
| 71  | [Dashboard hardcodes default currency UAH](#71-dashboard-hardcodes-default-currency-uah)                                                          | 2      | S      | architect-reviewer              | Todo   |
| 72  | [next-themes in three packages instead of peerDep in UI](#72-next-themes-in-three-packages-instead-of-peerdep-in-ui)                              | 2      | S      | architect-reviewer              | Todo   |
| 73  | [Remove react/react-dom from packages/shared](#73-remove-reactreact-dom-from-packagesshared)                                                      | 2      | S      | architect-reviewer, dep-manager | Todo   |
| 74  | [Zod schemas allow unbounded string lengths](#74-zod-schemas-allow-unbounded-string-lengths)                                                      | 2      | S      | security-auditor                | Todo   |
| 75  | [extractUserIdFromToken unverified JWT fallback](#75-extractuseridfromtoken-unverified-jwt-fallback)                                              | 2      | S      | security-auditor                | Todo   |
| 76  | [TrendsChart uses undefined locale in date formatting](#76-trendschart-uses-undefined-locale-in-date-formatting)                                  | 2      | S      | performance-engineer            | Todo   |
| 77  | [SidebarProvider context value recreated every render](#77-sidebarprovider-context-value-recreated-every-render)                                  | 2      | S      | performance-engineer            | Todo   |
| 78  | [completeOnboarding/assignDefaultCategories missing ServerActionResult](#78-completeonboardingassigndefaultcategories-missing-serveractionresult) | 2      | S      | typescript-pro, nextjs-dev      | Todo   |
| 79  | [checkIsAcceptedExtension uses unsafe element cast](#79-checkisacceptedextension-uses-unsafe-element-cast)                                        | 2      | S      | typescript-pro                  | Todo   |
| 80  | [update-profile.ts unnecessary cast to UpdateProfileDto](#80-update-profilets-unnecessary-cast-to-updateprofiledto)                               | 2      | S      | typescript-pro                  | Todo   |
| 81  | [Replace manual loading states with useTransition](#81-replace-manual-loading-states-with-usetransition)                                          | 2      | S      | react-specialist                | Todo   |
| 82  | [Form pages duplicate useRouter for cancel button](#82-form-pages-duplicate-userouter-for-cancel-button)                                          | 2      | S      | react-specialist                | Todo   |
| 83  | [Handlers missing useCallback in several components](#83-handlers-missing-usecallback-in-several-components)                                      | 2      | S      | react-specialist                | Todo   |
| 84  | [OnboardingPageContent builds all step components every render](#84-onboardingpagecontent-builds-all-step-components-every-render)                | 2      | S      | react-specialist                | Todo   |
| 85  | [parseRecurringTransactionSearchParams in component file](#85-parserecurringtransactionsearchparams-in-component-file)                            | 2      | S      | nextjs-developer                | Todo   |
| 86  | [Missing loading.tsx for dynamic detail/edit routes](#86-missing-loadingtsx-for-dynamic-detailedit-routes)                                        | 2      | S      | nextjs-developer                | Todo   |
| 87  | [useSearchParams imported directly from next/navigation](#87-usesearchparams-imported-directly-from-nextnavigation)                               | 2      | S      | nextjs-developer                | Todo   |
| 88  | [DropdownMenu has no Storybook story](#88-dropdownmenu-has-no-storybook-story)                                                                    | 2      | S      | qa-expert                       | Todo   |
| 89  | [Input startAdornment variant has no Storybook story](#89-input-startadornment-variant-has-no-storybook-story)                                    | 2      | S      | qa-expert                       | Todo   |
| 91  | [Use :focus-visible instead of :focus in UI components](#91-use-focus-visible-instead-of-focus-in-ui-components)                                  | 2      | S      | accessibility-tester            | Todo   |
| 92  | [type-check unnecessary dependency on ^build](#92-type-check-unnecessary-dependency-on-build)                                                     | 2      | S      | build-engineer                  | Todo   |
| 93  | [No .turboignore file](#93-no-turboignore-file)                                                                                                   | 2      | S      | build-engineer                  | Todo   |
| 94  | [CI rebuilds packages unnecessarily in type-check job](#94-ci-rebuilds-packages-unnecessarily-in-type-check-job)                                  | 2      | S      | build-engineer                  | Todo   |
| 95  | [Test task missing from turbo.json config](#95-test-task-missing-from-turbojson-config)                                                           | 2      | S      | build-engineer                  | Todo   |
| 96  | [README documents wrong script names](#96-readme-documents-wrong-script-names)                                                                    | 2      | S      | dx-optimizer                    | Todo   |
| 97  | [pnpm dev starts Storybook by default, no dev:app shortcut](#97-pnpm-dev-starts-storybook-by-default-no-devapp-shortcut)                          | 2      | S      | dx-optimizer                    | Todo   |
| 98  | [CI init-env job overhead for hardcoded versions](#98-ci-init-env-job-overhead-for-hardcoded-versions)                                            | 2      | S      | dx-optimizer                    | Todo   |
| 99  | [import/no-unassigned-import forces disable comments for CSS](#99-importno-unassigned-import-forces-disable-comments-for-css)                     | 2      | S      | dx-optimizer                    | Todo   |
| 100 | [i18n-check not surfaced in root package.json](#100-i18n-check-not-surfaced-in-root-packagejson)                                                  | 2      | S      | dx-optimizer                    | Todo   |
| 101 | [Deduplicate getSelectedFile/prepareFormData helpers](#101-deduplicate-getselectedfileprepareformdata-helpers)                                    | 2      | S      | refactoring-specialist          | Todo   |
| 102 | [checkIsValidFilterType guard duplicated](#102-checkisvalidfiltertype-guard-duplicated)                                                           | 2      | S      | refactoring-specialist          | Todo   |
| 103 | [DEFAULT_PAGE/DEFAULT_PAGE_SIZE duplicated](#103-default_pagedefault_page_size-duplicated)                                                        | 2      | S      | refactoring-specialist          | Todo   |
| 104 | [Inline transaction type ternary repeated across 4 files](#104-inline-transaction-type-ternary-repeated-across-4-files)                           | 2      | S      | refactoring-specialist          | Todo   |
| 105 | [handleFormSubmit missing startTransition in useCallback deps](#105-handleformsubmit-missing-starttransition-in-usecallback-deps)                 | 2      | S      | refactoring-specialist          | Todo   |
| 106 | [RecentTransactionList renders raw transaction.type untranslated](#106-recenttransactionlist-renders-raw-transactiontype-untranslated)            | 2      | S      | refactoring-specialist          | Todo   |
| 107 | [Hoist LEAF_NAVIGATION_ITEM_LIST to module scope](#107-hoist-leaf_navigation_item_list-to-module-scope)                                           | 2      | S      | performance-engineer            | Todo   |
| 108 | [RSC AuthInterceptor cannot forward refresh-token cookies](#108-rsc-authinterceptor-cannot-forward-refresh-token-cookies)                         | 2      | M      | security-auditor                | Todo   |
| 109 | [TypeScript incremental compilation disabled](#109-typescript-incremental-compilation-disabled)                                                   | 2      | M      | build-engineer                  | Todo   |
| 110 | [Date/Time helpers in hook belong in shared utils](#110-datetime-helpers-in-hook-belong-in-shared-utils)                                          | 2      | M      | react-specialist                | Todo   |
| 111 | [LocalizationMessages typed as Record string unknown](#111-localizationmessages-typed-as-record-string-unknown)                                   | 2      | M      | typescript-pro                  | Todo   |
| 112 | [revalidateImportCaches duplicates revalidateTransactionCaches](#112-revalidateimportcaches-duplicates-revalidatetransactioncaches)               | 1      | S      | performance-engineer            | Todo   |

## Recommended Execution Order

**Sprint 1 -- Critical Security (S effort, Impact 5):** #1, #2
**Sprint 2 -- Quick Security + Validation (S effort, Impact 3-4):** #4, #8, #14, #17, #20
**Sprint 3 -- Accessibility + UX (S-M effort, Impact 4):** #5, #6, #7, #27
**Sprint 4 -- Architecture (M effort, Impact 4-5):** #3
**Sprint 5 -- Performance Quick Wins (S effort, Impact 2-3):** #9, #24, #34, #38
**Sprint 6 -- RSC Conversion + Next.js (S-M effort, Impact 2-4):** #10, #25, #26, #35
**Sprint 7 -- TypeScript Hardening (S effort, Impact 2-4):** ~~done~~
**Sprint 8 -- QA Infrastructure (S effort, Impact 3-4):** #11, #12, #32
**Sprint 9 -- Polish + DX (S effort, Impact 2-3):** #42

**Sprint 10 -- Accessibility (S-M effort, Impact 4):** #43, #45, #60, #91
**Sprint 11 -- Security Hardening (S effort, Impact 3):** #48, #49, #50, #74, #75
**Sprint 12 -- Architecture & Data Flow (S effort, Impact 3):** #51, #52, #53, #56, #59, #78
**Sprint 13 -- TypeScript Strictness (S effort, Impact 3):** #55, #57, #58, #79, #80
**Sprint 14 -- Performance Quick Wins (S effort, Impact 2-3):** #54, #77, #107, #76
**Sprint 15 -- React Patterns (S effort, Impact 2):** #81, #82, #83, #84, #105
**Sprint 16 -- Build & CI (S effort, Impact 2-3):** #62, #92, #93, #94, #95, #98
**Sprint 17 -- DX & Documentation (S effort, Impact 2-3):** #61, #96, #97, #99, #100
**Sprint 18 -- Next.js Patterns (S effort, Impact 2):** #70, #85, #86, #87
**Sprint 19 -- QA/Testing (S effort, Impact 2):** #88, #89
**Sprint 20 -- Refactoring & Dedup (S effort, Impact 2):** #71, #101, #102, #103, #104, #106, #112
**Sprint 21 -- Architecture (M effort, Impact 3):** #44, #63, #65, #66, #68, #69
**Sprint 22 -- Remaining M effort (Impact 2):** #108, #109, #110, #111, #64, #72, #73

---

## Detailed Findings

### 34. Cache .next/cache in CI between builds

**Impact:** 3 | **Effort:** S | **Agent:** performance-engineer

`turbo.json` excludes `.next/cache/**` from outputs (correct for artifacts), but CI never caches this directory separately. Full recompilation on every CI run.

**Files:**

- `turbo.json:12`
- `.github/workflows/pull-request.yml`

**Action:** Add `.next/cache` to CI caching (e.g., GitHub Actions cache step).

---

### 43. Combobox trigger button missing accessible name

**Impact:** 4 | **Effort:** S | **Agent:** accessibility-tester

The Combobox trigger button lacks an `aria-label` or `aria-labelledby` attribute. When FormField wraps it without `htmlFor`, screen readers cannot associate the label with the button, leaving it without an accessible name.

**Files:**

- `packages/ui/src/components/molecules/combobox/combobox.tsx:89-104`

**Action:** Add `aria-labelledby` prop to the Combobox component interface. In FormField usage, generate a unique label ID and pass it to Combobox to create proper label association.

---

### 44. Onboarding route group cross-imports into app-layout

**Impact:** 4 | **Effort:** M | **Agent:** architect-reviewer

The `(onboarding-layout)` route group reaches 4-5 levels up via relative imports into `(app-layout)` to reuse `importTransactionList`, `parseImportFile`, `validateImportRowList`, `ValidationResult`, and `CURRENCY_OPTION_LIST`. This creates tight coupling between two route groups that should be independent.

**Files:**

- `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/components/categories-step/hooks/use-categories-step.ts:12-16`
- `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/components/currency-step/CurrencyStep.tsx:23`

**Action:** Move shared import utilities (`parseImportFile`, `validateImportRowList`, `importRowSchema`, `ValidationResult`) to `apps/money-tracker/src/utils/import/`. Move `CURRENCY_OPTION_LIST` to `apps/money-tracker/src/constants/`. Promote `importTransactionList` server action to `apps/money-tracker/src/actions/`.

---

### 45. FormField doesn't associate labels with Combobox/Select

**Impact:** 4 | **Effort:** M | **Agent:** accessibility-tester

FormField accepts an `htmlFor` prop but doesn't pass it to child components (Select, Combobox). When used with non-input controls, the label's `for` attribute cannot be set, breaking the programmatic label association.

**Files:**

- `packages/ui/src/components/molecules/field/field.tsx:133-146`

**Action:** Modify FormField to generate and expose a label ID via an id prop on FieldLabel, allowing composed components to receive `aria-labelledby` and properly associate with the label.

---

### 48. CSP missing object-src, base-uri, form-action directives

**Impact:** 3 | **Effort:** S | **Agent:** security-auditor

The CSP header sets `default-src`, `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`, and `frame-ancestors`, but omits `object-src`, `base-uri`, and `form-action`. Without these, plugins can be embedded, base URLs can be hijacked, and forms can submit to attacker-controlled endpoints.

**Files:**

- `apps/money-tracker/src/utils/middleware/csp.ts:11-12`

**Action:** Append `object-src 'none'; base-uri 'none'; form-action 'self';` to the CSP string in `buildCspHeader`.

---

### 49. completeOnboarding server action has no Zod validation

**Impact:** 3 | **Effort:** S | **Agent:** security-auditor

`completeOnboarding` accepts `CompleteOnboardingDto` and passes it directly to the API without Zod schema validation. Every other mutation server action validates input first. Arbitrary payloads bypass client-side validation.

**Files:**

- `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/actions/complete-onboarding.ts:14`

**Action:** Create a `completeOnboardingSchema` using `z.object({ baseCurrencyCode: z.enum(CURRENCY_CODE_LIST), password: z.string().min(MIN_PASSWORD_LENGTH).optional() })` and validate with `safeParse` before calling the API.

---

### 50. deleteAccount server action lacks rate limiting

**Impact:** 3 | **Effort:** S | **Agent:** security-auditor

`deleteAccount` requires password confirmation but has no `checkRateLimit` call, unlike `signIn`, `signUp`, `exchangeSocialCode`, and `changePassword`. This enables unlimited brute-force attempts against the user's password.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/settings/actions/delete-account.ts:18`

**Action:** Add `if (!(await checkRateLimit('deleteAccount'))) { return { ok: false, error: 'rateLimited' }; }` after `redirectUnauthorized()`.

---

### 51. redirectUnauthorized uses non-i18n redirect

**Impact:** 3 | **Effort:** S | **Agent:** architect-reviewer, nextjs-developer

`redirectUnauthorized` imports `redirect` from `next/navigation` and calls `redirect(PATHS.signIn)`. Every other server-side redirect uses the i18n-aware `redirect` from `@track-my-life/next-shared`. For non-default locales, users lose their locale context.

**Files:**

- `apps/money-tracker/src/actions/redirect-unauthorized.ts:4`

**Action:** Import `redirect` from `@track-my-life/next-shared/src/i18n/navigation/navigation`, obtain locale via `getLocale()`, and call `redirect({ href: PATHS.signIn, locale })`.

---

### 52. fetchCategory missing React cache() and cache tags

**Impact:** 3 | **Effort:** S | **Agent:** architect-reviewer

Unlike every other RSC fetch function in `src/actions/` which are wrapped in `React.cache()` and pass cache tag configs, `fetchCategory` is a plain async function. Duplicate calls in the same request are not deduplicated, and `updateTag(CACHE_TAG.CATEGORIES)` does not invalidate this data.

**Files:**

- `apps/money-tracker/src/actions/fetch-category.ts:5-9`

**Action:** Wrap `fetchCategory` in `cache()` from `react` and pass `CATEGORIES_CACHE` as the config to the service call.

---

### 53. withCache uses unbounded Map with no eviction

**Impact:** 3 | **Effort:** S | **Agent:** architect-reviewer

`withCache` creates a `Map<string, TResult>` that grows indefinitely without TTL, max-size, or eviction. Currently only used for `getMessagesByLocale` (bounded), but in `packages/shared` as a general utility it could be adopted with dynamic keys causing memory leaks.

**Files:**

- `packages/shared/src/utils/with-cache.ts:1-18`

**Action:** Add a `maxSize` option with LRU-style eviction, or rename to `withStaticCache` and add a guard that logs a warning if the map exceeds a threshold.

---

### 54. groupTransactionListByDate runs without memoization

**Impact:** 3 | **Effort:** S | **Agent:** performance-engineer

`TransactionList` is a client component that calls `groupTransactionListByDate(transactionList)` at the top level of its render function. This O(n) scan runs unconditionally on every render even when `transactionList` has not changed.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/transaction-list/TransactionList.tsx:69`

**Action:** Wrap in `useMemo`: `const dateGroupList = useMemo(() => groupTransactionListByDate(transactionList), [transactionList])`.

---

### 55. CURRENCY_CODE_LIST missing satisfies constraint

**Impact:** 3 | **Effort:** S | **Agent:** typescript-pro

`CURRENCY_CODE_LIST` uses `as const` without `satisfies readonly CurrencyCode[]`, unlike `COUNTRY_CODE_LIST` which correctly uses `as const satisfies readonly CountryCode[]`. The list can silently diverge from the generated `CurrencyCode` union.

**Files:**

- `packages/shared/src/constants/currency.ts:161`

**Action:** Change `] as const;` to `] as const satisfies readonly CurrencyCode[];`.

---

### 56. importTransactionList uses ad-hoc return shape

**Impact:** 3 | **Effort:** S | **Agent:** typescript-pro, nextjs-developer

`importTransactionList` returns `{ data, error }` instead of `ServerActionResult<T>` which every other mutation server action uses. No explicit return type annotation either.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/actions/import-transaction-list.ts:37-55`

**Action:** Change to `Promise<ServerActionResult<ImportTransactionResponseDto>>` and return `{ ok: true, data }` / `{ ok: false, error }` shapes.

---

### 57. Unsafe as unknown as AuthResponseDto cast

**Impact:** 3 | **Effort:** S | **Agent:** typescript-pro

After validating only `body.accessToken`, the code casts the entire body to `AuthResponseDto` via `body as unknown as AuthResponseDto`. The `user` field is never validated, so downstream code accessing it could produce runtime `undefined`.

**Files:**

- `packages/shared/src/api/client/interceptors/auth-interceptor.ts:52`

**Action:** Model `RefreshResult.tokenData` as `Pick<AuthResponseDto, 'accessToken'>` since only `accessToken` is consumed, eliminating the unsafe cast.

---

### 58. DeleteAccountSection imports from next/dist internal path

**Impact:** 3 | **Effort:** S | **Agent:** react-specialist

The component imports `isRedirectError` from `next/dist/client/components/redirect-error` -- a private internal Next.js path that can break on any upgrade.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/settings/components/delete-account-section/DeleteAccountSection.tsx:26`

**Action:** Replace with the stable public export: `import { isRedirectError } from 'next/navigation'`.

---

### 59. Deduplicate FREQUENCY/STATUS label and badge constants

**Impact:** 3 | **Effort:** S | **Agent:** react-specialist, refactoring-specialist

`FREQUENCY_LABEL_KEY`, `STATUS_LABEL_KEY`, and `STATUS_BADGE_VARIANT_MAP` are defined identically in two separate files with the same values. Any change requires updating both locations.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/components/recurring-transaction-list/RecurringTransactionList.tsx:37-54`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/[id]/page.content.tsx:35-52`

**Action:** Move all three constants into `transactions/recurring/constants/recurring-transaction-list.ts` and import them in both files.

---

### 60. ImportPreviewTable missing aria-label

**Impact:** 3 | **Effort:** S | **Agent:** accessibility-tester

The table element lacks a `<caption>` or `aria-label` to describe its purpose. Screen reader users cannot understand the table contains a preview of transactions to be imported.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/components/import-preview-table/ImportPreviewTable.tsx:27`

**Action:** Add `aria-label="Transaction import preview"` to the table element.

---

### 61. generate:api and generate:theme not runnable from repo root

**Impact:** 3 | **Effort:** S | **Agent:** dx-optimizer

`packages/shared` has a `generate:api` script and `packages/ui` has `generate:theme`, but neither is reachable via root-level commands or documented in `CLAUDE.md`.

**Files:**

- `packages/shared/package.json:10`
- `packages/ui/package.json:10`
- `package.json:8-24`

**Action:** Add `"generate:api": "turbo run generate:api"` and `"generate:theme": "turbo run generate:theme"` to root `package.json`. Add task definitions to `turbo.json` with `"cache": false`. Document in `CLAUDE.md`.

---

### 62. Clarify lint/stylelint caching in turbo.json

**Impact:** 3 | **Effort:** S | **Agent:** build-engineer

The `lint` and `stylelint` tasks have no caching configuration and produce no artifacts. Turborepo cannot cache them effectively.

**Files:**

- `turbo.json:21,25`

**Action:** Add `"cache": false` to both `lint` and `stylelint` tasks, matching the pattern of `lint:fix` and `stylelint:fix`.

---

### 63. DashboardFilterBar renders full 160+ currency entries

**Impact:** 3 | **Effort:** M | **Agent:** performance-engineer

`DashboardFilterBar` maps over the full 160-entry `CURRENCY_CODE_LIST` to render `<SelectItem>` elements. All items are in the initial render output and client JS bundle.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/components/dashboard-filter-bar/DashboardFilterBar.tsx:89-93`

**Action:** Replace with a curated short list of common currencies with a combobox/search pattern, or virtualise the dropdown.

---

### 64. Rate limiter trusts spoofable X-Forwarded-For header

**Impact:** 3 | **Effort:** M | **Agent:** security-auditor

`getClientIp` reads from `x-forwarded-for` and `x-real-ip` headers which are trivially spoofed. An attacker can bypass rate limiting entirely by rotating the header value.

**Files:**

- `apps/money-tracker/src/utils/rate-limit.ts:46-53`

**Action:** Configure the rate limiter to only trust headers set by a known proxy layer. Add configuration option or environment variable for the trusted proxy header.

---

### 65. TransactionFilters sortBy/sortOrder typed as string

**Impact:** 3 | **Effort:** M | **Agent:** typescript-pro

`TransactionFilters` declares `sortBy: string` and `sortOrder: string`, erasing the `TransactionSortBy | ''` and `SortOrder | ''` types available from the API types. Type guards exist but their narrowing is discarded.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/constants/transaction-filters.ts:10-11`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/hooks/use-transaction-filters.ts:14-15`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/transaction-sort-filter/TransactionSortFilter.tsx:27-28`

**Action:** Change to `sortBy: TransactionSortBy | ''` and `sortOrder: SortOrder | ''`. Update all dependent types.

---

### 66. API service classes inheritance coupling to ApiClient

**Impact:** 3 | **Effort:** M | **Agent:** architect-reviewer

Every API service class extends `ApiClient` directly, requiring each service to be a full HTTP client with its own interceptors. Adding a new service requires creating an instance AND registering auth interceptors separately.

**Files:**

- `packages/shared/src/api/services/transaction-api.service.ts:31`
- `packages/shared/src/api/services/category-api.service.ts:25`
- All 7 service files in `packages/shared/src/api/services/`

**Action:** Refactor to composition: inject an `ApiClient` instance into service constructors. Create a single client per context (RSC, server-action, browser) and pass it to each service.

---

### 68. Refactor updateRecurringTransaction to remove oxlint-disable

**Impact:** 3 | **Effort:** M | **Agent:** nextjs-developer, refactoring-specialist

A lint suppressor comment silences `max-statements` on `updateRecurringTransaction`. The project rule prohibits `oxlint-disable` comments.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/actions/update-recurring-transaction.ts:18-58`

**Action:** Extract the field-spreading logic into a `prepareUpdateRecurringTransactionBody` helper function to bring the main function under the statement limit.

---

### 69. Missing canonical URL for i18n routes

**Impact:** 3 | **Effort:** M | **Agent:** seo-specialist

next-intl routing has `alternateLinks: false` disabling automatic hreflang generation. Without canonical URLs, duplicate content across locale variants could confuse search engines.

**Files:**

- `packages/next-shared/src/i18n/navigation/navigation.ts:9`
- `apps/money-tracker/src/app/[locale]/layout.tsx:35-41`

**Action:** Add `canonical` field to metadata in public pages derived from the locale-aware base URL.

---

### 70. Redundant redirectIfNotOnboarded calls in every page

**Impact:** 2 | **Effort:** S | **Agent:** architect-reviewer

`redirectIfNotOnboarded()` is called in `(app-layout)/layout.tsx` which protects all child routes, yet the same call is repeated in every individual page.tsx (16+ files).

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/layout.tsx:11`
- All page.tsx files under `(app-layout)/`

**Action:** Remove `redirectIfNotOnboarded()` from all individual page.tsx files. Keep it only in `(app-layout)/layout.tsx`.

---

### 71. Dashboard hardcodes default currency UAH

**Impact:** 2 | **Effort:** S | **Agent:** architect-reviewer

`DEFAULT_CURRENCY_CODE` is hardcoded to `'UAH'`. Users with a different base currency see incorrect analytics when no currency param is specified.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/constants/dashboard.ts:10`

**Action:** Read user profile via `fetchProfile()` and use `profile.baseCurrencyCode` as the fallback currency in the dashboard page.

---

### 72. next-themes in three packages instead of peerDep in UI

**Impact:** 2 | **Effort:** S | **Agent:** architect-reviewer

`next-themes` is declared as a dependency in `packages/ui`, `apps/money-tracker`, and `apps/storybook`. If versions drift, incompatible instances could cause hydration mismatches.

**Files:**

- `packages/ui/package.json:27`
- `apps/money-tracker/package.json:25`
- `apps/storybook/package.json:36`

**Action:** Move `next-themes` to `peerDependencies` in `packages/ui` and keep it as a direct dependency only in consuming apps.

---

### 73. Remove react/react-dom from packages/shared

**Impact:** 2 | **Effort:** S | **Agent:** architect-reviewer, dependency-manager

`packages/shared` declares `react` and `react-dom` as `dependencies` but no file in the package imports React. This pulls React into any consumer unnecessarily.

**Files:**

- `packages/shared/package.json:14-15`

**Action:** Remove `react`, `react-dom` from `dependencies` and `@types/react`, `@types/react-dom` from `devDependencies`.

---

### 74. Zod schemas allow unbounded string lengths

**Impact:** 2 | **Effort:** S | **Agent:** security-auditor

`profileFormSchema` defines `firstName` and `lastName` as `z.string().trim().optional()` with no `.max()` constraint. The same issue exists in category, transaction, and recurring transaction schemas.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/settings/constants/profile-form-schema.ts:6-7`
- All other form schemas with unbounded string fields

**Action:** Add `.max(255)` to all unbounded string fields across Zod schemas.

---

### 75. extractUserIdFromToken unverified JWT fallback

**Impact:** 2 | **Effort:** S | **Agent:** security-auditor

`extractUserIdFromToken` falls back to base64-decoding the JWT payload without signature verification when the verified payload is null. The function's API is misleading -- it appears safe but can return untrusted data.

**Files:**

- `packages/shared/src/utils/jwt.ts:7-21,50-59`

**Action:** Remove the unverified fallback path. If the verified payload is null or missing `sub`, return `null`. Create a separate `extractUnverifiedSubjectFromToken` if the unverified path is needed.

---

### 76. TrendsChart uses undefined locale in date formatting

**Impact:** 2 | **Effort:** S | **Agent:** performance-engineer

`formatPeriodLabel` calls `date.toLocaleDateString(undefined, ...)` which resolves the locale from the server process environment rather than the request locale, producing inconsistent chart labels.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/components/trends-chart/TrendsChart.tsx:25-28`

**Action:** Pass the request locale via `getLocale()` and use it in `formatPeriodLabel`. Cache the `Intl.DateTimeFormat` instance.

---

### 77. SidebarProvider context value recreated every render

**Impact:** 2 | **Effort:** S | **Agent:** performance-engineer

The `SidebarContext` is provided with an inline object literal that creates a new reference on every render, causing unnecessary downstream re-renders.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/components/sidebar-provider/SidebarProvider.tsx:41-48`

**Action:** Wrap the context value in `useMemo` with the boolean states and callback refs as dependencies.

---

### 78. completeOnboarding/assignDefaultCategories missing ServerActionResult

**Impact:** 2 | **Effort:** S | **Agent:** typescript-pro, nextjs-developer

Both onboarding actions return `{ error: string | null }` instead of the project-wide `ServerActionResult<T>` type. Callers handle a different shape.

**Files:**

- `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/actions/complete-onboarding.ts:14`
- `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/actions/assign-default-categories.ts:9`

**Action:** Change to `ServerActionResult<true>` pattern and align callers.

---

### 79. checkIsAcceptedExtension uses unsafe element cast

**Impact:** 2 | **Effort:** S | **Agent:** typescript-pro

Both `ACCEPTED_EXTENSION_LIST.includes(extension as ...)` and `ALLOWED_MIME_TYPE_LIST.includes(file.type as ...)` cast a `string` to the tuple element type to call `.includes()`, defeating the type check.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/constants/parse-import-file.ts:10-11`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/actions/import-transaction-list.ts:25`

**Action:** Use a `Set<string>` for membership checks. Make `checkIsAcceptedExtension` a proper type predicate.

---

### 80. update-profile.ts unnecessary cast to UpdateProfileDto

**Impact:** 2 | **Effort:** S | **Agent:** typescript-pro

`validated.data as UpdateProfileDto` obscures a type mismatch caused by `exactOptionalPropertyTypes` producing `T | undefined` for optional fields.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/settings/actions/update-profile.ts:28`

**Action:** Explicitly destructure and rebuild desired fields from `validated.data`, or update `profileFormSchema` to match `UpdateProfileDto` precisely.

---

### 81. Replace manual loading states with useTransition

**Impact:** 2 | **Effort:** S | **Agent:** react-specialist

Three delete dialogs, `useImportTransactionPage`, and `ExportTransactionButton` manage `useState(false)` + `setIsLoading(true/false)` around async calls instead of using `useTransition`.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/categories/components/delete-category-dialog/DeleteCategoryDialog.tsx:36-50`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/delete-transaction-dialog/DeleteTransactionDialog.tsx:37-53`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/components/delete-recurring-transaction-dialog/DeleteRecurringTransactionDialog.tsx:37-53`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/components/import-transaction-page/hooks/use-import-transaction-page.ts:49,85-87`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/export-transaction-button/ExportTransactionButton.tsx:72,81,100`

**Action:** Replace `useState` + manual toggle with `useTransition` and `startTransition(async () => { ... })` in all five locations.

---

### 82. Form pages duplicate useRouter for cancel button

**Impact:** 2 | **Effort:** S | **Agent:** react-specialist

`TransactionFormPage` and `RecurringTransactionFormPage` call `useRouter()` purely for the cancel button, but their hooks already handle navigation.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/transaction-form-page/TransactionFormPage.tsx:50,209-214`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/components/recurring-transaction-form-page/RecurringTransactionFormPage.tsx:50,261-266`

**Action:** Move cancel navigation into the respective hooks (add `handleCancel` callback, following `useCategoryFormPage` precedent).

---

### 83. Handlers missing useCallback in several components

**Impact:** 2 | **Effort:** S | **Agent:** react-specialist

Several handler functions are plain arrow functions inside components that pass them as props, creating new references on every render. Inconsistent with the rest of the codebase which uses `useCallback`.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/page.content.tsx:61`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/transaction-sort-filter/TransactionSortFilter.tsx:43`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/month-navigator/MonthNavigator.tsx:31,36,41,46`
- `apps/money-tracker/src/app/[locale]/(app-layout)/components/app-sidebar/AppSidebar.tsx:142`

**Action:** Wrap each handler with `useCallback` with appropriate dependency arrays.

---

### 84. OnboardingPageContent builds all step components every render

**Impact:** 2 | **Effort:** S | **Agent:** react-specialist

`stepContentMap` is an object literal with three JSX values constructed on every render, even though only one is consumed per `currentStep`.

**Files:**

- `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/page.content.tsx:50-56`

**Action:** Replace the map with a direct conditional render or `useMemo` that only renders the active step.

---

### 85. parseRecurringTransactionSearchParams in component file

**Impact:** 2 | **Effort:** S | **Agent:** nextjs-developer

`parseRecurringTransactionSearchParams` is defined inside `RecurringTransactionListServer.tsx` instead of a constants file, violating the pattern used everywhere else.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/components/recurring-transaction-list-server/RecurringTransactionListServer.tsx:43-54`

**Action:** Move to `transactions/recurring/constants/parse-recurring-transaction-search-params.ts`.

---

### 86. Missing loading.tsx for dynamic detail/edit routes

**Impact:** 2 | **Effort:** S | **Agent:** nextjs-developer

Several dynamic routes lack `loading.tsx`, so hard navigations show no loading indicator.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/[id]/edit/`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/by-category/[categoryId]/`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/create/`
- `apps/money-tracker/src/app/[locale]/(app-layout)/categories/[id]/edit/`

**Action:** Add `loading.tsx` to each directory using `PageSkeleton` matching the existing inline fallbacks.

---

### 87. useSearchParams imported directly from next/navigation

**Impact:** 2 | **Effort:** S | **Agent:** nextjs-developer

`useRouter` and `usePathname` are imported from `@track-my-life/next-shared` (locale-aware wrappers), but `useSearchParams` is imported directly from `next/navigation`.

**Files:**

- `apps/money-tracker/src/hooks/use-url-filters.ts:2`
- `apps/money-tracker/src/app/[locale]/(app-layout)/categories/hooks/use-category-filters.ts:1`
- `apps/money-tracker/src/app/[locale]/(auth-layout)/auth/callback/page.content.tsx:16`

**Action:** Re-export `useSearchParams` from `@track-my-life/next-shared/src/i18n/navigation/navigation.ts` and update all import sites.

---

### 88. DropdownMenu has no Storybook story

**Impact:** 2 | **Effort:** S | **Agent:** qa-expert

Every other component in `packages/ui` has a corresponding story, but `DropdownMenu` has none. Its a11y checks never run.

**Files:**

- `packages/ui/src/components/molecules/dropdown-menu/dropdown-menu.tsx`
- `apps/storybook/src/stories/` (missing `DropdownMenu.stories.tsx`)

**Action:** Create `DropdownMenu.stories.tsx` with `Default` and `WithIcons` stories.

---

### 89. Input startAdornment variant has no Storybook story

**Impact:** 2 | **Effort:** S | **Agent:** qa-expert

The `Input` component's `startAdornment` branch has different ARIA and layout behavior but zero story coverage.

**Files:**

- `packages/ui/src/components/atoms/input/input.tsx:12-27`
- `apps/storybook/src/stories/Input.stories.tsx` (no adornment stories)

**Action:** Add `WithStartAdornment` and `WithStartAdornmentError` stories.

---

### 91. Use :focus-visible instead of :focus in UI components

**Impact:** 2 | **Effort:** S | **Agent:** accessibility-tester

SelectTrigger, ComboboxTrigger, and AlertDialogContent use `:focus` instead of `:focus-visible`, showing focus outlines on mouse clicks.

**Files:**

- `packages/ui/src/components/atoms/select/select.module.scss:33,54`
- `packages/ui/src/components/molecules/combobox/combobox.module.scss:33,48`
- `packages/ui/src/components/molecules/alert-dialog/alert-dialog.module.scss:35-37`

**Action:** Replace `&:focus` with `&:focus-visible` in all three files.

---

### 92. type-check unnecessary dependency on ^build

**Impact:** 2 | **Effort:** S | **Agent:** build-engineer

The `type-check` task depends on `^build`, waiting for all dependency builds before running. Type-checking only needs type definitions, not full runtime builds.

**Files:**

- `turbo.json:18-19`

**Action:** Change dependency from `["^build"]` to `["^type-check"]` to allow parallel execution.

---

### 93. No .turboignore file

**Impact:** 2 | **Effort:** S | **Agent:** build-engineer

Without `.turboignore`, Turborepo hashes all files including `.idea/`, `.serena/`, `.agents/`, `docs/`, and `openspec/`, causing unnecessary cache misses.

**Files:**

- Project root (missing `.turboignore`)

**Action:** Create `.turboignore` excluding non-build directories.

---

### 94. CI rebuilds packages unnecessarily in type-check job

**Impact:** 2 | **Effort:** S | **Agent:** build-engineer

The `type-check` CI job runs `pnpm build:packages` before type-checking, duplicating work from the `build` job.

**Files:**

- `.github/workflows/pull-request.yml:56-62`

**Action:** Make `type-check` depend on the `build` job and remove the redundant `pnpm build:packages` step.

---

### 95. Test task missing from turbo.json config

**Impact:** 2 | **Effort:** S | **Agent:** build-engineer

The `test` task has no dependency or caching configuration in turbo.json.

**Files:**

- `turbo.json:32`

**Action:** Add `"test": { "dependsOn": ["^build"], "cache": false }` to turbo.json.

---

### 96. README documents wrong script names

**Impact:** 2 | **Effort:** S | **Agent:** dx-optimizer

The README shows `pnpm format` / `pnpm format:write` but the actual scripts are `pnpm fmt` / `pnpm fmt:check`. Also references `npx shadcn@latest add` despite using custom Radix UI components.

**Files:**

- `README.md:84-86,103-105,138-139`

**Action:** Fix script names and remove shadcn references.

---

### 97. pnpm dev starts Storybook by default, no dev:app shortcut

**Impact:** 2 | **Effort:** S | **Agent:** dx-optimizer

`pnpm dev` starts all workspaces including Storybook. No focused shortcut exists for running just the main app.

**Files:**

- `package.json:9`
- `turbo.json:6-9`

**Action:** Add `"dev:app": "turbo run dev --filter=money-tracker"` and `"dev:storybook": "turbo run storybook"` to root `package.json`.

---

### 98. CI init-env job overhead for hardcoded versions

**Impact:** 2 | **Effort:** S | **Agent:** dx-optimizer

The `init-env` job checks out the entire repo just to emit hardcoded version strings `22.15.0` and `10.10.0`. All 6 downstream jobs wait on it.

**Files:**

- `.github/actions/env-versions/action.yml:7-11`
- `.github/workflows/pull-request.yml:13-25`

**Action:** Remove the `init-env` job and inline version values directly in the setup action.

---

### 99. import/no-unassigned-import forces disable comments for CSS

**Impact:** 2 | **Effort:** S | **Agent:** dx-optimizer

Two `oxlint-disable-next-line` comments in the root layout exist to allow CSS/SCSS side-effect imports, contradicting the "no oxlint-disable" rule.

**Files:**

- `apps/money-tracker/src/app/[locale]/layout.tsx:10-12`
- `packages/lint-config/configs/next.json`

**Action:** In the lint config, add `"import/no-unassigned-import": ["error", { "allow": ["**/*.scss", "**/*.css"] }]`. Remove the disable comments.

---

### 100. i18n-check not surfaced in root package.json

**Impact:** 2 | **Effort:** S | **Agent:** dx-optimizer

`apps/money-tracker` has an `"i18n-check"` script but it's not wired to the root and not documented in `CLAUDE.md`.

**Files:**

- `apps/money-tracker/package.json:14`
- `package.json:8-24`

**Action:** Add `"i18n-check": "turbo run i18n-check"` to root scripts, add task to `turbo.json`, and add to `CLAUDE.md` Commands table.

---

### 101. Deduplicate getSelectedFile/prepareFormData helpers

**Impact:** 2 | **Effort:** S | **Agent:** refactoring-specialist

`getSelectedFile` and `prepareFormData` are defined identically in both the import hook and the onboarding categories-step hook.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/components/import-transaction-page/hooks/use-import-transaction-page.ts:21-27`
- `apps/money-tracker/src/app/[locale]/(onboarding-layout)/onboarding/components/categories-step/hooks/use-categories-step.ts:29-36`

**Action:** Move both helpers into the import constants directory and import them in both hooks.

---

### 102. checkIsValidFilterType guard duplicated

**Impact:** 2 | **Effort:** S | **Agent:** refactoring-specialist

Both categories and dashboard constants define an identical `checkIsValidFilterType` function with a local `VALID_TYPE_SET`.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/categories/constants/categories.ts:10-13`
- `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/constants/dashboard.ts:40-43`

**Action:** Move to `apps/money-tracker/src/constants/transaction.ts` and import in both files.

---

### 103. DEFAULT_PAGE/DEFAULT_PAGE_SIZE duplicated

**Impact:** 2 | **Effort:** S | **Agent:** refactoring-specialist

Both transaction list and recurring transaction list constants define `DEFAULT_PAGE = 1` and `DEFAULT_PAGE_SIZE = 20` separately.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/constants/transaction-list.ts:1-2`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/constants/recurring-transaction-list.ts:3-4`

**Action:** Move to `apps/money-tracker/src/constants/pagination.ts` and import in both features.

---

### 104. Inline transaction type ternary repeated across 4 files

**Impact:** 2 | **Effort:** S | **Agent:** refactoring-specialist

The conditional `type === 'INCOME' ? 'incomeType' : 'expenseType'` to produce a translation key is scattered across four render sites.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/transaction-list/TransactionList.tsx:89`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/by-category/[categoryId]/page.content.tsx:78`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/by-category/page.content.tsx:46-48`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/[id]/page.content.tsx:93-95`

**Action:** Add a `TRANSACTION_TYPE_LABEL_KEY: Record<TransactionType, string>` constant to `apps/money-tracker/src/constants/transaction.ts`.

---

### 105. handleFormSubmit missing startTransition in useCallback deps

**Impact:** 2 | **Effort:** S | **Agent:** refactoring-specialist

Two form hooks omit `startTransition` from their `useCallback` dependency arrays, unlike two other hooks that include it.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/categories/components/category-form-page/hooks/use-category-form-page.ts:77-84`
- `apps/money-tracker/src/app/[locale]/(app-layout)/settings/components/change-password-form/hooks/use-change-password-form.ts:48-55`

**Action:** Add `startTransition` to the `useCallback` dependency array in both hooks.

---

### 106. RecentTransactionList renders raw transaction.type untranslated

**Impact:** 2 | **Effort:** S | **Agent:** refactoring-specialist

The `<Badge>` renders `{transaction.type}` directly (raw enum value `"INCOME"`/`"EXPENSE"`), while every other transaction list uses a translated label.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/dashboard/components/recent-transaction-list/RecentTransactionList.tsx:55`

**Action:** Replace with the translated label using the `TRANSACTION_TYPE_LABEL_KEY` constant (from #104).

---

### 107. Hoist LEAF_NAVIGATION_ITEM_LIST to module scope

**Impact:** 2 | **Effort:** S | **Agent:** performance-engineer

`getActiveHref` calls `getAllLeafItemList(NAVIGATION_ITEM_LIST)` on every invocation. Since `NAVIGATION_ITEM_LIST` is a stable module-level constant, the derived flat list should be hoisted.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/components/app-sidebar/AppSidebar.tsx:76-88,105`

**Action:** Extract `const LEAF_NAVIGATION_ITEM_LIST = getAllLeafItemList(NAVIGATION_ITEM_LIST)` at module level.

---

### 108. RSC AuthInterceptor cannot forward refresh-token cookies

**Impact:** 2 | **Effort:** M | **Agent:** security-auditor

The `rscAuthInterceptor` is constructed without `getRequestCookieHeader` or `onRefreshResponse` callbacks. Token refresh in RSC context will fail silently because the refresh request has no Cookie header.

**Files:**

- `packages/next-shared/src/api/rsc-api.ts:24-27`

**Action:** Provide `getRequestCookieHeader` (reading from `next/headers` cookies) and `onRefreshResponse` (forwarding Set-Cookie headers) to the RSC auth interceptor.

---

### 109. TypeScript incremental compilation disabled

**Impact:** 2 | **Effort:** M | **Agent:** build-engineer

`"incremental": false` is hardcoded in the base tsconfig. Every `pnpm type-check` does a full recompilation, losing rebuild performance gains.

**Files:**

- `packages/typescript-config/base.json:7`

**Action:** Change to `"incremental": true`. Add `.tsbuildinfo` to `.gitignore`.

---

### 110. Date/Time helpers in hook belong in shared utils

**Impact:** 2 | **Effort:** M | **Agent:** react-specialist

Five pure date manipulation utilities (`formatPadded`, `getCurrentTime`, `extractTimeFromISO`, `combineDateAndTime`, `getCurrentDate`) are declared inside a feature-specific hook file.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/transaction-form-page/hooks/use-transaction-form-page.ts:27-61`

**Action:** Move to `packages/shared/src/utils/date/` and import them back.

---

### 111. LocalizationMessages typed as Record string unknown

**Impact:** 2 | **Effort:** M | **Agent:** typescript-pro

`LocalizationMessages = Record<string, unknown>` is effectively untyped. The `as LocalizationMessages` cast in `getMessagesByLocale` is a no-op.

**Files:**

- `packages/shared/src/i18n/types/localization-messages.ts:1`
- `apps/money-tracker/src/i18n/utils/get-messages-by-locale.ts:57`

**Action:** Replace with `Record<string, Record<string, unknown>>` and remove the unnecessary cast.

---

### 112. revalidateImportCaches duplicates revalidateTransactionCaches

**Impact:** 1 | **Effort:** S | **Agent:** performance-engineer

The import action defines its own `revalidateImportCaches` with identical `updateTag` calls to the shared `revalidateTransactionCaches`. If a new cache tag is added, the import action will be missed.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/actions/import-transaction-list.ts:32-35`

**Action:** Remove the local function and import `revalidateTransactionCaches` from `../revalidate-transaction-caches`.

---

## Backlog (Carried Over)

| Task                                                         | Reason                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Make Access Token Cookie HttpOnly                            | Need to brainstorm BFF pattern for browser token management  |
| Add Tests (Currently 0% Coverage)                            | Large effort; start with pure utils in packages/shared       |
| Commit OpenAPI Spec File                                     | Active development, need sync strategy                       |
| Wire Storybook test runner to `pnpm test`                    | POC project, not a top priority                              |
| Add test job to GitHub Actions PR workflow                   | POC project, not a top priority                              |
| Complete SEO setup (metadata, sitemap, robots)               | POC project, not a top priority                              |
| Add server-side error logging in server actions              | Need to design logging strategy first                        |
| Add Vitest + unit tests for packages/shared and next-shared  | Large effort; part of broader test coverage initiative       |
| Add unit tests for parseImportFile and validateImportRowList | Large effort; needs test runner setup in money-tracker first |
| Add unit tests for checkRateLimit                            | Large effort; part of broader test coverage initiative       |
| AspectRatio.stories.tsx uses oxlint-disable                  | Low priority; cosmetic lint rule fix                         |

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

The PR workflow runs `lint`, `type-check`, `stylelint`, `build`, and `fmt:check` -- but has no `test` job. Tests are not enforced on PRs.

**Files:**

- `.github/workflows/pull-request.yml`

**Action:** Add a `test` job parallel to `lint` and `type-check`.

---

### 26. Complete SEO setup (metadata, sitemap, robots)

**Impact:** 3 | **Effort:** M | **Agent:** nextjs-developer

No `metadataBase`, `openGraph`, `twitter`, `sitemap.ts`, or `robots.ts`. Public routes are crawlable but not listed.

**Files:**

- `apps/money-tracker/src/app/[locale]/layout.tsx:29-35` (minimal metadata)
- `apps/money-tracker/src/app/` (missing sitemap.ts, robots.ts)

**Action:** Add `metadataBase`, OG/Twitter metadata to root layout. Create `sitemap.ts` and `robots.ts`.

---

### 46. Add Vitest + unit tests for packages/shared and next-shared

**Impact:** 4 | **Effort:** M | **Agent:** qa-expert

`packages/shared` contains ~15 pure utility functions (date formatting/parsing, currency formatting, search param parsing, caching). `packages/next-shared` contains security-critical `parseCookieString`/`parseAttributeList`. None have tests, and no test runner is configured.

**Files:**

- `packages/shared/package.json` (no test script)
- `packages/next-shared/package.json` (no test script)
- `packages/shared/src/utils/date/parse.ts`
- `packages/shared/src/utils/date/year-month.ts`
- `packages/shared/src/utils/search-params.ts`
- `packages/shared/src/utils/format-amount.ts`
- `packages/shared/src/utils/with-cache.ts`
- `packages/next-shared/src/api/client/token/forward-response-cookie-list.ts`

**Action:** Add `vitest` as a dev dependency to both packages. Add `"test": "vitest run"` scripts. Create tests covering: `convertDateStringToUTCISO`, `parseLocalDate`/`formatLocalDate`, `getMonthDateRange`/`getPreviousMonth`/`getNextMonth`, `parseSortParams`, `formatAmount`, `withCache`, `checkIsObject`, and `parseCookieString`.

---

### 47. Add unit tests for parseImportFile and validateImportRowList

**Impact:** 4 | **Effort:** M | **Agent:** qa-expert

The transaction import flow is the highest-complexity data-processing code in the app. `parseImportFile` dispatches on file extension, enforces a 3000-row cap, validates JSON structure, and handles CSV parsing. No tests exist. The `money-tracker` app also has no test runner configured.

**Files:**

- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/constants/parse-import-file.ts`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/constants/validate-import-row-list.ts`
- `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/constants/import-row-schema.ts`

**Action:** Add `vitest` to `apps/money-tracker`. Write tests for `parseImportFile` (unsupported extension, empty JSON, non-array JSON, row limit, malformed JSON/CSV, valid happy path) and `validateImportRowList` (all-valid, all-invalid, mixed, Type case-sensitivity, negative Amount).

---

### 67. Add unit tests for checkRateLimit

**Impact:** 3 | **Effort:** M | **Agent:** qa-expert

`checkRateLimit` is used on four auth endpoints. Its correctness depends on precise timestamp window arithmetic. No tests exist.

**Files:**

- `apps/money-tracker/src/utils/rate-limit.ts:22-103`

**Action:** Add tests with mocked `next/headers` and `vi.useFakeTimers`. Cover: first call success, at-limit success, over-limit failure, window expiry reset, cleanup of expired entries.

---

### 90. AspectRatio.stories.tsx uses oxlint-disable

**Impact:** 2 | **Effort:** S | **Agent:** qa-expert

A `// oxlint-disable no-magic-numbers` comment at line 1 violates the project's "no oxlint-disable" rule.

**Files:**

- `apps/storybook/src/stories/AspectRatio.stories.tsx:1`

**Action:** Remove the disable comment. Extract named constants (`RATIO_16_9 = 16 / 9`, etc.) and reference them.

---

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

Items completed in the current improvement cycle (2026-04-09):

| Task                                                             | Status |
| ---------------------------------------------------------------- | ------ |
| Strengthen `requireAuth` -- verify JWT, not just cookie presence | Done   |
| Add startup validation for JWT_SECRET                            | Done   |
| Add consistent Zod validation to all mutation server actions     | Done   |
| Remove type re-export from `CategoryTypeFilter` client file      | Done   |
| Add runtime guard to auth interceptor token refresh              | Done   |
| Tighten security headers (CSP connect-src, Permissions-Policy)   | Done   |
| Validate entity ID params in server actions                      | Done   |
| Return structured errors from server actions (not null)          | Done   |
| Fix form error i18n -- forms may display raw keys                | Done   |
| Add missing loading.tsx and error.tsx for sub-routes             | Done   |

Items completed in the current improvement cycle (2026-04-10):

| Task                                                        | Status |
| ----------------------------------------------------------- | ------ |
| Add `aria-invalid` to Input component                       | Done   |
| Make CategoryPicker keyboard-accessible                     | Done   |
| Verify ThemeProvider has `attribute="data-theme"`           | Done   |
| Add `display: 'swap'` to Google Fonts                       | Done   |
| Replace hand-rolled dropdowns with Radix DropdownMenu       | Done   |
| Enable a11y checks in Storybook                             | Done   |
| AppSidebar/TimePicker/RecurringTransactions minor fixes     | Done   |
| Make `ApiResponse<T>` a discriminated union                 | Done   |
| Fix profileFormSchema -- use CountryCode union              | Done   |
| Fix useProfileForm -- direct defaultValues                  | Done   |
| Link RecurringFrequency Zod enum to generated type          | Done   |
| Fix CurrencyStep -- don't cast empty string to CurrencyCode | Done   |
| Refactor useCategoryFilters to use useUrlFilters            | Done   |
| Clean up TypeScript casts (NextRequestInit, sameSite)       | Done   |
| Deduplicate TransactionTypeFilter/CategoryTypeFilter        | Done   |
| Deduplicate option lists + add Recharts loading fallbacks   | Done   |
| Remove redundant `revalidatePath` alongside `updateTag`     | Done   |
| Stop invalidating CATEGORIES cache on transaction mutations | Done   |
| Cache Intl formatter instances in formatAmount/formatDate   | Done   |
| Extract duplicated cache config constants                   | Done   |
| Remove unnecessary `router.refresh()` in recurring hooks    | Done   |

Items completed in the current improvement cycle (2026-04-12):

| Task                                                           | Status |
| -------------------------------------------------------------- | ------ |
| Convert dashboard widgets to RSC                               | Done   |
| Convert more components to RSC (by-category pages, WidgetCard) | Done   |

Items completed in the current improvement cycle (2026-04-11):

| Task                                                         | Status |
| ------------------------------------------------------------ | ------ |
| Replace CSP `unsafe-inline` with nonce-based script-src      | Done   |
| Set onboarding status cookie to httpOnly                     | Done   |
| Add rate limiting on auth endpoints                          | Done   |
| Wrap getTimezoneOffset in React cache()                      | Done   |
| Fix turbo.json task dependencies                             | Done   |
| Fix missing i18n keys + add parity check to CI               | Done   |
| Add `generateStaticParams` for locale segments               | Done   |
| Document `next-shared` in CLAUDE.md + extract error boundary | Done   |
| Add missing Storybook stories                                | Done   |
