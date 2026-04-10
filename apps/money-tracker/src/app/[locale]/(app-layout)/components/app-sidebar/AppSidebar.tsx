'use client';

import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';

import { usePathname } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { NavigationLink } from '@track-my-life/next-shared/src/i18n/navigation/NavigationLink';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { cn } from '@track-my-life/ui/src/lib/utils';
import {
  ArrowLeftRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Import,
  LayoutDashboard,
  LayoutList,
  Repeat,
  Settings,
  Tags,
  Wallet,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { useSidebar } from '../sidebar-provider/SidebarProvider';
import styles from './AppSidebar.module.scss';

interface NavigationItem {
  href: string;
  Icon: LucideIcon;
  labelKey: string;
  children?: NavigationItem[];
}

const NAVIGATION_ITEM_LIST: NavigationItem[] = [
  { href: PATHS.dashboard, Icon: LayoutDashboard, labelKey: 'labels.dashboard' },
  {
    href: PATHS.transactions,
    Icon: ArrowLeftRight,
    labelKey: 'labels.transactions',
    children: [
      {
        href: PATHS.transactions,
        Icon: CalendarDays,
        labelKey: 'labels.transactionsByDate',
      },
      {
        href: PATHS.transactionsByCategory,
        Icon: LayoutList,
        labelKey: 'labels.transactionsByCategory',
      },
      {
        href: PATHS.recurringTransactions,
        Icon: Repeat,
        labelKey: 'labels.recurringTransactions',
      },
      {
        href: PATHS.transactionsImport,
        Icon: Import,
        labelKey: 'labels.transactionsImport',
      },
    ],
  },
  { href: PATHS.categories, Icon: Tags, labelKey: 'labels.categories' },
  { href: PATHS.budgets, Icon: Wallet, labelKey: 'labels.budgets' },
  { href: PATHS.settings, Icon: Settings, labelKey: 'labels.settings' },
];

const getAllLeafItemList = (itemList: NavigationItem[]): NavigationItem[] =>
  itemList.flatMap((item) => item.children || [item]);

const getActiveHref = (pathname: string): string | undefined => {
  const leafItemList = getAllLeafItemList(NAVIGATION_ITEM_LIST);

  return leafItemList
    .filter(({ href }) => pathname === href || pathname.startsWith(`${href}/`))
    .reduce<NavigationItem | undefined>(
      (longest, item) => (!longest || item.href.length > longest.href.length ? item : longest),
      undefined,
    )?.href;
};

const checkHasActiveChild = (item: NavigationItem, activeHref: string | undefined): boolean => {
  if (!item.children || !activeHref) {
    return false;
  }

  return item.children.some(
    (child) => activeHref === child.href || activeHref.startsWith(`${child.href}/`),
  );
};

export const AppSidebar: FC = () => {
  const { isCollapsed, isMobileOpen, onToggleCollapse, onCloseMobile } = useSidebar();
  const translations = useTranslations(I18N_NAMESPACE.navigation);
  const pathname = usePathname();

  const activeHref = useMemo(() => getActiveHref(pathname), [pathname]);

  const parentItemWithActiveChildList = useMemo(
    () =>
      NAVIGATION_ITEM_LIST.filter((item) => checkHasActiveChild(item, activeHref)).map(
        (item) => item.href,
      ),
    [activeHref],
  );

  const [openSubmenuList, setOpenSubmenuList] = useState<string[]>(parentItemWithActiveChildList);

  useEffect(() => {
    setOpenSubmenuList((prev) => {
      const newItemList = parentItemWithActiveChildList.filter((href) => !prev.includes(href));

      return newItemList.length > EMPTY_LIST_LENGTH ? [...prev, ...newItemList] : prev;
    });
  }, [parentItemWithActiveChildList]);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseMobile();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileOpen, onCloseMobile]);

  const handleToggleSubmenu = (href: string) => {
    setOpenSubmenuList((prev) =>
      prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href],
    );
  };

  return (
    <>
      {isMobileOpen && (
        <div className={styles.backdrop} aria-hidden="true" onClick={onCloseMobile} />
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
            if (item.children) {
              const isOpen = openSubmenuList.includes(item.href);
              const hasActiveChild = checkHasActiveChild(item, activeHref);

              return (
                <div key={item.href}>
                  <button
                    type="button"
                    aria-label={isCollapsed ? translations(item.labelKey) : undefined}
                    aria-expanded={!isCollapsed ? isOpen : undefined}
                    className={cn(
                      styles.navItem,
                      styles.submenuToggle,
                      hasActiveChild && styles.parentActive,
                    )}
                    onClick={() => {
                      handleToggleSubmenu(item.href);
                    }}
                    title={isCollapsed ? translations(item.labelKey) : undefined}
                  >
                    <span className={styles.navIcon}>
                      <item.Icon size={20} />
                    </span>
                    {!isCollapsed && (
                      <>
                        <Typography
                          variant="body-m"
                          fontWeight={hasActiveChild ? 'semibold' : 'medium'}
                          tag="span"
                        >
                          {translations(item.labelKey)}
                        </Typography>
                        <span className={cn(styles.chevron, isOpen && styles.chevronOpen)}>
                          <ChevronDown size={16} />
                        </span>
                      </>
                    )}
                  </button>
                  {!isCollapsed && isOpen && (
                    <div className={styles.submenu}>
                      {item.children.map((child) => {
                        const isActive = activeHref === child.href;

                        return (
                          <NavigationLink
                            key={child.labelKey}
                            href={child.href}
                            className={cn(
                              styles.navItem,
                              styles.childItem,
                              isActive && styles.active,
                            )}
                            onClick={onCloseMobile}
                            title={isCollapsed ? translations(child.labelKey) : undefined}
                          >
                            <span className={styles.navIcon}>
                              <child.Icon size={20} />
                            </span>
                            <Typography
                              variant="body-m"
                              fontWeight={isActive ? 'semibold' : 'medium'}
                              tag="span"
                            >
                              {translations(child.labelKey)}
                            </Typography>
                          </NavigationLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = activeHref === item.href;

            return (
              <NavigationLink
                key={item.href}
                href={item.href}
                className={cn(styles.navItem, isActive && styles.active)}
                onClick={onCloseMobile}
                title={isCollapsed ? translations(item.labelKey) : undefined}
              >
                <span className={styles.navIcon}>
                  <item.Icon size={20} />
                </span>
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
