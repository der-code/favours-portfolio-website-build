"use client"

import { Navbar } from "@/components/navbar"
import { motion, Variants } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { SpotlightCard } from "@/components/aceternity/spotlight"
import { useGSAPHoverAnimation } from "@/components/gsap-animations"
import { useRef } from "react"
import { Project } from "@/lib/hygraph-simple"

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useGSAPHoverAnimation(".project-card")

  // Fetch projects from Hygraph
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/projects')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const text = await response.text()
        if (!text) {
          throw new Error('Empty response from server')
        }
        
        const data = JSON.parse(text)

        if (data.success) {
          setProjects(data.projects)
          console.log('✅ Projects loaded:', data.projects.length)
        } else {
          throw new Error(data.error || 'Failed to fetch projects')
        }
      } catch (err) {
        console.error('❌ Error fetching projects:', err)
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const categories = ["fullstack", "frontend", "backend"]
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))

  const filteredProjects = selectedFilter
    ? projects.filter((p) => p.tags.includes(selectedFilter) || p.category === selectedFilter)
    : projects

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="space-y-12">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Loading projects...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
              <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                <p className="font-medium">❌ Error loading projects</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

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
            <motion.div variants={itemVariants as Variants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A selection of projects showcasing my expertise in full-stack development, UX design, and motion
                engineering.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants as Variants} className="space-y-4">
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
                <motion.div key={project.id} variants={itemVariants as Variants} className="project-card group">
                  <Link href={`/projects/${project.slug}`} className="block h-full">
                    <SpotlightCard className="h-full cursor-pointer">
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden bg-muted -m-6 mb-0">
                        <img
                          src={project.coverImage ?? "/placeholder.svg"}
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
                          <Link href={`/projects/${project.slug}`} className="flex-1">
                            <Button size="sm" variant="default" className="w-full gap-2">
                              View Details
                            </Button>
                          </Link>
                          {project.liveUrl && (
                            <Link href={project.liveUrl} className="flex-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full gap-2 bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="h-4 w-4" />
                                Live
                              </Button>
                            </Link>
                          )}
                          {project.githubUrl && (
                            <Link href={project.githubUrl} className="flex-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full gap-2 bg-transparent"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github className="h-4 w-4" />
                                Code
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div variants={itemVariants as Variants} className="text-center py-12">
                <p className="text-muted-foreground">No projects found for this filter.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  )
}
