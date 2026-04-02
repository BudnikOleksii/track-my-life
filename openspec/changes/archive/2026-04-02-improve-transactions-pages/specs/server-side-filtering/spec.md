## MODIFIED Requirements

### Requirement: Page server components read searchParams for filtering

The system SHALL have async page server components (`page.tsx`) read the `searchParams` prop to extract filter values (dateFrom, dateTo, type, categoryId, currencyCode, sortBy, sortOrder, page, pageSize) and pass them to server wrapper components and fetch functions.

#### Scenario: Page reads all filter params from URL

- **WHEN** the page loads with URL searchParams (e.g., `?type=INCOME&dateFrom=2026-04-01&categoryId=abc&sortBy=amount&sortOrder=asc`)
- **THEN** the server component SHALL parse all searchParams and pass the filter values to data-fetching wrapper components

#### Scenario: Page applies default filter values

- **WHEN** the page loads without searchParams or with missing filter values
- **THEN** the server component SHALL apply default values (dateFrom = 1st of current month, dateTo = last day of current month, type = All, sortBy = date, sortOrder = desc, page = 1)

## MODIFIED Requirements

### Requirement: Filter controls update URL to trigger server re-fetch

The system SHALL use client-side filter control components that update URL searchParams (via `router.replace`) when the user changes filters, triggering a server-side navigation and data re-fetch. Filter keys SHALL include: type, dateFrom, dateTo, categoryId, currencyCode, sortBy, sortOrder, page, pageSize.

#### Scenario: User changes a filter value

- **WHEN** the user selects a new filter value (e.g., changes sort from "date" to "amount")
- **THEN** the filter component SHALL update the URL searchParams, causing Next.js to re-render the server component with the new params

#### Scenario: Filter change resets pagination

- **WHEN** the user changes a non-pagination filter (type, dateFrom, dateTo, categoryId, currencyCode, sortBy, sortOrder)
- **THEN** the `page` searchParam SHALL reset to 1
