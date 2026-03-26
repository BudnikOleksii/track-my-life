## ADDED Requirements

### Requirement: Checkbox atom component

The system SHALL provide a `Checkbox` component in `packages/ui/src/components/atoms/checkbox/` built on Radix UI `@radix-ui/react-checkbox`. The component SHALL support checked, unchecked, and indeterminate states, integrate with react-hook-form via `Field`, and follow the existing atom component patterns (SCSS module styling, forwarded ref, named export).

#### Scenario: Toggle checkbox

- **WHEN** a user clicks an unchecked Checkbox
- **THEN** the Checkbox SHALL transition to checked state and fire the `onCheckedChange` callback

#### Scenario: Indeterminate state

- **WHEN** the Checkbox is rendered with `checked="indeterminate"`
- **THEN** it SHALL display an indeterminate visual indicator (dash icon)

### Requirement: Select atom component

The system SHALL provide a `Select` component in `packages/ui/src/components/atoms/select/` built on Radix UI `@radix-ui/react-select`. The component SHALL support single-value selection with a dropdown trigger, scrollable option list, and placeholder text. It SHALL integrate with react-hook-form via `Field` and follow existing atom patterns.

#### Scenario: Select an option

- **WHEN** a user opens the Select dropdown and clicks an option
- **THEN** the Select SHALL close, display the selected option in the trigger, and fire the `onValueChange` callback

#### Scenario: Placeholder display

- **WHEN** the Select has no value selected
- **THEN** it SHALL display the provided placeholder text in the trigger

### Requirement: Combobox molecule component

The system SHALL provide a `Combobox` component in `packages/ui/src/components/molecules/combobox/` that combines a text input with a filterable dropdown list. It SHALL support type-ahead filtering and keyboard navigation. This component is used for the parent category picker where the list of options may be long.

#### Scenario: Filter options by typing

- **WHEN** a user types into the Combobox input
- **THEN** the dropdown SHALL filter to show only options whose label contains the typed text (case-insensitive)

#### Scenario: Select from filtered list

- **WHEN** a user selects an option from the filtered dropdown
- **THEN** the Combobox SHALL display the selected option in the input and fire the `onValueChange` callback

#### Scenario: No matching options

- **WHEN** a user types text that matches no options
- **THEN** the dropdown SHALL display a "No results" message
