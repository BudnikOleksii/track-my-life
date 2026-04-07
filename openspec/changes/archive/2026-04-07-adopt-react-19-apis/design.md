## Context

The codebase runs React 19.2.3 with Next.js 16 but uses pre-React-19 patterns throughout. Forms use react-hook-form with manual try/catch wrappers around server actions, 12+ UI components use `forwardRef`, and mutations lack optimistic feedback. The project follows an RSC-first architecture with server actions for mutations, making it well-suited for React 19's form primitives.

Key current patterns:

- Form hooks (`use-*-form.ts`) call server actions inside `handleSubmit` callbacks with manual error/success handling
- UI atoms/molecules in `packages/ui` wrap components in `forwardRef` and set `.displayName`
- Recurring transaction mutations use `router.refresh()` with no intermediate UI state
- One context (`SidebarContext`) uses `useContext`

## Goals / Non-Goals

**Goals:**

- Adopt `useActionState` for server action form submission to unify error, result, and pending state
- Add `useFormStatus` to submit buttons for automatic pending indicators
- Remove all `forwardRef` wrappers from `packages/ui` components, using ref as a regular prop
- Introduce `useOptimistic` for recurring transaction pause/resume/delete to provide instant feedback
- Replace `useContext` with `use()` in sidebar context consumption

**Non-Goals:**

- Fully removing react-hook-form — it still provides value for complex validation (e.g., transaction form with conditional fields, zod schema integration)
- Migrating to React 19 `<form action={}>` pattern for all forms — only forms that call a single server action benefit; complex multi-step forms keep react-hook-form
- Server Components refactoring — the RSC architecture is already well-structured
- Adopting React 19 document metadata hoisting — Next.js Metadata API already handles this

## Decisions

### D1: Incremental form migration, not wholesale react-hook-form removal

**Decision**: Introduce `useActionState` alongside react-hook-form rather than replacing it entirely.

**Rationale**: Forms like transaction and category have complex client-side validation (conditional fields, dynamic defaults, currency formatting) that react-hook-form handles well. `useActionState` excels for simpler submit-and-redirect flows (auth, delete, settings). Attempting full removal would require reimplementing validation logic.

**Alternatives considered**:

- Full react-hook-form removal: Too risky, would require custom validation for complex forms
- No migration: Misses the ergonomic wins for simpler forms and pending state management

**Approach**: For forms currently using react-hook-form, wrap the server action call with `useActionState` to get built-in pending state and error handling. The form hook still handles validation; `useActionState` handles submission state.

### D2: UI component ref migration strategy

**Decision**: Remove `forwardRef` and pass `ref` as a regular prop in the component's props type. Remove `.displayName` where it was only needed for forwardRef.

**Rationale**: React 19 passes ref as a regular prop. This simplifies every component's type signature and removes a layer of indirection. Since `packages/ui` is internal-only, there are no external consumers to worry about.

**Approach**: For each component, change from `forwardRef<El, Props>((props, ref) => ...)` to a regular function component with `ref` in the destructured props. Update the props type to include `ref?: React.Ref<El>`.

### D3: Optimistic updates scoped to recurring transactions only

**Decision**: Only add `useOptimistic` for recurring transaction pause/resume/delete — not for all mutations.

**Rationale**: These are the only mutations where the user sees a noticeable delay (the list re-renders after server roundtrip). Transaction create/edit navigates away on success, so optimistic state would be invisible. Category operations are infrequent.

**Alternatives considered**:

- Optimistic updates everywhere: Overkill, most mutations redirect on success
- No optimistic updates: Misses the UX improvement for the most visible case

### D4: use() for context consumption

**Decision**: Replace `useContext(SidebarContext)` with `use(SidebarContext)` in the custom hook.

**Rationale**: Single occurrence, trivial change, aligns with React 19 idioms. `use()` also works in conditionals (though not needed here).

## Risks / Trade-offs

- **[Forms: dual patterns]** Having both `useActionState` and react-hook-form in the codebase creates two form patterns → Mitigate by documenting when to use each (simple server action forms → useActionState, complex validated forms → react-hook-form + useActionState for submission)
- **[forwardRef: Radix compatibility]** Some UI components wrap Radix primitives that may internally use forwardRef → Mitigate by testing each component's ref forwarding after migration; Radix already supports React 19
- **[Optimistic: rollback complexity]** `useOptimistic` requires handling server action failures to revert UI → Mitigate by keeping optimistic state simple (toggle a boolean, remove from list) with toast on failure
- **[Testing gaps]** Form behavior changes need regression testing → Mitigate by running existing E2E tests and adding targeted checks for pending states
