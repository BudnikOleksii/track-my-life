## Context

The backend now exposes `/batch` bulk-delete endpoints for transactions, transaction categories, recurring transactions, and budgets. All four share the same request/response shape:

```ts
// request
BulkDeleteDto = { ids: string[] }
// response
BulkDeleteResponseDto = { deleted: number; failed: BulkDeleteFailureDto[]; message: string }
BulkDeleteFailureDto = { id: string; reason: string }
```

The money-tracker app currently supports single-item deletion only. `DeleteTransactionDialog` and `DeleteCategoryDialog` accept a single entity, call a per-id server action, and revalidate cache tags. Lists (`TransactionList`, `RecurringTransactionList`, `CategoryTree`) have no notion of selection. The category delete path does not warn users about subcategories; the single-id endpoint rejects parents that still have children, causing confusing failures.

Existing conventions this design must honor (from CLAUDE.md and `.claude/rules/`):

- API services live in `packages/shared/src/api/services/`, one class per resource. Service instances are created in `packages/next-shared/src/api/server-api.ts` — no central registry.
- Read actions are plain async; mutations are `'use server'` functions using `server-api.ts` instances.
- Server actions return `ServerActionResult<T>`.
- Mutations invalidate via `updateTag(CACHE_TAG.*)` (NOT `revalidateTag`).
- Never export types from `'use server'` files.
- Client components cannot hold server-fetched lists in `useState`; dialog/selection state is UI-only.
- Array variables must use the `list` suffix; constants are `UPPER_SNAKE_CASE`.
- All conditional classes use `cn()` from `@track-my-life/ui`.

## Goals / Non-Goals

**Goals:**

- Ship a single, typed `bulkDelete(ids: string[])` entry on each relevant API service so callers never hand-roll fetch requests.
- Let users multi-select rows in the transactions and recurring-transactions lists and delete them in one server round-trip.
- Turn "delete a parent category" into an informed cascade that reuses the bulk endpoint instead of surfacing a 409/422 from the single-id endpoint.
- Surface partial failures from `BulkDeleteResponseDto` (e.g. "2 deleted, 1 failed") so users aren't misled when the backend rejects some ids.
- Preserve RSC data flow: after a bulk delete, rely on `updateTag` + server re-render; don't mutate client lists.

**Non-Goals:**

- Bulk edit, bulk move between categories, or any non-destructive batch operation.
- Budget bulk delete UI — the budgets page is still a placeholder; we expose the service/action but wire no UI yet. (Out of scope; can land when budgets ship.)
- Backend-side behavioral changes (transaction counts per category, soft-delete, etc.) — all contract is fixed by the generated OpenAPI types.
- Undo / toast-based restore.
- Keyboard shortcuts or shift-click range selection (nice-to-have for a follow-up).

## Decisions

### 1. One `bulkDelete` method per service, not a shared generic helper

Each service (`TransactionApiService`, `CategoryApiService`, `RecurringTransactionApiService`) gets its own `bulkDelete(idList: string[])` typed against that resource's `*ControllerBulkDeleteResponses[200]`. The URL (`${BASE_URL}/batch`) and method (`POST`) stay colocated with the rest of the resource's methods. The hand-written parameter is named `idList` (honoring the `list` suffix rule); the method maps it onto the generator-owned `BulkDeleteDto` field `ids` at the boundary (`body: { ids: idList }`).

- **Why:** Matches the existing one-service-per-resource pattern and keeps each service self-documenting. A generic `batchDelete<T>(url, ids)` would hide the per-resource response type under `unknown`/assertions and violate the memory note that there's no central API registry.
- **Alternative considered:** A shared mixin/base helper on `ApiClient`. Rejected — saves ~4 lines per service at the cost of less precise types and an odd coupling between `ApiClient` and specific endpoint paths.
- **Empty-list policy:** The service does NOT short-circuit. If callers pass `[]`, the request is issued and the backend decides. The server action owns the authoritative empty-list guard (`.min(1)`), so there is only one place to reason about "nothing to delete".

### 2. Server actions return a narrow `BulkDeleteResult` projection, not the raw DTO

Actions return `ServerActionResult<BulkDeleteResult>` where `BulkDeleteResult` is defined as:

