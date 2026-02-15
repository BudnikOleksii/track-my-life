import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './underline-link.module.scss';

type UnderlineLinkProps<Comp extends React.ElementType = 'a'> = {
  component?: Comp;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<Comp>, 'component' | 'className'>;

interface UnderlineLinkComponent {
  <Comp extends React.ElementType = 'a'>(
    props: UnderlineLinkProps<Comp> & { ref?: React.Ref<React.ComponentRef<Comp>> },
  ): React.JSX.Element;
  displayName?: string;
}

const UnderlineLinkInner: React.ForwardRefRenderFunction<
  unknown,
  UnderlineLinkProps<React.ElementType>
> = (props, ref) => {
  const { component: Component = 'a', className, ...rest } = props;
  return (
    <Component
      ref={ref}
      data-slot="underline-link"
      className={cn(styles.link, className)}
      {...rest}
    />
  );
};

const UnderlineLink = React.forwardRef(UnderlineLinkInner) as UnderlineLinkComponent;
UnderlineLink.displayName = 'UnderlineLink';

export { UnderlineLink };
