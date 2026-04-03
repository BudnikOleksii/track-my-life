'use client';

import type { FC } from 'react';

import { usePathname } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { useSidebar } from '../sidebar-provider/SidebarProvider';
import { UserMenu } from '../user-menu/UserMenu';
import styles from './AppHeader.module.scss';

const PATH_TO_LABEL_KEY: Record<string, string> = {
  [PATHS.dashboard]: 'labels.dashboard',
  [PATHS.transactions]: 'labels.transactions',
  [PATHS.recurringTransactions]: 'labels.recurringTransactions',
  [PATHS.categories]: 'labels.categories',
  [PATHS.budgets]: 'labels.budgets',
  [PATHS.settings]: 'labels.settings',
};

export const AppHeader: FC = () => {
  const { onToggleMobile } = useSidebar();
  const translations = useTranslations(I18N_NAMESPACE.navigation);
  const pathname = usePathname();

  const matchedPath = Object.keys(PATH_TO_LABEL_KEY).find(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  const labelKey = matchedPath ? PATH_TO_LABEL_KEY[matchedPath] : undefined;
  const pageTitle = labelKey ? translations(labelKey) : '';

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMobile}
          aria-label={translations('actions.openMenu')}
          className={styles.menuButton}
        >
          <Menu size={20} />
        </Button>

        <Typography variant="title-s" fontWeight="semibold" tag="h1" className={styles.pageTitle}>
          {pageTitle}
        </Typography>
      </div>

      <div className={styles.right}>
        <UserMenu />
      </div>
    </header>
  );
};