```ts
interface BulkDeleteResult {
  deletedCount: number;
  failureList: Array<{ id: string; reason: string }>;
}
```

The projection lives in a non-`'use server'` sibling `types.ts` co-located with each action and is imported from there by the confirm dialogs.

- **Why:** The raw `BulkDeleteResponseDto` carries a `message: string` that is server-localised English and must never reach the UI directly (we render Ukrainian too). The projection strips `message` at the boundary so there is no temptation to `toast(response.message)`. It also insulates client code from future additive fields on the DTO (e.g. `auditId`, `warningList`), honors the `list` suffix convention (`failureList`), and remains a minimal value-only interface per the "prefer interfaces over types" rule.
- **`failureList[].reason` handling:** `reason` is a raw backend error string and can also be English-only. UI specs REQUIRE that `reason` be rendered as supplementary technical detail (e.g. monospace or under a "Details" disclosure), never as the sole user-facing error. The primary error copy is always an i18n-composed phrase built from `failureList.length` + entity context.
- **Alternative considered:** Return raw `BulkDeleteResponseDto`. Rejected — leaks `message` to the toast layer and couples every client mutation to the generated DTO.
- **Alternative considered:** Throw on any failure. Rejected — partial success is a valid backend outcome and collapsing it to "failure" would make users retry items that already succeeded.

### 3. Selection state lives in the page-content client component, not the list

`TransactionsPageContent` and `RecurringTransactionsPageContent` (the client components already owning `deletingTransaction` state and rendering inside the Suspense boundary) get a `useState<Set<string>>` for `selectedIdSet`. They pass `selectedIdSet: ReadonlySet<string>` and `onToggleSelection: (id: string) => void` down to `TransactionList` / `RecurringTransactionList`, which become dumb about ownership — they render checkboxes bound to the props.

The list components never mirror server-fetched data into `useState`.

- **Why:** The `<Suspense key={JSON.stringify(filters)}>` boundary wraps the page-content subtree. When filters change, `TransactionsPageContent` unmounts and re-creates fresh, naturally resetting selection. Placing `selectedIdSet` inside `TransactionList` would force prop-drilling outward so the action bar and dialog — which both live at the page-content level — can read it, and would require imperative handles to clear selection from the parent after a successful delete.
- **Dialog owns the post-submit mutation.** On success the dialog calls `setSelectedIdSet(new Set())`; on partial failure it calls `setSelectedIdSet(new Set(failedIdList))`. No `useEffect` reconciles `selectedIdSet` against `transactionList` — stale ids in the Set are harmless because checkboxes are only rendered for visible rows, and introducing a reconciling effect creates a race with the dialog's explicit mutation.
- **Alternative considered:** Storing selection in URL search params. Rejected — selection is ephemeral, would pollute history, and Set-in-URL serialization is ugly.
- **Alternative considered:** Dual-mechanism (dialog mutation + `useEffect` pruning). Rejected — ambiguous source of truth, documented in the architect review as a real race on partial-failure retry flows.

### 4. Subcategory cascade uses two sequential bulk-delete requests

When the user clicks delete on a category, the existing dialog checks whether `categoryList` contains any entry whose `parentCategoryId === category.id`. If yes, the dialog swaps to "cascade" mode: it lists the affected subcategory names and the confirm button issues **two sequential** bulk-delete requests:

1. `bulkDeleteCategory(subcategoryList.map((c) => c.id))` — delete the children first.
2. Only if request 1 returns `{ ok: true, failureList: [] }`, issue `bulkDeleteCategory([category.id])` — delete the parent.

If no subcategories, the dialog keeps today's single-delete path.

