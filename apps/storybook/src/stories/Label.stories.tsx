import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import { Label } from '@track-my-life/ui/src/components/atoms/label/label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows asterisk)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the label is disabled',
    },
    children: {
      control: 'text',
      description: 'The text content of the label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label text',
  },
};

export const Required: Story = {
  args: {
    children: 'Email',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled field',
    disabled: true,
  },
};

export const RequiredAndDisabled: Story = {
  args: {
    children: 'Required but disabled',
    required: true,
    disabled: true,
  },
};

export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const RequiredWithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
      <Label htmlFor="required-email" required>
        Email
      </Label>
      <Input id="required-email" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const DisabledWithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
      <Label htmlFor="disabled-email" disabled>
        Email
      </Label>
      <Input id="disabled-email" type="email" placeholder="email@example.com" disabled />
    </div>
  ),
};

export const ErrorWithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
      <Label htmlFor="error-email" required>
        Email
      </Label>
      <Input id="error-email" type="email" placeholder="email@example.com" error />
      <span style={{ fontSize: '12px', color: 'var(--error)', marginTop: '4px' }}>
        Please enter a valid email address
      </span>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '300px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Label htmlFor="form-name" required>
          Full Name
        </Label>
        <Input id="form-name" type="text" placeholder="John Doe" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Label htmlFor="form-email" required>
          Email
        </Label>
        <Input id="form-email" type="email" placeholder="email@example.com" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Label htmlFor="form-phone">Phone</Label>
        <Input id="form-phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Label htmlFor="form-bio">Bio</Label>
        <Input id="form-bio" type="text" placeholder="Tell us about yourself" />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Label>Default label</Label>
      <Label required>Required label</Label>
      <Label disabled>Disabled label</Label>
      <Label required disabled>
        Required and disabled label
      </Label>
    </div>
  ),
};
