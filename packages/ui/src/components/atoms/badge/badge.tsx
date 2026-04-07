import type { HTMLAttributes, Ref } from 'react';

import { cn } from '../../../lib/utils';
import styles from './badge.module.scss';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'warning';

const variantToClass: Record<BadgeVariant, string> = {
  default: styles.default ?? '',
  secondary: styles.secondary ?? '',
  destructive: styles.destructive ?? '',
  outline: styles.outline ?? '',
  ghost: styles.ghost ?? '',
  success: styles.success ?? '',
  warning: styles.warning ?? '',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  ref?: Ref<HTMLSpanElement>;
}

const Badge = ({ className, variant = 'default', ref, ...props }: BadgeProps) => {
  const variantClass = variantToClass[variant];
  return (
    <span
      ref={ref}
      data-slot="badge"
      className={cn(styles.badge, variantClass, className)}
      {...props}
    />
  );
};

export { Badge };
