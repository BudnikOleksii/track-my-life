## MODIFIED Requirements

### Requirement: Sidebar navigation links

The sidebar SHALL display navigation links to: Dashboard, Transactions (collapsible group), Categories, Budgets, and Settings. The Transactions group SHALL contain three child links: By Date, By Category, and Recurring. Each link SHALL display an icon and a label (when sidebar is expanded). The Transactions parent item SHALL use the ArrowLeftRight icon. Child items: By Date SHALL use the CalendarDays icon, By Category SHALL use the LayoutList icon, Recurring SHALL use the Repeat icon.

Navigation utilities (`Link`, `redirect`, `useRouter`, `usePathname`) SHALL be imported from `@track-my-life/next-shared` instead of `@track-my-life/shared`.

#### Scenario: All navigation links visible

- **WHEN** user views the sidebar in expanded state with the Transactions submenu expanded
- **THEN** all navigation items are visible with their respective icons and localized labels, in order: Dashboard, Transactions (parent), By Date (child), By Category (child), Recurring (child), Categories, Budgets, Settings

#### Scenario: Navigation imports use next-shared package

- **WHEN** any component imports `Link`, `redirect`, `useRouter`, or `usePathname`
- **THEN** the import source SHALL be `@track-my-life/next-shared`, not `@track-my-life/shared`
