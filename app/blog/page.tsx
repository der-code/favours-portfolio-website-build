"use client"

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { RevealOnScroll } from "@/components/framer-motion-effects"
import { useGSAPScrollAnimation } from "@/components/gsap-animations"
import { useRef } from "react"
import { FALLBACK_POSTS, type BlogPost } from "@/lib/hashnode"

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_POSTS)
  const [loading, setLoading] = useState(true)
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

        const response = await fetch('/api/hashnode-posts')

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.posts) {
          setPosts(data.posts)
        } else {
          setPosts(FALLBACK_POSTS)
        }

        setLoading(false)
      } catch (error) {
        setPosts(FALLBACK_POSTS)
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

  return (
    <>
      <Navbar />
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
              <motion.button
                onClick={() => setSelectedCategory(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50"
                  }`}
              >
                All Posts
              </motion.button>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50"
                    }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div variants={itemVariants} className="text-center py-12">
                <p className="text-muted-foreground">Loading posts...</p>
              </motion.div>
            )}

            {/* Blog Posts */}
            {!loading && (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div key={`${post.source}-${post.id}`}>
                    <article className="blog-post group p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer">
                      <Link href={`/blog/${post.id}`} className="block space-y-4">
                        {/* Header */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                              {post.category}
                            </span>
                            {post.source === "hashnode" && (
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                Hashnode
                              </span>
                            )}
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
                          </div>
                          <h2 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                        </div>

                        {/* Excerpt */}
                        <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

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
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredPosts.length === 0 && (
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
