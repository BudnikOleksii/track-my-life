import type { Metadata } from 'next';
import type { FC } from 'react';

import { getAuthenticatedUserOrRedirect } from '@track-my-life/shared/src/supabase/auth/get-user-or-redirect';
import { getTranslations } from 'next-intl/server';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { DashboardPageContent } from './page.content';

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

  return <DashboardPageContent user={user} translations={translations} />;
};

export default DashboardPage;
