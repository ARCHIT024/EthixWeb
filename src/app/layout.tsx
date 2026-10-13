import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const outfitDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0c0d10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ethixweb.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ethixweb | India Digital Operations, Web & AI Partner",
    template: "%s | Ethixweb India",
  },
  description:
    "We run the tech. You run the business. AI automation, custom websites, CRM integrations, and performance marketing engineered for ambitious Indian enterprises.",
  keywords: [
    "Ethixweb",
    "Digital Operations India",
    "Next.js Development India",
    "AI Agents India",
    "CRM Integration India",
    "B2B Tech Partner Bengaluru Delhi",
  ],
  authors: [{ name: "Ethixweb Technologies Pvt. Ltd." }],
  creator: "Ethixweb",
  publisher: "Ethixweb",
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: "Ethixweb | India Digital Operations & Growth Partner",
    description:
      "We run the tech. You run the business. High-performance digital operations and AI automations for modern Indian enterprises.",
    url: siteUrl,
    siteName: "Ethixweb",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/logo.webp",
        width: 1200,
        height: 630,
        alt: "Ethixweb Brand Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethixweb | India Digital Operations & Growth Partner",
    description:
      "We run the tech. You run the business. High-performance digital operations and AI automations for modern Indian enterprises.",
    creator: "@ethixweb",
    images: ["/brand/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfitDisplay.variable} ${plusJakartaBody.variable} ${notoSansDevanagari.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-light-bg text-dark-bg selection:bg-brand-red selection:text-white">
        {/* Skip to Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-brand-red focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white shadow-lg"
        >
          Skip to main content
        </a>

        {/* Global Sticky Header */}
        <Header />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
