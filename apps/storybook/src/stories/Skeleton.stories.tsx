import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: 'Width of the skeleton',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Square: Story = {
  args: {
    width: 48,
    height: 48,
  },
};

export const Card: Story = {
  args: {
    width: 300,
    height: 120,
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: 300 }}>
      <Skeleton width="100%" height={20} />
      <Skeleton width="80%" height={16} />
      <Skeleton width="60%" height={16} />
    </div>
  ),
};
