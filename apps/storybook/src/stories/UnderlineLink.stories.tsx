import type { Meta, StoryObj } from '@storybook/react-vite';

import { UnderlineLink } from '@track-my-life/ui/src/components/atoms/underline-link/underline-link';

const meta: Meta<typeof UnderlineLink> = {
  title: 'Atoms/UnderlineLink',
  component: UnderlineLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The link content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Click me',
  },
};

export const LongText: Story = {
  args: {
    href: '#',
    children: 'This is a longer link text that demonstrates the underline behavior',
  },
};

const handleButtonClick = () => {};

export const AsButton: Story = {
  render: () => (
    <UnderlineLink component="button" onClick={handleButtonClick}>
      Trigger action
    </UnderlineLink>
  ),
};
