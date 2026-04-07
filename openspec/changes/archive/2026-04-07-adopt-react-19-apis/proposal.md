## Why

The codebase runs React 19.2.3 but uses none of its new APIs. Forms rely on react-hook-form with manual try/catch error handling and custom pending states, 12+ UI components wrap in `forwardRef` unnecessarily, and mutations lack optimistic feedback. Adopting React 19 APIs will reduce boilerplate, improve UX with built-in pending/optimistic states, and simplify the component library surface.

## What Changes

- Replace manual form submission handlers with `useActionState` to consolidate error, pending, and result state for all 14 form hooks
- Add `useFormStatus` to form submit buttons for automatic pending indicators
- Remove `forwardRef` from all UI components in `packages/ui` — ref becomes a regular prop in React 19
- Remove `.displayName` assignments that only existed because of `forwardRef`
- Introduce `useOptimistic` for pause/resume/delete mutations on recurring transactions
- Replace `useContext` with `use()` for context consumption in sidebar

## Capabilities

### New Capabilities

- `react19-form-state`: Migrate form hooks from react-hook-form try/catch pattern to useActionState + useFormStatus for server action integration
- `react19-forward-ref-removal`: Remove forwardRef wrappers from all UI components, passing ref as a regular prop
- `react19-optimistic-updates`: Add useOptimistic for recurring transaction mutations (pause/resume/delete)

### Modified Capabilities

_(none — these are internal refactors that don't change spec-level behavior)_

## Impact

- **packages/ui**: 12+ component files lose `forwardRef` + `displayName` (atoms: input, badge, select, skeleton, checkbox, avatar, aspect-ratio, alert, underline-link; molecules: breadcrumb, alert-dialog, accordion)
- **apps/money-tracker/src**: 14 form hook files adopt `useActionState`; form components gain `useFormStatus`-powered buttons
- **apps/money-tracker/src/.../recurring**: Pause/resume/delete actions get optimistic UI
- **Dependencies**: No new dependencies; react-hook-form usage may be reduced but not fully removed (still useful for complex validation)
- **Testing**: Form and mutation flows need regression testing; UI component ref forwarding needs snapshot updates
