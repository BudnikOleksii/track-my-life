import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';

const meta: Meta<typeof Field> = {
  title: 'Molecules/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'responsive'],
      description: 'Layout direction of the field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="Enter your email" />
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const WithDescription: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="email-desc">Email</FieldLabel>
      <FieldDescription>We will never share your email with anyone else.</FieldDescription>
      <Input id="email-desc" type="email" placeholder="Enter your email" />
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const WithError: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="email-err">Email</FieldLabel>
      <Input
        id="email-err"
        type="email"
        placeholder="Enter your email"
        error
        defaultValue="invalid-email"
      />
      <FieldError>Please enter a valid email address</FieldError>
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const WithErrorList: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="pass">Password</FieldLabel>
      <Input id="pass" type="password" placeholder="Password" error />
      <FieldError errors={[{ message: 'Minimum 8 characters' }, { message: 'Include a number' }]} />
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="email-dis">Email</FieldLabel>
      <FieldDescription>This field is disabled</FieldDescription>
      <Input
        id="email-dis"
        type="email"
        placeholder="Enter your email"
        disabled
        defaultValue="disabled@example.com"
      />
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const Password: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="pass-story">Password</FieldLabel>
      <FieldDescription>Password must be at least 8 characters</FieldDescription>
      <Input id="pass-story" type="password" placeholder="Enter your password" />
    </Field>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const FormExample: Story = {
  render: () => (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '400px',
      }}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Field>
        <FieldLabel htmlFor="form-name">Full Name</FieldLabel>
        <Input id="form-name" type="text" placeholder="John Doe" />
      </Field>
      <Field>
        <FieldLabel htmlFor="form-email">Email</FieldLabel>
        <FieldDescription>We will never share your email</FieldDescription>
        <Input id="form-email" type="email" placeholder="email@example.com" />
      </Field>
      <Field>
        <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
        <Input id="form-phone" type="tel" placeholder="+1 (555) 000-0000" />
      </Field>
      <Field>
        <FieldLabel htmlFor="form-password">Password</FieldLabel>
        <FieldDescription>Must be at least 8 characters</FieldDescription>
        <Input id="form-password" type="password" placeholder="Enter password" />
      </Field>
    </form>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '400px',
      }}
    >
      <Field>
        <FieldLabel htmlFor="valid">Valid Email</FieldLabel>
        <Input id="valid" type="email" defaultValue="user@example.com" />
        <FieldDescription>Looks good!</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="invalid">Invalid Email</FieldLabel>
        <Input id="invalid" type="email" defaultValue="invalid-email" error />
        <FieldError>Please enter a valid email address</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="disabled">Disabled Field</FieldLabel>
        <Input id="disabled" defaultValue="Cannot edit this" disabled />
        <FieldDescription>This field is disabled</FieldDescription>
      </Field>
    </div>
  ),
};
