'use client';

import type { FC, ReactNode } from 'react';

import { usePathname } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { NavigationLink } from '@track-my-life/shared/src/i18n/navigation/NavigationLink';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { cn } from '@track-my-life/ui/src/lib/utils';
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Repeat,
  Settings,
  Tags,
  Wallet,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { useSidebar } from '../sidebar-provider/SidebarProvider';
import styles from './AppSidebar.module.scss';

interface NavigationItem {
  href: string;
  icon: ReactNode;
  labelKey: string;
}

const NAVIGATION_ITEM_LIST: NavigationItem[] = [
  { href: PATHS.dashboard, icon: <LayoutDashboard size={20} />, labelKey: 'labels.dashboard' },
  { href: PATHS.transactions, icon: <ArrowLeftRight size={20} />, labelKey: 'labels.transactions' },
  {
    href: PATHS.recurringTransactions,
    icon: <Repeat size={20} />,
    labelKey: 'labels.recurringTransactions',
  },
  { href: PATHS.categories, icon: <Tags size={20} />, labelKey: 'labels.categories' },
  { href: PATHS.budgets, icon: <Wallet size={20} />, labelKey: 'labels.budgets' },
  { href: PATHS.settings, icon: <Settings size={20} />, labelKey: 'labels.settings' },
];

export const AppSidebar: FC = () => {
  const { isCollapsed, isMobileOpen, onToggleCollapse, onCloseMobile } = useSidebar();
  const translations = useTranslations(I18N_NAMESPACE.navigation);
  const pathname = usePathname();

  const checkIsActive = (href: string): boolean =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {isMobileOpen && (
        <div
          className={styles.backdrop}
          onClick={onCloseMobile}
          onKeyDown={undefined}
          role="presentation"
        />
      )}
      <aside
        className={cn(
          styles.sidebar,
          isCollapsed && styles.collapsed,
          isMobileOpen && styles.mobileOpen,
        )}
      >
        <div className={styles.brand}>
          {!isCollapsed && (
            <Typography variant="title-s" fontWeight="bold" className={styles.brandText}>
              Track My Life
            </Typography>
          )}
          {isCollapsed && (
            <Typography variant="title-s" fontWeight="bold" className={styles.brandIcon}>
              T
            </Typography>
          )}
        </div>

        <nav className={styles.nav}>
          {NAVIGATION_ITEM_LIST.map((item) => {
            const isActive = checkIsActive(item.href);

            return (
              <NavigationLink
                key={item.href}
                href={item.href}
                className={cn(styles.navItem, isActive && styles.active)}
                onClick={onCloseMobile}
                title={isCollapsed ? translations(item.labelKey) : undefined}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {!isCollapsed && (
                  <Typography
                    variant="body-m"
                    fontWeight={isActive ? 'semibold' : 'medium'}
                    tag="span"
                  >
                    {translations(item.labelKey)}
                  </Typography>
                )}
              </NavigationLink>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            aria-label={
              isCollapsed ? translations('actions.expand') : translations('actions.collapse')
            }
            className={styles.collapseButton}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
      </aside>
    </>
  );
};
