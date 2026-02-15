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
import { getTranslations } from 'next-intl/server';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { AuthForm } from '../components/auth-form/AuthForm';
import { OAuthProviderButtons } from '../components/oauth-provider-buttons/OAuthProviderButtons';
import { signIn } from './action';
import styles from './page.module.scss';

export const SignInPageContent = async () => {
  const tSignIn = await getTranslations(I18N_NAMESPACE.signInPage);
  const tAuthShared = await getTranslations(I18N_NAMESPACE.authShared);

  return (
    <main className={styles.main}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>{tSignIn('content.title')}</CardTitle>
          <CardDescription>{tSignIn('content.subtitle')}</CardDescription>
        </CardHeader>

        <CardContent className={styles.cardContent}>
          <AuthForm action={signIn} submitText={tSignIn('content.signInButton')} />

          <FieldSeparator>{tAuthShared('orLabel')}</FieldSeparator>

          <OAuthProviderButtons
            googleLabel={tAuthShared('continueWithGoogle')}
            githubLabel={tAuthShared('continueWithGitHub')}
            linkedinLabel={tAuthShared('continueWithLinkedIn')}
          />

          <Typography className={styles.footerText}>
            {tSignIn('content.noAccount')}{' '}
            <UnderlineLink component={NavigationLink} href={PATHS.signUp}>
              {tSignIn('content.signUpLink')}
            </UnderlineLink>
          </Typography>
        </CardContent>
      </Card>
    </main>
  );
};
