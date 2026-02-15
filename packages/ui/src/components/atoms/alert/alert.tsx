import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Typography } from '../typography/Typography';
import styles from './alert.module.scss';

type AlertVariant = 'default' | 'destructive';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert"
      role="alert"
      className={cn(styles.alert, variant === 'destructive' && styles.destructive, className)}
      {...props}
    />
  ),
);
Alert.displayName = 'Alert';

const AlertTitle: React.FC<React.ComponentProps<typeof Typography>> = ({
  className,
  variant = 'title-xs',
  tag = 'h5',
  ...props
}) => (
  <Typography
    data-slot="alert-title"
    variant={variant}
    tag={tag}
    fontWeight="semibold"
    className={cn(styles.title, className)}
    {...props}
  />
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription: React.FC<React.ComponentProps<typeof Typography>> = ({
  className,
  variant = 'body-m',
  ...props
}) => (
  <Typography
    data-slot="alert-description"
    variant={variant}
    className={cn(styles.description, className)}
    {...props}
  />
);
AlertDescription.displayName = 'AlertDescription';

const AlertAction: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div data-slot="alert-action" className={cn(styles.action, className)} {...props} />
);

export { Alert, AlertTitle, AlertDescription, AlertAction };
