## ADDED Requirements

This capability EXTENDS the existing `recurring-transaction-list-ui` capability by adding selection affordances. The concurrency, cap, and i18n rules in `transaction-bulk-delete-ui` apply here by analogy; scenarios below only state behaviors that differ or must be asserted for this resource specifically.

### Requirement: Selection state lives in `RecurringTransactionsPageContent`

The system SHALL place `selectedIdSet: Set<string>` inside `RecurringTransactionsPageContent` (the client component that already renders inside the Suspense boundary keyed on searchParams). `RecurringTransactionList` SHALL receive `selectedIdSet: ReadonlySet<string>`, `onToggleSelection: (id: string) => void`, and `isBulkDeleteSubmitting: boolean` as props. No `useEffect` SHALL reconcile the set against the list.

#### Scenario: Filter change resets selection via Suspense unmount

- **WHEN** the user changes the status filter or any other searchParam-derived input
- **THEN** `RecurringTransactionsPageContent` SHALL unmount and remount; `selectedIdSet` SHALL be empty on the next render

### Requirement: Per-row selection in the recurring transaction list

The system SHALL render a `Checkbox` (from `@track-my-life/ui`) next to each row in `RecurringTransactionList`, keyboard-operable and labelled for screen readers, bound to `selectedIdSet.has(recurringTransaction.id)`.

#### Scenario: Toggling selection

- **WHEN** the user activates the checkbox on a row
- **THEN** `onToggleSelection(recurringTransaction.id)` SHALL be called and the parent SHALL toggle the id in `selectedIdSet`

#### Scenario: Selection cap of 100

- **WHEN** the user attempts to select more items than would fit under the 100-item cap
- **THEN** the UI SHALL cap `selectedIdSet.size` at 100 and surface a non-blocking notice

### Requirement: Sticky bulk-delete action bar for recurring transactions

The system SHALL render the shared `BulkDeleteActionBar` whenever `selectedIdSet.size > 0` on the recurring-transactions view, showing the selection count and a destructive "Delete selected" button. The bar SHALL be keyboard-focusable with `role="region"` and an `aria-label` describing the count.

#### Scenario: Hidden with no selection

- **WHEN** `selectedIdSet.size === 0`
- **THEN** the action bar SHALL NOT be rendered

### Requirement: Concurrency contract during in-flight bulk delete

While `isBulkDeleteSubmitting === true`, row checkboxes, the select-all control, and the clear-selection control SHALL be disabled. The `idList` captured at dialog confirm time SHALL be the sole input to the response handler.

#### Scenario: Toggles blocked during submit

- **WHEN** a bulk-delete request for recurring transactions is in flight
- **THEN** row checkboxes SHALL render `disabled` and `onToggleSelection` SHALL NOT fire for any interaction

### Requirement: Bulk-delete confirmation dialog for recurring transactions

The system SHALL open `BulkDeleteRecurringTransactionDialog` when the user activates "Delete selected". The dialog SHALL display the count, destructive confirm/cancel buttons, and handle the `BulkDeleteResult` return value identically to the transaction variant: success clears `selectedIdSet`; partial failure surfaces the failed ids with their `reason` as supplementary detail only and prunes `selectedIdSet` to the failed ids; total failure shows a destructive toast and leaves `selectedIdSet` unchanged; a server error shows a destructive toast with the translated error key. The dialog SHALL NOT render `BulkDeleteResponseDto.message`.

#### Scenario: Successful bulk delete

- **WHEN** the user confirms and `bulkDeleteRecurringTransaction` returns `{ ok: true, data: { deletedCount: N, failureList: [] } }` with `N > 0`
- **THEN** a success toast SHALL display an i18n-composed message based on `deletedCount`, the dialog SHALL close, and the dialog's success handler SHALL call `setSelectedIdSet(new Set())`

#### Scenario: Partial failure

- **WHEN** `0 < failureList.length < idList.length` in the response
- **THEN** the dialog SHALL show the failed ids with their reasons as supplementary detail (not as the primary error phrase) and `selectedIdSet` SHALL be pruned to only the failed ids

#### Scenario: Total failure

- **WHEN** `deletedCount === 0 && failureList.length === idList.length`
- **THEN** the dialog SHALL show a destructive toast indicating nothing was deleted and `selectedIdSet` SHALL remain the full attempted set

### Requirement: Pause/resume, edit, and single-delete affordances remain

The system SHALL preserve the existing per-row pause, resume, edit, and single-delete controls on the recurring-transaction list. Bulk-delete is additive.

#### Scenario: Row-level actions still function

- **WHEN** the user clicks pause, resume, edit, or the per-row delete icon
- **THEN** the corresponding existing action SHALL be invoked and SHALL NOT be blocked by the presence of `selectedIdSet`
