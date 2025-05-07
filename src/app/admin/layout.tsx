import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import HeaderAdmin from "../components/HeaderAdmin";
import Footer from "../components/Footer";
import { headers } from "next/headers";

export const metadata = {
  title: "Admin - 3 Amores",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers(); // ✅ Correto: headers() é async
  const pathname = headersList.get("x-next-url");
  const isLogin = pathname === "/admin";

  return (
    <html lang="pt-BR">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!isLogin && <HeaderAdmin />}
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
