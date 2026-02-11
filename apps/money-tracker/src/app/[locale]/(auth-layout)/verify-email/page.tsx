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
import { getTranslations } from 'next-intl/server';

import { ROUTES } from '@/constants/routes';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.verifyEmailPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const VerifyEmailPage: FC<Props> = async () => {
  const tVerifyEmail = await getTranslations(I18N_NAMESPACE.verifyEmailPage);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{tVerifyEmail('content.title')}</CardTitle>
          <CardDescription>{tVerifyEmail('content.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <NavigationLink
            href={ROUTES.signIn}
            className="text-primary underline-offset-4 hover:underline"
          >
            {tVerifyEmail('content.signInLink')}
          </NavigationLink>
        </CardContent>
      </Card>
    </main>
  );
};

export default VerifyEmailPage;
