"use client"

import { Navbar } from "@/components/navbar"
import { motion, Variants } from "framer-motion"
import { Code2, Zap, Palette } from "lucide-react"
import { CardHoverEffect } from "@/components/aceternity/card-hover-effect"
import { Timeline } from "@/components/aceternity/timeline"
import { ProfilePhoto, PhotoGallery } from "@/components/aceternity/photo-gallery"
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

  const experiences = [
    {
      title: "IT Consultant",
      company: "Saricino Media Group",
      period: "2024 - Present",
      description: "IT Consultant at Saricino Media Group. I am responsible for responding to client requests and providing technical support.",
      technologies: ["IT Support", "Technical Support", "IT Consulting", "IT Management", "WordPress"]
    },
    {
      title: "Full Stack Developer",
      company: "Gardeners For Africa Ltd.",
      period: "2023 - Present",
      description: "Full Stack Developer at Gardeners For Africa Ltd. I am responsible for building and maintaining the company's SaaS website.",
      technologies: ["React", "Next.js", "NestJS", "PostgreSQL", "MySQL", "Laravel", "Docker", "Traefik", "Cloudflare"]
    },
    {
      title: "Backend Software Development Instructor",
      company: "Attueyi Coding Academy",
      period: "2023 - Present",
      description: "Backend Software Development Instructor at Attueyi Coding Academy. I am responsible for teaching the students the basics of backend development and the fundamentals of Node.js and Express framework.",
      technologies: ["Node.js", "Express", "REST APIs", "MongoDB", "MySQL", "PostgreSQL"]
    },
    {
      title: "Backend Developer",
      company: "Loiz Tours and Travels Ltd.",
      period: "2023 - 2025",
      description: "Backend Developer at Loiz Tours and Travels Ltd. I am responsible for building and maintaining the company's E-commerce backend system.",
      technologies: ["Laravel", "MySQL", "REST APIs", "CRM", "API Integration"]
    },
    {
      title: "Junior Backend Developer",
      company: "Spire Africa Ltd.",
      period: "2022 - 2024",
      description: "Junior Backend Developer at Spire Africa Ltd. I was responsible for contributing to the development of the company's backend system.",
      technologies: ["Node.js", "Express", "REST APIs", "MongoDB", "GraphQL"]
    },
    {
      title: "Junior Backend Developer",
      company: "Yana Finance Ltd.",
      period: "2022 - 2023",
      description: "Junior Backend Developer at Yana Finance Ltd. I was responsible for contributing to the development of the company's backend system.",
      technologies: ["Laravel", "MySQL", "REST APIs", "CRM", "API Integration"]
    },
    {
      title: "Junior Fullstack Developer",
      company: "First Class Pilot Ltd.",
      period: "2021 - 2022",
      description: "Junior Fullstack Developer at First Class Pilot Ltd. I was responsible for contributing to the development of the company's website and mobile application. I was also responsible for providing technical support to the company's clients.",
      technologies: ["React", "JavaScript", "CSS3", "Framer Motion", "Tailwind", "PostgreSQL", "MySQL", "Laravel", "Cloudflare", "IT Support", "Technical Support", "IT Consulting", "IT Management"]
    }
  ]

  const personalPhotos = [
    {
      src: "/images/photos/bg-photo1.jpeg",
      alt: "Personal photo 1",
      caption: "Exploring new technologies"
    },
    {
      src: "/images/photos/bg-photo2.jpg",
      alt: "Personal photo 2",
      caption: "Team collaboration"
    },
    {
      src: "/images/photos/bg-photo3.PNG",
      alt: "Personal photo 3",
      caption: "Creative projects"
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
            {/* Header */}
            <motion.div variants={itemVariants as Variants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
              <p className="text-lg text-muted-foreground">
                Passionate about building beautiful, performant digital experiences
              </p>
            </motion.div>

            {/* Bio Section */}
            <motion.div variants={itemVariants as Variants} className="space-y-6">
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

            {/* Personal Photos Section */}
            <motion.div variants={itemVariants as Variants} className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">Beyond the Code</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A glimpse into my life outside of development
                </p>
              </div>

              {/* Profile Photo */}
              <div className="flex justify-center">
                <ProfilePhoto
                  src="/images/photos/bg-photo1.jpeg"
                  alt="Favour's profile photo"
                  className="w-48 h-48 md:w-64 md:h-64"
                />
              </div>

              {/* Photo Gallery */}
              <PhotoGallery photos={personalPhotos} />
            </motion.div>

            {/* Skills Grid */}
            <motion.div variants={itemVariants as Variants} className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold">Skills & Expertise</h2>
              <CardHoverEffect items={skillsForCardHover} />
            </motion.div>

            {/* Experience Timeline */}
            <motion.div ref={containerRef} variants={itemVariants as Variants} className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
              <Timeline experiences={experiences} />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
