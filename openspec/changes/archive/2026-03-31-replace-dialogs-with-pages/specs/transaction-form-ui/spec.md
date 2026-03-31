## REMOVED Requirements

### Requirement: Transaction form dialog

**Reason**: Modal form dialog replaced by dedicated create/edit pages at `/transactions/create` and `/transactions/[id]/edit` for better mobile usability
**Migration**: Transaction creation and editing now happen on separate page routes. The `TransactionForm` dialog component, `useTransactionForm` hook, and `useTransactionDialogs` hook are removed. Form fields, validation, and server actions are preserved in the new page components.
