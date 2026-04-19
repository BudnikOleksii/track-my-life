## ADDED Requirements

This capability EXTENDS the existing `category-crud` and `category-settings-ui` capabilities. Their delete-related requirements continue to apply for leaf categories; this spec describes the cascade path for parent categories with subcategories.

Confirmed backend behavior shapes this capability:

- The batch endpoint rejects a parent whose children are also in the same submitted id set with `"Category has active children"`. It does not honor array order, does not use deferred FK constraints, and does not topologically sort. A two-round-trip flow (children first, then parent) is mandated.
- The batch endpoint also rejects any category that still has associated transactions with `"Category has active transactions"` (an app-level guard that runs before any DB-level FK cascade).

### Requirement: Detect subcategories on delete intent

The system SHALL, when the user activates the delete affordance on a category row in `CategoryTree`, derive a `subcategoryList: CategoryResponseDto[]` from the already-built `childrenMap` and pass it through the `onDelete` callback (or via a prop on `DeleteCategoryDialog`) so the dialog can render the appropriate mode.

#### Scenario: Leaf category (no subcategories)

- **WHEN** the user clicks delete on a category whose id does not appear as a `parentCategoryId` on any other entry
- **THEN** `DeleteCategoryDialog` SHALL render in single-delete mode and continue to use the existing `deleteCategory(id)` server action

#### Scenario: Parent category with subcategories

- **WHEN** the user clicks delete on a category that IS referenced as `parentCategoryId` by one or more other categories
- **THEN** `DeleteCategoryDialog` SHALL render in cascade mode (see below)

### Requirement: Cascade-mode confirmation dialog

The system SHALL, in cascade mode, render `DeleteCategoryDialog` with:

- A heading indicating a cascade delete is about to happen (translation key `categoriesPage.content.cascadeDeleteTitle`).
- A bulleted list of the affected subcategory names so users see exactly what will be removed.
- A destructive confirm button labelled with the count (translation key with ICU plural: `categoriesPage.content.cascadeDeleteConfirm`).
- A confirm handler that issues two sequential bulk-delete requests (see next requirement).

#### Scenario: Dialog renders in cascade mode when subcategories exist

- **WHEN** `DeleteCategoryDialog` is rendered with `subcategoryList.length > 0`
- **THEN** the dialog SHALL display the `cascadeDeleteTitle` heading, render each subcategory name as a bulleted list item, and render the confirm button with `cascadeDeleteConfirm` copy parameterised by `subcategoryList.length + 1`

### Requirement: Two-round-trip cascade flow

The system SHALL, on confirm in cascade mode, issue exactly two sequential bulk-delete requests:

1. **Request 1 — children:** `bulkDeleteCategory(subcategoryList.map((c) => c.id))`.
2. **Request 2 — parent:** issued only if request 1 returned `{ ok: true, data: { failureList: [] } }`. Call `bulkDeleteCategory([category.id])`.

If request 1 returns any failures (`failureList.length > 0`) or an `ok: false` error, request 2 SHALL NOT be issued; request 1's failure state is surfaced to the user and the dialog remains open.

#### Scenario: Full cascade success

- **WHEN** request 1 returns `{ ok: true, data: { deletedCount: N, failureList: [] } }` where N equals `subcategoryList.length`, and request 2 returns `{ ok: true, data: { deletedCount: 1, failureList: [] } }`
- **THEN** the dialog SHALL close, a success toast SHALL state the total number of categories removed (N + 1) via i18n-composed copy, and the category tree SHALL re-render via `updateTag(CACHE_TAG.CATEGORIES)` without the deleted entries

#### Scenario: Child request fails — one or more children have active transactions

- **WHEN** request 1 returns a `failureList` containing any entry whose `reason` is "active transactions"-shaped (matches the confirmed backend string `"Category has active transactions"` or equivalent)
- **THEN** request 2 SHALL NOT be issued
- **AND** the dialog SHALL remain open showing the i18n copy `cascadeChildHasTransactions` (e.g. "These subcategories still have transactions. Move or delete the transactions first.") with the affected subcategory names inline
- **AND** the raw `reason` strings SHALL be available only as supplementary technical detail (monospace / disclosure), NOT as the primary phrase
- **AND** any children that DID succeed (from `deletedCount > 0`) SHALL be reflected in the success toast fragment ("N of M subcategories removed") but the operation as a whole SHALL be presented as incomplete

#### Scenario: Parent request fails — parent has active transactions

- **WHEN** request 1 succeeds fully but request 2 returns `{ ok: true, data: { deletedCount: 0, failureList: [{ id: category.id, reason: <active-transactions-shaped> }] } }`
- **THEN** the dialog SHALL render the i18n copy `cascadeParentStillReferenced` ("This category still has transactions. Move or delete them first.") — NOT the raw `reason`
- **AND** the dialog SHALL remain open
- **AND** the success of request 1 SHALL be acknowledged ("N subcategories removed; the parent still has transactions")

#### Scenario: Unexpected request 2 failure

- **WHEN** request 1 succeeds fully and request 2 returns any other non-empty `failureList` or `ok: false`
- **THEN** the dialog SHALL render a generic destructive toast with the translated error key, SHALL remain open, and SHALL acknowledge request 1's success in the dialog body

#### Scenario: Either request returns `ok: false`

- **WHEN** `bulkDeleteCategory` returns `{ ok: false, error }` for either request
- **THEN** the dialog SHALL show a destructive toast with the translated error key and SHALL remain open; if the failure was on request 2, the dialog body SHALL also mention that the subcategories were successfully removed

### Requirement: Never render `BulkDeleteResponseDto.message` or raw `reason` as primary copy

The dialog SHALL NOT render `BulkDeleteResponseDto.message` at all. The dialog SHALL NOT render `failureList[].reason` as the primary user-facing error phrase — `reason` is server-localised English. All primary phrasing SHALL be composed from the i18n keys listed in tasks.md §7.6.

#### Scenario: No leakage of backend strings to toasts

- **WHEN** any toast is displayed from either cascade request
- **THEN** the toast content SHALL be derived entirely from i18n keys parameterised with `deletedCount`, `failureList.length`, and/or category names — NOT from `message` or `reason`

### Requirement: Single-delete and cascade paths share one confirmation entry point

The system SHALL continue to expose a single delete affordance per row in `CategoryTree`. The decision between single-delete and cascade-delete SHALL happen inside `DeleteCategoryDialog` based on its props; no separate button, menu entry, or URL is required.

#### Scenario: Same row button, different dialog content

- **WHEN** the user clicks delete on either a leaf or a parent category
- **THEN** the row SHALL invoke the same `onDelete(category)` handler exposed by `CategoryTree`, and the dialog SHALL select its own rendering mode based on `subcategoryList`

### Requirement: Onboarding category step is unaffected

The system SHALL NOT apply cascade-delete UI to the onboarding categories step. The onboarding flow works on an in-memory, not-yet-persisted list; bulk-delete server actions SHALL NOT be invoked from onboarding. Cascade UI and `bulkDeleteCategory` SHALL only be reachable from the authenticated `categories` route.

#### Scenario: Onboarding deletions stay local

- **WHEN** the user removes a category inside the onboarding wizard
- **THEN** no server action SHALL be invoked, no `updateTag` SHALL fire, and no confirmation dialog from this change SHALL appear
