## ADDED Requirements

### Requirement: TimePicker component

The `TimePicker` component in `packages/ui/src/components/atoms/time-picker/` SHALL render two numeric inputs for hours and minutes, separated by a colon character.

#### Scenario: Default rendering

- **WHEN** the TimePicker renders with a value of `{ hours: 14, minutes: 30 }`
- **THEN** it SHALL display two inputs showing "14" and "30" separated by ":"

#### Scenario: Hour input constraints

- **WHEN** a user types into the hours input
- **THEN** the component SHALL only accept values between 0 and 23, zero-padded to 2 digits in display

#### Scenario: Minute input constraints

- **WHEN** a user types into the minutes input
- **THEN** the component SHALL only accept values between 0 and 59, zero-padded to 2 digits in display

#### Scenario: Change callback

- **WHEN** a user changes either the hours or minutes value
- **THEN** the component SHALL call the `onChange` callback with the updated `{ hours, minutes }` object

#### Scenario: Disabled state

- **WHEN** the `disabled` prop is true
- **THEN** both inputs SHALL be disabled and not accept user input

### Requirement: TimePicker keyboard navigation

The TimePicker SHALL support keyboard-based value adjustment.

#### Scenario: Arrow key increment

- **WHEN** a user presses the up arrow key while focused on an input
- **THEN** the value SHALL increment by 1 (wrapping from 23→0 for hours, 59→0 for minutes)

#### Scenario: Arrow key decrement

- **WHEN** a user presses the down arrow key while focused on an input
- **THEN** the value SHALL decrement by 1 (wrapping from 0→23 for hours, 0→59 for minutes)

### Requirement: TimePicker string value API

The TimePicker SHALL support a string-based value API using "HH:mm" format for integration with form libraries.

#### Scenario: String value prop

- **WHEN** the TimePicker receives `value="14:30"`
- **THEN** it SHALL parse and display hours as 14 and minutes as 30

#### Scenario: String onChange callback

- **WHEN** the `onChange` callback fires
- **THEN** it SHALL emit the value as a "HH:mm" formatted string
