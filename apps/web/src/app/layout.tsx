import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arenaos.ai",
    title: "ArenaOS AI – The Agentic AI Operating System for Smart Stadiums",
    description:
      "An intelligent multi-agent AI command platform designed for crowd management, real-time security coordination, and operations optimization.",
    siteName: "ArenaOS AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArenaOS AI – The Agentic AI Operating System for Smart Stadiums",
    description:
      "An intelligent multi-agent AI command platform designed for crowd management, real-time security coordination, and operations optimization.",
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
        {/* Accessibility: Skip to Content for Keyboard and Assistive Tech */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex-grow flex flex-col w-full relative z-10">{children}</div>
      </body>
    </html>
  );
}
