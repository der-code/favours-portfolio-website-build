"use client"

import { Navbar } from "@/components/navbar"
import { motion, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/aceternity/spotlight"
import { AnimatedGradientText } from "@/components/aceternity/animated-gradient-text"
import { TextReveal } from "@/components/aceternity/text-reveal"
import { TestimonialsGrid } from "@/components/aceternity/testimonial-card"
import { useGSAPScrollAnimation } from "@/components/gsap-animations"
import { useRef } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  useGSAPScrollAnimation(".skill-card", {
    from: { opacity: 0, y: 50, rotateX: -10 },
    to: { opacity: 1, y: 0, rotateX: 0 },
  })

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
    }
  ]

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
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
        <Spotlight className="absolute top-0 left-0 opacity-30" fill="var(--primary)" />
        <Spotlight className="absolute bottom-0 right-0 opacity-20" fill="var(--secondary)" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {/* Main Heading */}
            <motion.div variants={itemVariants as Variants} className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block">Hey, I'm</span>
                <AnimatedGradientText className="block text-5xl md:text-7xl">Favour Max-Oti</AnimatedGradientText>
              </h1>
              <TextReveal
                text="Web Experience Engineer crafting immersive digital experiences"
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
              />
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants as Variants} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              I specialize in building beautiful, performant web applications using React, NestJS, and cutting-edge UX
              motion design. Engineering digital experiences that feel natural and perform beautifully.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants as Variants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/projects">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    View Projects
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline">
                    Get in Touch
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Skills Preview */}
            <motion.div
              ref={containerRef}
              variants={itemVariants as Variants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12"
            >
              {[
                {
                  title: "Frontend",
                  skills: ["React", "TypeScript", "Tailwind", "Framer Motion"],
                },
                {
                  title: "Backend",
                  skills: ["NestJS", "PostgreSQL", "MongoDB"],
                },
                {
                  title: "DevOps",
                  skills: ["Docker", "CI/CD", "Traefik", "Cloudflare"],
                },
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  className="skill-card p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="font-semibold text-primary mb-3">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-sm text-muted-foreground">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonials Section */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">What Clients Say</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Don't just take my word for it. Here's what clients and colleagues say about working with me.
                </p>
              </div>
              <TestimonialsGrid testimonials={testimonials} />
              <div className="text-center">
                <Link href="/testimonials">
                  <Button variant="outline" className="group">
                    View All Testimonials
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
