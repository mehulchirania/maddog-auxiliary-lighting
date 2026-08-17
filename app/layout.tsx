import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maddog — Engineered to be seen with",
  description:
    "Auxiliary motorcycle lighting designed, developed and manufactured in India. Nichia optics, IP67 sealed, 18-month replacement warranty, never discounted.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrains.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-paper-1 text-ink-900 min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
