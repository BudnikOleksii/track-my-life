'use client';

import type { ComponentProps, FC } from 'react';

import { usePathname, Link } from './navigation';

export type NavigationLinkProps = ComponentProps<typeof Link>;

export const NavigationLink: FC<NavigationLinkProps> = ({ href, ...rest }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return <Link aria-current={isActive ? 'page' : undefined} href={href} {...rest} />;
};
