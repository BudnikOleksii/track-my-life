## ADDED Requirements

### Requirement: Group transactions by date

The transaction list SHALL group transactions by their date field and render a date section header above each group. Grouping SHALL be performed client-side on the already-fetched data.

#### Scenario: Transactions on multiple dates

- **WHEN** the transaction list contains transactions from April 15, April 14, and April 12
- **THEN** the list SHALL render three date headers ("Apr 15, 2026", "Apr 14, 2026", "Apr 12, 2026") each followed by the transactions for that date

#### Scenario: Multiple transactions on the same date

- **WHEN** multiple transactions share the same date
- **THEN** they SHALL appear under a single date header for that date

#### Scenario: No transactions

- **WHEN** the transaction list is empty
- **THEN** the empty state message SHALL be displayed without any date headers

### Requirement: Date header formatting

Date headers SHALL use the same localized formatting as individual transaction dates (year, abbreviated month, day).

#### Scenario: Date header matches locale

- **WHEN** the user's locale is English
- **THEN** date headers SHALL display in the format "Apr 15, 2026"
