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

import { SuccessRedirect } from './components/success-redirect/SuccessRedirect';
import styles from './page.module.scss';

export type VerifyEmailStatus = 'waiting' | 'success' | 'error';

interface VerifyEmailPageContentProps {
  tVerifyEmail: (key: string) => string;
  status: VerifyEmailStatus;
  errorReason?: string | undefined;
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
  errorReason,
}) => {
  const subtitle = errorReason
    ? tVerifyEmail(`content.error_${errorReason}`)
    : tVerifyEmail(STATUS_SUBTITLE_MAP[status]);

  return (
    <main className={styles.main}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>{tVerifyEmail(STATUS_TITLE_MAP[status])}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <UnderlineLink component={NavigationLink} href={PATHS.signIn}>
            {tVerifyEmail('content.signInLink')}
          </UnderlineLink>
        </CardContent>
      </Card>

      {status === 'success' && <SuccessRedirect />}
    </main>
  );
};
