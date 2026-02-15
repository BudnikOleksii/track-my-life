import type { FC } from 'react';

import { NavigationLink } from '@track-my-life/shared/src/i18n/navigation/NavigationLink';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';

import { PATHS } from '@/constants/paths';

import styles from './page.module.scss';

interface VerifyEmailPageContentProps {
  tVerifyEmail: (key: string) => string;
}

export const VerifyEmailPageContent: FC<VerifyEmailPageContentProps> = ({ tVerifyEmail }) => (
  <main className={styles.main}>
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>{tVerifyEmail('content.title')}</CardTitle>
        <CardDescription>{tVerifyEmail('content.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <NavigationLink href={PATHS.signIn} className={styles.footerLink}>
          {tVerifyEmail('content.signInLink')}
        </NavigationLink>
      </CardContent>
    </Card>
  </main>
);
