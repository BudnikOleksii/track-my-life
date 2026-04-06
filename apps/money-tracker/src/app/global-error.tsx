'use client';

import type { ErrorInfo } from 'next/error';
import type { FC } from 'react';

import { ErrorState } from '@track-my-life/ui/src/components/molecules/error-state/ErrorState';

const handleNavigateHome = () => {
  globalThis.location.href = '/';
};

const GlobalError: FC<ErrorInfo> = ({ unstable_retry }) => (
  <html lang="en">
    <body>
      <ErrorState
        title="Something went wrong"
        description="An unexpected error occurred. Please try again."
        retryLabel="Try again"
        navigateHomeLabel="Go to homepage"
        onRetry={unstable_retry}
        onNavigateHome={handleNavigateHome}
      />
    </body>
  </html>
);

export default GlobalError;
