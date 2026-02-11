import type { Metadata } from 'next';
import type { FC } from 'react';

import { Button } from '@track-my-life/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/components/card';
import { getTranslations } from 'next-intl/server';

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
    namespace: I18N_NAMESPACE.homePage,
  });

  return {
    title: translations('metadata.title'),
    description: translations('metadata.description'),
  };
};

const HomePage: FC<Props> = async () => {
  const translations = await getTranslations(I18N_NAMESPACE.homePage);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{translations('content.title')}</CardTitle>
          <CardDescription>{translations('content.description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button>{translations('content.getStarted')}</Button>
          <Button variant="outline">{translations('content.learnMore')}</Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default HomePage;
