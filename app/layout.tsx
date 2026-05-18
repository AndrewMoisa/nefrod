import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Albert_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-albert",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://nefrod.no";
const SITE_NAME = "Nordic Entrepreneur Forum Rød";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nordic Entrepreneur Forum Rød — The Business Bridge",
    template: "%s — Nordic Entrepreneur Forum Rød",
  },
  description:
    "The working bridge between Norwegian industry and the high-growth economies of Eastern Europe and China. Networking, branding, digitalization and cybersecurity for industrial growth.",
  applicationName: SITE_NAME,
  authors: [{ name: "Nordic Entrepreneur Forum Rød", url: SITE_URL }],
  creator: "Nordic Entrepreneur Forum Rød",
  publisher: "Nordic Entrepreneur Forum Rød",
  keywords: [
    "Nordic Entrepreneur Forum Rød",
    "NEFrød",
    "Norway business",
    "Eastern Europe business",
    "China business",
    "industrial growth",
    "digitalization",
    "cybersecurity",
    "branding",
    "Sandnes",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Nordic Entrepreneur Forum Rød — The Business Bridge",
    description:
      "The working bridge between Norwegian industry and the high-growth economies of Eastern Europe and China.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nordic Entrepreneur Forum Rød — The Business Bridge",
    description:
      "The working bridge between Norwegian industry and the high-growth economies of Eastern Europe and China.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${albert.variable} ${mono.variable}`}
    >
      <body className="font-body antialiased">
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
