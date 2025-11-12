import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plushify - Transform Photos into Adorable Plushies",
  description:
    "Transform your photos into adorable AI-generated plushie designs. Upload images of people, pets, or loved ones and watch them become cute plushies in seconds.",
  openGraph: {
    title: "Plushify - Transform Photos into Adorable Plushies",
    description:
      "Transform your photos into adorable AI-generated plushie designs. Upload images of people, pets, or loved ones and watch them become cute plushies in seconds.",
    url: "https://plushify.com",
    siteName: "Plushify",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Plushify - Transform Photos into Adorable Plushies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plushify - Transform Photos into Adorable Plushies",
    description:
      "Transform your photos into adorable AI-generated plushie designs. Upload images of people, pets, or loved ones and watch them become cute plushies in seconds.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
