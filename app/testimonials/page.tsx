"use client"

import { Navbar } from "@/components/navbar"
import { TestimonialsGrid } from "@/components/aceternity/testimonial-card"
import { motion } from "framer-motion"
import { Loader } from "@/components/aceternity/loader"
import { useState, useEffect } from "react"

const testimonials = [
    {
        quote: "Favour delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made the entire development process smooth and efficient.",
        name: "Sarah Johnson",
        title: "Product Manager",
        company: "TechCorp"
    },
    {
        quote: "Working with Favour was a game-changer for our project. His React and NestJS skills are outstanding, and he consistently delivered high-quality solutions on time.",
        name: "Michael Chen",
        title: "CTO",
        company: "StartupXYZ"
    },
    {
        quote: "Favour's ability to create beautiful, performant user interfaces is remarkable. He transformed our complex requirements into an intuitive and delightful user experience.",
        name: "Emily Rodriguez",
        title: "UX Director",
        company: "DesignStudio"
    },
    {
        quote: "The backend architecture Favour designed for our application is robust and scalable. His expertise in NestJS and database optimization saved us months of development time.",
        name: "David Kim",
        title: "Lead Developer",
        company: "Enterprise Solutions"
    },
    {
        quote: "Favour's motion design skills brought our application to life. The animations and transitions he created significantly improved our user engagement metrics.",
        name: "Lisa Thompson",
        title: "Marketing Director",
        company: "Digital Agency"
    },
    {
        quote: "Professional, reliable, and incredibly talented. Favour consistently delivered beyond our requirements and was always available to provide technical guidance.",
        name: "Robert Wilson",
        title: "Founder",
        company: "Innovation Labs"
    }
]

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
            {loading ? (
                <Loader />
            ) : (
                <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
                            {/* Header */}
                            <motion.div variants={itemVariants} className="text-center space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold">Testimonials</h1>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    What clients and colleagues say about working with me. These testimonials reflect the impact and value I bring to every project.
                                </p>
                            </motion.div>

                            {/* Testimonials Grid */}
                            <motion.div variants={itemVariants}>
                                <TestimonialsGrid testimonials={testimonials} />
                            </motion.div>

                            {/* Call to Action */}
                            <motion.div variants={itemVariants} className="text-center space-y-4">
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
