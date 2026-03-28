## MODIFIED Requirements

### Requirement: Server wrapper handles fetch error

The system SHALL provide async server components (e.g., `SummaryWidgetServer`, `TransactionListServer`, `CategoryListServer`) that call plain async fetch functions and pass the result as props to their corresponding client component.

When a fetch function returns a 401 unauthorized response, the server wrapper SHALL redirect to the sign-in page instead of rendering an error state, since token refresh is handled by middleware and a 401 in RSC indicates an expired session.

#### Scenario: Server wrapper fetches and renders client component

- **WHEN** a server wrapper component is rendered
- **THEN** it SHALL await the fetch function with the provided parameters and render the client component with the fetched data as props

#### Scenario: Server wrapper handles fetch error

- **WHEN** the fetch function returns null or a non-auth error
- **THEN** the server wrapper SHALL pass an empty/error state to the client component, allowing it to render its empty state UI

#### Scenario: Server wrapper handles 401 unauthorized

- **WHEN** the fetch function returns a 401 unauthorized response
- **THEN** the server wrapper SHALL redirect to the sign-in page since token refresh cannot occur in RSC context
