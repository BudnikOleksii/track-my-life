'use client';

import type { FC } from 'react';

import { Avatar, AvatarFallback } from '@track-my-life/ui/src/components/atoms/avatar/avatar';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { signOut } from '@/actions/sign-out';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './UserMenu.module.scss';

export const UserMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const translations = useTranslations(I18N_NAMESPACE.navigation);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.userMenu} ref={menuRef} onBlur={handleBlur}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar size="sm">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          <form action={signOut}>
            <button type="submit" className={styles.dropdownItem} role="menuitem">
              <LogOut size={16} />
              <Typography variant="body-m" tag="span">
                {translations('actions.signOut')}
              </Typography>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
