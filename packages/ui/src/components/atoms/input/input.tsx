import type { InputHTMLAttributes, Ref } from 'react';

import { cn } from '../../../lib/utils';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  ref?: Ref<HTMLInputElement>;
}

const Input = ({ className, error, type, ref, ...props }: InputProps) => (
  <input
    ref={ref}
    type={type}
    data-slot="input"
    className={cn(styles.input, error && styles.error, className)}
    {...props}
  />
);

export { Input };
