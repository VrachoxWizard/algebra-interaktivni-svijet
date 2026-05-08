import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Algebra IT Admin Trainer",
  description: "Interaktivna priprema iz osnova rada računala i računalnih mreža.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  );
}
