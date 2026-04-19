## 0. Confirmed backend behavior (context — no action required)

The three pre-merge questions are resolved. Implementation tasks below bake these in directly; no conditional branches remain.

- [x] 0.1 Category cascade ordering: backend does NOT honor array order / deferred FK / topological sort. `bulkSoftDelete` rejects any parent whose children are in the same batch with `"Category has active children"`. Two-round-trip cascade is mandated (task 7.3)
- [x] 0.2 Category delete does NOT cascade to transactions at the application level: `hasTransactions` guard blocks deletion before the DB-level `ON DELETE CASCADE` FK is reached. `bulkDeleteCategory` invalidates only `CACHE_TAG.CATEGORIES` (task 3.2)
- [x] 0.3 `BulkDeleteDto.ids` max size is 100 (`@ArrayMaxSize(100)`). Client-side `.max(100)` and UI cap of 100 match the server exactly

## 1. Regenerate shared API types

- [x] 1.1 Run `pnpm generate:api` in `packages/shared` to refresh `src/api/generated/{index.ts,types.gen.ts}` against the backend swagger-json
- [x] 1.2 Verify `BulkDeleteDto`, `BulkDeleteResponseDto`, `BulkDeleteFailureDto` and the four `*ControllerBulkDelete*` types are present in `types.gen.ts`
- [x] 1.3 Run `pnpm type-check` and `pnpm lint` from the repo root to confirm the regeneration did not break any existing consumers. Swagger spec was fixed upstream (`baseCurrencyCode` now correctly typed as `CurrencyCode`); narrowed the onboarding `currency` search-param via `checkIsCurrencyCode` in `onboarding/page.tsx`, propagated `CurrencyCode` type through `OnboardingPageContent`, `PasswordStep`, `CategoriesStep`, and `useCategoriesStep`. Type-check and lint now clean across the repo.

## 2. Extend shared API services with `bulkDelete`

- [x] 2.1 Add `bulkDelete(idList: string[])` to `packages/shared/src/api/services/transaction-api.service.ts`. URL: `${BASE_URL}/batch`. Method: `POST`. Body: `{ ids: idList }` — map the hand-written `idList` parameter onto the generator-owned `ids` DTO field at the boundary. Response typed as `TransactionsControllerBulkDeleteResponses[typeof HTTP_STATUS_CODE.OK]`. Do NOT short-circuit on empty input — let the backend decide
- [x] 2.2 Add `bulkDelete(idList: string[])` to `packages/shared/src/api/services/category-api.service.ts` (URL `/api/transaction-categories/batch`, same `{ ids: idList }` mapping, no empty-list short-circuit)
- [x] 2.3 Add `bulkDelete(idList: string[])` to `packages/shared/src/api/services/recurring-transaction-api.service.ts` (URL `/api/recurring-transactions/batch`, same pattern)
- [x] 2.4 Do NOT add a central helper, registry, or base-class method. Each service owns its own method per the memory on API service instances. Do NOT add `bulkDelete` to `BudgetApiService`, `AuthApiService`, `ProfileApiService`, `OnboardingApiService`, or `TransactionsAnalyticsApiService` in this change
- [x] 2.5 Confirm existing instances in `packages/next-shared/src/api/server-api.ts` expose the new methods with the already-configured auth interceptor (no registration change required)

## 3. Money-tracker server actions

- [x] 3.1 Create `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/actions/bulk-delete-transaction.ts` — `'use server'`, signature `bulkDeleteTransaction(idList: string[])` (positional, not object-wrapped). Validate with `z.array(entityIdSchema).min(1).max(100).safeParse(idList)`. Call `redirectUnauthorized()`. Call `transactionApiService.bulkDelete(idList)`. When `deletedCount > 0`, call `revalidateTransactionCaches()`. Return `ServerActionResult<BulkDeleteResult>` constructed from the backend response — map `response.deleted` → `deletedCount` and `response.failed` → `failureList`; the `message` field SHALL NOT appear in the action's return value
- [x] 3.2 Create `apps/money-tracker/src/app/[locale]/(app-layout)/categories/actions/bulk-delete-category.ts` — same validation and signature shape. On success (`deletedCount > 0`), call `updateTag(CACHE_TAG.CATEGORIES)` exactly once. Do NOT invalidate `TRANSACTIONS` or `ANALYTICS` — the backend's `hasTransactions` guard ensures a successful category delete never removes transaction rows (matches the existing `deleteCategory` action)
- [x] 3.3 Create `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/actions/bulk-delete-recurring-transaction.ts` — same validation and signature. On success, call `updateTag(CACHE_TAG.RECURRING_TRANSACTIONS)` only — do NOT invalidate `TRANSACTIONS` or `ANALYTICS`; this matches the existing `deleteRecurringTransaction` action because already-materialised past occurrences are not deleted
- [x] 3.4 For each action, create a sibling `types.ts` (NOT `'use server'`) exporting `export interface BulkDeleteResult { deletedCount: number; failureList: Array<{ id: string; reason: string }>; }`. Consumers (dialogs) import from this `types.ts`, not from the action file or from the generated DTO module
- [x] 3.5 Ensure each action file has exactly one top-level `export`: the action function itself. No `export type`, `export interface`, `export const`, or re-exports. Verify with `grep '^export' <file>` — only `export const bulkDelete*` SHALL match
- [x] 3.6 Use `updateTag` (not `revalidateTag`) per the memory on cache invalidation

