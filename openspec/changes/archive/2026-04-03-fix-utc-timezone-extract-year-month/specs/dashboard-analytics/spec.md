## MODIFIED Requirements

### Requirement: Dashboard page displays daily spending chart

The dashboard page SHALL display a bar chart showing daily spending totals. Data SHALL be fetched by an async server wrapper component. The server wrapper SHALL extract year and month from the filter date string using timezone-safe string parsing (not `Date` object local-time methods).

#### Scenario: Daily spending chart renders with day data

- **WHEN** daily spending data is passed from the server wrapper
- **THEN** a bar chart renders with one bar per day showing the total spending amount

#### Scenario: Daily spending chart shows empty state

- **WHEN** the server wrapper passes no daily spending data
- **THEN** the widget displays an empty state message

#### Scenario: Year/month extraction from date string is timezone-safe

- **WHEN** the server wrapper extracts year and month from a `YYYY-MM-DD` date string (e.g. `2026-03-01`)
- **THEN** the extracted values SHALL be year=2026, month=3 regardless of the server's local timezone

#### Scenario: Year/month defaults to current UTC date when no filter provided

- **WHEN** no dateTo filter is provided to the server wrapper
- **THEN** the server wrapper SHALL use the current UTC year and month
