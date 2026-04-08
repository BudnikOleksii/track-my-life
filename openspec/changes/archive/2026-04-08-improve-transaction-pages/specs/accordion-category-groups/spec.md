## ADDED Requirements

### Requirement: Collapsible accordion groups on by-category page

The by-category detail page SHALL wrap each subcategory group's transaction list in a collapsible accordion. The group header (subcategory name + totals) SHALL serve as the accordion trigger.

#### Scenario: Groups rendered as accordion items

- **WHEN** the by-category page displays transaction groups
- **THEN** each group SHALL be rendered as an accordion item with the subcategory name and totals as the trigger

#### Scenario: Default collapsed state

- **WHEN** the by-category page loads with groups
- **THEN** all accordion items SHALL be collapsed by default

#### Scenario: Expand a group

- **WHEN** the user clicks on a group header
- **THEN** the accordion item SHALL expand to reveal the transaction list for that group

#### Scenario: Multiple groups expandable

- **WHEN** the user expands multiple groups
- **THEN** all expanded groups SHALL remain open simultaneously (multi-expand mode)
