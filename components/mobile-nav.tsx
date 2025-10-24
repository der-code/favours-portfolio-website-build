"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
    Home,
    User,
    FolderOpen,
    BookOpen,
    MessageCircle,
    Star,
    Moon,
    Sun
} from "lucide-react"
import { FloatingDock } from "@/components/aceternity/floating-dock"
import { Button } from "@/components/ui/button"

export function MobileNav() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const navItems = [
        {
            title: "Home",
            icon: <Home className="h-5 w-5" />,
            href: "/"
        },
        {
            title: "About",
            icon: <User className="h-5 w-5" />,
            href: "/about"
        },
        {
            title: "Projects",
            icon: <FolderOpen className="h-5 w-5" />,
            href: "/projects"
        },
        {
            title: "Blog",
            icon: <BookOpen className="h-5 w-5" />,
            href: "/blog"
        },
        {
            title: "Testimonials",
            icon: <Star className="h-5 w-5" />,
            href: "/testimonials"
        },
        {
            title: "Contact",
            icon: <MessageCircle className="h-5 w-5" />,
            href: "/contact"
        },
    ]

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
            <FloatingDock
                items={navItems}
                className="shadow-lg"
            />

            {/* Theme toggle button positioned separately */}
            <div className="absolute -top-16 right-0">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full h-10 w-10 bg-card/50 backdrop-blur-md border border-border hover:bg-card/80"
                >
                    {mounted ? (
                        theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
                    ) : (
                        <div className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </div>
    )
}
