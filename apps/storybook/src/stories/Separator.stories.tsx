import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '@track-my-life/ui/src/components/atoms/separator/separator';

const meta: Meta<typeof Separator> = {
  title: 'Atoms/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is purely decorative',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <span>Content above the separator</span>
      <Separator orientation="horizontal" />
      <span>Content below the separator</span>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: '40px' }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <strong>Section One</strong>
        <p style={{ margin: '0.25rem 0 0' }}>Some descriptive text for the first section.</p>
      </div>
      <Separator />
      <div>
        <strong>Section Two</strong>
        <p style={{ margin: '0.25rem 0 0' }}>Some descriptive text for the second section.</p>
      </div>
      <Separator />
      <div>
        <strong>Section Three</strong>
        <p style={{ margin: '0.25rem 0 0' }}>Some descriptive text for the third section.</p>
      </div>
    </div>
  ),
};
