'use client';

import type { FC } from 'react';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { useEffect } from 'react';

import { PATHS } from '@/constants/paths';

const REDIRECT_DELAY_MS = 1000;

export const SuccessRedirect: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(PATHS.onboarding);
    }, REDIRECT_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return null;
};
