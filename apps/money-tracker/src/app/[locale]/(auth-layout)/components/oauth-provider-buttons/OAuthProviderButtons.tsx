'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { useState } from 'react';

import styles from './OAuthProviderButtons.module.scss';

type OAuthProviderName = 'google' | 'github';

interface Props {
  googleLabel: string;
  githubLabel: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const AUTH_PROVIDER_GOOGLE: OAuthProviderName = 'google';
const AUTH_PROVIDER_GITHUB: OAuthProviderName = 'github';

const PROVIDER_URL_MAP: Record<OAuthProviderName, string> = {
  google: `${API_BASE_URL}/api/auth/google`,
  github: `${API_BASE_URL}/api/auth/github`,
};

export const OAuthProviderButtons: FC<Props> = ({ googleLabel, githubLabel }) => {
  const [activeProvider, setActiveProvider] = useState<OAuthProviderName | null>(null);

  const handleProviderClick = (provider: OAuthProviderName) => {
    setActiveProvider(provider);
    globalThis.location.href = PROVIDER_URL_MAP[provider];
  };

  const isSubmitting = Boolean(activeProvider);

  return (
    <div className={styles.root}>
      <Button
        type="button"
        variant="outline"
        disabled={isSubmitting}
        onClick={() => handleProviderClick(AUTH_PROVIDER_GOOGLE)}
      >
        {googleLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={isSubmitting}
        onClick={() => handleProviderClick(AUTH_PROVIDER_GITHUB)}
      >
        {githubLabel}
      </Button>
    </div>
  );
};
