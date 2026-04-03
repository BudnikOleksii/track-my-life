## ADDED Requirements

### Requirement: Transaction form uses profile baseCurrencyCode

The transaction form server wrappers (create and edit pages) SHALL fetch the user's profile and pass `baseCurrencyCode` to the `TransactionFormPage` component as a prop. The form SHALL use this value as the fixed currency for the transaction.

#### Scenario: Create transaction page provides baseCurrencyCode

- **WHEN** the create transaction page server component renders
- **THEN** it SHALL fetch the user's profile (cached) alongside the category list and pass `baseCurrencyCode` to `TransactionFormPage`

#### Scenario: Edit transaction page provides baseCurrencyCode

- **WHEN** the edit transaction page server component renders
- **THEN** it SHALL fetch the user's profile (cached) alongside the transaction and category list, and pass `baseCurrencyCode` to `TransactionFormPage`

#### Scenario: Form defaults currency to baseCurrencyCode

- **WHEN** the transaction form renders for creating a new transaction
- **THEN** the `currencyCode` field SHALL default to the user's `baseCurrencyCode` instead of `'USD'`

#### Scenario: Form displays currency as read-only

- **WHEN** the transaction form renders (create or edit)
- **THEN** the currency field SHALL display the user's `baseCurrencyCode` as a read-only value instead of a selectable dropdown

### Requirement: Recurring transaction form uses profile baseCurrencyCode

The recurring transaction form server wrappers SHALL fetch the user's profile and pass `baseCurrencyCode` to the form component. The form SHALL use this value as the fixed currency.

#### Scenario: Create recurring transaction page provides baseCurrencyCode

- **WHEN** the create recurring transaction page server component renders
- **THEN** it SHALL fetch the user's profile (cached) alongside the category list and pass `baseCurrencyCode` to the form component

#### Scenario: Edit recurring transaction page provides baseCurrencyCode

- **WHEN** the edit recurring transaction page server component renders
- **THEN** it SHALL fetch the user's profile (cached) alongside the recurring transaction and category list, and pass `baseCurrencyCode` to the form component

#### Scenario: Recurring form defaults currency to baseCurrencyCode

- **WHEN** the recurring transaction form renders for creating a new entry
- **THEN** the `currencyCode` field SHALL default to the user's `baseCurrencyCode`

#### Scenario: Recurring form displays currency as read-only

- **WHEN** the recurring transaction form renders (create or edit)
- **THEN** the currency field SHALL display the user's `baseCurrencyCode` as a read-only value
