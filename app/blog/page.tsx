"use client"

import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { useState, useEffect } from "react"
import { useGSAPScrollAnimation } from "@/components/gsap-animations"
import { useRef } from "react"
import { type BlogPost } from "@/lib/hashnode-service"
import { Loader } from "@/components/aceternity/loader"
import { ExcerptRenderer } from "@/components/content-renderer"

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAPScrollAnimation(".blog-post", {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0 },
  })

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/hashnode-posts?first=20')

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.posts) {
          setPosts(data.posts)
        } else {
          throw new Error(data.error || 'Failed to load posts')
        }
      } catch (error) {
        console.error('Error loading posts:', error)
        setError(error instanceof Error ? error.message : 'Failed to load posts')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const categories = Array.from(new Set(posts.map((p) => p.category)))
  const filteredPosts = selectedCategory ? posts.filter((p) => p.category === selectedCategory) : posts

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

  if (loading) {
    return (
      <>
        <Navbar />
        <MobileNav />
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center">
          <Loader />
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <MobileNav />
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Error Loading Posts</h1>
            <p className="text-lg text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Try Again
            </button>
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
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
              <p className="text-lg text-muted-foreground">
                Technical write-ups on web development, architecture, and engineering best practices.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50"
                  }`}
              >
                All Posts
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Blog Posts */}
            <motion.div variants={itemVariants} className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.slug} className="blog-post">
                  <article className="group p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer">
                    <Link href={`/blog/${post.slug}`} className="block space-y-4 cursor-pointer">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime} min read
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author.name}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                      </div>

                      {/* Cover Image */}
                      {post.coverImage && (
                        <div className="w-full h-48 rounded-lg overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Excerpt */}
                      <ExcerptRenderer
                        excerpt={post.excerpt}
                        source="hashnode"
                        maxLength={200}
                        className="text-muted-foreground leading-relaxed"
                      />

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-primary font-medium pt-2 group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </article>
                </div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <motion.div variants={itemVariants} className="text-center py-12">
                <p className="text-muted-foreground">No posts found in this category.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  )
}