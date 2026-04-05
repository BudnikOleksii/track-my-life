## Context

The Combobox in `packages/ui/src/components/molecules/combobox/combobox.tsx` is built on Radix `Popover` primitives. It has a trigger button with `role="combobox"`, a search input, and a list of `<button>` items. It lacks ARIA linking attributes and keyboard navigation. The component is used across the money-tracker app for category and currency selection.

## Goals / Non-Goals

**Goals:**

- Full WAI-ARIA 1.2 combobox pattern compliance
- Keyboard navigation (ArrowDown/Up, Enter, Escape, Home, End)
- Zero breaking changes to the existing props API
- Maintain Radix Popover for positioning/portal behavior

**Non-Goals:**

- Multi-select combobox support
- Typeahead/autocomplete against a remote API
- Replacing Radix Popover with a different positioning library
- Virtual scrolling for large option lists

## Decisions

### 1. Keep Radix Popover for positioning, add ARIA manually

**Decision**: Continue using `@radix-ui/react-popover` for portal/positioning but add all ARIA attributes and keyboard handling ourselves.

**Alternatives considered**:

- **Radix Combobox (doesn't exist)**: Radix doesn't ship a combobox primitive.
- **cmdk**: Full-featured command palette, but it's a heavier dependency and its UX pattern (command palette) differs from a standard form combobox. Overkill for our needs.
- **Downshift/React-Aria**: Mature a11y libraries but adding a new dependency for one component is excessive.

**Rationale**: We already depend on Radix Popover, and the ARIA implementation is straightforward. No new dependencies needed.

### 2. Replace option `<button>` elements with `<div role="option">`

**Decision**: Options become `<div role="option" aria-selected tabIndex={-1}>` instead of `<button>`.

**Rationale**: WAI-ARIA specifies that `role="listbox"` children MUST be `role="option"`. Nested `<button>` elements inside a listbox are semantically incorrect and confuse screen readers. Click handling moves to `onClick` on the div.

### 3. Use `useId()` for stable ARIA IDs

**Decision**: Use React's `useId()` hook to generate stable, SSR-safe IDs for `aria-controls` and `aria-activedescendant` linking.

**Rationale**: `useId()` is built into React 19, generates unique IDs that are stable across server and client renders, and requires no external dependency.

### 4. Track highlighted index in state

**Decision**: Add a `highlightedIndex` state (number, default -1) to track keyboard-focused option. ArrowDown/Up increment/decrement, Enter selects, Escape closes.

**Rationale**: `aria-activedescendant` needs to point to a specific option ID. Index-based tracking is simpler than ref-based focus management and keeps actual DOM focus on the input (which is the correct pattern for combobox).

## Risks / Trade-offs

- **[Risk] Scroll into view**: When keyboard-navigating long lists, the highlighted option may be off-screen. → Mitigation: call `element.scrollIntoView({ block: 'nearest' })` on highlight change.
- **[Risk] Filter resets highlight**: Typing in search changes the filtered list, which may invalidate the current highlight index. → Mitigation: reset `highlightedIndex` to -1 whenever `search` changes.
