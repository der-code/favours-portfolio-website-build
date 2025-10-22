"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  const handleMouseEnter = (href: string) => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = href
      document.head.appendChild(link)
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              FMO
            </motion.div>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = mounted && pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => handleMouseEnter(item.href)}
                  className="relative text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted ? (
              theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
            ) : (
              <div className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  )
}
