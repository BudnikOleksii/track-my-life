import type { ComponentProps, HTMLAttributes, Ref } from 'react';

import { cn } from '../../../lib/utils';
import { Typography } from '../typography/Typography';
import styles from './alert.module.scss';

type AlertVariant = 'default' | 'destructive';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  ref?: Ref<HTMLDivElement>;
}

const Alert = ({ className, variant = 'default', ref, ...props }: AlertProps) => (
  <div
    ref={ref}
    data-slot="alert"
    role="alert"
    className={cn(styles.alert, variant === 'destructive' && styles.destructive, className)}
    {...props}
  />
);

const AlertTitle = ({
  className,
  variant = 'title-xs',
  tag = 'h5',
  ...props
}: ComponentProps<typeof Typography>) => (
  <Typography
    data-slot="alert-title"
    variant={variant}
    tag={tag}
    fontWeight="semibold"
    className={cn(styles.title, className)}
    {...props}
  />
);

const AlertDescription = ({
  className,
  variant = 'body-m',
  ...props
}: ComponentProps<typeof Typography>) => (
  <Typography
    data-slot="alert-description"
    variant={variant}
    className={cn(styles.description, className)}
    {...props}
  />
);

const AlertAction = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="alert-action" className={cn(styles.action, className)} {...props} />
);

export { Alert, AlertTitle, AlertDescription, AlertAction };
