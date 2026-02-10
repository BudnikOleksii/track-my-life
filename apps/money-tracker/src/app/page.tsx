import type { FC } from 'react';

import { Button } from '@track-my-life/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/components/card';

const Home: FC = () => (
  <main className="flex min-h-screen flex-col items-center justify-center p-24">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to Track My Life</CardTitle>
        <CardDescription>Get started by editing this page.</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </CardContent>
    </Card>
  </main>
);

export default Home;
