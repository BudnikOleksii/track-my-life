## ADDED Requirements

### Requirement: Delete transaction confirmation

The system SHALL show a confirmation dialog before deleting a transaction.

#### Scenario: Initiate delete

- **WHEN** the user clicks the delete action on a transaction
- **THEN** an AlertDialog SHALL appear asking "Are you sure you want to delete this transaction?" with Cancel and Delete buttons

#### Scenario: Confirm delete

- **WHEN** the user clicks "Delete" in the confirmation dialog
- **THEN** the system SHALL call the delete server action, close the dialog, remove the transaction from the list, and show a success toast

#### Scenario: Cancel delete

- **WHEN** the user clicks "Cancel" in the confirmation dialog
- **THEN** the dialog SHALL close without deleting the transaction

### Requirement: Delete error handling

The system SHALL handle delete failures gracefully.

#### Scenario: Delete API error

- **WHEN** the delete server action returns null (API error)
- **THEN** the dialog SHALL close and a toast notification SHALL display an error message
