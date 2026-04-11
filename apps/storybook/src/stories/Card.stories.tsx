import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the card content area. Add any content here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of what this card is about.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area. Add any content here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This is the card content area. Add any content here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const FullCard: Story = {
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <CardTitle>Full Card Example</CardTitle>
        <CardDescription>All sub-components combined into one card.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          This card demonstrates all available sub-components working together in a single layout.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save</Button>
      </CardFooter>
    </Card>
  ),
};
