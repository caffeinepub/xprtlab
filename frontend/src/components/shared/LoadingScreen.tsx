import React from 'react';

export default function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <div className="animate-pulse">
        <img
          src="/assets/generated/logo.png"
          alt="XpertLab"
          className="h-16 w-auto object-contain"
        />
      </div>
      <p className="text-muted-foreground text-sm font-medium">{message}</p>
    </div>
  );
}