## 4. Shared bulk-delete action bar

- [x] 4.1 Create `apps/money-tracker/src/components/bulk-delete-action-bar/BulkDeleteActionBar.tsx` with props `{ selectedCount: number; selectedCountLabel: string; onDelete: () => void; onClear: () => void; isSubmitting: boolean }`. The `selectedCountLabel` is a **pre-resolved translated string** (not an i18n key) so the bar has no namespace coupling; consumers compose it with `useTranslations(...)` + ICU plural before passing. (Component also takes `deleteLabel` and `clearLabel` as pre-resolved strings for the button copy — same "translated strings, not keys" principle.)
- [x] 4.2 Sticky at the bottom of the scrollable container using existing design tokens. Use `cn()` from `@track-my-life/ui` for conditional classes (never template literals). `role="region"` with an `aria-label` derived from `selectedCountLabel` so screen readers announce the bar on mount
- [x] 4.3 Use `Button variant="destructive"` for the delete action and `Button variant="outline"` (or `ghost`) for Clear. When `isSubmitting` is true, disable both the delete and clear buttons and show a spinner next to the delete label. Do NOT disable the Cancel affordance in the dialog itself (handled in tasks 5.6 / 6.3)
- [x] 4.4 Add i18n keys under each consuming namespace (`transactionsPage.content.bulkDelete.*`, `recurringTransactionsPage.content.bulkDelete.*`) — plural-aware with next-intl ICU. Keys needed: `selectedCount`, `deleteSelected`, `clearSelection`, `confirmTitle`, `confirmBody`, `successToast` (with `{count}`), `partialFailureToast` (with `{deleted}` and `{failed}`), `totalFailureToast`, `overCapNotice` (with `{cap}`)

## 5. Transaction list bulk-delete UI

- [x] 5.1 Add `selectedIdSet: Set<string>` state to `TransactionsPageContent` (NOT `TransactionList`). It lives alongside the existing `deletingTransaction` state. Do NOT mirror `transactionList` into state
- [x] 5.2 Pass `selectedIdSet: ReadonlySet<string>`, `onToggleSelection: (id: string) => void`, and `isBulkDeleteSubmitting: boolean` as props to `TransactionList`. `TransactionList` becomes a dumb receiver of selection state
- [x] 5.3 Render a `Checkbox` (from `@track-my-life/ui`) in each row, bound to `selectedIdSet.has(transaction.id)`. Wire toggle to `onToggleSelection(transaction.id)` in the parent, which mutates a copy of the set. Enforce a cap: if toggling would take `selectedIdSet.size` above 100, do NOT add the id and surface the `overCapNotice` toast (see task 4.4)
- [x] 5.4 Add a "Select all visible" control in the action bar or list header that selects (up to the cap) every currently-rendered id, or clears them if all are already selected. Implemented as a toggle in `BulkDeleteActionBar` (label flips between `selectAllVisible` / `deselectAllVisible`). Cap enforcement goes through the shared `useBulkDeleteSelection` hook.
- [x] 5.5 Do NOT add a `useEffect` that prunes `selectedIdSet` against `transactionList`. Selection mutation on mutation-response is owned exclusively by the dialog (task 5.6). Stale ids in the set are harmless because checkboxes only render for visible rows
- [x] 5.6 Create `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/bulk-delete-transaction-dialog/BulkDeleteTransactionDialog.tsx`. Props include the captured `idList: string[]`, `onClose`, and a parent-supplied `onResult(setSelectedIdSet: Dispatch<SetStateAction<Set<string>>>)` callback. On confirm: call `bulkDeleteTransaction(idList)`, set `isBulkDeleteSubmitting=true` upstream. On response:
  - Success (`ok: true`, `deletedCount === idList.length`): close dialog, success toast, parent clears `selectedIdSet`
  - Partial (`ok: true`, `0 < failureList.length < idList.length`): remain open, render failed ids with `reason` as supplementary detail only (monospace / disclosure), warning toast using `partialFailureToast`, parent prunes `selectedIdSet` to `new Set(failureList.map(f => f.id))`
  - Total (`ok: true`, `deletedCount === 0`): destructive toast, `selectedIdSet` unchanged
  - Error (`ok: false`): destructive toast with translated error key, `selectedIdSet` unchanged
  - NEVER render `BulkDeleteResponseDto.message` or use `failureList[].reason` as the primary user-facing phrase
