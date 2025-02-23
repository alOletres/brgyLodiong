"use client"; // Client component

import { usePathname } from "next/navigation";
import { MiniDrawer } from "@/components/Drawer";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Client-side hook

  // Check if the current route is the login page
  const isLoginPage = pathname === "/" || pathname === "/signup";

  return (
    <>
      {isLoginPage ? (
        // If it's the login page, don't wrap with MiniDrawer
        <>{children}</>
      ) : (
        // Otherwise, wrap it with MiniDrawer
        <MiniDrawer>{children}</MiniDrawer>
      )}
    </>
  );
}
