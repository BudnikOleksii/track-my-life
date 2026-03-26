## ADDED Requirements

### Requirement: Transactions page stub

A Transactions page SHALL exist at the `/transactions` route within the `(app-layout)` group, displaying a localized page title.

#### Scenario: User navigates to transactions

- **WHEN** user navigates to `/transactions`
- **THEN** the page renders within the app shell layout and displays the "Transactions" page title

### Requirement: Categories page stub

A Categories page SHALL exist at the `/categories` route within the `(app-layout)` group, displaying a localized page title.

#### Scenario: User navigates to categories

- **WHEN** user navigates to `/categories`
- **THEN** the page renders within the app shell layout and displays the "Categories" page title

### Requirement: Budgets page stub

A Budgets page SHALL exist at the `/budgets` route within the `(app-layout)` group, displaying a localized page title.

#### Scenario: User navigates to budgets

- **WHEN** user navigates to `/budgets`
- **THEN** the page renders within the app shell layout and displays the "Budgets" page title

### Requirement: Settings page stub

A Settings page SHALL exist at the `/settings` route within the `(app-layout)` group under a `(settings-layout)` sub-group, displaying a localized page title.

#### Scenario: User navigates to settings

- **WHEN** user navigates to `/settings`
- **THEN** the page renders within the app shell layout and displays the "Settings" page title

### Requirement: Path constants for new routes

All new routes SHALL have corresponding path constants defined in the paths constants file.

#### Scenario: Path constants available

- **WHEN** a developer imports from the paths constants
- **THEN** constants for `transactions`, `categories`, `budgets`, and `settings` paths are available

### Requirement: i18n messages for all new pages

All new pages SHALL have localized message files for both English (en) and Ukrainian (uk) locales.

#### Scenario: Page titles are localized

- **WHEN** user views any new page in Ukrainian locale
- **THEN** the page title displays in Ukrainian

#### Scenario: Navigation labels are localized

- **WHEN** user views the sidebar navigation in any supported locale
- **THEN** all navigation link labels display in the correct locale
