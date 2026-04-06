import type { Meta, StoryObj } from '@storybook/react-vite';

import { ErrorState } from '@track-my-life/ui/src/components/molecules/error-state/ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Molecules/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ErrorState
      title="Something went wrong"
      description="An unexpected error occurred. Please try again later or contact support if the problem persists."
    />
  ),
};

export const WithRetry: Story = {
  render: () => (
    <ErrorState
      title="Failed to load data"
      description="We could not retrieve your data at this time. Check your connection and try again."
      onRetry={() => {}}
    />
  ),
};

export const WithNavigateHome: Story = {
  render: () => (
    <ErrorState
      title="Page not found"
      description="The page you are looking for does not exist or has been moved."
      onNavigateHome={() => {}}
    />
  ),
};

export const WithAllActions: Story = {
  render: () => (
    <ErrorState
      title="Something went wrong"
      description="An unexpected error occurred while processing your request. You can try again or return to the homepage."
      onRetry={() => {}}
      onNavigateHome={() => {}}
    />
  ),
};
