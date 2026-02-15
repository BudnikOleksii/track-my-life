import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './badge.module.scss';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';

const variantToClass: Record<BadgeVariant, string> = {
  default: styles.default ?? '',
  secondary: styles.secondary ?? '',
  destructive: styles.destructive ?? '',
  outline: styles.outline ?? '',
  ghost: styles.ghost ?? '',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClass = variantToClass[variant];
    return (
      <span
        ref={ref}
        data-slot="badge"
        className={cn(styles.badge, variantClass, className)}
        {...props}
      />
    );
  },
);
Badge.displayName = 'Badge';

export { Badge };
