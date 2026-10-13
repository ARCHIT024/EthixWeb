import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Ethixweb | India Digital Operations & Growth Partner",
  description:
    "AI automation, custom websites, CRM integrations, and performance marketing engineered for ambitious Indian enterprises and brands.",
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
        {children}
      </body>
    </html>
  );
}
