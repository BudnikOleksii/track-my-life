import * as React from 'react';

import { cn } from '../../../lib/utils';
import styles from './breadcrumb.module.scss';

const Breadcrumb: React.FC<React.ComponentProps<'nav'>> = ({ className, ...props }) => (
  <nav
    data-slot="breadcrumb"
    aria-label="Breadcrumb"
    className={cn(styles.root, className)}
    {...props}
  />
);

const BreadcrumbList: React.FC<React.HTMLAttributes<HTMLOListElement>> = ({
  className,
  ...props
}) => <ol className={cn(styles.list, className)} {...props} />;

const BreadcrumbItem: React.FC<React.HTMLAttributes<HTMLLIElement>> = ({ className, ...props }) => (
  <li className={cn(styles.item, className)} {...props} />
);

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a ref={ref} data-slot="breadcrumb-link" className={cn(styles.link, className)} {...props} />
));
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(styles.page, className)}
    {...props}
  />
);

const BreadcrumbSeparator: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => (
  <span
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden
    className={cn(styles.separator, className)}
    {...props}
  >
    {children ?? '/'}
  </span>
);

const BreadcrumbEllipsis: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden
    className={cn(styles.ellipsis, className)}
    {...props}
  >
    …
  </span>
);

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
