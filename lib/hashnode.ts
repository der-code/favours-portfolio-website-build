const HASHNODE_API_URL = "https://gql.hashnode.com"
const HASHNODE_USERNAME = process.env.NEXT_PUBLIC_HASHNODE_USERNAME || "favour-max-oti"

export interface HashnodePost {
  id: string
  title: string
  slug: string
  brief: string
  content: string
  publishedAt: string
  readTimeInMinutes: number
  tags: Array<{ name: string }>
  coverImage?: { url: string }
}

export interface BlogPost {
  id: string | number
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: number
  tags: string[]
  source: "hashnode" | "fallback"
  slug?: string
  coverImage?: string
}

// Fallback posts for when Hashnode API is unavailable
export const FALLBACK_POSTS: BlogPost[] = [
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
    source: "fallback",
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
    source: "fallback",
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
    source: "fallback",
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
    source: "fallback",
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
    source: "fallback",
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
    source: "fallback",
  },
]

async function fetchHashnodePosts(): Promise<BlogPost[]> {
  try {
    const query = `
      query GetUserPosts($host: String!) {
        publication(host: $host) {
          title
          posts(first: 10) {
            edges {
              node {
                id
                title
                slug
                subtitle
                content
                publishedAt
                readTimeInMinutes
                tags {
                  name
                }
                coverImage {
                  url
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          host: `${HASHNODE_USERNAME}.hashnode.dev`,
        },
      }),
    })

    if (!response.ok) {
      console.error("[v0] Hashnode API error:", response.statusText)
      return FALLBACK_POSTS
    }

    const data = await response.json()

    if (data.errors) {
      console.error("[v0] Hashnode GraphQL error:", data.errors)
      return FALLBACK_POSTS
    }

    const articles = data.data?.publication?.posts?.edges || []

    const posts: BlogPost[] = articles.map((edge: any) => {
      const article = edge.node
      return {
        id: article.slug,
        title: article.title,
        excerpt: article.subtitle || article.title,
        content: article.content,
        category: article.tags[0]?.name || "General",
        date: new Date(article.publishedAt).toISOString().split("T")[0],
        readTime: article.readTimeInMinutes || 5,
        tags: article.tags.map((tag: any) => tag.name),
        source: "hashnode" as const,
        slug: article.slug,
        coverImage: article.coverImage?.url,
      }
    })

    // Combine Hashnode posts with fallback posts
    return [...posts, ...FALLBACK_POSTS]
  } catch (error) {
    console.error("[v0] Error fetching Hashnode posts:", error)
    return FALLBACK_POSTS
  }
}

export { fetchHashnodePosts }
