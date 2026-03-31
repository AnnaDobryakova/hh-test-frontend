import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тарифы",
  description: "Тарифы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}