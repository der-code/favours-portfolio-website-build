"use client"

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                        {/* 404 Number */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <motion.h1
                                className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                404
                            </motion.h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                        </motion.div>

                        {/* Error Message */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Page Not Found
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                            </p>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div variants={itemVariants} className="relative">
                            <motion.div
                                className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
                                animate={{
                                    y: [0, -20, 0],
                                    x: [0, 10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-10 -right-10 w-16 h-16 bg-secondary/10 rounded-full blur-xl"
                                animate={{
                                    y: [0, 20, 0],
                                    x: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/">
                                <Button className="group">
                                    <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    Go Home
                                </Button>
                            </Link>
                            <Link href="/blog">
                                <Button variant="outline" className="group">
                                    <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    Browse Blog
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Helpful Links */}
                        <motion.div variants={itemVariants} className="pt-8">
                            <p className="text-sm text-muted-foreground mb-4">Or try these popular pages:</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {[
                                    { href: "/about", label: "About" },
                                    { href: "/projects", label: "Projects" },
                                    { href: "/testimonials", label: "Testimonials" },
                                    { href: "/contact", label: "Contact" },
                                ].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Back Button */}
                        <motion.div variants={itemVariants} className="pt-4">
                            <Button
                                variant="ghost"
                                onClick={() => window.history.back()}
                                className="group"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </>
    )
}
