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

import { ROUTES } from '@/constants/routes';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { LoginError } from './constants';

import { AuthForm } from '../components/AuthForm';
import OAuthProviderButtons from '../components/OAuthProviderButtons';
import { signIn } from './action';
import { LOGIN_ERROR } from './constants';

interface Props {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: LoginError;
  }>;
}

const getErrorMessageKey = (errorCode: LoginError) => {
  switch (errorCode) {
    case LOGIN_ERROR.validation: {
      return 'validation';
    }
    case LOGIN_ERROR.credentials: {
      return 'invalidCredentials';
    }
    default: {
      return 'generic';
    }
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.signInPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const SignInPage: FC<Props> = async (props) => {
  const { error } = await props.searchParams;

  const tSignIn = await getTranslations(I18N_NAMESPACE.signInPage);
  const tAuthShared = await getTranslations(I18N_NAMESPACE.authShared);

  const errorMessageCode = error && getErrorMessageKey(error);
  const errorList = errorMessageCode && [{ message: tAuthShared(`errors.${errorMessageCode}`) }];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{tSignIn('content.title')}</CardTitle>
          <CardDescription>{tSignIn('content.subtitle')}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <AuthForm
            errorList={errorList}
            action={signIn}
            submitText={tSignIn('content.signInButton')}
          />

          <FieldSeparator>{tAuthShared('orLabel')}</FieldSeparator>

          <OAuthProviderButtons
            googleLabel={tAuthShared('continueWithGoogle')}
            githubLabel={tAuthShared('continueWithGitHub')}
            linkedinLabel={tAuthShared('continueWithLinkedIn')}
          />

          <p className="text-muted-foreground text-sm text-center">
            {tSignIn('content.noAccount')}{' '}
            <NavigationLink
              href={ROUTES.signUp}
              className="text-primary underline-offset-4 hover:underline"
            >
              {tSignIn('content.signUpLink')}
            </NavigationLink>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignInPage;
