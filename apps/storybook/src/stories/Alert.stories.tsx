import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@track-my-life/ui/src/components/atoms/alert/alert';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'The visual variant of the alert',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert style={{ minWidth: '360px' }}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Alert style={{ minWidth: '360px' }}>
      <span style={{ fontSize: '1.25rem' }}>✓</span>
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected immediately.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" style={{ minWidth: '360px' }}>
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method and try again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Alert style={{ minWidth: '360px' }}>
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Enable
        </Button>
      </AlertAction>
    </Alert>
  ),
};
