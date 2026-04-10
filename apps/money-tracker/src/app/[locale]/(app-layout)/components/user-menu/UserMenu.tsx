'use client';

import type { FC } from 'react';

import { Avatar, AvatarFallback } from '@track-my-life/ui/src/components/atoms/avatar/avatar';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@track-my-life/ui/src/components/molecules/dropdown-menu/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { signOut } from '@/actions/sign-out';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './UserMenu.module.scss';

export const UserMenu: FC = () => {
  const translations = useTranslations(I18N_NAMESPACE.navigation);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={styles.trigger}>
          <Avatar size="sm">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={() => {
            void signOut();
          }}
        >
          <LogOut size={16} />
          <Typography variant="body-m" tag="span">
            {translations('actions.signOut')}
          </Typography>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
