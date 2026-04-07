## ADDED Requirements

### Requirement: UI components accept ref as a regular prop

All components in `packages/ui` SHALL accept `ref` as a regular prop in their props type instead of using `React.forwardRef`. The component SHALL forward the ref to the underlying DOM element or Radix primitive.

#### Scenario: Component receives ref as prop

- **WHEN** a parent passes a `ref` to a UI component
- **THEN** the component SHALL attach the ref to its root DOM element without using `forwardRef`

#### Scenario: Component works without ref

- **WHEN** a parent renders a UI component without passing a `ref`
- **THEN** the component SHALL render normally with no errors

### Requirement: forwardRef wrappers are removed

All `React.forwardRef` calls in `packages/ui` SHALL be replaced with regular function components. The `.displayName` assignment SHALL be removed when it was only present for forwardRef debugging.

#### Scenario: Component defined as regular function

- **WHEN** inspecting a UI component's source
- **THEN** the component SHALL be a regular function (arrow or named) with no `forwardRef` wrapper

#### Scenario: Ref forwarding still works for Radix-based components

- **WHEN** a Radix-based UI component (e.g., AlertDialog, Select) receives a ref
- **THEN** the ref SHALL be forwarded to the underlying Radix primitive element
