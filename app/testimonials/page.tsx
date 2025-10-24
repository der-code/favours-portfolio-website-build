"use client"

import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { AppleCardsCarousel } from "@/components/aceternity/apple-cards-carousel"
import { motion, Variants } from "framer-motion"
import { Loader } from "@/components/aceternity/loader"
import { useState, useEffect } from "react"
import { testimonials } from "@/lib/data"



export default function Testimonials() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading time for better UX
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
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
            <MobileNav />
            {loading ? (
                <Loader />
            ) : (
                <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
                            {/* Header */}
                            <motion.div variants={itemVariants as Variants} className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold">Testimonials</h1>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    What clients and colleagues say about working with me. These testimonials reflect the impact and value I bring to every project.
                                </p>
                            </motion.div>

                            {/* Apple Cards Carousel */}
                            <motion.div variants={itemVariants as Variants}>
                                <AppleCardsCarousel
                                    testimonials={testimonials}
                                    autoPlay={true}
                                    autoPlayInterval={6000}
                                />
                            </motion.div>

                            {/* Call to Action */}
                            <motion.div variants={itemVariants as Variants} className="text-center space-y-4">
                                <h2 className="text-2xl font-semibold">Ready to work together?</h2>
                                <p className="text-muted-foreground">
                                    Let's discuss how I can help bring your next project to life.
                                </p>
                                <motion.a
                                    href="/contact"
                                    className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get In Touch
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </main>
            )}
        </>
    )
}
