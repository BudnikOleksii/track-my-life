## ADDED Requirements

### Requirement: Persistent app shell layout

The `(app-layout)` route group SHALL render a persistent layout containing a sidebar, a top header bar, and a main content area. The layout SHALL wrap all authenticated pages so that navigation and header persist across route changes.

#### Scenario: Authenticated user sees app shell on dashboard

- **WHEN** an authenticated user navigates to `/dashboard`
- **THEN** the page renders within the app shell layout with a visible sidebar on the left, a header bar at the top, and the dashboard content in the main area

#### Scenario: App shell persists across page navigation

- **WHEN** user navigates from `/dashboard` to `/transactions`
- **THEN** the sidebar and header remain rendered without unmounting, and only the main content area updates

### Requirement: Sidebar and main content area sizing

The sidebar SHALL have a fixed width on desktop (240px expanded, 64px collapsed). The main content area SHALL fill the remaining horizontal space.

#### Scenario: Desktop layout with expanded sidebar

- **WHEN** viewport width is ≥768px and sidebar is expanded
- **THEN** the sidebar occupies 240px width and the main content area fills the remaining space

#### Scenario: Desktop layout with collapsed sidebar

- **WHEN** viewport width is ≥768px and sidebar is collapsed
- **THEN** the sidebar occupies 64px width (icon-only) and the main content area fills the remaining space

### Requirement: Header bar displays page context

The header bar SHALL display the current page title and a user avatar/menu on the right side.

#### Scenario: Header shows page title

- **WHEN** user is on any app page
- **THEN** the header displays the localized title of the current page

#### Scenario: Header shows user menu

- **WHEN** user is on any app page
- **THEN** the header displays a user avatar on the right that opens a dropdown menu when clicked
