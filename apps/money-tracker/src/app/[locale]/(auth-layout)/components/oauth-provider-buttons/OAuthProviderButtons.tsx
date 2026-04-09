'use client';

import type { ObjectValuesUnion } from '@track-my-life/shared/src/types/object-values-union';
import type { FC } from 'react';

import { API_BASE_URL } from '@track-my-life/shared/src/api/api-config';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { useState } from 'react';

import styles from './OAuthProviderButtons.module.scss';

const AUTH_PROVIDER = {
  GOOGLE: 'google',
  GITHUB: 'github',
} as const;

type OAuthProviderName = ObjectValuesUnion<typeof AUTH_PROVIDER>;

interface Props {
  googleLabel: string;
  githubLabel: string;
}

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
        onClick={() => handleProviderClick(AUTH_PROVIDER.GOOGLE)}
      >
        {googleLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={isSubmitting}
        onClick={() => handleProviderClick(AUTH_PROVIDER.GITHUB)}
      >
        {githubLabel}
      </Button>
    </div>
  );
};
