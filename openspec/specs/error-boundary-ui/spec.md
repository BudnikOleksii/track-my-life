## ADDED Requirements

### Requirement: ErrorState component renders error information

The `ErrorState` component in `packages/ui` SHALL display a title and description to communicate the error to the user. It SHALL use existing Typography and Button atoms from `packages/ui`.

#### Scenario: ErrorState renders with title and description

- **WHEN** ErrorState is rendered with `title` and `description` props
- **THEN** the title and description SHALL be visible to the user

#### Scenario: ErrorState renders retry button when onRetry is provided

- **WHEN** ErrorState is rendered with an `onRetry` callback
- **THEN** a retry button SHALL be displayed
- **THEN** clicking the retry button SHALL invoke the `onRetry` callback

#### Scenario: ErrorState renders home navigation when onNavigateHome is provided

- **WHEN** ErrorState is rendered with an `onNavigateHome` callback
- **THEN** a "go home" button SHALL be displayed
- **THEN** clicking the button SHALL invoke the `onNavigateHome` callback

#### Scenario: ErrorState renders without action buttons when no callbacks provided

- **WHEN** ErrorState is rendered without `onRetry` or `onNavigateHome`
- **THEN** no action buttons SHALL be displayed

### Requirement: App-layout error boundary catches errors within authenticated shell

The `(app-layout)/error.tsx` file SHALL catch runtime errors in any app-layout route and render the ErrorState component while keeping the sidebar and header visible.

#### Scenario: Server component throws in app-layout route

- **WHEN** a server component within `(app-layout)` throws an error
- **THEN** the error boundary SHALL render ErrorState with a translated error message
- **THEN** the app sidebar and header SHALL remain visible

#### Scenario: User clicks retry in app-layout error boundary

- **WHEN** the user clicks the retry button in the app-layout error boundary
- **THEN** Next.js `reset()` SHALL be called to re-render the route segment

### Requirement: Auth-layout error boundary catches errors in auth pages

The `(auth-layout)/error.tsx` file SHALL catch runtime errors in auth pages and render ErrorState.

#### Scenario: Auth page throws an error

- **WHEN** a component within `(auth-layout)` throws an error
- **THEN** the error boundary SHALL render ErrorState with a translated error message

### Requirement: Root locale error boundary as final fallback

The `[locale]/error.tsx` file SHALL serve as the final error boundary for any uncaught error within the locale segment.

#### Scenario: Error not caught by nested boundary

- **WHEN** an error is not caught by `(app-layout)` or `(auth-layout)` error boundaries
- **THEN** the root locale error boundary SHALL catch it and render ErrorState
- **THEN** ErrorState SHALL include a "go home" navigation action

#### Scenario: i18n provider failure fallback

- **WHEN** the i18n provider itself fails and translations are unavailable
- **THEN** the root error boundary SHALL display hardcoded English fallback strings

### Requirement: Custom 404 not-found page

The `[locale]/not-found.tsx` file SHALL render a user-friendly 404 page using ErrorState.

#### Scenario: User navigates to non-existent route

- **WHEN** a user navigates to a route that does not exist
- **THEN** the not-found page SHALL display a 404 message with a link to navigate home
