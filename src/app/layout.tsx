import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Mini Donuts em Campo Grande RJ | 3 Amores Doces Artesanais",
  description:
    "Mini cake donuts personalizados para festas e eventos no Rio de Janeiro. Encomende doces encantadores com entrega em Campo Grande e região.",
  keywords:
    "mini donuts, doces para festas, docinhos personalizados, eventos RJ, Campo Grande, Rio de Janeiro, mini cake donuts, 3 Amores, encomenda de doces",
  openGraph: {
    title: "Mini Donuts para Festas no RJ - 3 Amores",
    description:
      "Encante seus convidados com nossos mini donuts artesanais. Atendemos Campo Grande e toda Zona Oeste do Rio de Janeiro!",
    url: "https://3amores.defan.com.br",
    siteName: "3 Amores Mini Donuts",
    images: [
      {
        url: "https://3amores.defan.com.br/imagem-de-capa.jpg", // substitua com sua imagem real
        width: 1200,
        height: 630,
        alt: "Mini donuts personalizados para festas",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta
          name="description"
          content="Mini donuts artesanais para festas e eventos em Campo Grande - RJ. Doces personalizados com carinho para aniversários, casamentos e celebrações especiais."
        />
        <meta
          name="keywords"
          content="mini donuts, mini cake donuts, docinhos personalizados, doces festa, festa infantil, casamento, eventos, Campo Grande, Rio de Janeiro"
        />
        <meta name="author" content="3 Amores Doces" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Campo Grande, Rio de Janeiro" />
        <meta name="geo.position" content="-22.9014;-43.5616" />
        <meta name="ICBM" content="-22.9014, -43.5616" />
        <link rel="canonical" href="https://3amores.defan.com.br/" />

        {/* Dados estruturados JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              name: "3 Amores Mini Donuts",
              image: "https://3amores.defan.com.br/logo.jpg",
              "@id": "https://3amores.defan.com.br",
              url: "https://3amores.defan.com.br",
              telephone: "+5521988359825",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Campo Grande",
                addressLocality: "Rio de Janeiro",
                postalCode: "23000-000",
                addressCountry: "BR",
              },
              areaServed: "Campo Grande, Rio de Janeiro",
              description:
                "Mini donuts artesanais personalizados para festas, casamentos e eventos. Atendemos Campo Grande e regiões próximas no Rio de Janeiro.",
            }),
          }}
        />
      </head>
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
