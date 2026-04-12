import type { FC, PropsWithChildren } from 'react';

import { redirect } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';

import { fetchOnboardingStatus } from '@/actions/fetch-onboarding-status';
import { PATHS } from '@/constants/paths';

import styles from './layout.module.scss';

const OnboardingLayout: FC<PropsWithChildren> = async ({ children }) => {
  const [status, locale] = await Promise.all([fetchOnboardingStatus(), getLocale()]);

  if (status && !status.emailVerified) {
    redirect({ href: PATHS.verifyEmail, locale });
  }

  if (status && status.onboardingCompleted) {
    redirect({ href: PATHS.dashboard, locale });
  }

  return <main className={styles.main}>{children}</main>;
};

export default OnboardingLayout;
