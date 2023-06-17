import { Button } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-5xl text-blue-600">Welcome to UniDash!</h1>
      <Button color="primary" auto>
        Get Started
      </Button>
    </div>
  );
}