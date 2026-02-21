// oxlint-disable no-magic-numbers
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from '@track-my-life/ui/src/components/atoms/aspect-ratio/aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Atoms/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'number',
      description: 'Width / height ratio',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--surface-container-high)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--on-surface-variant)',
          }}
        >
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <AspectRatio ratio={1}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--surface-container-high)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--on-surface-variant)',
          }}
        >
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div style={{ width: '180px' }}>
      <AspectRatio ratio={9 / 16}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--surface-container-high)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--on-surface-variant)',
          }}
        >
          9:16
        </div>
      </AspectRatio>
    </div>
  ),
};
