import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'title-xl',
        'title-l',
        'title-m',
        'title-s',
        'title-xs',
        'body-l',
        'body-m',
        'body-s',
      ],
      description: 'The typographic scale variant',
    },
    fontWeight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold', 'extra-bold'],
      description: 'The font weight override',
    },
    children: {
      control: 'text',
      description: 'The text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'body-m',
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export const TitleXL: Story = {
  args: {
    variant: 'title-xl',
    children: 'Title Extra Large',
  },
};

export const TitleL: Story = {
  args: {
    variant: 'title-l',
    children: 'Title Large',
  },
};

export const TitleM: Story = {
  args: {
    variant: 'title-m',
    children: 'Title Medium',
  },
};

export const TitleS: Story = {
  args: {
    variant: 'title-s',
    children: 'Title Small',
  },
};

export const TitleXS: Story = {
  args: {
    variant: 'title-xs',
    children: 'Title Extra Small',
  },
};

export const BodyL: Story = {
  args: {
    variant: 'body-l',
    children: 'Body large — the quick brown fox jumps over the lazy dog',
  },
};

export const BodyM: Story = {
  args: {
    variant: 'body-m',
    children: 'Body medium — the quick brown fox jumps over the lazy dog',
  },
};

export const BodyS: Story = {
  args: {
    variant: 'body-s',
    children: 'Body small — the quick brown fox jumps over the lazy dog',
  },
};

export const Bold: Story = {
  args: {
    variant: 'body-m',
    fontWeight: 'bold',
    children: 'Bold body text',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="title-xl">Title Extra Large</Typography>
      <Typography variant="title-l">Title Large</Typography>
      <Typography variant="title-m">Title Medium</Typography>
      <Typography variant="title-s">Title Small</Typography>
      <Typography variant="title-xs">Title Extra Small</Typography>
      <Typography variant="body-l">
        Body Large — the quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="body-m">
        Body Medium — the quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="body-s">
        Body Small — the quick brown fox jumps over the lazy dog
      </Typography>
    </div>
  ),
};
