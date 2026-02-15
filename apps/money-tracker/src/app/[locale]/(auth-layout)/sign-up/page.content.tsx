import type { FC } from 'react';

import { NavigationLink } from '@track-my-life/shared/src/i18n/navigation/NavigationLink';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { UnderlineLink } from '@track-my-life/ui/src/components/atoms/underline-link/underline-link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';
import { FieldSeparator } from '@track-my-life/ui/src/components/molecules/field/field';

import { PATHS } from '@/constants/paths';

import { AuthForm } from '../components/auth-form/AuthForm';
import { OAuthProviderButtons } from '../components/oauth-provider-buttons/OAuthProviderButtons';
import { signUp } from './action';
import styles from './page.module.scss';

interface SignUpPageContentProps {
  tSignUp: (key: string) => string;
  tAuthShared: (key: string) => string;
}

export const SignUpPageContent: FC<SignUpPageContentProps> = ({ tSignUp, tAuthShared }) => (
  <main className={styles.main}>
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>{tSignUp('content.title')}</CardTitle>
        <CardDescription>{tSignUp('content.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <AuthForm action={signUp} submitText={tSignUp('content.signUpButton')} />

        <FieldSeparator>{tAuthShared('orLabel')}</FieldSeparator>

        <OAuthProviderButtons
          googleLabel={tAuthShared('continueWithGoogle')}
          githubLabel={tAuthShared('continueWithGitHub')}
          linkedinLabel={tAuthShared('continueWithLinkedIn')}
        />

        <Typography className={styles.footerText}>
          {tSignUp('content.haveAccount')}{' '}
          <UnderlineLink component={NavigationLink} href={PATHS.signIn}>
            {tSignUp('content.signInLink')}
          </UnderlineLink>
        </Typography>
      </CardContent>
    </Card>
  </main>
);
