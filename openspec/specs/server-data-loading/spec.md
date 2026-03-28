## ADDED Requirements

### Requirement: Async server wrapper components fetch data for client components

The system SHALL provide async server components (e.g., `SummaryWidgetServer`, `TransactionListServer`, `CategoryListServer`) that call plain async fetch functions and pass the result as props to their corresponding client component.

#### Scenario: Server wrapper fetches and renders client component

- **WHEN** a server wrapper component is rendered
- **THEN** it SHALL await the fetch function with the provided parameters and render the client component with the fetched data as props

#### Scenario: Server wrapper handles fetch error

- **WHEN** the fetch function returns null or an error
- **THEN** the server wrapper SHALL pass an empty/error state to the client component, allowing it to render its empty state UI

### Requirement: Suspense boundaries wrap each server data-fetching component

The system SHALL wrap each async server wrapper component in a `<Suspense>` boundary with a skeleton fallback component matching the widget's loading UI.

#### Scenario: Data is loading

- **WHEN** the async server wrapper has not yet resolved
- **THEN** the Suspense boundary SHALL render the skeleton fallback component

#### Scenario: Data has loaded

- **WHEN** the async server wrapper resolves with data
- **THEN** the Suspense boundary SHALL replace the skeleton with the rendered client component containing data

#### Scenario: Parallel streaming of sibling widgets

- **WHEN** multiple Suspense-wrapped server wrappers are siblings in the page tree
- **THEN** each SHALL resolve and stream independently, rendering as soon as its own data is available

### Requirement: Fetch functions are plain async functions callable from server components

The system SHALL convert existing `'use server'` fetch actions (e.g., `fetchTransactionList`, `fetchSummary`, `fetchCategoryList`) to plain async functions by removing the `'use server'` directive, making them directly importable and callable from server components without server action overhead.

#### Scenario: Fetch function called from server component

- **WHEN** a server component imports and awaits a fetch function
- **THEN** the function SHALL execute on the server and return the data without going through the server action serialization layer

#### Scenario: Fetch function retains validation and error handling

- **WHEN** a fetch function is called
- **THEN** it SHALL retain its existing parameter constraints, response type guards, and error handling, returning null or an empty collection on failure

### Requirement: Client components receive data as props instead of fetching

The system SHALL refactor existing client components (dashboard widgets, transaction list, category list) to accept fetched data as props instead of calling fetch functions internally via hooks.

#### Scenario: Client component renders with server-provided data

- **WHEN** a client component receives data props from its server wrapper
- **THEN** it SHALL render the data without any `useEffect`-based data fetching

#### Scenario: Client component retains interactive state

- **WHEN** a client component receives server-fetched data
- **THEN** it SHALL still manage client-side interactive state (form dialogs, optimistic updates for mutations, UI toggles)
