import {
  ClerkProvider,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import './globals.css'
import Buttonstyle from './avater'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
    <ClerkProvider>
      <html lang="en">
        <body className="relative">
          {/* Display SignInButton when the user is signed out */}
          <SignedOut>
            <RedirectToSignIn />

          </SignedOut>

          {/* Display UserButton when the user is signed in */}
          <SignedIn>\
            <UserButton />
           
          </SignedIn>

          {/* Render the children content */}
          {children}
        </body>
      </html>
    </ClerkProvider>
    </div>
  )
}
