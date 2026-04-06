## ADDED Requirements

### Requirement: Listbox ARIA roles

The options container SHALL have `role="listbox"`. Each option item SHALL have `role="option"` and `aria-selected` set to `true` when the option matches the current value, `false` otherwise.

#### Scenario: Options container has listbox role

- **WHEN** the combobox popup is open
- **THEN** the options container element has `role="listbox"`

#### Scenario: Each option has option role and aria-selected

- **WHEN** the combobox popup is open with options rendered
- **THEN** each option element has `role="option"` and `aria-selected` reflecting whether it is the current value

### Requirement: ARIA controls linking

The combobox trigger button SHALL have `aria-controls` pointing to the listbox element's ID. The search input SHALL have `aria-controls` pointing to the same listbox ID.

#### Scenario: Trigger has aria-controls

- **WHEN** the combobox popup is open
- **THEN** the trigger button's `aria-controls` attribute matches the listbox element's `id`

#### Scenario: Input has aria-controls

- **WHEN** the combobox popup is open
- **THEN** the search input's `aria-controls` attribute matches the listbox element's `id`

### Requirement: Active descendant tracking

The search input SHALL have `aria-activedescendant` set to the ID of the currently highlighted option. When no option is highlighted, `aria-activedescendant` SHALL be empty or absent.

#### Scenario: Highlighted option is announced

- **WHEN** the user presses ArrowDown to highlight an option
- **THEN** the search input's `aria-activedescendant` matches the highlighted option's `id`

#### Scenario: No highlight by default

- **WHEN** the combobox popup opens without keyboard interaction
- **THEN** the search input's `aria-activedescendant` is empty or absent

### Requirement: Input autocomplete attribute

The search input SHALL have `aria-autocomplete="list"` to indicate that the input filters a list of suggestions.

#### Scenario: Input has aria-autocomplete

- **WHEN** the combobox popup is open
- **THEN** the search input has `aria-autocomplete="list"`

### Requirement: Input accessible label

The search input SHALL have an `aria-label` attribute providing an accessible name.

#### Scenario: Input has accessible label

- **WHEN** the combobox popup is open
- **THEN** the search input has an `aria-label` attribute with a descriptive value

### Requirement: Keyboard navigation with ArrowDown and ArrowUp

The user SHALL be able to move the highlight through options using ArrowDown (next) and ArrowUp (previous). Navigation SHALL wrap: ArrowDown from the last option moves to the first, ArrowUp from the first moves to the last.

#### Scenario: ArrowDown moves highlight forward

- **WHEN** the combobox popup is open and the user presses ArrowDown
- **THEN** the next option in the list is highlighted

#### Scenario: ArrowUp moves highlight backward

- **WHEN** an option is highlighted and the user presses ArrowUp
- **THEN** the previous option in the list is highlighted

#### Scenario: ArrowDown wraps from last to first

- **WHEN** the last option is highlighted and the user presses ArrowDown
- **THEN** the first option is highlighted

#### Scenario: ArrowUp wraps from first to last

- **WHEN** the first option is highlighted and the user presses ArrowUp
- **THEN** the last option is highlighted

### Requirement: Keyboard selection with Enter

The user SHALL be able to select the highlighted option by pressing Enter. If no option is highlighted, Enter SHALL do nothing.

#### Scenario: Enter selects highlighted option

- **WHEN** an option is highlighted and the user presses Enter
- **THEN** the highlighted option is selected and the popup closes

#### Scenario: Enter with no highlight does nothing

- **WHEN** no option is highlighted and the user presses Enter
- **THEN** nothing happens and the popup remains open

### Requirement: Keyboard dismiss with Escape

The user SHALL be able to close the popup by pressing Escape.

#### Scenario: Escape closes popup

- **WHEN** the combobox popup is open and the user presses Escape
- **THEN** the popup closes and focus returns to the trigger

### Requirement: Highlighted option scrolls into view

When an option is highlighted via keyboard navigation, it SHALL be scrolled into view if it is not currently visible.

#### Scenario: Off-screen option scrolls into view

- **WHEN** the user navigates to an option that is outside the visible scroll area
- **THEN** the option is scrolled into view

### Requirement: Search resets highlight

When the user types in the search input, the highlighted index SHALL reset to no highlight.

#### Scenario: Typing resets highlight

- **WHEN** an option is highlighted and the user types in the search input
- **THEN** the highlight is cleared (no option is highlighted)
