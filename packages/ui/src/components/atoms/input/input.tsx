import type { InputHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from '../../../lib/utils';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(styles.input, error && styles.error, className)}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

export { Input };
