## ADDED Requirements

### Requirement: Page server components read searchParams for filtering

The system SHALL have async page server components (`page.tsx`) read the `searchParams` prop to extract filter values (dateFrom, dateTo, type, currencyCode, page, pageSize) and pass them to server wrapper components and fetch functions.

#### Scenario: Page reads filter params from URL

- **WHEN** the page loads with URL searchParams (e.g., `?type=INCOME&dateFrom=2026-01-01`)
- **THEN** the server component SHALL parse the searchParams and pass the filter values to data-fetching wrapper components

#### Scenario: Page applies default filter values

- **WHEN** the page loads without searchParams or with missing filter values
- **THEN** the server component SHALL apply default values (dateFrom = 1st of current month, dateTo = today, type = All, currencyCode = USD, page = 1)

### Requirement: Filter controls update URL to trigger server re-fetch

The system SHALL use client-side filter control components that update URL searchParams (via `router.push` or `router.replace`) when the user changes filters, triggering a server-side navigation and data re-fetch.

#### Scenario: User changes a filter value

- **WHEN** the user selects a new filter value (e.g., changes type from "All" to "Income")
- **THEN** the filter component SHALL update the URL searchParams, causing Next.js to re-render the server component with the new params

#### Scenario: Pagination updates URL

- **WHEN** the user clicks a pagination control (next/previous/page number)
- **THEN** the pagination component SHALL update the `page` searchParam in the URL, triggering a server re-fetch of the corresponding page

#### Scenario: Filter change resets pagination

- **WHEN** the user changes a non-pagination filter (type, dateFrom, dateTo, currencyCode)
- **THEN** the `page` searchParam SHALL reset to 1

### Requirement: Suspense shows loading state during filter navigation

The system SHALL display skeleton fallbacks via Suspense boundaries when filter changes trigger server-side re-rendering, providing visual feedback during navigation.

#### Scenario: Filter change triggers loading state

- **WHEN** the user changes a filter and the server component is re-rendering
- **THEN** the Suspense boundaries SHALL show skeleton fallbacks until the new data streams in
