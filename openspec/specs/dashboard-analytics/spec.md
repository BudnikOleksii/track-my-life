## ADDED Requirements

### Requirement: Dashboard page displays financial summary widget

The dashboard page SHALL display a summary widget showing total income, total expenses, net balance, and transaction count for the selected filter period and currency. Data SHALL be fetched by an async server wrapper component and passed as props to the client widget.

#### Scenario: Summary widget renders with data

- **WHEN** the dashboard loads with valid filters and the server wrapper fetches summary data
- **THEN** the widget displays four stat cards: Total Income, Total Expenses, Net Balance, and Transaction Count with formatted values

#### Scenario: Summary widget shows loading state

- **WHEN** the summary server wrapper has not yet resolved within its Suspense boundary
- **THEN** the Suspense fallback SHALL display skeleton placeholders in place of stat cards

#### Scenario: Summary widget shows empty state

- **WHEN** the server wrapper passes null or empty data to the widget
- **THEN** the widget displays an empty state message

### Requirement: Dashboard page displays category breakdown chart

The dashboard page SHALL display a pie chart showing spending/income distribution across categories. Data SHALL be fetched by an async server wrapper component.

#### Scenario: Category breakdown renders as pie chart

- **WHEN** category breakdown data is passed from the server wrapper
- **THEN** a pie chart renders with one slice per category, colored from the chart color palette, with tooltip showing category name, amount, and percentage

#### Scenario: Category breakdown shows empty state

- **WHEN** the server wrapper passes no category breakdown data
- **THEN** the widget displays an empty state message

### Requirement: Dashboard page displays trends chart

The dashboard page SHALL display a grouped bar chart comparing income vs expenses over time periods. Data SHALL be fetched by an async server wrapper component.

#### Scenario: Trends chart renders with period data

- **WHEN** trends data is passed from the server wrapper
- **THEN** a bar chart renders with two grouped bars per period (income in green, expenses in red) and period labels on the x-axis

#### Scenario: Trends chart shows empty state

- **WHEN** the server wrapper passes no trends data
- **THEN** the widget displays an empty state message

### Requirement: Dashboard page displays top categories list

The dashboard page SHALL display a ranked list of the top 5 categories by amount, with visual percentage bars. Data SHALL be fetched by an async server wrapper component.

#### Scenario: Top categories renders ranked list

- **WHEN** top categories data is passed from the server wrapper
- **THEN** a list renders showing rank number, category name, formatted amount, and a CSS percentage bar for each category

#### Scenario: Top categories shows empty state

- **WHEN** the server wrapper passes no top categories data
- **THEN** the widget displays an empty state message

### Requirement: Dashboard page displays daily spending chart

The dashboard page SHALL display a bar chart showing daily spending totals. Data SHALL be fetched by an async server wrapper component.

#### Scenario: Daily spending chart renders with day data

- **WHEN** daily spending data is passed from the server wrapper
- **THEN** a bar chart renders with one bar per day showing the total spending amount

#### Scenario: Daily spending chart shows empty state

- **WHEN** the server wrapper passes no daily spending data
- **THEN** the widget displays an empty state message

### Requirement: Dashboard page displays recent transactions list

The dashboard page SHALL display the 5 most recent transactions matching the current filters, with a link to the full transactions page. Data SHALL be fetched by an async server wrapper component.

#### Scenario: Recent transactions renders transaction rows

- **WHEN** transaction data is passed from the server wrapper
- **THEN** a list renders showing date, description or category, amount, and a type badge (income/expense) for each transaction, plus a "View all" link to `/transactions`

#### Scenario: Recent transactions shows empty state

- **WHEN** the server wrapper passes no transaction data
- **THEN** the widget displays an empty state message

### Requirement: Dashboard provides shared filter controls

The dashboard page SHALL provide a filter bar with date range (from/to), transaction type (All/Income/Expense), and currency code inputs. Filter changes SHALL update URL searchParams to trigger server-side re-fetching of all widgets.

#### Scenario: Changing date range re-fetches all widgets

- **WHEN** the user changes the dateFrom or dateTo filter
- **THEN** the URL searchParams SHALL update and the server component SHALL re-render all widget wrappers with the new date range

#### Scenario: Changing transaction type filter re-fetches all widgets

- **WHEN** the user selects a different transaction type (All, Income, Expense)
- **THEN** the URL searchParams SHALL update and the server component SHALL re-render all widget wrappers with the new type

#### Scenario: Changing currency filter re-fetches all widgets

- **WHEN** the user changes the currency code
- **THEN** the URL searchParams SHALL update and the server component SHALL re-render all widget wrappers with the new currency

#### Scenario: Default filter values on page load

- **WHEN** the dashboard page loads for the first time without searchParams
- **THEN** filters default to: dateFrom = 1st of current month, dateTo = today, type = All, currencyCode = USD

### Requirement: Dashboard layout is responsive

The dashboard page SHALL use a CSS Grid layout that adapts to screen size.

#### Scenario: Mobile layout (below 768px)

- **WHEN** the viewport width is below 768px
- **THEN** all widgets stack in a single column

#### Scenario: Tablet layout (768px and above)

- **WHEN** the viewport width is 768px or wider
- **THEN** widgets arrange in a 2-column grid with the summary widget spanning full width

#### Scenario: Large desktop layout (1440px and above)

- **WHEN** the viewport width is 1440px or wider
- **THEN** widgets arrange in a 3-column grid with the summary widget spanning full width

### Requirement: Dashboard supports i18n

The dashboard page SHALL use translated labels from `next-intl` for all visible text, supporting en and uk locales.

#### Scenario: English locale renders English labels

- **WHEN** the locale is set to `en`
- **THEN** all dashboard labels, widget titles, and filter labels render in English

#### Scenario: Ukrainian locale renders Ukrainian labels

- **WHEN** the locale is set to `uk`
- **THEN** all dashboard labels, widget titles, and filter labels render in Ukrainian
