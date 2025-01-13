
import React, { useEffect, useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';
import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react"

interface RootLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata={
  title: "swahilipro App",
  description: "Clerk App",
  
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
        <body className="relative">
        
          

          {children}
          <SpeedInsights/>

        </body>
      </html>
  );
};

