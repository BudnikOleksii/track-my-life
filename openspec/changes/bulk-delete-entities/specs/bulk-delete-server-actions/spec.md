## ADDED Requirements

### Requirement: `BulkDeleteResult` projection defined alongside each action

Each bulk-delete action's directory SHALL contain a sibling `types.ts` (NOT `'use server'`) that declares a `BulkDeleteResult` interface used as the generic parameter of `ServerActionResult`:

```ts
export interface BulkDeleteResult {
  deletedCount: number;
  failureList: Array<{ id: string; reason: string }>;
}
```

The projection SHALL NOT include the raw `BulkDeleteResponseDto.message` field. The action SHALL construct `BulkDeleteResult` from the backend response: `deletedCount = response.deleted`, `failureList = response.failed.map(({ id, reason }) => ({ id, reason }))`.

#### Scenario: `message` is dropped at the boundary

- **WHEN** the backend returns `{ deleted: 2, failed: [], message: 'OK' }`
- **THEN** the server action SHALL return `{ ok: true, data: { deletedCount: 2, failureList: [] } }` — the `message` field SHALL NOT appear in the action's return value

#### Scenario: `failed` entries are shape-copied

- **WHEN** the backend returns `{ deleted: 1, failed: [{ id: 'x', reason: 'in use' }], message: '...' }`
- **THEN** the action SHALL return `failureList: [{ id: 'x', reason: 'in use' }]`

### Requirement: `bulkDeleteTransaction` server action

The system SHALL provide a `bulkDeleteTransaction` server action at `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/actions/bulk-delete-transaction.ts` with the positional signature `bulkDeleteTransaction(idList: string[])`. The action SHALL validate `idList` with `z.array(entityIdSchema).min(1).max(100)`, call `redirectUnauthorized()`, invoke `transactionApiService.bulkDelete(idList)`, run `revalidateTransactionCaches()` when at least one delete succeeds, and return `ServerActionResult<BulkDeleteResult>`.

#### Scenario: Successful bulk delete

- **WHEN** `bulkDeleteTransaction(['id-1', 'id-2'])` is called by an authenticated user and the backend returns `{ deleted: 2, failed: [], message: '...' }`
- **THEN** the action SHALL invoke `revalidateTransactionCaches()` and return `{ ok: true, data: { deletedCount: 2, failureList: [] } }`

#### Scenario: Unauthorized user

- **WHEN** the action is called without a valid session
- **THEN** `redirectUnauthorized()` SHALL redirect the request; the bulk-delete API SHALL NOT be invoked

#### Scenario: Empty id list

- **WHEN** the action is called with `[]`
- **THEN** Zod validation SHALL fail (`.min(1)` violated) and the action SHALL return `{ ok: false, error: 'validationFailed' }` without calling the API

#### Scenario: Invalid id in list

- **WHEN** any id in the list fails `entityIdSchema` validation
- **THEN** the action SHALL return `{ ok: false, error: 'validationFailed' }` without calling the API

#### Scenario: Over-cap id list

- **WHEN** the action is called with more than 100 ids
- **THEN** Zod validation SHALL fail (`.max(100)` violated) and the action SHALL return `{ ok: false, error: 'validationFailed' }` without calling the API

#### Scenario: Partial backend failure

- **WHEN** the backend returns `{ deleted: 1, failed: [{ id: 'id-2', reason: '...' }], message: '...' }`
- **THEN** the action SHALL call `revalidateTransactionCaches()` (because at least one record was deleted) and return `{ ok: true, data: { deletedCount: 1, failureList: [{ id: 'id-2', reason: '...' }] } }`

#### Scenario: Total backend failure

- **WHEN** the backend returns `{ deleted: 0, failed: [{ id: 'id-1', reason: '...' }, { id: 'id-2', reason: '...' }], message: '...' }`
- **THEN** the action SHALL NOT call `revalidateTransactionCaches()` (no records were deleted) and return `{ ok: true, data: { deletedCount: 0, failureList: [...] } }`

### Requirement: `bulkDeleteCategory` server action

