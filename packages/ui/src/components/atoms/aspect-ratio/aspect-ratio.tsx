'use client';

import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

import { cn } from '../../../lib/utils';
import styles from './aspect-ratio.module.scss';

export interface AspectRatioProps extends ComponentPropsWithoutRef<
  typeof AspectRatioPrimitive.Root
> {
  ratio?: number;
  ref?: Ref<ComponentRef<typeof AspectRatioPrimitive.Root>>;
}

// oxlint-disable-next-line no-magic-numbers
const DEFAULT_ASPECT_RATIO = 16 / 9;

const AspectRatio = ({
  className,
  ratio = DEFAULT_ASPECT_RATIO,
  ref,
  ...props
}: AspectRatioProps) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    data-slot="aspect-ratio"
    ratio={ratio}
    className={cn(styles.root, className)}
    {...props}
  />
);

export { AspectRatio };
