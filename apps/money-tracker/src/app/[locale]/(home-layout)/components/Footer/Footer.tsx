import type { FC } from 'react';

import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';

import styles from './Footer.module.scss';

interface FooterProps {
  translations: (key: string) => string;
}

const CURRENT_YEAR = new Date().getFullYear();

const FOOTER_LINK_LIST = [
  { href: '/privacy-policy', translationKey: 'content.footer.privacyPolicy' },
  { href: '/terms-of-service', translationKey: 'content.footer.termsOfService' },
  { href: '/contact', translationKey: 'content.footer.contactUs' },
] as const;

export const Footer: FC<FooterProps> = ({ translations }) => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <nav className={styles.nav}>
        {FOOTER_LINK_LIST.map((link) => (
          <Link key={link.href} className={styles.link} href={link.href}>
            <Typography variant="body-s">{translations(link.translationKey)}</Typography>
          </Link>
        ))}
      </nav>
      <Typography className={styles.copyright} variant="body-s">
        {translations('content.footer.copyright', { year: CURRENT_YEAR })}
      </Typography>
    </div>
  </footer>
);
