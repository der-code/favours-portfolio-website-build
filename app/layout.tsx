import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Favour Max-Oti | Web Experience Engineer",
    template: "%s | Favour Max-Oti"
  },
  description:
    "Web Experience Engineer specializing in React, NestJS, and UX motion design. Crafting immersive digital experiences that blend thoughtful design with robust engineering.",
  keywords: [
    "Web Developer",
    "React Developer",
    "NestJS Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "UX Motion Design",
    "TypeScript",
    "Next.js",
    "Portfolio",
    "Favour Max-Oti",
    "Web Experience Engineer"
  ],
  authors: [{ name: "Favour Max-Oti" }],
  creator: "Favour Max-Oti",
  publisher: "Favour Max-Oti",
  generator: "Next.js",
  applicationName: "Favour Max-Oti Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://favour-portfolio.com",
    siteName: "Favour Max-Oti Portfolio",
    title: "Favour Max-Oti | Web Experience Engineer",
    description:
      "Web Experience Engineer specializing in React, NestJS, and UX motion design. Crafting immersive digital experiences that blend thoughtful design with robust engineering.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Favour Max-Oti - Web Experience Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thekellslte",
    creator: "@thekellslte",
    title: "Favour Max-Oti | Web Experience Engineer",
    description: "Crafting immersive digital experiences with React, NestJS, and motion design.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://favour-portfolio.com",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.vercel-analytics.com" />

        {/* Favicon Setup */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Additional SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Favour Max-Oti" />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