- **Why two round-trips.** Confirmed backend behavior: `bulkSoftDelete` scans the full submitted id set for parent-with-children conflicts and rejects the parent when any of its children are also in the same batch with `"Category has active children"`. The backend does **not** honor array order, does not use deferred FK constraints, and does not topologically sort. A single-request `[...childIdList, parent.id]` would always fail for the parent. Two round-trips are the only approach that works.
- **Why sequential (not concurrent).** Request 2 MUST NOT be issued if request 1 had any failures — a failed child means the parent still has live children and its delete would also be rejected. Failing fast on the children gives the user a single, clear error.
- **Why users expect this.** The delete affordance on the row is the right entry point; a dedicated "cascade" screen would force navigation for what is, from the user's mental model, still "delete this thing".
- **Alternative considered:** Orphan subcategories (set `parentCategoryId: null` then delete parent). Rejected — different product decision, and the backend also blocks deleting a category with active transactions, so orphaning wouldn't even fix the common failure mode.
- **Alternative considered:** Single-request with array ordering. Rejected — backend behavior confirmed not to support it.
- **Specialised failure path — "has active transactions".** The same backend service rejects any category (child or parent) whose row still has associated transactions, with a `reason` like `"Category has active transactions"`. This can surface in either request. The dialog SHALL translate those failures to a user-friendly i18n message ("This category still has transactions. Move or delete them first.") rather than render the raw reason. Spec scenarios in `category-cascade-delete-ui` cover both request-1 (child) and request-2 (parent) occurrences.

### 5. Action bar component is shared; delete dialog is per-resource

A new `BulkDeleteActionBar` (sticky footer-style, shows count + "Delete selected" + "Cancel") lives in `apps/money-tracker/src/components/bulk-delete-action-bar/` because it's generic across transaction and recurring-transaction lists. The confirm dialog stays resource-specific (`BulkDeleteTransactionDialog`, `BulkDeleteRecurringTransactionDialog`) because the copy and the result-rendering differ slightly per resource.

- **Why:** The app-level components directory is the right home for "shared across features in one app but too coupled to factor into `packages/ui`" (per CLAUDE.md decision table). Dialogs hold copy/i18n that's resource-specific, so factoring them into `packages/ui` would force prop-drilling every translated string.

### 6. Cache invalidation mirrors the existing single-delete choices

Bulk transaction delete calls the existing `revalidateTransactionCaches()` helper (invalidates `TRANSACTIONS` and `ANALYTICS`). Bulk recurring-transaction delete calls `updateTag(CACHE_TAG.RECURRING_TRANSACTIONS)` — matching `deleteRecurringTransaction`, which also does not touch `TRANSACTIONS`/`ANALYTICS` because already-materialised past occurrences remain. Bulk category delete calls `updateTag(CACHE_TAG.CATEGORIES)` **only** — matching today's single-`deleteCategory` behavior.

- **`bulkDeleteCategory` does NOT invalidate `TRANSACTIONS`/`ANALYTICS`.** Confirmed backend behavior: the service rejects deleting any category that still has associated transactions, so a successful bulk delete cannot remove transaction rows. The DB-level FK `ON DELETE CASCADE` is never reached because the app-level guard runs first. Invalidating `TRANSACTIONS`/`ANALYTICS` on every successful category delete would needlessly bust the 5-minute analytics cache.
- **Why:** We already lose granularity at the tag level for single deletes, so there's no benefit to per-id invalidation. Reusing the exported helper keeps the one place you'd touch to add tags in sync.
- **Order of `updateTag` calls has no semantic meaning;** specs do not mandate any particular ordering.

### 7. Request-body validation and positional signature

Server actions take a single positional `idList: string[]` argument (matching the existing `deleteTransaction(id: string)` style — no object wrapper), validated with:

```ts
z.array(entityIdSchema).min(1).max(100).safeParse(idList);
```

- **Why positional:** Mirrors the existing single-delete pattern (`deleteTransaction(id: string)`, `deleteCategory(id: string)`). The mutation has exactly one input, so an object wrapper adds ceremony without value.
- **Why `.min(1)`:** Prevents an empty request from reaching the network and gives the UI a clean `validationFailed` branch. This is the only layer that guards empty input — the service sends whatever it's given (see decision 1).
- **Why `.max(100)`:** Conservative bound; confirmed below as a required pre-merge check against the backend's actual limit. The UI enforces the same cap so users never hit this from normal selection.
- **Feedback:** Failures return `{ ok: false, error: 'validationFailed' }` via `ServerActionResult`.

### 8. Concurrency contract during in-flight delete

While a bulk-delete request is in flight, the row checkboxes, the "Select all" toggle, and the "Clear selection" button SHALL be disabled. Only the dialog's Cancel button remains interactive (and it does NOT cancel the already-submitted request — it simply closes the dialog while the server runs). The `idList` captured at submit time is the authoritative set for both the request and the post-response prune; subsequent user toggles of `selectedIdSet` cannot alter it.

