import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SWAPI Indexed Search",
  description: "A Star Wars API Indexed Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        {children}
    </html>
  );
}
