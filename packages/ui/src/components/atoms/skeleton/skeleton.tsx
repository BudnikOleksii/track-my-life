import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './skeleton.module.scss';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, style, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn(styles.skeleton, className)}
      style={{ width, height, ...style }}
      {...props}
    />
  ),
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
