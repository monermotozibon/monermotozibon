
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moner Moto Zibon × Z MELODY",
  description:
    "Bengali songs, emotional quotes, music and creative videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

