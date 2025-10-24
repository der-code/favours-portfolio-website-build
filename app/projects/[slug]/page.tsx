"use client"

import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect, use } from "react"
import { Project } from "@/lib/hygraph-simple"
import { Mdx } from "@/components/mdx"
import Image from "next/image"

interface ProjectPageProps {
    params: {
        slug: string
    }
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const resolvedParams = use(params)
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`/api/projects/${resolvedParams.slug}`)
                const data = await response.json()

                if (data.success) {
                    setProject(data.project)
                    console.log('✅ Project loaded:', data.project.title)
                } else {
                    throw new Error(data.error || 'Failed to fetch project')
                }
            } catch (err) {
                console.error('❌ Error fetching project:', err)
                setError(err instanceof Error ? err.message : 'Failed to load project')
            } finally {
                setLoading(false)
            }
        }

        fetchProject()
    }, [resolvedParams.slug])

    // Loading state
    if (loading) {
        return (
            <>
                <Navbar />
                <MobileNav />
                <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
                        <div className="space-y-8">
                            <div className="animate-pulse">
                                <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
                                <div className="h-6 bg-muted rounded w-1/2 mb-8"></div>
                                <div className="h-64 bg-muted rounded mb-8"></div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-muted rounded w-full"></div>
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                    <div className="h-4 bg-muted rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    // Error state
    if (error || !project) {
        return (
            <>
                <Navbar />
                <MobileNav />
                <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold">Project Not Found</h1>
                            <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                                <p className="font-medium">❌ {error || 'Project not found'}</p>
                            </div>
                            <Link href="/projects">
                                <Button>← Back to Projects</Button>
                            </Link>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <MobileNav />
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <Link href="/projects" className="hover:text-primary transition-colors">
                                    ← Back to Projects
                                </Link>
                                <span>•</span>
                                <span className="capitalize">{project.category}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>

                            {/* Project Meta */}
                            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(project.publishedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4" />
                                    <span className="capitalize">{project.category}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                {project.liveUrl && (
                                    <Link href={project.liveUrl}>
                                        <Button className="gap-2">
                                            <ExternalLink className="h-4 w-4" />
                                            View Live Project
                                        </Button>
                                    </Link>
                                )}
                                {project.githubUrl && (
                                    <Link href={project.githubUrl}>
                                        <Button variant="outline" className="gap-2">
                                            <Github className="h-4 w-4" />
                                            View Code
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Cover Image */}
                        {project.coverImage && (
                            <div className="relative h-64 md:h-96 overflow-hidden rounded-lg bg-muted">
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Case Study */}
                        {project.caseStudy && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Case Study</h2>
                                <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                                    <div className="prose prose-invert max-w-none">
                                        <Mdx code={project.caseStudy} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Technologies */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Technologies Used</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        {project.content && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Project Details</h2>
                                <div className="prose prose-invert max-w-none">
                                    <Mdx code={project.content} />
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Project Gallery</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.gallery.map((image, index) => (
                                        <div key={index} className="relative h-48 overflow-hidden rounded-lg bg-muted">
                                            <Image
                                                src={image}
                                                alt={`${project.title} screenshot ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
        </>
    )
}
