'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { cn } from '../../../lib/utils';
import styles from './combobox.module.scss';

const EMPTY_LIST_LENGTH = 0;

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  optionList: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

const Combobox: React.FC<ComboboxProps> = ({
  optionList,
  value,
  onValueChange,
  placeholder = 'Search...',
  emptyMessage = 'No results',
  className,
  error,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(
    () => optionList.find((option) => option.value === value),
    [optionList, value],
  );

  const filteredOptionList = useMemo(() => {
    if (!search) {
      return optionList;
    }
    const lowerSearch = search.toLowerCase();
    return optionList.filter((option) => option.label.toLowerCase().includes(lowerSearch));
  }, [optionList, search]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onValueChange?.(optionValue === value ? '' : optionValue);
      setSearch('');
      setIsOpen(false);
    },
    [onValueChange, value],
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearch('');
    }
  }, []);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          data-slot="combobox-trigger"
          className={cn(styles.trigger, error && styles.error, className)}
          disabled={disabled}
        >
          <span className={cn(styles.triggerText, !selectedOption && styles.placeholder)}>
            {selectedOption?.label ?? placeholder}
          </span>
          <span className={styles.icon} aria-hidden>
            ▼
          </span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="combobox-content"
          className={styles.content}
          sideOffset={4}
          align="start"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <div className={styles.searchWrapper}>
            <input
              ref={inputRef}
              data-slot="combobox-input"
              className={styles.searchInput}
              placeholder={placeholder}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className={styles.list}>
            {filteredOptionList.length === EMPTY_LIST_LENGTH ? (
              <div className={styles.empty}>{emptyMessage}</div>
            ) : (
              filteredOptionList.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  data-slot="combobox-item"
                  className={cn(styles.item, option.value === value && styles.selected)}
                  onClick={() => handleSelect(option.value)}
                >
                  <span>{option.label}</span>
                  {option.value === value && (
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      className={styles.checkIcon}
                      aria-hidden
                    >
                      <path
                        d="M1 4l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

Combobox.displayName = 'Combobox';

export { Combobox };
