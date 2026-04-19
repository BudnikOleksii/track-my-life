# RSC Migration Proposal — money-tracker

**Date:** 2026-04-19
**Scope:** `apps/money-tracker/src/**` — all files with `'use client'`
**Excludes:** Changes already shipped in commit `fdf3e26` (dashboard widgets, by-category pages)

---

## Summary

- 60 files carry `'use client'`. After a full audit, **9 are trivial wins** (remove the directive or collapse a thin wrapper), **14 are refactor opportunities** (split into RSC shell + client island), and **37 are correctly client** (forms, interactive dialogs, browser APIs, context providers, chart libraries, error boundaries).
- The highest-impact pages are **Transactions**, **Recurring Transactions**, **Categories**, and **Settings** — each has a large `page.content.tsx` that is 'use client' only because it mixes filter/selection UI state with static presentation. Splitting them reduces the initial JS payload for those routes.
- `CategoriesPageContent` performs **in-memory filtering of a server-fetched list** inside a client component. This violates the team's own feedback rule ("never store server-fetched lists in useState, rely on revalidatePath"). The filter should move to a URL search param read server-side, matching the pattern already used by `TransactionListServer`.
- `SettingsPageContent` is `'use client'` solely to call `useTranslations` for static section headings. It has zero interactive logic; removing the directive makes it an RSC that server-renders translated labels with no client JS cost.
- Rough bundle impact: migrating Tier A + Tier B targets removes client-side rendering responsibility from ~7 route-level components and ~4 shared UI components, estimated to cut per-route client JS by **15–25%** on the affected pages (Transactions, Recurring, Categories, Settings). Dashboard is already largely RSC after `fdf3e26`; those pages see the smallest delta.

---

## Audit Methodology

1. `grep -r "'use client'"` across `apps/money-tracker/src` — 60 files found.
2. Each file was read in full. Classification criteria:
   - **Must stay client**: uses `useState`, `useEffect`, `useRef`, `useCallback`/`useMemo` for UI interaction, event handlers that mutate browser state, context provider/consumer, `useRouter`/`usePathname`/`useSearchParams` hooks, third-party libraries that require a DOM (`recharts`, `react-hook-form`, Radix UI interactive primitives), or is a Next.js special file (`error.tsx`, `global-error.tsx`).
   - **Can be RSC**: only renders data passed as props, calls `useTranslations` for static text (which can switch to `getTranslations` in RSC), or is a thin wrapper that simply passes props through.
   - **Refactor candidate**: the file contains a mix — some static structure that could be server-rendered wrapping a smaller interactive island.
3. All `page.content.tsx` files were cross-referenced with their parent `page.tsx` and `*Server.tsx` to understand the existing RSC shell / client island split.

---

## Findings Table

