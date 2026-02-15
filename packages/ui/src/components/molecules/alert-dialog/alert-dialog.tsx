'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/typography/Typography';
import styles from './alert-dialog.module.scss';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay ref={ref} className={cn(styles.overlay, className)} {...props} />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & { size?: 'default' | 'sm' }
>(({ className, size = 'default', children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      data-slot="alert-dialog-content"
      className={cn(styles.content, size === 'sm' && styles.contentSm, className)}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div data-slot="alert-dialog-header" className={cn(styles.header, className)} {...props} />;

const AlertDialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div data-slot="alert-dialog-footer" className={cn(styles.footer, className)} {...props} />;

const AlertDialogTitle: React.FC<
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
> = ({ className, children, ...props }) => (
  <AlertDialogPrimitive.Title asChild {...props}>
    <Typography
      tag="h2"
      variant="title-m"
      fontWeight="semibold"
      data-slot="alert-dialog-title"
      className={cn(styles.title, className)}
    >
      {children}
    </Typography>
  </AlertDialogPrimitive.Title>
);
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription: React.FC<
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
> = ({ className, children, ...props }) => (
  <AlertDialogPrimitive.Description asChild {...props}>
    <Typography
      variant="body-m"
      data-slot="alert-dialog-description"
      className={cn(styles.description, className)}
    >
      {children}
    </Typography>
  </AlertDialogPrimitive.Description>
);
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ ...props }, ref) => <AlertDialogPrimitive.Action ref={ref} asChild {...props} />);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ ...props }, ref) => <AlertDialogPrimitive.Cancel ref={ref} asChild {...props} />);
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
