import type React from 'react';

import { useCallback } from 'react';

import type { ComboboxOption } from '../combobox';

const FIRST_INDEX = 0;
const INDEX_OFFSET = 1;

interface UseComboboxKeyboardConfig {
  filteredOptionList: ComboboxOption[];
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  handleSelect: (value: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useComboboxKeyboard = ({
  filteredOptionList,
  highlightedIndex,
  setHighlightedIndex,
  handleSelect,
  setIsOpen,
}: UseComboboxKeyboardConfig) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const optionCount = filteredOptionList.length;

      const keyActionMap: Record<string, () => void> = {
        ArrowDown: () => setHighlightedIndex((prev) => (prev + INDEX_OFFSET) % optionCount),
        ArrowUp: () =>
          setHighlightedIndex((prev) =>
            prev <= FIRST_INDEX ? optionCount - INDEX_OFFSET : prev - INDEX_OFFSET,
          ),
        Home: () => setHighlightedIndex(FIRST_INDEX),
        End: () => setHighlightedIndex(optionCount - INDEX_OFFSET),
        Enter: () => {
          const option = filteredOptionList[highlightedIndex];
          if (option) {
            handleSelect(option.value);
          }
        },
        Escape: () => setIsOpen(false),
      };

      const action = keyActionMap[event.key];
      if (action) {
        event.preventDefault();
        action();
      }
    },
    [filteredOptionList, highlightedIndex, setHighlightedIndex, handleSelect, setIsOpen],
  );

  return handleKeyDown;
};
