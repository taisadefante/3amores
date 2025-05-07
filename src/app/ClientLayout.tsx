// src/app/ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      <main style={{ flex: 1 }}>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
