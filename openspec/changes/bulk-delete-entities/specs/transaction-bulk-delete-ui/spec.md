## ADDED Requirements

This capability EXTENDS the existing `transaction-list-ui` capability by adding selection affordances. The requirements in `transaction-list-ui` continue to apply unchanged; rows still render with amount, badge, category, description, and the existing copy/edit/delete controls.

### Requirement: Selection state lives in `TransactionsPageContent`

The system SHALL place the `selectedIdSet: Set<string>` state inside `TransactionsPageContent` (the client component that already owns `deletingTransaction` state and renders inside the Suspense boundary keyed on searchParams). `TransactionList` SHALL receive `selectedIdSet: ReadonlySet<string>`, `onToggleSelection: (id: string) => void`, and an `isBulkDeleteSubmitting: boolean` as props.

The `selectedIdSet` owner SHALL NOT be `TransactionList`. The list component SHALL NOT run a `useEffect` that reconciles selection against `transactionList` — dialog-driven mutation is the single source of truth for post-submit selection changes.

#### Scenario: Filter change resets selection via Suspense unmount

- **WHEN** the user changes a filter or search input that causes the `<Suspense>` boundary wrapping `TransactionListServer` to receive a new `key`
- **THEN** `TransactionsPageContent` SHALL unmount and remount fresh, `selectedIdSet` SHALL be empty on next render, and no explicit reset code path SHALL be required

#### Scenario: Mutation does NOT reconcile selection via effect

- **WHEN** a bulk delete completes and the server-rendered list re-renders with fewer rows
- **THEN** `selectedIdSet` SHALL only be mutated by the dialog's success/partial-failure handler; no `useEffect` in `TransactionList` or `TransactionsPageContent` SHALL prune it based on `transactionList` contents

### Requirement: Per-row selection in the transaction list

The system SHALL render a `Checkbox` (from `@track-my-life/ui`) next to each row in `TransactionList`. The checkbox SHALL be keyboard-operable, labelled for screen readers with the transaction's description or formatted amount, and bound to `selectedIdSet.has(transaction.id)`.

#### Scenario: Selecting a row

- **WHEN** the user activates the checkbox on a row whose id is not in `selectedIdSet`
- **THEN** `onToggleSelection(transaction.id)` SHALL be called, the parent SHALL add the id to `selectedIdSet`, and the row SHALL render with a visibly-selected state

#### Scenario: Deselecting a row

- **WHEN** the user activates an already-checked checkbox
- **THEN** `onToggleSelection(transaction.id)` SHALL be called and the parent SHALL remove the id from `selectedIdSet`

#### Scenario: Select-all visible affordance

- **WHEN** the user activates the "Select all visible" control in the action bar or column header
- **THEN** the ids of every currently-rendered transaction SHALL be added to `selectedIdSet` up to the cap of 100
- **AND** activating it again when all visible ids are already selected SHALL clear them from `selectedIdSet`

#### Scenario: Selection cap of 100

- **WHEN** the user attempts to select more items that would bring `selectedIdSet.size` above 100 (via select-all on a larger list, or individual selection)
- **THEN** the UI SHALL cap `selectedIdSet.size` at 100 and surface a non-blocking notice ("Max 100 items") via toast or action-bar copy; no additional ids SHALL be added beyond the cap

### Requirement: Sticky bulk-delete action bar

The system SHALL render a sticky action bar (via the shared `BulkDeleteActionBar` component) at the bottom of the transactions view (and the transactions-by-category view) whenever `selectedIdSet.size > 0`. The bar SHALL:

- Display the selection count as translated, plural-aware copy.
- Provide a destructive "Delete selected" button.
- Provide a "Clear selection" affordance.
- Be focusable via keyboard; have `role="region"` and an `aria-label` describing the selection count so screen readers announce it on mount.

#### Scenario: Action bar is hidden with no selection

- **WHEN** `selectedIdSet.size === 0`
- **THEN** the action bar SHALL NOT be rendered

#### Scenario: Selection count updates live

- **WHEN** the user toggles any row's checkbox
- **THEN** the action bar's count label SHALL re-render with the new `selectedIdSet.size` within the same render pass

### Requirement: Concurrency contract during in-flight bulk delete

The system SHALL disable interactive selection controls while a bulk-delete server action is in flight. Specifically, when `isBulkDeleteSubmitting === true`:

