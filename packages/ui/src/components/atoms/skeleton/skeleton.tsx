import type { HTMLAttributes, Ref } from 'react';

import { cn } from '../../../lib/utils';
import styles from './skeleton.module.scss';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  ref?: Ref<HTMLDivElement>;
}

const Skeleton = ({ className, width, height, style, ref, ...props }: SkeletonProps) => (
  <div
    ref={ref}
    data-slot="skeleton"
    className={cn(styles.skeleton, className)}
    style={{ width, height, ...style }}
    {...props}
  />
);

export { Skeleton };
