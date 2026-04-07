'use client';

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes, Ref } from 'react';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/typography/Typography';
import styles from './alert-dialog.module.scss';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

interface AlertDialogOverlayProps extends ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Overlay
> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Overlay>>;
}

const AlertDialogOverlay = ({ className, ref, ...props }: AlertDialogOverlayProps) => (
  <AlertDialogPrimitive.Overlay ref={ref} className={cn(styles.overlay, className)} {...props} />
);

interface AlertDialogContentProps extends ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
> {
  size?: 'default' | 'sm';
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Content>>;
}

const AlertDialogContent = ({
  className,
  size = 'default',
  children,
  ref,
  ...props
}: AlertDialogContentProps) => (
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
);

const AlertDialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="alert-dialog-header" className={cn(styles.header, className)} {...props} />
);

const AlertDialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="alert-dialog-footer" className={cn(styles.footer, className)} {...props} />
);

const AlertDialogTitle = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>) => (
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

const AlertDialogDescription = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>) => (
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

interface AlertDialogActionProps extends ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Action>>;
}

const AlertDialogAction = ({ ref, ...props }: AlertDialogActionProps) => (
  <AlertDialogPrimitive.Action ref={ref} asChild {...props} />
);

interface AlertDialogCancelProps extends ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Cancel>>;
}

const AlertDialogCancel = ({ ref, ...props }: AlertDialogCancelProps) => (
  <AlertDialogPrimitive.Cancel ref={ref} asChild {...props} />
);

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
