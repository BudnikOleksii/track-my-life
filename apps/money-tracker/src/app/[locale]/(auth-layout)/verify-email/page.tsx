import type { Metadata } from 'next';
import type { FC } from 'react';

import { API_BASE_URL } from '@track-my-life/shared/src/api/api-config';
import { AuthApiService } from '@track-my-life/shared/src/api/services/auth-api.service';
import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { VerifyEmailPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    token?: string;
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

const verifyEmailToken = async (token: string): Promise<'success' | 'error'> => {
  const authApiService = new AuthApiService({ baseUrl: API_BASE_URL });
  const { error } = await authApiService.verifyEmail(token);
  return error ? 'error' : 'success';
};

const VerifyEmailPage: FC<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const tVerifyEmail = await getTranslations(I18N_NAMESPACE.verifyEmailPage);

  if (!searchParams.token) {
    return <VerifyEmailPageContent tVerifyEmail={tVerifyEmail} status="waiting" />;
  }

  const status = await verifyEmailToken(searchParams.token);
  return <VerifyEmailPageContent tVerifyEmail={tVerifyEmail} status={status} />;
};

export default VerifyEmailPage;
