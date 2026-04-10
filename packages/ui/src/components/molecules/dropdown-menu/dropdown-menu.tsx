'use client';

import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '../../../lib/utils';
import styles from './dropdown-menu.module.scss';

const DEFAULT_SIDE_OFFSET = 4;

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

interface DropdownMenuContentProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Content>>;
}

const DropdownMenuContent = ({
  className,
  sideOffset = DEFAULT_SIDE_OFFSET,
  ref,
  ...props
}: DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      className={cn(styles.content, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

interface DropdownMenuItemProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Item>>;
}

const DropdownMenuItem = ({ className, ref, ...props }: DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-slot="dropdown-menu-item"
    className={cn(styles.item, className)}
    {...props}
  />
);

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
