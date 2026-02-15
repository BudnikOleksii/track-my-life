import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@track-my-life/ui/src/components/molecules/accordion/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be open',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the open item can be collapsed (single type only)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" style={{ width: '400px' }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
        <AccordionContent>
          Click on Forgot Password on the login page, enter your email, and we will send you a link
          to reset your password.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I change my subscription plan?</AccordionTrigger>
        <AccordionContent>
          Yes, you can upgrade or downgrade your plan at any time from your account settings.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1']} style={{ width: '400px' }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Notification Settings</AccordionTrigger>
        <AccordionContent>
          Manage how you receive notifications. You can enable email alerts or push notifications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Privacy & Security</AccordionTrigger>
        <AccordionContent>Control your privacy and security preferences here.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing & Subscription</AccordionTrigger>
        <AccordionContent>
          View and manage your billing information and subscription plan.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithBorders: Story = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      style={{
        width: '400px',
        border: '1px solid var(--outline-variant)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          We offer monthly and annual plans. Billing is charged at the beginning of each cycle.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is my data secure?</AccordionTrigger>
        <AccordionContent>
          Yes, we use industry-standard encryption to protect your data.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
