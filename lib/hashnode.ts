// Hashnode API Integration
// To use your own Hashnode blog, create a .env.local file with:
// NEXT_PUBLIC_HASHNODE_USERNAME=your-actual-hashnode-username
// Make sure your Hashnode blog is public and accessible

const HASHNODE_API_URL = "https://gql.hashnode.com"

// Get username dynamically at runtime
const getHashnodeUsername = () => {
  console.log('[v0] Getting username at runtime...')
  console.log('[v0] process.env.NEXT_PUBLIC_HASHNODE_USERNAME:', process.env.NEXT_PUBLIC_HASHNODE_USERNAME)
  console.log('[v0] typeof process.env.NEXT_PUBLIC_HASHNODE_USERNAME:', typeof process.env.NEXT_PUBLIC_HASHNODE_USERNAME)

  // Try environment variable first
  if (process.env.NEXT_PUBLIC_HASHNODE_USERNAME) {
    console.log('[v0] Using environment variable:', process.env.NEXT_PUBLIC_HASHNODE_USERNAME)
    return process.env.NEXT_PUBLIC_HASHNODE_USERNAME
  }
  // Fallback to hardcoded value
  console.log('[v0] Using fallback username: kells')
  return "kells"
}

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
    // Get username at runtime to ensure we get the latest environment variable
    const HASHNODE_USERNAME = getHashnodeUsername()

    console.log(`[v0] ===== STARTING HASHNODE FETCH =====`)
    console.log(`[v0] Username: ${HASHNODE_USERNAME}`)
    console.log(`[v0] Environment: ${typeof window !== 'undefined' ? 'browser' : 'server'}`)
    console.log(`[v0] API URL: ${HASHNODE_API_URL}`)

    const query = `query GetUserPosts($host: String!) {
      publication(host: $host) {
        title
        posts(first: 10) {
          edges {
            node {
              id
              title
              slug
              subtitle
              brief
              content {
                markdown
                html
              }
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
    }`

    // Ensure HASHNODE_USERNAME is defined
    if (!HASHNODE_USERNAME) {
      console.error('[v0] HASHNODE_USERNAME is undefined or null')
      console.error('[v0] process.env.NEXT_PUBLIC_HASHNODE_USERNAME:', process.env.NEXT_PUBLIC_HASHNODE_USERNAME)
      return FALLBACK_POSTS
    }

    const variables = {
      host: `${HASHNODE_USERNAME}.hashnode.dev`,
    }

    console.log(`[v0] Making request to Hashnode API with host: ${variables.host}`)

    const requestBody = {
      query,
      variables,
    }

    console.log(`[v0] Query being sent:`, query)
    console.log(`[v0] Request body:`, JSON.stringify(requestBody, null, 2))

    let response: Response
    try {
      response = await fetch(HASHNODE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Portfolio-Blog/1.0",
        },
        body: JSON.stringify(requestBody),
      })
    } catch (fetchError) {
      console.error("[v0] Fetch error:", fetchError)
      throw new Error(`Failed to fetch from Hashnode API: ${fetchError}`)
    }

    console.log(`[v0] Hashnode API response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[v0] Hashnode API error (${response.status}):`, errorText)
      return FALLBACK_POSTS
    }

    const data = await response.json()
    console.log(`[v0] Hashnode API response data:`, data)

    if (data.errors) {
      console.error("[v0] Hashnode GraphQL errors:", data.errors)
      return FALLBACK_POSTS
    }

    if (!data.data?.publication) {
      console.error(`[v0] No publication found for host: ${variables.host}`)
      console.error(`[v0] This could mean:`)
      console.error(`[v0] 1. The username "${HASHNODE_USERNAME}" doesn't exist on Hashnode`)
      console.error(`[v0] 2. The publication is private`)
      console.error(`[v0] 3. The username is incorrect`)
      console.error(`[v0] Using fallback posts instead`)
      return FALLBACK_POSTS
    }

    const articles = data.data.publication.posts?.edges || []
    console.log(`[v0] Found ${articles.length} articles from Hashnode`)

    const posts: BlogPost[] = articles.map((edge: any) => {
      const article = edge.node
      return {
        id: article.slug,
        title: article.title,
        excerpt: article.brief || article.subtitle || article.title,
        content: article.content?.markdown || article.content?.html || "Content not available",
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
    const allPosts = [...posts, ...FALLBACK_POSTS]
    console.log(`[v0] Returning ${allPosts.length} total posts (${posts.length} from Hashnode, ${FALLBACK_POSTS.length} fallback)`)
    return allPosts
  } catch (error) {
    console.error("[v0] ===== HASHNODE FETCH ERROR =====")
    console.error("[v0] Error type:", typeof error)
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : 'No stack trace')
    console.error("[v0] Full error object:", error)
    console.error("[v0] Returning fallback posts due to error")
    return FALLBACK_POSTS
  }
}

export { fetchHashnodePosts }
