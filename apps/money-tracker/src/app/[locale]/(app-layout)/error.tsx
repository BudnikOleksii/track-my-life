'use client';

import type { ErrorInfo } from 'next/error';
import type { FC } from 'react';

import { AppErrorBoundary } from '@/components/app-error-boundary/AppErrorBoundary';
import { PATHS } from '@/constants/paths';

const AppLayoutError: FC<ErrorInfo> = ({ unstable_retry }) => (
  <AppErrorBoundary homePath={PATHS.dashboard} unstable_retry={unstable_retry} />
);

export default AppLayoutError;
