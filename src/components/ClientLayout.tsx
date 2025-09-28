"use client"
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      const pathname = usePathname();


  const hideNavbar = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!hideNavbar &&<Navbar />}
      {children}
    </>
  );
}
