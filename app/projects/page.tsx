"use client"

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SpotlightCard } from "@/components/aceternity/spotlight"
import { useGSAPHoverAnimation } from "@/components/gsap-animations"
import { useRef } from "react"

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useGSAPHoverAnimation(".project-card")

  const projects = [
    {
      id: 1,
      title: "LMS Platform",
      description:
        "A comprehensive Learning Management System with real-time collaboration features and advanced analytics.",
      image: "/lms-dashboard.png",
      tags: ["React", "NestJS", "PostgreSQL", "WebSocket"],
      category: "fullstack",
      link: "#",
      github: "#",
      caseStudy:
        "Built a scalable LMS platform serving 10,000+ students with real-time notifications and progress tracking.",
    },
    {
      id: 2,
      title: "Multi-tenant SaaS",
      description:
        "Enterprise SaaS platform with multi-tenancy, role-based access control, and advanced billing integration.",
      image: "/saas-dashboard-multi-tenant.jpg",
      tags: ["Next.js", "NestJS", "MongoDB", "Stripe"],
      category: "fullstack",
      link: "#",
      github: "#",
      caseStudy:
        "Architected a multi-tenant system handling 50+ enterprise clients with isolated data and custom workflows.",
    },
    {
      id: 3,
      title: "Newsletter Builder",
      description: "Drag-and-drop email newsletter builder with template library and campaign analytics.",
      image: "/email-newsletter-builder-interface.jpg",
      tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      category: "frontend",
      link: "#",
      github: "#",
      caseStudy:
        "Created an intuitive drag-and-drop interface enabling non-technical users to build professional newsletters.",
    },
    {
      id: 4,
      title: "Media Mart Platform",
      description: "E-commerce platform for digital media with advanced search, filtering, and recommendation engine.",
      image: "/ecommerce-media-marketplace.jpg",
      tags: ["Next.js", "PostgreSQL", "Elasticsearch", "Redis"],
      category: "fullstack",
      link: "#",
      github: "#",
      caseStudy: "Optimized search performance using Elasticsearch, reducing query time by 80% for 1M+ products.",
    },
    {
      id: 5,
      title: "Motion Design Library",
      description: "Reusable component library with advanced animation patterns and accessibility features.",
      image: "/component-library-ui-design-system.jpg",
      tags: ["React", "Framer Motion", "Storybook", "TypeScript"],
      category: "frontend",
      link: "#",
      github: "#",
      caseStudy: "Developed a comprehensive motion design system reducing development time by 40% across projects.",
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with interactive charts, data visualization, and custom reporting.",
      image: "/analytics-dashboard-charts.png",
      tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
      category: "fullstack",
      link: "#",
      github: "#",
      caseStudy: "Built real-time dashboard processing 100K+ events per minute with sub-second query response times.",
    },
  ]

  const categories = ["fullstack", "frontend", "backend"]
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))

  const filteredProjects = selectedFilter
    ? projects.filter((p) => p.tags.includes(selectedFilter) || p.category === selectedFilter)
    : projects

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
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A selection of projects showcasing my expertise in full-stack development, UX design, and motion
                engineering.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedFilter === null ? "default" : "outline"}
                  onClick={() => setSelectedFilter(null)}
                  className="rounded-full"
                >
                  All Projects
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedFilter === cat ? "default" : "outline"}
                    onClick={() => setSelectedFilter(cat)}
                    className="rounded-full capitalize"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedFilter === tag ? "default" : "outline"}
                    onClick={() => setSelectedFilter(tag)}
                    size="sm"
                    className="rounded-full text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              ref={containerRef}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants} className="project-card group">
                  <SpotlightCard className="h-full">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden bg-muted -m-6 mb-0">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Project Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>

                      {/* Case Study */}
                      <p className="text-xs text-primary/80 italic">{project.caseStudy}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-2 pt-2">
                        <Link href={project.link} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full gap-2 bg-transparent">
                            <ExternalLink className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                        <Link href={project.github} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full gap-2 bg-transparent">
                            <Github className="h-4 w-4" />
                            Code
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div variants={itemVariants} className="text-center py-12">
                <p className="text-muted-foreground">No projects found for this filter.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  )
}
