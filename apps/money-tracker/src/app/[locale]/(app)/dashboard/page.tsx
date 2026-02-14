import type { Metadata } from 'next';
import type { FC } from 'react';

import { getAuthenticatedUserOrRedirect } from '@track-my-life/shared/src/supabase/auth/get-user-or-redirect';
import { Button } from '@track-my-life/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/components/card';
import { getTranslations } from 'next-intl/server';

import { signOut } from '@/actions/sign-out';
import { PATHS } from '@/constants/paths';
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
    namespace: I18N_NAMESPACE.dashboardPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const DashboardPage: FC<Props> = async (props) => {
  await props.params;

  const user = await getAuthenticatedUserOrRedirect(PATHS.signIn);

  const translations = await getTranslations(I18N_NAMESPACE.dashboardPage);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{translations('content.title')}</CardTitle>
          <CardDescription>{translations('content.welcome')}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">{translations('content.userInfo')}</h2>
            <p className="text-sm">
              <span className="font-medium">{translations('content.email')}: </span>
              {user.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">{translations('content.name')}: </span>
              {user.user_metadata?.name ?? ''}
            </p>
          </section>

          <form action={signOut} className="pt-4">
            <Button type="submit" variant="outline" className="w-full">
              {translations('content.logoutButton')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default DashboardPage;
