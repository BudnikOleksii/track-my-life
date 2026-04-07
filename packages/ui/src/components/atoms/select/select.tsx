'use client';

import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '../../../lib/utils';
import styles from './select.module.scss';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps extends ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  error?: boolean;
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Trigger>>;
}

const SelectTrigger = ({ className, error, children, ref, ...props }: SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    aria-invalid={error || undefined}
    className={cn(styles.trigger, error && styles.error, className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <span className={styles.icon} aria-hidden>
        ▼
      </span>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

interface SelectContentProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Content>>;
}

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ref,
  ...props
}: SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={cn(styles.content, position === 'popper' && styles.popper, className)}
      position={position}
      sideOffset={4}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className={styles.scrollButton}>
        <span aria-hidden>▲</span>
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(styles.viewport, position === 'popper' && styles.popperViewport)}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className={styles.scrollButton}>
        <span aria-hidden>▼</span>
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

interface SelectLabelProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Label>>;
}

const SelectLabel = ({ className, ref, ...props }: SelectLabelProps) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn(styles.label, className)}
    {...props}
  />
);

interface SelectItemProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Item>>;
}

const SelectItem = ({ className, children, ref, ...props }: SelectItemProps) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(styles.item, className)}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
        <path
          d="M1 4l3 3 5-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

interface SelectSeparatorProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Separator>>;
}

const SelectSeparator = ({ className, ref, ...props }: SelectSeparatorProps) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn(styles.separator, className)}
    {...props}
  />
);

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
