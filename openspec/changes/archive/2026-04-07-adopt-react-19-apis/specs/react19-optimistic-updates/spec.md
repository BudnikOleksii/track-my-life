## ADDED Requirements

### Requirement: Recurring transaction mutations show optimistic UI

Pause, resume, and delete mutations on recurring transactions SHALL use `useOptimistic` to reflect the expected state immediately, before the server action completes.

#### Scenario: Optimistic pause

- **WHEN** a user pauses an active recurring transaction
- **THEN** the UI SHALL immediately show the transaction as paused before the server responds

#### Scenario: Optimistic resume

- **WHEN** a user resumes a paused recurring transaction
- **THEN** the UI SHALL immediately show the transaction as active before the server responds

#### Scenario: Optimistic delete

- **WHEN** a user confirms deletion of a recurring transaction
- **THEN** the UI SHALL immediately remove the transaction from the list before the server responds

### Requirement: Optimistic state reverts on server action failure

If the server action fails after an optimistic update, the UI SHALL revert to the previous state and display an error notification.

#### Scenario: Failed pause reverts to active

- **WHEN** a pause server action fails
- **THEN** the UI SHALL revert the transaction to active state and show an error toast

#### Scenario: Failed delete restores item

- **WHEN** a delete server action fails
- **THEN** the UI SHALL restore the transaction in the list and show an error toast
