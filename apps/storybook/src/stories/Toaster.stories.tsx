import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Toaster } from '@track-my-life/ui/src/components/molecules/toaster/toaster';
import { toast } from 'sonner';

const TIME_OUT = 2000;

const meta: Meta<typeof Toaster> = {
  title: 'Molecules/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Button onClick={() => toast('This is a default toast message.')}>Show Toast</Button>
      <Toaster />
    </>
  ),
};

export const Success: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.success('Your changes have been saved successfully.')}>
        Show Success
      </Button>
      <Toaster />
    </>
  ),
};

export const Error: Story = {
  render: () => (
    <>
      <Button
        variant="destructive"
        onClick={() => toast.error('Something went wrong. Please try again.')}
      >
        Show Error
      </Button>
      <Toaster />
    </>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast('Update Available', {
            description:
              'A new version of the application is available. Click the button below to update.',
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  ),
};

export const WithAction: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast('Meeting Scheduled', {
            description: 'Your meeting has been scheduled for tomorrow at 2:00 PM.',
            action: {
              label: 'View',
              onClick: () => {},
            },
          })
        }
      >
        Schedule Meeting
      </Button>
      <Toaster />
    </>
  ),
};

export const PromiseToast: Story = {
  render: () => (
    <>
      <Button
        onClick={() => {
          const promise = new Promise((resolve) => globalThis.setTimeout(resolve, TIME_OUT));
          toast.promise(promise, {
            loading: 'Saving...',
            success: 'Saved!',
            error: 'Failed to save',
          });
        }}
      >
        Save
      </Button>
      <Toaster />
    </>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button onClick={() => toast('Default notification')}>Default</Button>
      <Button onClick={() => toast.success('Operation completed successfully.')}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error('Something went wrong.')}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.loading('Loading...', { id: 'loading-toast' })}
      >
        Loading
      </Button>
      <Toaster />
    </div>
  ),
};
