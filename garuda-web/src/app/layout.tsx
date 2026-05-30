import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import BrandSplash from "@/components/BrandSplash";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://garuda-club.vercel.app"),
  title: {
    default: "GARUDA | Super Mileage Club",
    template: "%s | GARUDA",
  },
  description:
    "GARUDA is a professional engineering club specializing in super-mileage vehicles. We design, build, and race ultra-efficient cars at international competitions including Shell Eco-marathon.",
  keywords: [
    "GARUDA",
    "super mileage",
    "engineering club",
    "shell eco-marathon",
    "fuel efficiency",
    "RVCE",
    "student engineering",
    "mileage car",
  ],
  authors: [{ name: "GARUDA Engineering Club" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://garuda-club.vercel.app",
    siteName: "GARUDA Super Mileage Club",
    title: "GARUDA | Super Mileage Club",
    description:
      "Engineering excellence. Uncompromising performance. Building the world's most efficient vehicles.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GARUDA Super Mileage Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GARUDA | Super Mileage Club",
    description: "Engineering excellence. Uncompromising performance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs synchronously before paint to avoid flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <BrandSplash />
          <NavbarWrapper />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
