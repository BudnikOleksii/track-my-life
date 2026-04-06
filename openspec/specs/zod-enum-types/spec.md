## ADDED Requirements

### Requirement: Zod enum as single source of truth for TransactionType

The system SHALL define `transactionTypeSchema` as a `z.enum(['INCOME', 'EXPENSE'])` in `apps/money-tracker/src/constants/transaction.ts`. The runtime constant `TRANSACTION_TYPE` SHALL be derived from `transactionTypeSchema.enum`. The TypeScript type `TransactionType` used within the app SHALL be derived via `z.infer<typeof transactionTypeSchema>`.

#### Scenario: TransactionType constant object matches Zod enum

- **WHEN** `TRANSACTION_TYPE` is accessed
- **THEN** it SHALL equal `{ INCOME: 'INCOME', EXPENSE: 'EXPENSE' }` as provided by `transactionTypeSchema.enum`

#### Scenario: Form schemas import from Zod enum

- **WHEN** transaction form schema or category form schema defines the `type` field
- **THEN** it SHALL use `transactionTypeSchema` directly (e.g., `type: transactionTypeSchema`) instead of referencing `TRANSACTION_TYPE` constant values inline

### Requirement: Zod enum as single source of truth for FilterValue

The system SHALL define `filterValueSchema` as a `z.enum(['ALL', 'INCOME', 'EXPENSE'])` in `apps/money-tracker/src/constants/transaction.ts`. The `FILTER_OPTION_LIST` constant SHALL be derived from `filterValueSchema.options`. The `FilterValue` type SHALL be derived via `z.infer<typeof filterValueSchema>`.

#### Scenario: FilterValue list derived from schema

- **WHEN** `FILTER_OPTION_LIST` is accessed
- **THEN** it SHALL contain exactly `['ALL', 'INCOME', 'EXPENSE']` as derived from `filterValueSchema.options`

#### Scenario: Adding a new filter value

- **WHEN** a developer adds a new filter value
- **THEN** they SHALL only modify the `filterValueSchema` definition, and the type and constant list SHALL update automatically