The system SHALL provide a `bulkDeleteCategory` server action at `apps/money-tracker/src/app/[locale]/(app-layout)/categories/actions/bulk-delete-category.ts` with the positional signature `bulkDeleteCategory(idList: string[])`. The action SHALL validate `idList` with `z.array(entityIdSchema).min(1).max(100)`, call `redirectUnauthorized()`, invoke `categoryApiService.bulkDelete(idList)`, and when at least one id succeeds (`deletedCount > 0`) call `updateTag(CACHE_TAG.CATEGORIES)` exactly once. It SHALL NOT invalidate `CACHE_TAG.TRANSACTIONS` or `CACHE_TAG.ANALYTICS` — confirmed backend behavior rejects deleting any category with associated transactions (`hasTransactions` guard), so a successful delete cannot remove transaction rows. The action SHALL return `ServerActionResult<BulkDeleteResult>`.

#### Scenario: Successful bulk delete

- **WHEN** `bulkDeleteCategory(['cat-1', 'cat-2'])` is called and the backend returns `{ deleted: 2, failed: [], ... }`
- **THEN** the action SHALL call `updateTag(CACHE_TAG.CATEGORIES)` exactly once, SHALL NOT call `updateTag(CACHE_TAG.TRANSACTIONS)` or `updateTag(CACHE_TAG.ANALYTICS)`, and return `{ ok: true, data: { deletedCount: 2, failureList: [] } }`

#### Scenario: Parity with single-delete cache scope

- **WHEN** comparing the cache tags invalidated by `bulkDeleteCategory` against those invalidated by the pre-existing `deleteCategory` action
- **THEN** the set SHALL be identical (only `CATEGORIES`)

#### Scenario: Empty or invalid id list

- **WHEN** the action is called with `[]` or any id that does not satisfy `entityIdSchema`
- **THEN** the action SHALL return `{ ok: false, error: 'validationFailed' }` without calling the API

### Requirement: `bulkDeleteRecurringTransaction` server action

The system SHALL provide a `bulkDeleteRecurringTransaction` server action at `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/actions/bulk-delete-recurring-transaction.ts` with the positional signature `bulkDeleteRecurringTransaction(idList: string[])`. The action SHALL validate `idList`, call `redirectUnauthorized()`, invoke `recurringTransactionApiService.bulkDelete(idList)`, and when at least one id succeeds call `updateTag(CACHE_TAG.RECURRING_TRANSACTIONS)`. It SHALL NOT invalidate `CACHE_TAG.TRANSACTIONS` or `CACHE_TAG.ANALYTICS` — this matches the existing single-`deleteRecurringTransaction` action and reflects that already-materialised past occurrences are not deleted when a recurring rule is removed. The action SHALL return `ServerActionResult<BulkDeleteResult>`.

#### Scenario: Successful bulk delete of recurring transactions

- **WHEN** `bulkDeleteRecurringTransaction(['r-1', 'r-2'])` is called and the backend succeeds
- **THEN** the action SHALL call `updateTag(CACHE_TAG.RECURRING_TRANSACTIONS)` exactly once, SHALL NOT invalidate `TRANSACTIONS` or `ANALYTICS`, and return `{ ok: true, data: { deletedCount: 2, failureList: [] } }`

#### Scenario: Parity with single-delete cache scope

- **WHEN** comparing the cache tags invalidated by `bulkDeleteRecurringTransaction` against those invalidated by the pre-existing `deleteRecurringTransaction` action
- **THEN** the set SHALL be identical (only `RECURRING_TRANSACTIONS`)

### Requirement: No top-level exports other than the action function

Each bulk-delete action file SHALL contain exactly one top-level `export`: the `'use server'`-marked async function. The file SHALL NOT contain `export type`, `export interface`, `export { type Foo }`, `export const`, or re-exports of any kind beyond the action itself.

This is stricter than a general "no type re-exports" rule because `'use server'` files are RPC boundaries where any non-function export can cause a runtime `ReferenceError`.

#### Scenario: Greppable invariant

- **WHEN** a reviewer greps `^export` in the three bulk-delete action files
- **THEN** the only matches SHALL be `export const bulkDeleteTransaction = ...`, `export const bulkDeleteCategory = ...`, and `export const bulkDeleteRecurringTransaction = ...`

#### Scenario: Type consumers import from the sibling `types.ts`

- **WHEN** a client component needs the `BulkDeleteResult` type
- **THEN** it SHALL import the type from the action's sibling `types.ts`, NOT from the action file itself, and NOT from `@track-my-life/shared/src/api/generated/types.gen` (which describes the transport shape, not the action's projection)
