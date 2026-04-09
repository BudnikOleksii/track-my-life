'use client';

import type { FC } from 'react';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { NavigationLink } from '@track-my-life/next-shared/src/i18n/navigation/NavigationLink';
import { UnderlineLink } from '@track-my-life/ui/src/components/atoms/underline-link/underline-link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';
import { useEffect } from 'react';

import { PATHS } from '@/constants/paths';

import styles from './page.module.scss';

export type VerifyEmailStatus = 'waiting' | 'success' | 'error';

const REDIRECT_DELAY_MS = 1000;

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
  const router = useRouter();

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    const timer = setTimeout(() => {
      router.replace(PATHS.signIn);
    }, REDIRECT_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [status, router]);

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
    </main>
  );
};
