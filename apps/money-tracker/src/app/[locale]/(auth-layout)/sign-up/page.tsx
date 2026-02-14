import type { Metadata } from 'next';
import type { FC } from 'react';

import { NavigationLink } from '@track-my-life/shared/src/i18n/navigation/NavigationLink';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/components/card';
import { FieldSeparator } from '@track-my-life/ui/components/field';
import { getTranslations } from 'next-intl/server';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { AuthForm } from '../components/AuthForm';
import OAuthProviderButtons from '../components/OAuthProviderButtons';
import { signUp } from './action';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.signUpPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const SignUpPage: FC<Props> = async (props) => {
  await props.params;
  const tSignUp = await getTranslations(I18N_NAMESPACE.signUpPage);
  const tAuthShared = await getTranslations(I18N_NAMESPACE.authShared);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{tSignUp('content.title')}</CardTitle>
          <CardDescription>{tSignUp('content.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AuthForm action={signUp} submitText={tSignUp('content.signUpButton')} />

          <FieldSeparator>{tAuthShared('orLabel')}</FieldSeparator>

          <OAuthProviderButtons
            googleLabel={tAuthShared('continueWithGoogle')}
            githubLabel={tAuthShared('continueWithGitHub')}
            linkedinLabel={tAuthShared('continueWithLinkedIn')}
          />

          <p className="text-muted-foreground text-sm text-center">
            {tSignUp('content.haveAccount')}{' '}
            <NavigationLink
              href={PATHS.signIn}
              className="text-primary underline-offset-4 hover:underline"
            >
              {tSignUp('content.signInLink')}
            </NavigationLink>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUpPage;
