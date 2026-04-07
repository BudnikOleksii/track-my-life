import type { AnchorHTMLAttributes, ComponentProps, HTMLAttributes, Ref } from 'react';

import { cn } from '../../../lib/utils';
import styles from './breadcrumb.module.scss';

const Breadcrumb = ({ className, ...props }: ComponentProps<'nav'>) => (
  <nav
    data-slot="breadcrumb"
    aria-label="Breadcrumb"
    className={cn(styles.root, className)}
    {...props}
  />
);

const BreadcrumbList = ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
  <ol className={cn(styles.list, className)} {...props} />
);

const BreadcrumbItem = ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
  <li className={cn(styles.item, className)} {...props} />
);

interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>;
}

const BreadcrumbLink = ({ className, ref, ...props }: BreadcrumbLinkProps) => (
  <a ref={ref} data-slot="breadcrumb-link" className={cn(styles.link, className)} {...props} />
);

const BreadcrumbPage = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(styles.page, className)}
    {...props}
  />
);

const BreadcrumbSeparator = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
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

const BreadcrumbEllipsis = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
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
