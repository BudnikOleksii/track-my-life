## Why

The backend recently added bulk-delete endpoints (`POST /api/transactions/batch`, `/api/transaction-categories/batch`, `/api/recurring-transactions/batch`, `/api/budgets/batch`), but the frontend has no way to invoke them. Users currently cannot select multiple transactions or recurring entries to remove them in a single action, and deleting a parent category with existing subcategories requires clicking through each subcategory individually. Exposing bulk delete closes those gaps and removes a common source of friction.

## What Changes

- Regenerate the OpenAPI client in `packages/shared/src/api/generated/` so `BulkDeleteDto`, `BulkDeleteResponseDto`, `BulkDeleteFailureDto`, and the four new `*BulkDelete` operation types are available.
- Extend `TransactionApiService`, `CategoryApiService`, and `RecurringTransactionApiService` in `packages/shared/src/api/services/` with a `bulkDelete(idList: string[])` method targeting the `/batch` endpoints (parameter name honors the `list` suffix rule; body is mapped onto the generator-owned `ids` DTO field at the boundary). `BudgetApiService` bulk delete is deferred to a future change.
- Add matching `bulkDeleteTransaction`, `bulkDeleteCategory`, and `bulkDeleteRecurringTransaction` server actions in the money-tracker app. Each action returns `ServerActionResult<BulkDeleteResult>` — a narrow projection `{ deletedCount, failureList }` that strips the server-localised `message` at the boundary so it never leaks into client rendering.
- Add multi-select bulk-delete UX to the transaction list and the recurring-transaction list: checkboxes per row, a sticky action bar with count + destructive "Delete selected" button, and a confirmation dialog that surfaces partial-failure results from `BulkDeleteResult`. Selection state lives in the existing page-content client components (`TransactionsPageContent`, `RecurringTransactionsPageContent`) so it resets naturally when the Suspense boundary keyed on searchParams unmounts.
- Update the category delete flow so that when a parent category with subcategories is deleted, the confirmation dialog lists the affected subcategories and offers a single "Delete category and N subcategories" action powered by bulk delete, with a specialised error path for the "parent still referenced by transactions" failure mode.

## Capabilities

### New Capabilities

- `bulk-delete-api`: `bulkDelete` methods on transaction, category, and recurring-transaction API services plus the shared `BulkDeleteDto` / `BulkDeleteResponseDto` types exported from `packages/shared`.
- `bulk-delete-server-actions`: money-tracker server actions that guard auth, validate ID arrays, call the service, revalidate cache tags, and return typed `ServerActionResult<BulkDeleteResponseDto>`.
- `transaction-bulk-delete-ui`: multi-select checkboxes, selection action bar, and confirm-with-result dialog on the transactions list (and by-category list where applicable).
- `recurring-transaction-bulk-delete-ui`: same multi-select UX on the recurring-transaction list.
- `category-cascade-delete-ui`: enhanced delete-category confirmation that detects subcategories, lists them, and cascades the delete via bulk endpoint.

### Modified Capabilities

- None. Existing CRUD specs stay intact; bulk-delete adds parallel requirements without altering the single-entity delete contracts.

## Impact

- **Generated API types**: `packages/shared/src/api/generated/{index.ts,types.gen.ts}` regenerated from the updated swagger spec.
- **API services**: `packages/shared/src/api/services/{transaction-api.service.ts,category-api.service.ts,recurring-transaction-api.service.ts}`.
- **Money-tracker actions**: new `bulk-delete-*.ts` files under `apps/money-tracker/src/app/[locale]/(app-layout)/{transactions,categories,transactions/recurring}/actions/`.
- **Money-tracker UI**: `transaction-list`, `recurring-transaction-list`, `delete-category-dialog`, and two new sibling dialogs (`bulk-delete-transaction-dialog`, `bulk-delete-recurring-transaction-dialog`), plus a new `bulk-delete-action-bar` shared between transaction lists. Selection state lives in the existing page-content client components (`transactions/page.content.tsx`, `transactions/recurring/page.content.tsx`), not in the list components themselves.
- **i18n**: new keys under the relevant page namespaces for selection count, bulk-delete confirm/cancel, partial-failure messaging, cascade wording, the 100-item cap notice, and the "parent category still referenced" specialised error.
- **Cache**: server actions reuse existing `CACHE_TAG.TRANSACTIONS`, `ANALYTICS`, `RECURRING_TRANSACTIONS`, `CATEGORIES` tags via `updateTag`. `bulkDeleteCategory` invalidates only `CATEGORIES` (matches the single-delete precedent; confirmed backend behavior never removes transaction rows via category delete).
- **Backend behavior confirmed pre-merge**: category bulk-delete rejects parents whose children are in the same batch (`"Category has active children"`) and rejects any category with associated transactions (`"Category has active transactions"`). No array ordering, no deferred FKs, no topological sort. `BulkDeleteDto.ids` capped at 100. These facts shape the two-round-trip cascade flow (children first, then parent) and the specialised error messaging for active-transaction failures. No backend changes are needed for this frontend work.
