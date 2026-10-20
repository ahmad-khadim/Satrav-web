import type { Metadata } from "next";
import "./globals.css";

const titre = "SATRAV | Services maritimes et portuaires au Sénégal";
const description =
  "Manutention, courtage maritime, affrètement, consignation et transport maritime.";

export const metadata: Metadata = {
  title: titre,
  description,
  openGraph: {
    title: titre,
    description,
    siteName: "SATRAV",
    locale: "fr_SN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
