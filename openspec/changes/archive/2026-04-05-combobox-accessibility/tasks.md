## 1. ARIA Attributes

- [x] 1.1 Add `useId()` to generate stable IDs for listbox and option elements
- [x] 1.2 Add `role="listbox"` and `id` to the options container
- [x] 1.3 Replace option `<button>` elements with `<div role="option">` with `aria-selected` and `id`
- [x] 1.4 Add `aria-controls` to the trigger button pointing to the listbox ID
- [x] 1.5 Add `aria-controls`, `aria-activedescendant`, `aria-autocomplete="list"`, and `aria-label` to the search input

## 2. Keyboard Navigation

- [x] 2.1 Add `highlightedIndex` state (default -1) and reset it when search changes or popup closes
- [x] 2.2 Handle ArrowDown/ArrowUp on the search input to move highlight through filtered options with wrapping
- [x] 2.3 Handle Enter to select the highlighted option and close the popup
- [x] 2.4 Handle Escape to close the popup
- [x] 2.5 Scroll highlighted option into view on highlight change

## 3. Verification

- [x] 3.1 Run type-check, lint, and format check
- [x] 3.2 Verify Storybook renders correctly with keyboard interaction
