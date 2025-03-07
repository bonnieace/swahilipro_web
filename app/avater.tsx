"use client";

import dynamic from "next/dynamic";

const UserButton = dynamic(() => import("@clerk/nextjs").then((mod) => mod.UserButton), {
  ssr: false, // Disable SSR to prevent hydration issues
});

export default function ButtonStyle() {
  return (
    <div className="absolute top-4 right-4">
      <UserButton />
    </div>
  );
}
