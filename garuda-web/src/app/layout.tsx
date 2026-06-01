import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import MileageLoader from "@/components/MileageLoader";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://garuda-club.vercel.app"),
  title: {
    default: "GARUDA — Super Mileage Club | RV College of Engineering",
    template: "%s | GARUDA · RVCE",
  },
  description:
    "GARUDA is the Super Mileage Club of RV College of Engineering (RVCE), Bengaluru. We design, build, and race ultra-efficient vehicles at Shell Eco-Marathon Asia. RVCE students — apply now and join India's top student engineering team.",
  keywords: [
    "GARUDA RVCE",
    "super mileage club RVCE",
    "RV College of Engineering club",
    "RVCE engineering team",
    "Shell Eco-Marathon India",
    "fuel efficiency competition",
    "student engineering Bengaluru",
    "apply RVCE club",
    "super mileage vehicle",
    "Shell Eco-Marathon Asia",
    "mileage car RVCE",
  ],
  authors: [{ name: "GARUDA Super Mileage Club, RVCE" }],
  icons: {
    icon: [{ url: "/GarudaLogo1.png", type: "image/png" }],
    apple: "/GarudaLogo1.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://garuda-club.vercel.app",
    siteName: "GARUDA Super Mileage Club — RVCE",
    title: "GARUDA — Super Mileage Club | RV College of Engineering",
    description:
      "GARUDA is RV College of Engineering's super mileage club. Competing at Shell Eco-Marathon Asia since 2007. RVCE students — apply now.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GARUDA Super Mileage Club — RV College of Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GARUDA — Super Mileage Club | RVCE Bengaluru",
    description:
      "Building ultra-efficient vehicles. Competing at Shell Eco-Marathon Asia. Apply now — open to all RVCE students.",
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
          <MileageLoader />
          <NavbarWrapper />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
