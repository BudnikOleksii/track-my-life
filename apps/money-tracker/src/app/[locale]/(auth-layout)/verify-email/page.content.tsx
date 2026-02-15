import type { FC } from 'react';

import { NavigationLink } from '@track-my-life/shared/src/i18n/navigation/NavigationLink';
import { UnderlineLink } from '@track-my-life/ui/src/components/atoms/underline-link/underline-link';
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
        <CardTitle>{tVerifyEmail('content.title')}</CardTitle>
        <CardDescription>{tVerifyEmail('content.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <UnderlineLink component={NavigationLink} href={PATHS.signIn}>
          {tVerifyEmail('content.signInLink')}
        </UnderlineLink>
      </CardContent>
    </Card>
  </main>
);
