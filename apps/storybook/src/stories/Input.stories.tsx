import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@track-my-life/ui/src/components/atoms/input/input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'file'],
      description: 'The type of input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Sample text',
    placeholder: 'Enter text...',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your email address',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};

export const Error: Story = {
  args: {
    error: true,
    defaultValue: 'Invalid input',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Disabled input',
    placeholder: 'Enter text...',
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '300px',
      }}
    >
      <Input placeholder="Default state" />
      <Input defaultValue="With value" />
      <Input error placeholder="Error state" />
      <Input disabled placeholder="Disabled state" />
      <Input disabled defaultValue="Disabled with value" />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '300px',
      }}
    >
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="email@example.com" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="0" />
      <Input type="tel" placeholder="Phone number" />
      <Input type="url" placeholder="https://example.com" />
      <Input type="search" placeholder="Search..." />
      <Input type="file" />
    </div>
  ),
};
