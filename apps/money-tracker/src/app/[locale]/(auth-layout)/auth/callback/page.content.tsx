'use client';

import type { FC } from 'react';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { NavigationLink } from '@track-my-life/next-shared/src/i18n/navigation/NavigationLink';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PATHS } from '@/constants/paths';

import { exchangeSocialCode } from './action';
import styles from './page.module.scss';

const SOCIAL_AUTH_ERROR_REASON = {
  EMAIL_EXISTS: 'email_exists',
} as const;

interface AuthCallbackPageContentProps {
  loadingText: string;
  errorTitle: string;
  errorEmailExists: string;
  errorGeneric: string;
  backToSignIn: string;
}

export const AuthCallbackPageContent: FC<AuthCallbackPageContentProps> = ({
  loadingText,
  errorTitle,
  errorEmailExists,
  errorGeneric,
  backToSignIn,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const reason = searchParams.get('reason');

  useEffect(() => {
    if (error) {
      setErrorMessage(
        reason === SOCIAL_AUTH_ERROR_REASON.EMAIL_EXISTS ? errorEmailExists : errorGeneric,
      );
      return;
    }

    if (!code) {
      setErrorMessage(errorGeneric);
      return;
    }

    let cancelled = false;

    const handleExchange = async () => {
      const result = await exchangeSocialCode(code);

      if (cancelled) {
        return;
      }

      if (result.success) {
        router.replace(PATHS.dashboard);
      } else {
        setErrorMessage(errorGeneric);
      }
    };

    handleExchange();

    return () => {
      cancelled = true;
    };
  }, [code, error, reason, router, errorEmailExists, errorGeneric]);

  if (errorMessage) {
    return (
      <main className={styles.main}>
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>{errorTitle}</CardTitle>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <Typography>{errorMessage}</Typography>
            <Button variant="outline" component={NavigationLink} href={PATHS.signIn}>
              {backToSignIn}
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.loading}>
        <LoaderCircle className={styles.spinner} />
        <Typography>{loadingText}</Typography>
      </div>
    </main>
  );
};
