"use client"

import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type BlogPost } from "@/lib/hashnode-service"
import { ContentRenderer } from "@/components/content-renderer"
import { useEffect, useState } from "react"
import { Loader } from "@/components/aceternity/loader"

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [postId, setPostId] = useState<string | null>(null)

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params
      setPostId(resolvedParams.id)
    }
    loadParams()
  }, [params])

  useEffect(() => {
    if (!postId) return

    const loadPost = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/posts/${postId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Post not found')
          }
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.post) {
          setPost(data.post)
        } else {
          throw new Error(data.error || 'Failed to load post')
        }
      } catch (error) {
        console.error('Error loading post:', error)
        setError(error instanceof Error ? error.message : 'Failed to load post')
        setPost(null)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [postId])

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

  if (error || !post) {
    return (
      <>
        <Navbar />
        <MobileNav />
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <p className="text-lg text-muted-foreground">
              {error || "The article you are looking for does not exist."}
            </p>
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-8">
            {/* Back Button */}
            <div>
              <Link href="/blog">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Header */}
            <div className="space-y-4">
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                  {post.category}
                </span>
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
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>

              {/* Author Info */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center gap-3">
                  {post.author.profilePicture && (
                    <img
                      src={post.author.profilePicture}
                      alt={post.author.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">@{post.author.username}</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <Link href={post.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Read on Hashnode
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Content */}
            <ContentRenderer
              content={post.contentHtml}
              source="hashnode"
              className="prose-headings:text-foreground prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:bg-muted prose-code:text-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-muted prose-pre:text-foreground prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-ul:list-disc prose-ol:list-decimal prose-li:text-muted-foreground prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-th:text-left prose-td:border prose-td:border-border prose-td:p-2"
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}