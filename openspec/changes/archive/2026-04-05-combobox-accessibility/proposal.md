## Why

The Combobox component has incomplete WAI-ARIA semantics — it uses `role="combobox"` on the trigger but lacks `role="listbox"`/`role="option"` on the dropdown, has no `aria-controls`, `aria-activedescendant`, or `aria-autocomplete`, and has zero keyboard navigation. Screen readers cannot interact with it as a functional combobox.

## What Changes

- Add `role="listbox"` to the options container and `role="option"` + `aria-selected` to each item
- Add stable IDs and `aria-controls` linking the trigger/input to the listbox
- Add `aria-activedescendant` on the search input pointing to the highlighted option
- Add `aria-autocomplete="list"` on the search input
- Add `aria-label` to the search input
- Implement keyboard navigation: ArrowDown/ArrowUp to move through options, Enter to select, Escape to close
- Change option items from `<button>` to `<div role="option">` (listbox items should not be nested buttons)

## Capabilities

### New Capabilities

- `combobox-aria`: Full WAI-ARIA combobox pattern with ARIA attributes, stable IDs, and keyboard navigation

### Modified Capabilities

_(none)_

## Impact

- **Code**: `packages/ui/src/components/molecules/combobox/combobox.tsx` — main component rewrite
- **Storybook**: Existing Combobox stories will work without changes (API unchanged)
- **Consumers**: No breaking changes — the component's props interface stays the same