- Row checkboxes SHALL render with `disabled` set, preserving their current checked/unchecked state.
- The "Select all visible" and "Clear selection" controls SHALL be disabled.
- The action bar's "Delete selected" button SHALL remain disabled until the request resolves.
- The dialog's Cancel button remains active but ONLY closes the dialog locally; it SHALL NOT cancel the in-flight request.

The `idList` passed into the server action is captured at the moment the user confirms the dialog. That captured list SHALL be the sole input to the response handler, regardless of any subsequent `setSelectedIdSet` calls.

#### Scenario: Toggles blocked during submit

- **WHEN** the user has confirmed the bulk-delete dialog and the request has not yet resolved
- **THEN** clicking any row checkbox SHALL have no effect; `onToggleSelection` SHALL NOT fire

#### Scenario: Captured `idList` wins over post-submit toggles

- **WHEN** the user confirms the dialog with `['a', 'b', 'c']`, then somehow manages to add `'d'` to `selectedIdSet` before the response lands, and the server returns `failed: [{ id: 'b', reason: '...' }]`
- **THEN** the post-response handler SHALL call `setSelectedIdSet(new Set(['b']))` (from the captured failure list), erasing `'d'` — this is acceptable because row checkboxes were supposed to be disabled; test coverage SHALL verify the disabled state to prevent the race

### Requirement: Bulk-delete confirmation dialog for transactions

The system SHALL open `BulkDeleteTransactionDialog` when the user activates "Delete selected". The dialog SHALL display the count of transactions to delete, include destructive confirm and cancel buttons, and disable the confirm button while the server action is in flight. The dialog SHALL own all mutations of `selectedIdSet` that happen in response to the server's reply.

#### Scenario: Successful bulk delete

- **WHEN** the user confirms and `bulkDeleteTransaction` returns `{ ok: true, data: { deletedCount: N, failureList: [] } }` with `N > 0`
- **THEN** the dialog SHALL close, a success toast SHALL display an i18n-composed message based on `deletedCount`, and the dialog's success handler SHALL call `setSelectedIdSet(new Set())`

#### Scenario: Partial failure is surfaced

- **WHEN** the action returns `{ ok: true, data: { deletedCount: N, failureList: [...] } }` with `0 < failureList.length < idList.length` (some succeeded, some failed)
- **THEN** the dialog SHALL remain open (or transition to a result view) showing the failed ids
- **AND** a warning toast SHALL display an i18n-composed "N deleted, M failed" phrase built from `deletedCount` and `failureList.length` — the toast SHALL NOT render `BulkDeleteResponseDto.message`
- **AND** `failureList[].reason` SHALL be rendered ONLY as supplementary technical detail (small type, monospace, or under a "Details" disclosure) — it SHALL NOT be the sole user-facing error phrase
- **AND** the dialog's partial-failure handler SHALL call `setSelectedIdSet(new Set(failureList.map((f) => f.id)))` so the user can retry only the failed ids

#### Scenario: Total failure

- **WHEN** the action returns `{ ok: true, data: { deletedCount: 0, failureList: [...] } }` with `failureList.length === idList.length`
- **THEN** the dialog SHALL show a destructive (error-toned) toast indicating nothing was deleted, SHALL NOT show a "N deleted" success fragment, and `selectedIdSet` SHALL remain as the full set of attempted ids

#### Scenario: Validation / server error

- **WHEN** the action returns `{ ok: false, error }`
- **THEN** the dialog SHALL show a destructive toast with the translated error key (e.g. `validationFailed`, `unknownError`) and SHALL leave `selectedIdSet` unchanged

### Requirement: Existing single-row delete continues to work

The system SHALL preserve the per-row trash/delete button and the `DeleteTransactionDialog` single-entity flow in parallel with bulk delete.

#### Scenario: Single delete without selection

- **WHEN** `selectedIdSet.size === 0` and the user clicks the row's trash icon
- **THEN** `DeleteTransactionDialog` SHALL open for that single transaction and the bulk-delete action bar SHALL NOT appear

#### Scenario: Single delete with selection present

- **WHEN** `selectedIdSet.size > 0` and the user clicks the row's trash icon on a non-selected row
- **THEN** `DeleteTransactionDialog` SHALL open for that single transaction; `selectedIdSet` SHALL NOT be altered by the single-delete flow
