import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Favour Max-Oti | Web Experience Engineer",
  description:
    "Web Experience Engineer specializing in React, NestJS, and UX motion design. Crafting immersive digital experiences.",
  generator: "v0.app",
  openGraph: {
    title: "Favour Max-Oti | Web Experience Engineer",
    description:
      "Web Experience Engineer specializing in React, NestJS, and UX motion design. Crafting immersive digital experiences.",
    type: "website",
    url: "https://favour-portfolio.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Favour Max-Oti Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Favour Max-Oti | Web Experience Engineer",
    description: "Crafting immersive digital experiences with React, NestJS, and motion design.",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
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
