import dynamic from 'next/dynamic';
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import './globals.css';

const SignedIn = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignedIn),
  { ssr: false }
);
const SignedOut = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignedOut),
  { ssr: false }
);
const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        </body>
      </html>
    </ClerkProvider>
  );
}
