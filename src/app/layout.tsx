import type { Metadata } from "next";
import { DM_Sans, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import Analytics from "@/components/Analytics";
import CartRecovery from "@/components/CartRecovery";
import CookieConsent from "@/components/CookieConsent";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollProgress from "@/components/ScrollProgress";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Thread & Trends",
  description: "Wear your frequency – contemporary fashion from Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable} ${playfair.variable}`}>
      <body>
        <AmbientBackground />
        <ScrollProgress />
        <SiteChrome>{children}</SiteChrome>
        <CartRecovery />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
