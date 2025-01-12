'use client';

import React, { useEffect, useState } from 'react';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next"

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Indicate that the component has mounted on the client
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Avoid rendering until after hydration
    return null;
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="relative">
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>

          <SignedIn>
            <div className="absolute top-4 right-4">
              <UserButton />
            </div>
          </SignedIn>

          {children}
          <SpeedInsights/>

        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
