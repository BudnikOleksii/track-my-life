import type { ButtonHTMLAttributes, ComponentProps, ElementType, Ref } from 'react';

import { cn } from '../../../lib/utils';
import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    component?: never;
    ref?: Ref<HTMLButtonElement>;
  };

type ButtonAsComponentProps<Comp extends ElementType> = ButtonBaseProps &
  Omit<ComponentProps<Comp>, keyof ButtonBaseProps | 'component'> & {
    component: Comp;
  };

export type ButtonProps<Comp extends ElementType = 'button'> = Comp extends 'button'
  ? ButtonAsButtonProps
  : ButtonAsComponentProps<Comp>;

const sizeToClass: Record<ButtonSize, string> = {
  sm: styles.sm ?? '',
  md: styles.md ?? '',
  lg: styles.lg ?? '',
  icon: styles.icon ?? '',
};

const variantToClass: Record<ButtonVariant, string> = {
  primary: styles.primary ?? '',
  secondary: styles.secondary ?? '',
  outline: styles.outline ?? '',
  ghost: styles.ghost ?? '',
  link: styles.link ?? '',
  destructive: styles.destructive ?? '',
};

const Button = <Comp extends ElementType = 'button'>(props: ButtonProps<Comp>) => {
  const { className, variant = 'primary', size = 'md', component, ...rest } = props;

  const Component = component ?? 'button';
  const variantClass = variantToClass[variant];
  const sizeClass = sizeToClass[size];

  return (
    <Component
      data-slot="button"
      className={cn(styles.button, variantClass, sizeClass, className)}
      {...rest}
    />
  );
};

Button.displayName = 'Button';

export { Button };
