import type { Metadata } from "next";
import localFont from "next/font/local";
import JsonLd from "@/components/JsonLd";
import {
  organizationJsonLd,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const headingFont = localFont({
  src: [
    {
      path: "../../public/fonts/abcmarist-book.woff2",
      weight: "350",
      style: "normal",
    },
    {
      path: "../../public/fonts/abcmarist-bookitalic.woff2",
      weight: "350",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-abc-marist",
});

const bodyFont = localFont({
  src: "../../public/fonts/dmsans-variable.woff2",
  display: "swap",
  variable: "--font-dm-sans",
  weight: "100 1000",
});

const monoFont = localFont({
  src: "../../public/fonts/dmmono-regular.woff2",
  display: "swap",
  variable: "--font-dm-mono",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Home Care Operations Software | Selmou",
    template: "%s | Selmou",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Home care operations software",
  manifest: "/manifest.webmanifest",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/seo/selmou-favicon-2026.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/seo/selmou-favicon-96-2026.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],
    apple: [
      { url: "/seo/selmou-apple-touch-icon-2026.png", type: "image/png" },
    ],
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="font-body antialiased bg-background-primary">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [organizationJsonLd, websiteJsonLd],
          }}
        />
        <a
          href="#main-content"
          className="fixed left-[1.6rem] top-[1.6rem] z-[100] -translate-y-[200%] rounded-[1.2rem] bg-surface-tertiary px-[1.6rem] py-[1.2rem] text-body-sm text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
