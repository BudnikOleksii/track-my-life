# Track My Life - Improvement Roadmap

> Updated: 2026-04-09 | Analyzed by: architect-reviewer, nextjs-developer, performance-engineer, qa-expert, react-specialist, security-auditor, typescript-pro

## Progress Tracker

| #   | Task                                                                                                                              | Impact | Effort | Agent(s)                               | Status |
| --- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | -------------------------------------- | ------ |
| 10  | [Convert dashboard widgets to RSC](#10-convert-dashboard-widgets-to-rsc)                                                          | 4      | M      | performance-engineer                   | Todo   |
| 33  | [Fix missing i18n keys + add parity check to CI](#33-fix-missing-i18n-keys--add-parity-check-to-ci)                               | 3      | S      | qa-expert                              | Todo   |
| 34  | [Cache .next/cache in CI between builds](#34-cache-nextcache-in-ci-between-builds)                                                | 3      | S      | performance-engineer                   | Todo   |
| 35  | [Convert more components to RSC (by-category pages, WidgetCard)](#35-convert-more-components-to-rsc-by-category-pages-widgetcard) | 2      | S      | nextjs-developer, performance-engineer | Todo   |
| 39  | [Add `generateStaticParams` for locale segments](#39-add-generatestaticparams-for-locale-segments)                                | 2      | S      | nextjs-developer                       | Todo   |
| 41  | [Document `next-shared` in CLAUDE.md + extract error boundary](#41-document-next-shared-in-claudemd--extract-error-boundary)      | 2      | S      | architect-reviewer                     | Todo   |
| 46  | [Add missing Storybook stories](#46-add-missing-storybook-stories)                                                                | 2      | S      | qa-expert                              | Todo   |

## Recommended Execution Order

**Sprint 1 — Critical Security (S effort, Impact 5):** #1, #2
**Sprint 2 — Quick Security + Validation (S effort, Impact 3-4):** #4, #8, #14, #17, #20
**Sprint 3 — Accessibility + UX (S-M effort, Impact 4):** #5, #6, #7, #27
**Sprint 4 — Architecture (M effort, Impact 4-5):** #3
**Sprint 5 — Performance Quick Wins (S effort, Impact 2-3):** #9, #24, #34, #38
**Sprint 6 — RSC Conversion + Next.js (S-M effort, Impact 2-4):** #10, #25, #26, #35, #39
**Sprint 7 — TypeScript Hardening (S effort, Impact 2-4):** ~~done~~
**Sprint 8 — QA Infrastructure (S effort, Impact 3-4):** #11, #12, #32, #33, #46
**Sprint 9 — Polish + DX (S effort, Impact 2-3):** #41, #42

---

## Detailed Findings

### 10. Convert dashboard widgets to RSC

**Impact:** 4 | **Effort:** M | **Agent:** performance-engineer

`SummaryWidget`, `TopCategoryList`, and `RecentTransactionList` are marked `'use client'` but contain zero interactivity — only `useTranslations` and `useLocale`. They can be RSC by passing translated strings as props from their `*Server.tsx` wrappers.

**Files:**

- `dashboard/components/summary-widget/SummaryWidget.tsx`
- `dashboard/components/top-category-list/TopCategoryList.tsx`
- `dashboard/components/recent-transaction-list/RecentTransactionList.tsx`

**Action:** Pass translated strings as props from the Server components. Remove `'use client'` and `useTranslations`/`useLocale` calls.

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

### 39. Add `generateStaticParams` for locale segments

**Impact:** 2 | **Effort:** S | **Agent:** nextjs-developer

`[locale]` segments are fully dynamic. The locale list is known at build time from routing config.

**Files:**

- `apps/money-tracker/src/app/[locale]/layout.tsx`

**Action:** Add `generateStaticParams` returning supported locale codes.

---

### 41. Document `next-shared` in CLAUDE.md + extract error boundary

**Impact:** 2 | **Effort:** S | **Agent:** architect-reviewer

`@track-my-life/next-shared` is actively used but absent from CLAUDE.md's structure diagram. Three error boundary files (`(app-layout)/error.tsx`, `[locale]/error.tsx`, `(auth-layout)/error.tsx`) are near-identical.

**Action:** Add `next-shared` to CLAUDE.md. Extract shared `AppErrorBoundary` component accepting a `homePath` prop.

---

### 46. Add missing Storybook stories

**Impact:** 2 | **Effort:** S | **Agent:** qa-expert

`Typography`, `Card`, `Separator`, and `UnderlineLink` have no stories, violating the project's storybook rule.

**Files:**

- `packages/ui/src/components/atoms/typography/`, `molecules/card/`, `atoms/separator/`, `atoms/underline-link/`

**Action:** Create CSF3 stories with `tags: ['autodocs']` for each.

---

## Backlog (Carried Over)

| Task                                            | Reason                                                      |
| ----------------------------------------------- | ----------------------------------------------------------- |
| Make Access Token Cookie HttpOnly               | Need to brainstorm BFF pattern for browser token management |
| Add Tests (Currently 0% Coverage)               | Large effort; start with pure utils in packages/shared      |
| Commit OpenAPI Spec File                        | Active development, need sync strategy                      |
| Wire Storybook test runner to `pnpm test`       | POC project, not a top priority                             |
| Add test job to GitHub Actions PR workflow      | POC project, not a top priority                             |
| Complete SEO setup (metadata, sitemap, robots)  | POC project, not a top priority                             |
| Add server-side error logging in server actions | Need to design logging strategy first                       |

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

### 26. Complete SEO setup (metadata, sitemap, robots)

**Impact:** 3 | **Effort:** M | **Agent:** nextjs-developer

No `metadataBase`, `openGraph`, `twitter`, `sitemap.ts`, or `robots.ts`. Public routes are crawlable but not listed.

**Files:**

- `apps/money-tracker/src/app/[locale]/layout.tsx:29-35` (minimal metadata)
- `apps/money-tracker/src/app/` (missing sitemap.ts, robots.ts)

**Action:** Add `metadataBase`, OG/Twitter metadata to root layout. Create `sitemap.ts` and `robots.ts`.

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

| Task                                                            | Status |
| --------------------------------------------------------------- | ------ |
| Strengthen `requireAuth` — verify JWT, not just cookie presence | Done   |
| Add startup validation for JWT_SECRET                           | Done   |
| Add consistent Zod validation to all mutation server actions    | Done   |
| Remove type re-export from `CategoryTypeFilter` client file     | Done   |
| Add runtime guard to auth interceptor token refresh             | Done   |
| Tighten security headers (CSP connect-src, Permissions-Policy)  | Done   |
| Validate entity ID params in server actions                     | Done   |
| Return structured errors from server actions (not null)         | Done   |
| Fix form error i18n — forms may display raw keys                | Done   |
| Add missing loading.tsx and error.tsx for sub-routes            | Done   |

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
| Fix profileFormSchema — use CountryCode union               | Done   |
| Fix useProfileForm — direct defaultValues                   | Done   |
| Link RecurringFrequency Zod enum to generated type          | Done   |
| Fix CurrencyStep — don't cast empty string to CurrencyCode  | Done   |
| Refactor useCategoryFilters to use useUrlFilters            | Done   |
| Clean up TypeScript casts (NextRequestInit, sameSite)       | Done   |
| Deduplicate TransactionTypeFilter/CategoryTypeFilter        | Done   |
| Deduplicate option lists + add Recharts loading fallbacks   | Done   |
| Remove redundant `revalidatePath` alongside `updateTag`     | Done   |
| Stop invalidating CATEGORIES cache on transaction mutations | Done   |
| Cache Intl formatter instances in formatAmount/formatDate   | Done   |
| Extract duplicated cache config constants                   | Done   |
| Remove unnecessary `router.refresh()` in recurring hooks    | Done   |

Items completed in the current improvement cycle (2026-04-11):

| Task                                                    | Status |
| ------------------------------------------------------- | ------ |
| Replace CSP `unsafe-inline` with nonce-based script-src | Done   |
| Set onboarding status cookie to httpOnly                | Done   |
| Add rate limiting on auth endpoints                     | Done   |
| Wrap getTimezoneOffset in React cache()                 | Done   |
| Fix turbo.json task dependencies                        | Done   |
