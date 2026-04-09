import type { FC } from 'react';

import { NavigationLink } from '@track-my-life/next-shared/src/i18n/navigation/NavigationLink';
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

type VerifyEmailStatus = 'waiting' | 'success' | 'error';

interface VerifyEmailPageContentProps {
  tVerifyEmail: (key: string) => string;
  status: VerifyEmailStatus;
}

const STATUS_TITLE_MAP: Record<VerifyEmailStatus, string> = {
  waiting: 'content.title',
  success: 'content.successTitle',
  error: 'content.errorTitle',
};

const STATUS_SUBTITLE_MAP: Record<VerifyEmailStatus, string> = {
  waiting: 'content.subtitle',
  success: 'content.successSubtitle',
  error: 'content.errorSubtitle',
};

export const VerifyEmailPageContent: FC<VerifyEmailPageContentProps> = ({
  tVerifyEmail,
  status,
}) => (
  <main className={styles.main}>
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>{tVerifyEmail(STATUS_TITLE_MAP[status])}</CardTitle>
        <CardDescription>{tVerifyEmail(STATUS_SUBTITLE_MAP[status])}</CardDescription>
      </CardHeader>
      <CardContent>
        <UnderlineLink component={NavigationLink} href={PATHS.signIn}>
          {tVerifyEmail('content.signInLink')}
        </UnderlineLink>
      </CardContent>
    </Card>
  </main>
);
