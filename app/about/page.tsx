"use client"

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { Code2, Zap, Palette } from "lucide-react"
import { CardHoverEffect } from "@/components/aceternity/card-hover-effect"
import { useGSAPScrollAnimation } from "@/components/gsap-animations"
import { useRef } from "react"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  useGSAPScrollAnimation(".experience-item", {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const skills = [
    {
      category: "Frontend",
      icon: Palette,
      items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js", "Shadcn/UI"],
    },
    {
      category: "Backend",
      icon: Code2,
      items: ["NestJS", "Node.js", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    },
    {
      category: "DevOps & Tools",
      icon: Zap,
      items: ["Docker", "CI/CD", "Traefik", "Cloudflare", "Git", "AWS"],
    },
  ]

  const skillsForCardHover = skills.map((skill) => ({
    title: skill.category,
    description: skill.items.join(", "),
    icon: <skill.icon className="h-6 w-6 text-primary" />,
  }))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
              <p className="text-lg text-muted-foreground">
                Passionate about building beautiful, performant digital experiences
              </p>
            </motion.div>

            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-invert max-w-none space-y-4">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm a Web Experience Engineer with a passion for crafting immersive digital experiences that blend
                  thoughtful design with robust engineering. My journey in tech has been driven by a deep curiosity
                  about how technology can enhance human experiences.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  With expertise spanning frontend development, backend systems, and UX motion design, I specialize in
                  building full-stack applications that are not only visually stunning but also performant and scalable.
                  I believe that great engineering is invisible—it should feel natural and work seamlessly.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My philosophy:{" "}
                  <span className="text-primary font-semibold">
                    Engineering digital experiences that feel natural and perform beautifully.
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold">Skills & Expertise</h2>
              <CardHoverEffect items={skillsForCardHover} />
            </motion.div>

            {/* Experience Timeline */}
            <motion.div ref={containerRef} variants={itemVariants} className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Senior Web Experience Engineer",
                    company: "Tech Innovators Inc.",
                    period: "2022 - Present",
                    description:
                      "Leading the development of full-stack applications with focus on user experience and performance optimization.",
                  },
                  {
                    title: "Full Stack Developer",
                    company: "Digital Solutions Ltd.",
                    period: "2020 - 2022",
                    description:
                      "Built and maintained multiple production applications using React, NestJS, and PostgreSQL.",
                  },
                  {
                    title: "Frontend Developer",
                    company: "Creative Agency Co.",
                    period: "2018 - 2020",
                    description: "Developed responsive web applications with focus on UI/UX and animation design.",
                  },
                ].map((exp, idx) => (
                  <motion.div
                    key={idx}
                    className="experience-item p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all"
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-sm text-primary">{exp.company}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
