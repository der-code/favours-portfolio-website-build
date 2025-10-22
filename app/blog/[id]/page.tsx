"use client"

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const blogPosts: Record<
  string,
  {
    title: string
    category: string
    date: string
    readTime: number
    tags: string[]
    content: string
    fullContent: string
  }
> = {
  "1": {
    title: "Building Multi-tenant Systems with Traefik and Docker",
    category: "DevOps",
    date: "2024-10-15",
    readTime: 12,
    tags: ["Docker", "Traefik", "DevOps", "Architecture"],
    content:
      "A deep dive into architecting scalable multi-tenant applications using Traefik as a reverse proxy and Docker for containerization.",
    fullContent: `
In this comprehensive guide, we explore the architecture and implementation of multi-tenant systems. We'll cover how to use Traefik for intelligent routing, Docker for containerization, and best practices for data isolation and security.

## Understanding Multi-tenancy

Multi-tenancy is an architecture where a single instance of an application serves multiple customers (tenants). Each tenant's data is isolated and invisible to other tenants.

## Traefik as a Reverse Proxy

Traefik is a modern reverse proxy that automatically discovers services and configures itself. It's perfect for multi-tenant architectures because it can route requests based on hostnames, paths, or other criteria.

## Docker Containerization

Docker allows us to package our application and its dependencies into containers. This makes it easy to deploy multiple instances of our application.

## Best Practices

1. **Data Isolation**: Ensure each tenant's data is completely isolated
2. **Security**: Implement proper authentication and authorization
3. **Scalability**: Design your system to scale horizontally
4. **Monitoring**: Implement comprehensive logging and monitoring

## Conclusion

Building multi-tenant systems requires careful planning and architecture. With Traefik and Docker, you can create scalable, secure, and maintainable systems.
    `,
  },
  "2": {
    title: "React Performance Optimization: From 3s to 0.8s Load Time",
    category: "Frontend",
    date: "2024-10-08",
    readTime: 15,
    tags: ["React", "Performance", "Optimization", "Frontend"],
    content:
      "Practical techniques for optimizing React applications, including code splitting, lazy loading, and advanced caching strategies.",
    fullContent: `
Learn how to identify performance bottlenecks in React applications and implement solutions that dramatically improve load times.

## Performance Metrics

Understanding key performance metrics is crucial:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

## Code Splitting

Code splitting allows you to split your bundle into smaller chunks that are loaded on demand.

## Lazy Loading

Lazy loading components and images can significantly reduce initial load time.

## Caching Strategies

Implementing proper caching strategies can dramatically improve performance for returning users.

## Results

By implementing these techniques, we achieved a 73% reduction in load time, from 3 seconds to 0.8 seconds.
    `,
  },
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id]

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
              {post.fullContent.split("\n\n").map((paragraph, idx) => (
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
