import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Lexend, Lexend_Deca, Lexend_Exa } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/config/brand";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const lexend = Lexend({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-lexend", display: "swap" });
const lexendExa = Lexend_Exa({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-lexend-exa", display: "swap" });
const lexendDeca = Lexend_Deca({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-lexend-deca", display: "swap" });
const fragment = Fragment_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-fragment", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} | ${BRAND.slogan}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} | ${BRAND.slogan}`,
    description: BRAND.description,
    images: [{ url: "/brand/og.webp", width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: BRAND.xHandle,
    title: `${BRAND.name} | ${BRAND.slogan}`,
    description: BRAND.description,
    images: ["/brand/og.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#e8e7e5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} ${lexendExa.variable} ${lexendDeca.variable} ${fragment.variable}`}>
      <body>
        <WalletProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </WalletProvider>
      </body>
    </html>
  );
}
