'use client';

import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '../../../lib/utils';
import styles from './avatar.module.scss';

type AvatarSize = 'default' | 'sm' | 'lg';

export interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
  ref?: Ref<ComponentRef<typeof AvatarPrimitive.Root>>;
}

const Avatar = ({ className, size = 'default', ref, ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    className={cn(styles.root, size === 'sm' && styles.sm, size === 'lg' && styles.lg, className)}
    {...props}
  />
);

interface AvatarImageProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  ref?: Ref<ComponentRef<typeof AvatarPrimitive.Image>>;
}

const AvatarImage = ({ className, ref, ...props }: AvatarImageProps) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn(styles.image, className)}
    {...props}
  />
);

interface AvatarFallbackProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  ref?: Ref<ComponentRef<typeof AvatarPrimitive.Fallback>>;
}

const AvatarFallback = ({ className, ref, ...props }: AvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(styles.fallback, className)}
    {...props}
  />
);

export { Avatar, AvatarImage, AvatarFallback };
