'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { useState } from 'react';

import styles from './OAuthProviderButtons.module.scss';

type OAuthProviderName = 'google' | 'github' | 'linkedin_oidc';

interface Props {
  googleLabel: string;
  githubLabel: string;
  linkedinLabel: string;
}

const AUTH_PROVIDER_GOOGLE: OAuthProviderName = 'google';
const AUTH_PROVIDER_GITHUB: OAuthProviderName = 'github';
const AUTH_PROVIDER_LINKEDIN: OAuthProviderName = 'linkedin_oidc';

export const OAuthProviderButtons: FC<Props> = ({ googleLabel, githubLabel, linkedinLabel }) => {
  const [activeProvider, setActiveProvider] = useState<OAuthProviderName | null>(null);

  const handleProviderClick = async (_provider: OAuthProviderName) => {
    setActiveProvider(_provider);

    try {
      // TODO: wire to backend OAuth endpoint when available
    } finally {
      setActiveProvider(null);
    }
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
      <Button
        type="button"
        variant="outline"
        disabled={isSubmitting}
        onClick={() => handleProviderClick(AUTH_PROVIDER_LINKEDIN)}
      >
        {linkedinLabel}
      </Button>
    </div>
  );
};
