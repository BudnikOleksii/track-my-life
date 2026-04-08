## ADDED Requirements

### Requirement: RadioGroup UI component

The `RadioGroup` component in `packages/ui/src/components/atoms/radio-group/` SHALL provide a styled radio button group based on `@radix-ui/react-radio-group`.

#### Scenario: Default rendering

- **WHEN** the RadioGroup renders with items
- **THEN** it SHALL display each item as a pill-shaped button in a horizontal row

#### Scenario: Selection

- **WHEN** a user clicks an unselected radio item
- **THEN** the item SHALL become selected, the previously selected item SHALL become unselected, and the `onValueChange` callback SHALL fire

#### Scenario: Keyboard navigation

- **WHEN** a user presses arrow keys while the RadioGroup is focused
- **THEN** focus SHALL move between items following Radix UI's default radio group keyboard behavior

#### Scenario: Controlled value

- **WHEN** the `value` prop changes
- **THEN** the RadioGroup SHALL update the selected item to match

### Requirement: Transaction type radio buttons

The transaction form SHALL use a RadioGroup with pill-style buttons for selecting the transaction type (Income/Expense).

#### Scenario: Default selection

- **WHEN** the form renders for a new transaction
- **THEN** the "Expense" radio button SHALL be selected by default

#### Scenario: Edit mode selection

- **WHEN** the form renders for an existing transaction
- **THEN** the radio button matching the transaction's type SHALL be selected

#### Scenario: Visual style

- **WHEN** a radio button is selected
- **THEN** it SHALL display with a colored border and text color matching the transaction type (e.g., warning color for expense, success for income)
