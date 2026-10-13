import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const outfitDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const plusJakartaBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  display: "swap",
  weight: ["400", "600", "700"],
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
