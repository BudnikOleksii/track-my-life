import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/typography/Typography';
import styles from './card.module.scss';

const Card: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div data-slot="card" className={cn(styles.card, className)} {...props} />
);

const CardHeader: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div
    data-slot="card-header"
    className={cn(
      styles.cardHeader,
      props.children &&
        React.Children.toArray(props.children).some(
          (comp) =>
            React.isValidElement(comp) &&
            (comp as React.ReactElement<{ 'data-slot'?: string }>).props?.['data-slot'] ===
              'card-action',
        ) &&
        styles.withAction,
      className,
    )}
    {...props}
  />
);

const CardTitle: React.FC<React.ComponentProps<typeof Typography>> = ({
  variant = 'title-l',
  className,
  ...props
}) => <Typography data-slot="card-title" variant={variant} className={className} {...props} />;

const CardDescription: React.FC<React.ComponentProps<typeof Typography>> = ({
  variant = 'body-m',
  className,
  ...props
}) => (
  <Typography
    data-slot="card-description"
    variant={variant}
    className={cn(styles.cardDescription, className)}
    {...props}
  />
);

const CardAction: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div data-slot="card-action" className={cn(styles.cardAction, className)} {...props} />
);

const CardContent: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div data-slot="card-content" className={cn(styles.cardContent, className)} {...props} />
);

const CardFooter: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div data-slot="card-footer" className={cn(styles.cardFooter, className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
