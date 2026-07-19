import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/features/app/providers/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ArenaOS AI – The Agentic AI Operating System for Smart Stadiums",
  description:
    "An intelligent multi-agent AI command platform designed for crowd management, real-time security coordination, indoor stadium routing, concierge, and operations optimization at mega sporting events.",
  applicationName: "ArenaOS AI",
  authors: [{ name: "Google AI Partner Engineering" }],
  category: "BusinessApplication",
  keywords: [
    "ArenaOS AI",
    "Smart Stadium",
    "Agentic AI",
    "Google ADK",
    "Gemini AI",
    "FIFA World Cup",
    "Crowd Intelligence",
    "Stadium Operations",
  ],
  metadataBase: new URL("https://arenaos.ai"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arenaos.ai",
    title: "ArenaOS AI – The Agentic AI Operating System for Smart Stadiums",
    description:
      "An intelligent multi-agent AI command platform designed for crowd management, real-time security coordination, and operations optimization.",
    siteName: "ArenaOS AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ArenaOS AI Stadium Operations Console",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArenaOS AI – The Agentic AI Operating System for Smart Stadiums",
    description:
      "An intelligent multi-agent AI command platform designed for crowd management, real-time security coordination, and operations optimization.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-arena-bg text-arena-text min-h-screen flex flex-col antialiased os-grid-bg">
        {/* Structured SEO Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "ArenaOS AI",
              operatingSystem: "Web",
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "Offer",
                price: "0",
              },
              description:
                "An intelligent multi-agent AI command platform designed for crowd management, real-time security coordination, and operations optimization at smart stadiums.",
            }),
          }}
        />
        {/* Accessibility: Skip to Content for Keyboard and Assistive Tech */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* ThemeProvider wraps all routes — theme persists via localStorage */}
        <ThemeProvider>
          <div className="flex-grow flex flex-col w-full relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
