'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './separator.module.scss';

const Separator: React.FC<React.ComponentProps<typeof SeparatorPrimitive.Root>> = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}) => (
  <SeparatorPrimitive.Root
    data-slot="separator"
    decorative={decorative}
    orientation={orientation}
    className={cn(styles.separator, className)}
    {...props}
  />
);

export { Separator };
