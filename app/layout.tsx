import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "SWAPI Indexed Search",
  description: "A Star Wars API Indexed Search",
};

const mainFont = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Cookie that stores the theme (dark or light)
  const cookieStore = cookies()
  const dataTheme = cookieStore.get('data-theme')?.value ?? 'light'
  return (
    <html lang="en">
      <body data-theme={dataTheme} className={mainFont.className}>
        {children}
      </body>
    </html>
  );
}