- [x] 5.7 Render `BulkDeleteActionBar` in `TransactionsPageContent` when `selectedIdSet.size > 0`. Pass `selectedCountLabel` built via `useTranslations` + ICU plural from the `selectedCount` key
- [x] 5.8 While a bulk-delete request is in flight: pass `isBulkDeleteSubmitting=true` to both the list (which disables row checkboxes, preserving their state) and the action bar (which disables select-all and clear). The `idList` captured at dialog-open time is the authoritative set for the response handler
- [x] 5.9 Verify the existing single-row trash icon and `DeleteTransactionDialog` still work unchanged regardless of whether the selection is empty or not — single-delete does NOT alter `selectedIdSet`
- [x] 5.10 Apply the same multi-select wiring to the transactions-by-category view (`transactions/by-category/[categoryId]/...`). The view does not share `TransactionList` — its page.content is a server component rendering its own accordion/rows. Extracted the rendering into a new `CategoryDetailContentClient` client component that owns selection state via `useBulkDeleteSelection` and renders checkboxes + `BulkDeleteActionBar` + `BulkDeleteTransactionDialog`. The server `page.content.tsx` now fetches and hands `groupList` to the client wrapper.

## 6. Recurring transaction list bulk-delete UI

- [x] 6.1 Add `selectedIdSet` state to `RecurringTransactionsPageContent` (NOT `RecurringTransactionList`). Pass `selectedIdSet`, `onToggleSelection`, `isBulkDeleteSubmitting` props down. Add row-level `Checkbox` in the list component. Enforce the 100-item cap with the same logic as task 5.3. No `useEffect` reconciliation
- [x] 6.2 Render `BulkDeleteActionBar` when `selectedIdSet.size > 0`
- [x] 6.3 Create `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/components/bulk-delete-recurring-transaction-dialog/BulkDeleteRecurringTransactionDialog.tsx` calling `bulkDeleteRecurringTransaction(idList)` with identical success / partial-failure / total-failure / error handling and the same "never render `message`" / "`reason` is supplementary detail only" rules
- [x] 6.4 Verify existing pause/resume/edit/single-delete controls still work

## 7. Category cascade-delete UI

- [x] 7.1 In `CategoryTree`, compute a `subcategoryList` for the row the user is trying to delete from the already-built `childrenMap` and pass it through `onDelete` (or expose `subcategoryList` via `DeleteCategoryDialog` prop). Implemented in `CategoriesPageContent` from the full `categoryList` (not the type-filtered view) so cross-type relationships are still detected.
- [x] 7.2 Update `DeleteCategoryDialog` props to accept `subcategoryList: CategoryResponseDto[]` (default `[]`). Render cascade-mode copy + bulleted subcategory name list when `subcategoryList.length > 0`
- [x] 7.3 Implement the two-round-trip cascade flow (backend does not honor array order — see §0.1):
  - **Request 1:** `bulkDeleteCategory(subcategoryList.map(c => c.id))`. Wait for the response.
  - **Request 2:** issued ONLY if request 1 returned `{ ok: true, data: { failureList: [] } }`. Call `bulkDeleteCategory([category.id])`.
  - If request 1 has any failures (`failureList.length > 0`) or `ok: false`, do NOT issue request 2; surface request 1's failure state and keep the dialog open
