import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product Explorer | Checkit Assessment",
  description: "A beautifully curated product explorer for premium products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${montserrat.variable} h-full antialiased text-gray-900`}>
      <body className="min-h-full flex flex-col font-sans bg-gray-25/50">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
