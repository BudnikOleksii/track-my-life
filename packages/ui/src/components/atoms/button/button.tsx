import type { ButtonHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from '../../../lib/utils';
import styles from './button.module.scss';

type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive';
type ButtonSize = 'default' | 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const sizeToClass: Record<ButtonSize, string> = {
  default: styles.md ?? '',
  sm: styles.sm ?? '',
  md: styles.md ?? '',
  lg: styles.lg ?? '',
  icon: styles.icon ?? '',
};

const variantToClass: Record<ButtonVariant, string> = {
  default: styles.default ?? '',
  primary: styles.primary ?? '',
  secondary: styles.secondary ?? '',
  outline: styles.outline ?? '',
  ghost: styles.ghost ?? '',
  link: styles.link ?? '',
  destructive: styles.destructive ?? '',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
    const variantClass = variantToClass[variant];
    const sizeClass = sizeToClass[size];

    return (
      <button
        ref={ref}
        type={type}
        data-slot="button"
        className={cn(styles.button, variantClass, sizeClass, className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
