import type { Metadata } from 'next';
import type { FC } from 'react';

import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { VerifyEmailStatus } from './page.content';

import { VerifyEmailPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    status?: string;
    error?: string;
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

const parseVerifyEmailStatus = (status?: string): VerifyEmailStatus => {
  if (status === 'success') {
    return 'success';
  }
  if (status === 'error') {
    return 'error';
  }
  return 'waiting';
};

const VerifyEmailPage: FC<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const tVerifyEmail = await getTranslations(I18N_NAMESPACE.verifyEmailPage);
  const status = parseVerifyEmailStatus(searchParams.status);

  return (
    <VerifyEmailPageContent
      tVerifyEmail={tVerifyEmail}
      status={status}
      errorReason={searchParams.error}
    />
  );
};

export default VerifyEmailPage;
