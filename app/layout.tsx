import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { organisatieSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/**
 * Lettertypen worden door Next.js zelf gehost en meegeleverd.
 * Er gaat dus geen verzoek naar Google en er ontstaat geen tekstsprong
 * tijdens het laden (display: swap met een vaste terugvaltekst).
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.naam} – ${site.slogan}`,
    template: `%s | ${site.naam}`,
  },
  description: site.beschrijving,
  applicationName: site.naam,
  authors: [{ name: site.naam, url: site.url }],
  creator: site.naam,
  publisher: site.naam,
  keywords: [
    "Umrah",
    "Umrah reis",
    "Umrah reizen",
    "begeleide Umrah",
    "Umrah Nederland",
    "Mekka",
    "Medina",
    "Umrah pakket",
    "Umrah Ramadan",
    "Deen op 1 Travel",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.naam,
    title: `${site.naam} – ${site.slogan}`,
    description: site.beschrijving,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.naam} – ${site.slogan}`,
    description: site.beschrijving,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "travel",
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0e1a38",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#hoofdinhoud"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]
                     focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Naar de hoofdinhoud
        </a>
        <Header />
        <main id="hoofdinhoud" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <JsonLd data={[organisatieSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