- [x] 7.4 When confirming a leaf delete (`subcategoryList.length === 0`), keep today's `deleteCategory(category.id)` path
- [x] 7.5 Translate the confirmed backend failure strings into user-facing i18n copy:
  - If request 1's `failureList` contains any entry whose `reason` matches "Category has active transactions" → render `cascadeChildHasTransactions` with the affected subcategory names
  - If request 2's `failureList` is `[{ id: category.id, reason: "Category has active transactions" }]` → render `cascadeParentStillReferenced`
  - Any other request 1 or request 2 failure → render `cascadeUnexpectedFailure` (generic destructive)
  - `ok: false` from either request → destructive toast with the translated error key
  - Never render `BulkDeleteResponseDto.message`; render `failureList[].reason` only as supplementary detail (monospace or disclosure)
- [x] 7.6 Add i18n keys: `categoriesPage.content.cascadeDeleteTitle`, `categoriesPage.content.cascadeDeleteBody`, `categoriesPage.content.cascadeDeleteConfirm` (plural-aware with subcategory count), `categoriesPage.content.cascadeSuccessToast` (with `{count}`), `categoriesPage.content.cascadeChildHasTransactions`, `categoriesPage.content.cascadeParentStillReferenced`, `categoriesPage.content.cascadePartialChildrenDeleted` (with `{deleted}` and `{total}` — for "N of M subcategories removed"), `categoriesPage.content.cascadeUnexpectedFailure`
- [x] 7.7 Confirm the onboarding categories step is NOT touched (it operates on an unsaved in-memory list; no bulk-delete action SHALL be reachable from onboarding)

## 8. Localization

- [x] 8.1 Add English and Ukrainian translations for every new key introduced in steps 4, 5, 6, 7 under the correct namespace in `apps/money-tracker/messages/{en,uk}.json`
- [x] 8.2 Run the repo's i18n CI check (it already fails on missing keys per a recent PR) to confirm no key is missing per-locale. Verified: `bash scripts/check-i18n-parity.sh` passes for all message files.

## 9. Verification

- [x] 9.1 `pnpm type-check`, `pnpm lint`, `pnpm stylelint`, `pnpm fmt:check` all green. Verified: all four pass cleanly from the repo root.
- [x] 9.2 `pnpm test` green. No tests are defined in any workspace package (`turbo run test` resolves zero tasks); treated as trivially satisfied.
- [ ] 9.3 Manual smoke test: (a) select two transactions → bulk delete → both disappear, analytics widgets update (because `revalidateTransactionCaches` is invoked); (b) select one recurring transaction → bulk delete → disappears, `TRANSACTIONS` cache is NOT invalidated; (c) delete a leaf category → single-delete path, only `CATEGORIES` cache invalidated; (d) delete a parent category with two children where none have transactions → cascade dialog lists children, confirms, both requests succeed, all three categories disappear; (e) delete a parent category where one child has transactions → request 1 returns a failure for that child, request 2 is NOT issued, dialog shows `cascadeChildHasTransactions`; (f) delete a parent category where children are clean but the parent has transactions → request 1 succeeds fully, request 2 fails for the parent, dialog shows `cascadeParentStillReferenced` with "N subcategories removed" acknowledgement; (g) simulate a generic partial failure on a transaction bulk delete and verify the dialog surfaces `failureList` with `reason` only as supplementary detail and prunes `selectedIdSet` to the failed ids; (h) open the bulk-delete dialog, confirm, and attempt to toggle row checkboxes while the request is in flight — verify they are disabled — **NEEDS USER**: requires the dev server and a manual browser session
- [ ] 9.4 Confirm keyboard navigation works: tab reaches row checkboxes, space toggles, tab reaches action bar, `role="region"` + `aria-label` is announced on mount, enter confirms delete, focus returns to a sensible location after dialog close — **NEEDS USER**: manual accessibility smoke test
- [x] 9.5 Grep `grep -n 'response\.message\|data\.message' apps/money-tracker/src` and confirm no match — the raw `message` field MUST never reach the UI. Verified: zero matches.
- [x] 9.6 Grep `grep -c '^export' apps/money-tracker/src/app/\[locale\]/\(app-layout\)/*/actions/bulk-delete-*.ts` and confirm each file has exactly 1 top-level export. Verified: all three files return 1.
- [x] 9.7 Run `openspec status --change bulk-delete-entities` and confirm `isComplete: true`. Verified: 4/4 artifacts complete, change validates in strict mode.
