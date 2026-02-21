'use client';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './aspect-ratio.module.scss';

export interface AspectRatioProps extends React.ComponentPropsWithoutRef<
  typeof AspectRatioPrimitive.Root
> {
  ratio?: number;
}

// oxlint-disable-next-line no-magic-numbers
const DEFAULT_ASPECT_RATIO = 16 / 9;

const AspectRatio = React.forwardRef<
  React.ComponentRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, ratio = DEFAULT_ASPECT_RATIO, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    data-slot="aspect-ratio"
    ratio={ratio}
    className={cn(styles.root, className)}
    {...props}
  />
));
AspectRatio.displayName = AspectRatioPrimitive.Root.displayName;

export { AspectRatio };
