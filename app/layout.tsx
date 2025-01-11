import {
  ClerkProvider,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import './globals.css'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClerkProvider>
        <html lang="en">
          <body className="relative">
            {/* Display SignInButton when the user is signed out */}
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>

            {/* Display UserButton when the user is signed in */}
            <SignedIn>
              <div className="absolute top-4 right-4">
                <UserButton />
              </div>
            </SignedIn>

            {/* Render the children content */}
            {children}
          </body>
        </html>
      </ClerkProvider>
    </Suspense>
  )
}
