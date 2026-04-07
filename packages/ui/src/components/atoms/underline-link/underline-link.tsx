import type { ComponentPropsWithoutRef, ComponentRef, ElementType, JSX, Ref } from 'react';

import { cn } from '../../../lib/utils';
import styles from './underline-link.module.scss';

export type UnderlineLinkProps<Comp extends ElementType = 'a'> = {
  component?: Comp;
  className?: string;
  ref?: Ref<ComponentRef<Comp>>;
} & Omit<ComponentPropsWithoutRef<Comp>, 'component' | 'className'>;

type UnderlineLinkComponent = <Comp extends ElementType = 'a'>(
  props: UnderlineLinkProps<Comp>,
) => JSX.Element;

const UnderlineLink: UnderlineLinkComponent = (props) => {
  const { component: Component = 'a', className, ref, ...rest } = props;
  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic ref type cannot be narrowed without forwardRef
      ref={ref as any}
      data-slot="underline-link"
      className={cn(styles.link, className)}
      {...rest}
    />
  );
};

export { UnderlineLink };
