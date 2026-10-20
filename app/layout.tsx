import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SATRAV | Services maritimes et portuaires au Sénégal",
  description:
    "Manutention, courtage maritime, affrètement, consignation et transport maritime.",
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
