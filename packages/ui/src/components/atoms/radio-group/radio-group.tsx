'use client';

import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '../../../lib/utils';
import styles from './radio-group.module.scss';

interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}

const RadioGroup = ({ className, ref, ...props }: RadioGroupProps) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    data-slot="radio-group"
    className={cn(styles.root, className)}
    {...props}
  />
);

interface RadioGroupItemProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}

const RadioGroupItem = ({ className, children, ref, ...props }: RadioGroupItemProps) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    data-slot="radio-group-item"
    className={cn(styles.item, className)}
    {...props}
  >
    {children}
  </RadioGroupPrimitive.Item>
);

export { RadioGroup, RadioGroupItem };