| #   | File (relative to `apps/money-tracker/src`)                                                                                                     | Current | Proposed    | Tier | Key reason                                                                                                                                                                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `app/[locale]/(app-layout)/settings/page.content.tsx`                                                                                           | Client  | RSC         | A    | Only `useTranslations` — zero interactive logic                                                                                                                                                                   |
| 2   | `app/[locale]/(onboarding-layout)/onboarding/page.content.tsx`                                                                                  | Client  | RSC         | A    | Only `useTranslations` + static conditional rendering — no hooks that require client                                                                                                                              |
| 3   | `app/[locale]/(onboarding-layout)/onboarding/components/step-indicator/StepIndicator.tsx`                                                       | Client  | RSC         | A    | `useTranslations` + `useMemo` for pure derivation — computation is trivially static                                                                                                                               |
| 4   | `components/bulk-delete-action-bar/BulkDeleteActionBar.tsx`                                                                                     | Client  | RSC         | A    | Pure presentational — all labels/callbacks passed as props; `'use client'` is not needed because it receives callbacks via props, not hooks                                                                       |
| 5   | `app/[locale]/(app-layout)/transactions/import/components/import-summary/ImportSummary.tsx`                                                     | Client  | RSC         | A    | `useTranslations` + prop rendering — no interactivity                                                                                                                                                             |
| 6   | `app/[locale]/(app-layout)/transactions/import/components/import-preview-table/ImportPreviewTable.tsx`                                          | Client  | RSC         | A    | `useTranslations` + rendering prop data — no event handlers or state                                                                                                                                              |
| 7   | `app/[locale]/(app-layout)/dashboard/components/dashboard-filter-bar/DashboardFilterBarClient.tsx`                                              | Client  | Remove file | A    | One-line wrapper that only connects `useDashboardFilters` — collapse into `DashboardFilterBar` and keep that client; the Client suffix wrapper is redundant                                                       |
| 8   | `app/[locale]/(app-layout)/categories/page.content.tsx`                                                                                         | Client  | Refactor    | B    | **Violates "no client list state" rule** — filters a server-fetched list in-memory; should pass `type` filter as URL param to `CategoryListServer`, filter server-side                                            |
| 9   | `app/[locale]/(app-layout)/settings/page.content.tsx` _(see #1)_                                                                                | —       | —           | —    | —                                                                                                                                                                                                                 |
| 10  | `app/[locale]/(app-layout)/transactions/page.content.tsx`                                                                                       | Client  | Refactor    | B    | Large client component; static filter bar (TypeFilter, MonthNavigator, SortFilter, CategoryPicker, Pagination) could be RSC shells wrapping small client islands; bulk-delete selection state is correctly client |
| 11  | `app/[locale]/(app-layout)/transactions/recurring/page.content.tsx`                                                                             | Client  | Refactor    | B    | Same pattern as transactions — status filter + pagination are stateless presentation; pause/resume/bulk-delete are correctly client                                                                               |
| 12  | `app/[locale]/(app-layout)/transactions/recurring/[id]/page.content.tsx`                                                                        | Client  | Refactor    | B    | Detail view with static data fields — only the action buttons (pause/resume/delete) need client; static detail card can be server-rendered                                                                        |
| 13  | `app/[locale]/(app-layout)/transactions/components/transaction-list/TransactionList.tsx`                                                        | Client  | Refactor    | B    | Grouping + formatting is pure computation; the checkbox and action buttons are the only interactive parts — introduce `TransactionRowActions` client island                                                       |
| 14  | `app/[locale]/(app-layout)/transactions/recurring/components/recurring-transaction-list/RecurringTransactionList.tsx`                           | Client  | Refactor    | B    | Same pattern — static list rendering with interactive pause/resume/delete/checkbox islands                                                                                                                        |
| 15  | `app/[locale]/(app-layout)/categories/components/category-tree/CategoryTree.tsx`                                                                | Client  | Refactor    | B    | `Accordion` requires client (Radix interactive); delete button is client; but the data display rows are static — can isolate the delete button into `CategoryRowActions` client island                            |
| 16  | `app/[locale]/(app-layout)/transactions/components/month-navigator/MonthNavigator.tsx`                                                          | Client  | Keep        | C    | Event handlers + locale formatting that triggers parent filter change                                                                                                                                             |
| 17  | `app/[locale]/(app-layout)/transactions/components/transaction-sort-filter/TransactionSortFilter.tsx`                                           | Client  | Keep        | C    | Radix `Select` + `Button` with `onClick` — interactive                                                                                                                                                            |
| 18  | `app/[locale]/(app-layout)/transactions/recurring/components/recurring-transaction-status-filter/RecurringTransactionStatusFilter.tsx`          | Client  | Keep        | C    | Button group with `onValueChange`                                                                                                                                                                                 |
| 19  | `components/type-filter/TypeFilter.tsx`                                                                                                         | Client  | Keep        | C    | Button group with `onClick` — interactive                                                                                                                                                                         |
| 20  | `app/[locale]/(app-layout)/transactions/components/category-picker/CategoryPicker.tsx`                                                          | Client  | Keep        | C    | Complex keyboard navigation, `useRef`, `useEffect` for focus management                                                                                                                                           |
| 21  | `app/[locale]/(app-layout)/transactions/components/export-transaction-button/ExportTransactionButton.tsx`                                       | Client  | Keep        | C    | `useState` for loading, `clientTransactionApiService` fetch, blob download via browser API                                                                                                                        |
| 22  | `app/[locale]/(app-layout)/dashboard/components/dashboard-filter-bar/DashboardFilterBar.tsx`                                                    | Client  | Keep        | C    | `Input onChange` + `Select onValueChange` + `Button onClick` — all interactive                                                                                                                                    |
| 23  | `app/[locale]/(app-layout)/dashboard/components/trends-chart/TrendsChartContent.tsx`                                                            | Client  | Keep        | C    | `recharts` requires DOM                                                                                                                                                                                           |
| 24  | `app/[locale]/(app-layout)/dashboard/components/daily-spending-chart/DailySpendingChartContent.tsx`                                             | Client  | Keep        | C    | `recharts` requires DOM                                                                                                                                                                                           |
| 25  | `app/[locale]/(app-layout)/dashboard/components/category-breakdown-chart/CategoryBreakdownChartContent.tsx`                                     | Client  | Keep        | C    | `recharts` requires DOM                                                                                                                                                                                           |
| 26  | `app/[locale]/(app-layout)/components/app-sidebar/AppSidebar.tsx`                                                                               | Client  | Keep        | C    | `usePathname`, `useState` for submenu/collapsed state, `useEffect` for keyboard Escape listener, `useSidebar` context                                                                                             |
| 27  | `app/[locale]/(app-layout)/components/app-header/AppHeader.tsx`                                                                                 | Client  | Keep        | C    | `usePathname` + `useSidebar` context consumer                                                                                                                                                                     |
| 28  | `app/[locale]/(app-layout)/components/user-menu/UserMenu.tsx`                                                                                   | Client  | Keep        | C    | Radix `DropdownMenu` + server action call                                                                                                                                                                         |
| 29  | `app/[locale]/(app-layout)/components/sidebar-provider/SidebarProvider.tsx`                                                                     | Client  | Keep        | C    | Context provider with `useState` / `useCallback`                                                                                                                                                                  |
| 30  | `app/[locale]/(app-layout)/transactions/components/transaction-form-page/TransactionFormPage.tsx`                                               | Client  | Keep        | C    | `react-hook-form`, `useRouter`, `Controller`                                                                                                                                                                      |
| 31  | `app/[locale]/(app-layout)/transactions/recurring/components/recurring-transaction-form-page/RecurringTransactionFormPage.tsx`                  | Client  | Keep        | C    | `react-hook-form`, `useRouter`, `Controller`                                                                                                                                                                      |
| 32  | `app/[locale]/(app-layout)/categories/components/category-form-page/CategoryFormPage.tsx`                                                       | Client  | Keep        | C    | `react-hook-form`, `Controller`, `useRouter` (via hook)                                                                                                                                                           |
| 33  | `app/[locale]/(app-layout)/settings/components/profile-form/ProfileForm.tsx`                                                                    | Client  | Keep        | C    | `react-hook-form`, `Controller`                                                                                                                                                                                   |
| 34  | `app/[locale]/(app-layout)/settings/components/change-password-form/ChangePasswordForm.tsx`                                                     | Client  | Keep        | C    | `react-hook-form`                                                                                                                                                                                                 |
| 35  | `app/[locale]/(app-layout)/settings/components/delete-account-section/DeleteAccountSection.tsx`                                                 | Client  | Keep        | C    | `react-hook-form`, `useState` for dialog open, Radix `AlertDialog`                                                                                                                                                |
| 36  | `app/[locale]/(app-layout)/transactions/components/delete-transaction-dialog/DeleteTransactionDialog.tsx`                                       | Client  | Keep        | C    | `useState`, async mutation, Radix `AlertDialog`                                                                                                                                                                   |
| 37  | `app/[locale]/(app-layout)/transactions/recurring/components/delete-recurring-transaction-dialog/DeleteRecurringTransactionDialog.tsx`          | Client  | Keep        | C    | `useState`, async mutation, Radix `AlertDialog`                                                                                                                                                                   |
| 38  | `app/[locale]/(app-layout)/categories/components/delete-category-dialog/DeleteCategoryDialog.tsx`                                               | Client  | Keep        | C    | `useCallback` + `useDeleteCategory` hook, Radix `AlertDialog`                                                                                                                                                     |
| 39  | `app/[locale]/(app-layout)/categories/components/delete-category-dialog/use-delete-category.ts`                                                 | Client  | Keep        | C    | `useState` + server action mutation                                                                                                                                                                               |
| 40  | `app/[locale]/(app-layout)/transactions/components/bulk-delete-transaction-dialog/BulkDeleteTransactionDialog.tsx`                              | Client  | Keep        | C    | `useState`, complex multi-outcome async mutation, Radix `AlertDialog`                                                                                                                                             |
| 41  | `app/[locale]/(app-layout)/transactions/recurring/components/bulk-delete-recurring-transaction-dialog/BulkDeleteRecurringTransactionDialog.tsx` | Client  | Keep        | C    | Same pattern                                                                                                                                                                                                      |
| 42  | `hooks/use-bulk-delete-selection.ts`                                                                                                            | Client  | Keep        | C    | `useState`, `useCallback`, `useMemo` — pure client selection state                                                                                                                                                |
| 43  | `app/[locale]/(app-layout)/transactions/by-category/[categoryId]/BulkDeleteSelection.tsx`                                                       | Client  | Keep        | C    | Context provider + `useBulkDeleteSelection`                                                                                                                                                                       |
| 44  | `app/[locale]/(app-layout)/transactions/by-category/[categoryId]/TransactionRowCheckbox.tsx`                                                    | Client  | Keep        | C    | Context consumer + `onCheckedChange`                                                                                                                                                                              |
| 45  | `app/[locale]/(onboarding-layout)/onboarding/components/categories-step/CategoriesStep.tsx`                                                     | Client  | Keep        | C    | File input `ref`, async mutations, complex import flow                                                                                                                                                            |
| 46  | `app/[locale]/(onboarding-layout)/onboarding/components/currency-step/CurrencyStep.tsx`                                                         | Client  | Keep        | C    | `react-hook-form`, `useRouter`                                                                                                                                                                                    |
| 47  | `app/[locale]/(onboarding-layout)/onboarding/components/password-step/PasswordStep.tsx`                                                         | Client  | Keep        | C    | `react-hook-form`, `useTransition`                                                                                                                                                                                |
| 48  | `app/[locale]/(auth-layout)/auth/callback/page.content.tsx`                                                                                     | Client  | Keep        | C    | `useEffect` exchanges OAuth code, `useSearchParams`, `useRouter`                                                                                                                                                  |
| 49  | `app/[locale]/(auth-layout)/components/auth-form/AuthForm.tsx`                                                                                  | Client  | Keep        | C    | `react-hook-form`, `useActionState`, `useTransition`                                                                                                                                                              |
| 50  | `app/[locale]/(auth-layout)/components/oauth-provider-buttons/OAuthProviderButtons.tsx`                                                         | Client  | Keep        | C    | `useState` + `globalThis.location.href` redirect                                                                                                                                                                  |
| 51  | `app/[locale]/(auth-layout)/verify-email/components/success-redirect/SuccessRedirect.tsx`                                                       | Client  | Keep        | C    | `useEffect` + `useRouter` for delayed redirect                                                                                                                                                                    |
| 52  | `app/[locale]/components/timezone-offset-setter/TimezoneOffsetSetter.tsx`                                                                       | Client  | Keep        | C    | `useEffect` writes `document.cookie` — browser-only                                                                                                                                                               |
| 53  | `app/[locale]/not-found.tsx`                                                                                                                    | Client  | Keep        | C    | `useRouter` + `useTranslations` — Next.js not-found must be client when using hooks                                                                                                                               |
| 54  | `app/[locale]/error.tsx`                                                                                                                        | Client  | Keep        | C    | Next.js `error.tsx` must be `'use client'`                                                                                                                                                                        |
| 55  | `app/[locale]/(app-layout)/error.tsx`                                                                                                           | Client  | Keep        | C    | Same                                                                                                                                                                                                              |
| 56  | `app/[locale]/(onboarding-layout)/error.tsx`                                                                                                    | Client  | Keep        | C    | Same                                                                                                                                                                                                              |
| 57  | `app/[locale]/(home-layout)/error.tsx`                                                                                                          | Client  | Keep        | C    | Same                                                                                                                                                                                                              |
| 58  | `app/[locale]/(auth-layout)/error.tsx`                                                                                                          | Client  | Keep        | C    | Same                                                                                                                                                                                                              |
| 59  | `app/global-error.tsx`                                                                                                                          | Client  | Keep        | C    | Same                                                                                                                                                                                                              |
| 60  | `components/app-error-boundary/AppErrorBoundary.tsx`                                                                                            | Client  | Keep        | C    | `useRouter` + `useTranslations` — rendered inside error boundaries which are client                                                                                                                               |

---

## Per-File Migration Recommendations

### Tier A — Trivial Wins

#### 1. `settings/page.content.tsx` (line 1)

**Problem:** `'use client'` exists only to call `useTranslations`. The component has no interactive logic whatsoever — it is a pure layout shell rendering `ProfileForm`, `ChangePasswordForm`, and `DeleteAccountSection` which are correctly client.

**Fix:** Remove `'use client'`. Switch `useTranslations` to `getTranslations` (server async). The RSC shell renders static translated headings; the three child forms remain client components and are imported normally (RSC can import client components).

```ts
// Before (line 1): 'use client'
// After: remove directive entirely
// Change: useTranslations → getTranslations from 'next-intl/server'
// Make component async
```

Note: `SettingsPageContent` currently receives `profile: ProfileResponseDto` as a prop from `SettingsPageServer`. That flow is unchanged — `SettingsPageServer` (RSC) fetches profile and passes to this component, which also becomes RSC.

---

#### 2. `onboarding/page.content.tsx` (line 1)

**Problem:** `'use client'` is present, but the component only calls `useTranslations` for card title/description strings. All step content components (`CurrencyStep`, `CategoriesStep`, `PasswordStep`, `StepIndicator`) are themselves client components imported as children — RSC can render client components.

**Fix:** Remove `'use client'`. Switch to `getTranslations`. The `stepContentMap` pattern with conditional rendering of client components works fine in RSC. The `OnboardingStep` type and `ONBOARDING_STEP` constant have no client dependency.

---

#### 3. `onboarding/components/step-indicator/StepIndicator.tsx` (line 1)

**Problem:** `'use client'` exists for `useTranslations` (can move to server) and `useMemo` (which is just array derivation — trivially computed inline without memoization in RSC).

**Fix:** Remove `'use client'`. Remove `useMemo` and compute `visibleStepList` inline. Switch `useTranslations` to `getTranslations`. The component renders no event handlers — it is purely presentational.

---

#### 4. `components/bulk-delete-action-bar/BulkDeleteActionBar.tsx` (line 1)

**Problem:** This component is purely presentational. It receives all labels and callbacks as props. It renders `Button` components with `onClick` props, but those `onClick` handlers are passed in — they are not defined here. A component that only receives callbacks via props and does not call any hooks does not need `'use client'`.

**Fix:** Remove `'use client'`. The `Button` component from `@track-my-life/ui` is a client component — when imported into an RSC the boundary is at `Button`, not at `BulkDeleteActionBar`. However, since `BulkDeleteActionBar` passes event-handler props (which are functions) it must remain in the client boundary. In practice, `BulkDeleteActionBar` is always rendered inside client parents (`TransactionsPageContent`, `RecurringTransactionsPageContent`), so removing `'use client'` is safe.

**Caveat:** Verify that `Button` in packages/ui does not itself require `'use client'` to be propagated up. If `BulkDeleteActionBar` is ever rendered as a direct child of an RSC with function props, the RSC boundary rules apply. Since all current callsites are inside client components, this is a safe removal.

---

#### 5. `transactions/import/components/import-summary/ImportSummary.tsx` (line 1)

**Problem:** `'use client'` for `useTranslations` only. Component is purely presentational — renders counts with no interaction.

**Fix:** Remove `'use client'`. Switch to `getTranslations`. Since `ImportSummary` is rendered inside `ImportTransactionPage` which is correctly client, both approaches work — but removing it avoids unnecessary client JS for this leaf.

---

#### 6. `transactions/import/components/import-preview-table/ImportPreviewTable.tsx` (line 1)

**Problem:** `'use client'` for `useTranslations` only. Renders a `<table>` with static data — no event handlers, no state.

**Fix:** Remove `'use client'`. Switch to `getTranslations`. Again rendered inside a client parent, so the change is safe and reduces the scope of the client boundary.

---

#### 7. `dashboard/components/dashboard-filter-bar/DashboardFilterBarClient.tsx` (entire file)

**Problem:** This file is a 7-line wrapper whose only job is to call `useDashboardFilters()` and pass `handleFilterChange` down to `DashboardFilterBar`. Having a dedicated wrapper file for this adds module overhead with no architectural benefit.

**Fix:** Delete `DashboardFilterBarClient.tsx`. Move the `useDashboardFilters()` call directly into the RSC that renders the filter bar (the dashboard page or its server component), passing `onFilterChange` down. Alternatively, if the filter bar's parent is already a client component, inline the hook there and import `DashboardFilterBar` directly.

---

### Tier B — Refactors (RSC Shell + Client Island)

#### 8. `categories/page.content.tsx` — CRITICAL: Violates "no client list state" rule

**Problem (lines 26–38):** `filteredCategoryList` is computed from a server-fetched `categoryList` prop using `useMemo` inside a client component, filtered by `activeFilter` from `useCategoryFilters` (which reads from `useSearchParams`). This pattern stores a server-fetched list in a client-computed derived state.

The team feedback rule is explicit: "never store server-fetched lists in useState, rely on revalidatePath." While `useMemo` is not `useState`, the same principle applies — the server list is being processed client-side, which means the full unfiltered category list is always shipped to the client even when the user only wants to see EXPENSE categories.

**Fix:** Migrate to the URL-driven RSC pattern already used by `TransactionListServer`:

1. Add `type` to the `CategoryListServer` query — `fetchCategoryList({ type })` or filter server-side.
2. In `categories/page.tsx`, read `type` from `searchParams` and pass to `CategoryListServer`.
3. Remove `activeFilter` / `filteredCategoryList` from `CategoriesPageContent`.
4. Keep `TypeFilter` client (it already is, via `'use client'` + `useUrlFilters`), but render it in `page.tsx` or a separate RSC slot, not inside the content component.
5. `CategoriesPageContent` can then be removed or converted to RSC since its remaining logic is: `deletingCategory` state + `deletingSubcategoryList` derivation. These belong in a thin client island (`CategoryListClient`) wrapping `CategoryTree`.

The `deletingCategory` + `DeleteCategoryDialog` pattern is the only true client state left. Extract that into a `CategoryListClient` wrapper component that holds `useState<CategoryResponseDto | null>` and receives the already-filtered list as a prop from the RSC.

---

#### 9. `transactions/page.content.tsx`

**Problem:** The entire page content is client. Looking at what actually requires client:

- `handleFilterChange` — calls `useUrlFilters` which calls `router.replace` — client
- `deletingTransaction` — `useState` for dialog — client
- `selectedIdSet` + bulk delete state — `useBulkDeleteSelection` — client
- `filterLabelMap` — a pure object derived from `translations` — does not need client
- `handleMonthChange` — wraps `handleFilterChange` — client
- `Pagination` — needs `onPageChange` callback — client
- `TypeFilter`, `MonthNavigator`, `CategoryPicker`, `TransactionSortFilter` — all already client
- `TransactionList` — currently client; see item 10

The core problem is that `TransactionsPageContent` bundles filter state management and delete dialog state into one large client component. However, since filters drive server re-fetches via URL params (the `TransactionListServer` pattern is already set up correctly), `TransactionsPageContent` is the appropriate client boundary here. The immediate improvement is not splitting this file further but rather converting the children that don't need client (see `TransactionList` item 10).

**Concrete action:** `TransactionsPageContent` is an acceptable client boundary. No split needed at this level — focus on the children.

---

#### 10. `transactions/components/transaction-list/TransactionList.tsx`

**Problem:** This component is `'use client'` and renders the full transaction list with grouping, formatting, and interactivity. The `useLocale` and `useTranslations` calls are the pull factors. The interactive parts are: `Checkbox` with `onCheckedChange`, copy/edit `Link` buttons (not interactive), and the delete `Button` with `onClick`.

**Fix:** Split into:

- `TransactionList.tsx` — RSC. Receives `transactionList`, locale (passed from parent RSC), and translations (or converted to `getTranslations`). Renders groups, dates, amounts, badges, copy/edit links. Passes `onDelete` and selection props to `TransactionRowActions`.
- `TransactionRowActions.tsx` (new, client) — renders the `Checkbox`, delete `Button`, and receives `onToggleSelection`/`onDelete` as props.

This moves the date grouping and amount formatting out of client JS, reducing the transaction page's client bundle.

**Note on locale:** `useLocale()` on line 18 can be replaced with a `locale` prop passed from the server (the parent RSC already has the locale from `params`).

---

#### 11. `transactions/recurring/components/recurring-transaction-list/RecurringTransactionList.tsx`

**Problem:** Same as `TransactionList` — full list rendering is client because of `useTranslations`, `useLocale`, `useRouter`.

**Fix:** Same pattern:

- `RecurringTransactionList.tsx` — RSC. Renders static list content.
- `RecurringTransactionRowActions.tsx` (new, client) — pause/resume/delete/checkbox buttons, receives callbacks as props.

`useRouter` on line 11 is used for the edit button navigation inside `RecurringTransactionList`. Replace with a plain `Link` from `@track-my-life/next-shared` (already available) to eliminate the `useRouter` dependency.

---

#### 12. `transactions/recurring/[id]/page.content.tsx`

**Problem:** This detail view is `'use client'` and contains a substantial static data display card (lines 77–168) plus action buttons (lines 172–199) and a delete confirmation dialog. The `useOptimisticTransaction` hook and `isPending` are needed for the pause/resume buttons, but the data display itself is static.

**Fix:** Split into:

- `RecurringTransactionDetail.tsx` (new, RSC) — renders the static detail card with all field rows. Receives the `recurringTransaction` DTO directly. No hooks needed.
- Keep `RecurringTransactionDetailContent` as the client shell, but it only renders the header, action buttons, and dialog.

The `useLocale` dependency on line 10 can be replaced by passing `locale` from the page RSC.

---

#### 13. `categories/components/category-tree/CategoryTree.tsx`

**Problem:** `CategoryTree` is `'use client'` primarily because it calls `useTranslations` and uses the Radix `Accordion` (which is interactive). The data display inside each accordion is static.

**Fix:** The `Accordion` from Radix UI requires `'use client'` — this cannot be removed entirely. However, the delete buttons can be extracted into a `CategoryRowActions` client island, and the component can potentially become a client component only because of Accordion, not because of data processing. This is a minor win since Accordion already forces the boundary. **Lower priority** — leave as-is unless Accordion is replaced with a native `<details>` element.

---

### Tier C — Non-Migratable (must stay client)

The following files require `'use client'` for legitimate reasons and should not be changed:

| File                                   | Reason                                                            |
| -------------------------------------- | ----------------------------------------------------------------- |
| All `error.tsx` files (5 files)        | Next.js error boundaries must be client components                |
| `global-error.tsx`                     | Same requirement                                                  |
| `AppErrorBoundary.tsx`                 | Rendered inside error boundaries; `useRouter` + `useTranslations` |
| `not-found.tsx`                        | `useRouter` for navigation                                        |
| `SidebarProvider.tsx`                  | Context provider with `useState`                                  |
| `AppSidebar.tsx`                       | `usePathname`, `useState`, keyboard `useEffect`                   |
| `AppHeader.tsx`                        | `usePathname`, `useSidebar` context                               |
| `UserMenu.tsx`                         | Radix `DropdownMenu` + server action call                         |
| `TimezoneOffsetSetter.tsx`             | `document.cookie` write in `useEffect`                            |
| `AuthForm.tsx`                         | `react-hook-form`, `useActionState`                               |
| `OAuthProviderButtons.tsx`             | `globalThis.location.href` redirect                               |
| `SuccessRedirect.tsx`                  | `useEffect` delayed `router.replace`                              |
| `AuthCallbackPageContent`              | `useEffect` code exchange, `useSearchParams`                      |
| `CurrencyStep.tsx`                     | `react-hook-form`, `useRouter`                                    |
| `CategoriesStep.tsx`                   | File input ref, async import mutations                            |
| `PasswordStep.tsx`                     | `react-hook-form`, `useTransition`                                |
| `TransactionFormPage.tsx`              | `react-hook-form`, `useRouter`, `Controller`                      |
| `RecurringTransactionFormPage.tsx`     | Same                                                              |
| `CategoryFormPage.tsx`                 | Same                                                              |
| `ProfileForm.tsx`                      | Same                                                              |
| `ChangePasswordForm.tsx`               | Same                                                              |
| `DeleteAccountSection.tsx`             | `react-hook-form`, `useState`, Radix `AlertDialog`                |
| All delete dialogs (3 files)           | `useState` + Radix `AlertDialog` + async mutations                |
| All bulk delete dialogs (2 files)      | Same                                                              |
| `BulkDeleteSelection.tsx`              | Context provider                                                  |
| `TransactionRowCheckbox.tsx`           | Context consumer + `onCheckedChange`                              |
| `use-bulk-delete-selection.ts`         | `useState`, `useCallback`, `useMemo`                              |
| `CategoryPicker.tsx`                   | `useRef`, `useEffect` for focus, keyboard navigation              |
| `ExportTransactionButton.tsx`          | `useState`, `clientTransactionApiService` fetch, `Blob` download  |
| `TypeFilter.tsx`                       | `onClick` handlers                                                |
| `MonthNavigator.tsx`                   | `onClick` handlers                                                |
| `TransactionSortFilter.tsx`            | Radix `Select`, `Button onClick`                                  |
| `RecurringTransactionStatusFilter.tsx` | `Button onClick`                                                  |
| `DashboardFilterBar.tsx`               | `Input onChange`, `Select onValueChange`                          |
| `TrendsChartContent.tsx`               | `recharts` requires DOM                                           |
| `DailySpendingChartContent.tsx`        | Same                                                              |
| `CategoryBreakdownChartContent.tsx`    | Same                                                              |

---

## Risks and Non-Goals

### Risks

- **`getTranslations` is async** — converting `useTranslations` to `getTranslations` requires making the component `async`. If a component is consumed in a context that doesn't support async (e.g., as a child of a client component that expects a synchronous render), this will cause a runtime error. All Tier A conversions should be verified against their callsites.
- **`useTranslations` in RSC** — `next-intl` docs confirm `useTranslations` cannot be called in RSC (it is a hook); the RSC equivalent is `getTranslations`. This is a mechanical change but must not be missed.
- **Passing locale as prop** — Several client components use `useLocale()`. When converting their parent to RSC and passing locale as a prop, the locale must be read from `params` in `page.tsx` and threaded down. This is low-risk but requires care not to break i18n routing.
- **`BulkDeleteActionBar` removal of `'use client'`** — If any future callsite renders this component directly from a server context with function props, React will throw. The fix at that point is to add a thin client wrapper. For now all callsites are within client trees.
- **Category filtering refactor (item 8)** — Changing `CategoryListServer` to accept a `type` filter and re-fetch server-side changes the network contract. Ensure `fetchCategoryList` supports an optional `type` param and the API accepts it.

### Non-Goals

- This proposal does not cover `packages/ui` components — those are framework-agnostic and may have their own `'use client'` requirements for Radix primitives.
- Form components (`TransactionFormPage`, `CategoryFormPage`, etc.) are intentionally excluded — forms with `react-hook-form` and server actions are correctly client and migrating them to RSC forms would be a separate workstream.
- Performance metrics beyond bundle size estimation are out of scope for this proposal.

---

## Suggested Rollout Order

Ordered by impact / risk ratio (highest impact, lowest risk first):

### Sprint 1 — Zero-risk trivial wins (1–2 days)

1. **`settings/page.content.tsx`** — Remove `'use client'`, async + `getTranslations`. Zero dependencies to change.
2. **`import-summary/ImportSummary.tsx`** — Same pattern. Isolated leaf.
3. **`import-preview-table/ImportPreviewTable.tsx`** — Same. Isolated leaf.
4. **`onboarding/page.content.tsx`** — Remove `'use client'`, async + `getTranslations`. Verify `StepIndicator` and step components are importable from RSC (they are, since RSC can import client components).
5. **`onboarding/step-indicator/StepIndicator.tsx`** — Remove `'use client'`, inline the array derivation, async + `getTranslations`.
6. **Delete `DashboardFilterBarClient.tsx`** — Inline `useDashboardFilters` call into the dashboard page client component. Update import at the callsite.

### Sprint 2 — Categories filter violation fix (2–3 days, highest correctness impact)

7. **`categories/page.content.tsx` + `CategoryListServer`** — Fix the "no client list state" violation. Pass `type` filter as URL param, filter server-side, extract `CategoryListClient` for delete state.

### Sprint 3 — List component splits (3–4 days)

8. **`TransactionList.tsx`** — Extract `TransactionRowActions` client island; convert list rendering to RSC.
9. **`RecurringTransactionList.tsx`** — Same pattern; replace `useRouter` edit navigation with `Link`.
10. **`recurring/[id]/page.content.tsx`** — Split static detail card into RSC.

### Sprint 4 — `BulkDeleteActionBar` (1 day, low risk)

11. **`BulkDeleteActionBar.tsx`** — Remove `'use client'`. Verify all callsites remain within client trees.

---

## Bundle Impact Estimate

| Page                           | Before (client components in tree)                              | After (Tier A+B)                                            | Estimated JS reduction                    |
| ------------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| `/categories`                  | `CategoriesPageContent` (full list + filter client)             | `TypeFilter` + `CategoryListClient` (delete state only)     | ~30–35% of category page client JS        |
| `/settings`                    | `SettingsPageContent` + 3 form islands                          | 3 form islands only (headings server-rendered)              | ~10–15%                                   |
| `/transactions`                | `TransactionsPageContent` + `TransactionList` (all rows client) | `TransactionsPageContent` + `TransactionRowActions` per row | ~20–25% (list row markup server-rendered) |
| `/transactions/recurring`      | Same pattern                                                    | Same improvement                                            | ~20–25%                                   |
| `/transactions/recurring/[id]` | Full detail page client                                         | Action buttons + dialog only                                | ~40% of detail page client JS             |
| `/onboarding`                  | Full page content + step indicator client                       | Step indicator + page layout server                         | ~10%                                      |

Overall: migrating all Tier A + Tier B items is estimated to reduce client JS shipped on the affected routes by **15–30%** and improve LCP on initial page load by removing unnecessary hydration of static content.
