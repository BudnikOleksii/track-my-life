import { NavigationLink } from '@track-my-life/shared/src/i18n/navigation/NavigationLink';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
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
          <CardTitle>
            <Typography variant="title-l">{tSignIn('content.title')}</Typography>
          </CardTitle>
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

          <Typography variant="body-m" className={styles.footerText}>
            {tSignIn('content.noAccount')}{' '}
            <NavigationLink href={PATHS.signUp} className={styles.footerLink}>
              {tSignIn('content.signUpLink')}
            </NavigationLink>
          </Typography>
        </CardContent>
      </Card>
    </main>
  );
};
