import { useCallback, useRef, useState } from 'react';

interface UseComboboxSearchConfig {
  onClose: () => void;
  onSearchChange: () => void;
}

export const useComboboxSearch = ({ onClose, onSearchChange }: UseComboboxSearchConfig) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearchState] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const setSearch = useCallback(
    (value: string) => {
      setSearchState(value);
      onSearchChange();
    },
    [onSearchChange],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        setSearchState('');
        onClose();
      }
    },
    [onClose],
  );

  return { isOpen, setIsOpen, search, setSearch, inputRef, handleOpenChange };
};
