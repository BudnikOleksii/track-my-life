import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

import { cn } from '../../../lib/utils';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  ref?: Ref<HTMLInputElement>;
  startAdornment?: ReactNode;
}

const Input = ({ className, error, type, ref, startAdornment, ...props }: InputProps) => {
  if (startAdornment) {
    return (
      <div className={cn(styles.wrapper, error && styles.wrapperError, className)}>
        <span className={styles.adornment}>{startAdornment}</span>
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={styles.adornmentInput}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(styles.input, error && styles.error, className)}
      {...props}
    />
  );
};

export { Input };
