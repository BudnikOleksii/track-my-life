## ADDED Requirements

### Requirement: Server action forms use useActionState for submission state

Form hooks that call a server action SHALL use `useActionState` to manage the submission lifecycle (pending, error, success). The action state SHALL replace manual try/catch wrappers and custom loading state variables.

#### Scenario: Form submission with useActionState

- **WHEN** a user submits a form that calls a server action
- **THEN** `useActionState` SHALL manage the pending state, invoke the server action, and store the result (success or error)

#### Scenario: Error state from server action

- **WHEN** a server action returns an error result
- **THEN** the form SHALL display the error from the action state without manual try/catch

#### Scenario: Pending state during submission

- **WHEN** a form submission is in progress
- **THEN** the form's pending state SHALL be derived from `useActionState`, not a separate `useState`

### Requirement: Submit buttons use useFormStatus for pending indicators

Form submit buttons SHALL use `useFormStatus` to automatically reflect the form's pending state. The button SHALL be disabled and show a loading indicator while the form action is pending.

#### Scenario: Button disabled during submission

- **WHEN** a form action is pending
- **THEN** the submit button SHALL be disabled and display a loading indicator via `useFormStatus`

#### Scenario: Button enabled when idle

- **WHEN** no form action is pending
- **THEN** the submit button SHALL be enabled with its default label

### Requirement: Complex forms retain react-hook-form for validation

Forms with complex client-side validation (conditional fields, dynamic defaults, zod schema integration) SHALL continue using react-hook-form for field management and validation. These forms SHALL integrate `useActionState` only for the submission step.

#### Scenario: Validated form with useActionState submission

- **WHEN** a form uses react-hook-form for validation and submits valid data
- **THEN** the validated values SHALL be passed to the server action via `useActionState`

#### Scenario: Client validation failure does not trigger server action

- **WHEN** a form fails react-hook-form validation
- **THEN** the server action SHALL NOT be invoked and `useActionState` SHALL remain in its current state
