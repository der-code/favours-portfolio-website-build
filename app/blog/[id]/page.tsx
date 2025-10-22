"use client"

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { fetchHashnodePosts, type BlogPost } from "@/lib/hashnode"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      const allPosts = await fetchHashnodePosts()
      const foundPost = allPosts.find((p) => p.id === params.id || p.slug === params.id)
      setPost(foundPost || null)
      setLoading(false)
    }
    loadPost()
  }, [params.id])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Post not found</h1>
              <Link href="/blog">
                <Button>Back to Blog</Button>
              </Link>
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {/* Back Button */}
            <motion.div variants={itemVariants}>
              <Link href="/blog">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                  {post.category}
                </span>
                {post.source === "hashnode" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    Hashnode
                  </span>
                )}
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={itemVariants}
              className="prose prose-invert max-w-none space-y-6 text-muted-foreground"
            >
              {post.content.split("\n\n").map((paragraph, idx) => (
                <div key={idx}>
                  {paragraph.startsWith("##") ? (
                    <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{paragraph.replace("## ", "")}</h2>
                  ) : paragraph.startsWith("-") ? (
                    <ul className="space-y-2 ml-4">
                      {paragraph
                        .split("\n")
                        .filter((line) => line.startsWith("-"))
                        .map((line, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>{line.replace("- ", "")}</span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="leading-relaxed">{paragraph}</p>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-8 border-t border-border">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
