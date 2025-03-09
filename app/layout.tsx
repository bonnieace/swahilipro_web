import "./globals.css";
import {Analytics} from "@vercel/analytics/react"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        {/* Display SignInButton when the user is signed out */}

        {/* Display UserButton when the user is signed in */}

        {/* Render the children content */}
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
