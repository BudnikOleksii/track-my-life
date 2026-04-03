### Requirement: Month navigator component

The system SHALL display a month navigator with a left arrow, a formatted month/year label (e.g., "April 2026"), and a right arrow. The component SHALL use `Intl.DateTimeFormat` with the current locale for localized month names.

#### Scenario: Default to current month

- **WHEN** the user navigates to the transactions page without dateFrom/dateTo params
- **THEN** the month navigator SHALL display the current month and year, and the URL SHALL reflect the current month's date range (dateFrom = first day, dateTo = last day)

#### Scenario: Navigate to previous month

- **WHEN** the user clicks the left arrow
- **THEN** the month navigator SHALL update to show the previous month, and the URL dateFrom/dateTo params SHALL update to that month's range, and pagination SHALL reset to page 1

#### Scenario: Navigate to next month

- **WHEN** the user clicks the right arrow
- **THEN** the month navigator SHALL update to show the next month, and the URL dateFrom/dateTo params SHALL update to that month's range, and pagination SHALL reset to page 1

#### Scenario: Cross-year navigation

- **WHEN** the user navigates from January 2026 to the previous month
- **THEN** the month navigator SHALL display December 2025 with the correct date range

### Requirement: Month date range computation

The system SHALL compute dateFrom as the first day of the month (YYYY-MM-01) and dateTo as the last day of the month (YYYY-MM-DD, accounting for varying month lengths and leap years).

#### Scenario: February in a leap year

- **WHEN** the month is February 2028
- **THEN** dateFrom SHALL be "2028-02-01" and dateTo SHALL be "2028-02-29"

#### Scenario: Month with 30 days

- **WHEN** the month is April 2026
- **THEN** dateFrom SHALL be "2026-04-01" and dateTo SHALL be "2026-04-30"

### Requirement: Replace date range filter

The month navigator SHALL replace the existing `TransactionDateFilter` component. The manual dateFrom/dateTo inputs SHALL be removed.

#### Scenario: Date filter no longer rendered

- **WHEN** the user views the transactions page
- **THEN** the two date input fields SHALL NOT be displayed, and the month navigator SHALL be displayed instead
