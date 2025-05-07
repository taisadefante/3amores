import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "3 Amores Mini Donuts",
  description: "Delicadeza em cada mordida",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