- **Why:** Without this, a user can toggle additional rows in while the server is processing, and a partial-failure response would then call `setSelectedIdSet(new Set(failedIdList))` and erase the user's new toggles. Freezing interaction removes the race.
- **Visual cue:** the action bar shows a small spinner while submitting. The row checkboxes render with their `disabled` prop set, preserving their current checked/unchecked state.

## Risks / Trade-offs

- **Partial-failure UX is new territory.** Users may not understand why "3 deleted, 1 failed" happened. → Mitigation: the dialog shows an i18n-composed summary ("3 deleted, 1 failed") as primary copy, and renders `failureList[].reason` only as supplementary technical detail (small type, under a disclosure, or monospace). Unremoved ids stay selected so the user can retry.
- **Locale leakage.** `BulkDeleteResponseDto.message` and `BulkDeleteFailureDto.reason` are server-side English. → Mitigation: the server-action boundary returns `BulkDeleteResult` which drops `message` entirely; the UI never renders `message`, and renders `reason` only as secondary detail.
- **Cascade delete is irreversible and can wipe many transactions.** → Mitigation: the dialog explicitly lists subcategory names. Copy uses destructive language and the confirm button is `variant="destructive"`.
- **Selection drift across filter/pagination changes.** When the user changes filters the Suspense boundary unmounts, taking `TransactionsPageContent` with it. → Mitigation: by keeping `selectedIdSet` inside the page-content subtree, re-mount resets it automatically. No manual code path.
- **Bundle impact of checkboxes.** Adding per-row checkboxes flips list rows into a slightly more interactive mode. → Mitigation: `@track-my-life/ui` already exports `Checkbox`; no new dependency. Page size should stay ≤ 100 — verify `parseTransactionSearchParams` caps it.
- **Backend id ordering for category cascade.** The backend may not honor array order for FK-dependent deletes. → Mitigation: resolved as a blocker (see Open Questions); if ordering is not guaranteed, implementation uses the two-round-trip fallback described in decision 4.
- **Over-cap selection.** If the user select-alls a list larger than 100, `.max(100)` would reject the request with a generic `validationFailed`. → Mitigation: the UI caps the "Select all" toggle at 100 and surfaces this limit in the action bar label or a toast. The server-side guard remains as defense-in-depth.

## Migration Plan

This is additive — no existing single-item delete is removed. Rollout:

1. Regenerate API types and extend services in `packages/shared` (no consumers break; new methods are unused).
2. Add server actions and bulk-delete UI behind the existing lists. Single-delete flows remain.
3. Ship. If issues appear, revert the list/dialog changes; services and actions can stay dormant.

No DB migration, no feature flag.

## Confirmed backend behavior (context for the decisions above)

Pre-implementation review of the backend code resolved three questions that shape the design:

1. **Category cascade ordering — no ordering guarantee.** `bulkSoftDelete` inspects the full submitted id set via `hasChildrenSet` and rejects any parent whose children also appear in the same batch with `reason: "Category has active children"`. No topological sort, no array-order honoring, no deferred FK constraints. **Implication:** decision 4 mandates two sequential round-trips.
2. **Category delete does NOT cascade to transactions at the application level.** The service blocks deletion with `hasTransactions` before the DB-level `ON DELETE CASCADE` FK is ever reached. A successful category bulk-delete cannot remove transaction rows. **Implication:** decision 6 invalidates only `CATEGORIES`.
3. **`BulkDeleteDto.ids` max size is 100** (`@ArrayMaxSize(100)`). **Implication:** our client-side `z.array(...).max(100)` and the UI's 100-item selection cap match the server exactly.

## Open Questions

- Should the cascade delete dialog also show the number of transactions that would block each category? The current `/api/transaction-categories` list response doesn't include a per-category transaction count; we can either leave it out or fetch counts on demand. Leaning: leave out for v1, add when the analytics API surfaces it cheaply.
- Do we need an audit-log entry per id or one per batch? Not user-visible — parking.
- Client telemetry (Sentry breadcrumb) for bulk-delete events. High-leverage destructive action worth instrumenting, but out of scope for this change.
