"use client"

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { useState } from "react"
import { RevealOnScroll } from "@/components/framer-motion-effects"
import { useGSAPScrollAnimation } from "@/components/gsap-animations"
import { useRef } from "react"

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useGSAPScrollAnimation(".blog-post", {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0 },
  })

  const posts = [
    {
      id: 1,
      title: "Building Multi-tenant Systems with Traefik and Docker",
      excerpt:
        "A deep dive into architecting scalable multi-tenant applications using Traefik as a reverse proxy and Docker for containerization.",
      content:
        "In this comprehensive guide, we explore the architecture and implementation of multi-tenant systems. We'll cover how to use Traefik for intelligent routing, Docker for containerization, and best practices for data isolation and security.",
      category: "DevOps",
      date: "2024-10-15",
      readTime: 12,
      tags: ["Docker", "Traefik", "DevOps", "Architecture"],
    },
    {
      id: 2,
      title: "React Performance Optimization: From 3s to 0.8s Load Time",
      excerpt:
        "Practical techniques for optimizing React applications, including code splitting, lazy loading, and advanced caching strategies.",
      content:
        "Learn how to identify performance bottlenecks in React applications and implement solutions that dramatically improve load times. We'll cover code splitting, lazy loading, memoization, and more.",
      category: "Frontend",
      date: "2024-10-08",
      readTime: 15,
      tags: ["React", "Performance", "Optimization", "Frontend"],
    },
    {
      id: 3,
      title: "Crafting Delightful UX with Framer Motion",
      excerpt:
        "Exploring advanced animation techniques and best practices for creating smooth, performant animations that enhance user experience.",
      content:
        "Discover how to use Framer Motion to create sophisticated animations that feel natural and performant. We'll explore gesture animations, layout animations, and performance optimization techniques.",
      category: "UX Design",
      date: "2024-09-30",
      readTime: 10,
      tags: ["Framer Motion", "Animation", "UX", "React"],
    },
    {
      id: 4,
      title: "NestJS Best Practices: Building Scalable Backend Systems",
      excerpt:
        "A comprehensive guide to structuring NestJS applications for scalability, maintainability, and performance at enterprise scale.",
      content:
        "Learn NestJS best practices including module organization, dependency injection, middleware patterns, and testing strategies for building robust backend systems.",
      category: "Backend",
      date: "2024-09-22",
      readTime: 18,
      tags: ["NestJS", "Backend", "Architecture", "Node.js"],
    },
    {
      id: 5,
      title: "PostgreSQL Query Optimization: Indexing Strategies",
      excerpt:
        "Master the art of database optimization through effective indexing strategies and query analysis techniques.",
      content:
        "Explore different indexing strategies, query planning, and optimization techniques to dramatically improve database performance in production environments.",
      category: "Backend",
      date: "2024-09-15",
      readTime: 14,
      tags: ["PostgreSQL", "Database", "Performance", "Backend"],
    },
    {
      id: 6,
      title: "TypeScript Advanced Patterns: Generics and Utility Types",
      excerpt:
        "Deep dive into advanced TypeScript patterns that enable you to write more flexible, reusable, and type-safe code.",
      content:
        "Master advanced TypeScript concepts including generics, utility types, conditional types, and mapped types to write more expressive and maintainable code.",
      category: "Frontend",
      date: "2024-09-08",
      readTime: 11,
      tags: ["TypeScript", "Frontend", "Advanced", "Patterns"],
    },
  ]

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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === null
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border hover:border-primary/50"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>

            {/* Blog Posts */}
            <motion.div ref={containerRef} variants={containerVariants} className="space-y-6">
              {filteredPosts.map((post) => (
                <RevealOnScroll key={post.id}>
                  <motion.article
                    className="blog-post group p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer"
                    whileHover={{ x: 8 }}
                  >
                    <Link href={`/blog/${post.id}`} className="block space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {post.category}
                          </motion.span>
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
                  </motion.article>
                </RevealOnScroll>
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
