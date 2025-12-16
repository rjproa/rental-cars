import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, } from '@clerk/nextjs'
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inka Rent",
    template: "%s | Inka Rent"
  },
  description: "Plataforma de alquiler de vehículos",

  icons: {
    icon: '/favicon.ico?v=3',
    shortcut: '/favicon.ico?v=3',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body
          className={`${outfit.variable}  antialiased`}>
          <NextTopLoader color="#000" />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
