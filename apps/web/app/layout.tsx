import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_layout/header";
import Footer from "./_layout/footer";

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reeckon.io"),
  title: {
    template: "%s — Reeckon",
    default:
      "Reeckon — Build, preview, and share AI Skills across your team and every coding tool",
  },
  description:
    "Define reusable AI skills as Markdown files. Preview with a local dashboard, deploy a static viewer, and install across Claude Code, Cursor, Codex, and 12+ tools.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Reeckon",
  },
  twitter: {
    card: "summary_large_image",
    site: "@reeckon_io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
