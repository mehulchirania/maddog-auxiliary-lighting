import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SmoothScroll from "@/components/site/SmoothScroll";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/cart/CartDrawer";
import DemoModal from "@/components/cart/DemoModal";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  // Archivo is variable on both weight and width. The width axis has to be
  // requested explicitly or `font-stretch` silently does nothing — the landing
  // display type depends on it (see --wdth-display).
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maddog — Light the road, not the rider",
  description:
    "Auxiliary motorcycle lighting designed, developed and manufactured in India. Nichia optics, IP67 sealed, 18-month replacement warranty, never discounted.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="bg-[var(--color-night-950)] text-[var(--color-white)] min-h-full flex flex-col selection:bg-[var(--color-signal)] selection:text-white">
        <SmoothScroll />
        <CartProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <DemoModal />
        </CartProvider>
      </body>
    </html>
  );
}
