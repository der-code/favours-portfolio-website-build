// Simplified Hygraph service with flexible field handling
import { GraphQLClient } from 'graphql-request'

// Hygraph API configuration
const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || ''
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN || ''

// GraphQL client
const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
    headers: {
        authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
})

// Flexible GraphQL query - request all fields with correct structure
const GET_PROJECTS_FLEXIBLE = `
  query GetProjects {
    projects(orderBy: createdAt_DESC) {
      id
      title
      slug
      description
      caseStudy {
        raw
        html
        markdown
        text
      }
      category
      featured
      publishedAt
      updatedAt
      createdAt
      tags
      technologies
      liveUrl
      githubUrl
      coverImage {
        id
        url
      }
      gallery {
        id
        url
      }
      content {
        raw
        html
        markdown
        text
      }
      seo {
        title
        description
        keywords
      }
    }
  }
`

// TypeScript interfaces - updated to match actual Hygraph structure
export interface FlexibleProject {
    id: string
    title: string
    slug?: string
    description?: string
    caseStudy?: {
        raw?: any
        html?: string
        markdown?: string
        text?: string
    }
    category?: string
    featured?: boolean
    publishedAt?: string
    updatedAt?: string
    createdAt?: string
    tags?: string[]
    technologies?: string[]
    liveUrl?: string
    githubUrl?: string
    coverImage?: {
        id: string
        url: string
    }
    gallery?: Array<{
        id: string
        url: string
    }>
    content?: {
        raw?: any
        html?: string
        markdown?: string
        text?: string
    }
    seo?: {
        title?: string
        description?: string
        keywords?: string[]
    }
}

export interface Project {
    id: string
    title: string
    slug: string
    description: string
    caseStudy: string
    category: string
    featured: boolean
    publishedAt: string
    updatedAt: string
    tags: string[]
    technologies: string[]
    liveUrl?: string
    githubUrl?: string
    coverImage?: string
    gallery?: string[]
    content?: string
    seo?: {
        title?: string
        description?: string
        keywords?: string[]
    }
}

// Transform flexible project to our format
export function transformFlexibleProject(project: FlexibleProject): Project {
    return {
        id: project.id,
        title: project.title,
        slug: project.slug || project.id,
        description: project.description || '',
        caseStudy: project.caseStudy?.html || project.caseStudy?.markdown || project.caseStudy?.text || '',
        category: project.category || 'general',
        featured: project.featured || false,
        publishedAt: project.publishedAt || project.createdAt || new Date().toISOString(),
        updatedAt: project.updatedAt || project.createdAt || new Date().toISOString(),
        tags: project.tags || [],
        technologies: project.technologies || [],
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        coverImage: project.coverImage?.url,
        gallery: project.gallery?.map(img => img.url),
        content: project.content?.html || project.content?.markdown,
        seo: project.seo
    }
}

// Service function with better error handling
export async function fetchProjects(): Promise<Project[]> {
    try {
        if (!HYGRAPH_ENDPOINT || !HYGRAPH_TOKEN) {
            console.warn('Hygraph configuration missing, using fallback data')
            return getFallbackProjects()
        }

        console.log('🔍 Fetching projects from Hygraph...')

        // Try the full query first
        try {
            const data = await client.request<{ projects: FlexibleProject[] }>(GET_PROJECTS_FLEXIBLE)

            if (!data.projects) {
                throw new Error('No projects found in response')
            }

            console.log(`✅ Successfully fetched ${data.projects.length} projects with full data`)

            // Log what fields we got for debugging
            if (data.projects.length > 0) {
                const sample = data.projects[0]
                console.log('📋 Sample project fields received:')
                console.log('  - caseStudy:', sample.caseStudy ? '✅' : '❌')
                console.log('  - category:', sample.category ? '✅' : '❌')
                console.log('  - tags:', sample.tags ? `✅ (${sample.tags.length} items)` : '❌')
                console.log('  - technologies:', sample.technologies ? `✅ (${sample.technologies.length} items)` : '❌')
                console.log('  - seo:', sample.seo ? '✅' : '❌')
                console.log('  - coverImage:', sample.coverImage ? '✅' : '❌')
                console.log('  - gallery:', sample.gallery ? `✅ (${sample.gallery.length} items)` : '❌')
            }

            return data.projects.map(transformFlexibleProject)
        } catch (fullQueryError) {
            console.warn('⚠️ Full query failed, trying basic query:', fullQueryError)

            // Fallback to basic query
            const basicQuery = `
        query GetProjectsBasic {
          projects(orderBy: createdAt_DESC) {
            id
            title
            slug
            description
            createdAt
            updatedAt
          }
        }
      `

            const basicData = await client.request<{ projects: FlexibleProject[] }>(basicQuery)

            if (!basicData.projects) {
                throw new Error('No projects found in basic response')
            }

            console.log(`✅ Successfully fetched ${basicData.projects.length} projects with basic data`)

            return basicData.projects.map(project => ({
                id: project.id,
                title: project.title,
                slug: project.slug || project.id,
                description: project.description || '',
                caseStudy: '',
                category: 'general',
                featured: false,
                publishedAt: project.createdAt || new Date().toISOString(),
                updatedAt: project.updatedAt || project.createdAt || new Date().toISOString(),
                tags: [],
                technologies: [],
                liveUrl: undefined,
                githubUrl: undefined,
                coverImage: undefined,
                gallery: undefined,
                content: undefined,
                seo: undefined
            }))
        }
    } catch (error) {
        console.error('❌ Error fetching projects from Hygraph:', error)

        // Log more details about the error
        if (error instanceof Error) {
            console.error('Error message:', error.message)
        }

        console.log('🔄 Falling back to static data')
        return getFallbackProjects()
    }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
    try {
        if (!HYGRAPH_ENDPOINT || !HYGRAPH_TOKEN) {
            console.warn('Hygraph configuration missing')
            return null
        }

        const query = `
          query GetProjectBySlug($slug: String!) {
            project(where: { slug: $slug }) {
              id
              title
              slug
              description
              caseStudy {
                raw
                html
                markdown
                text
              }
              category
              featured
              publishedAt
              updatedAt
              createdAt
              tags
              technologies
              liveUrl
              githubUrl
              coverImage {
                id
                url
              }
              gallery {
                id
                url
              }
              content {
                raw
                html
                markdown
                text
              }
              seo {
                title
                description
                keywords
              }
            }
          }
        `

        const data = await client.request<{ project: FlexibleProject | null }>(query, { slug })

        if (!data.project) {
            return null
        }

        console.log(`✅ Successfully fetched project: ${data.project.title}`)

        // Log what fields we got for debugging
        console.log('📋 Project fields received:')
        console.log('  - caseStudy:', data.project.caseStudy ? '✅' : '❌')
        console.log('  - category:', data.project.category ? '✅' : '❌')
        console.log('  - tags:', data.project.tags ? `✅ (${data.project.tags.length} items)` : '❌')
        console.log('  - technologies:', data.project.technologies ? `✅ (${data.project.technologies.length} items)` : '❌')
        console.log('  - seo:', data.project.seo ? '✅' : '❌')
        console.log('  - coverImage:', data.project.coverImage ? '✅' : '❌')
        console.log('  - gallery:', data.project.gallery ? `✅ (${data.project.gallery.length} items)` : '❌')

        return transformFlexibleProject(data.project)
    } catch (error) {
        console.error('Error fetching project from Hygraph:', error)
        return null
    }
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
    try {
        if (!HYGRAPH_ENDPOINT || !HYGRAPH_TOKEN) {
            console.warn('Hygraph configuration missing, using fallback data')
            return getFallbackProjects().filter(p => p.featured)
        }

        // Try to fetch featured projects, fall back to all if featured field doesn't exist
        const query = `
      query GetFeaturedProjects {
        projects(where: { featured: true }, orderBy: createdAt_DESC) {
          id
          title
          slug
          description
          createdAt
          updatedAt
        }
      }
    `

        try {
            const data = await client.request<{ projects: FlexibleProject[] }>(query)
            return data.projects.map(transformFlexibleProject)
        } catch (featuredError) {
            console.warn('Featured query failed, fetching all projects:', featuredError)
            const allProjects = await fetchProjects()
            return allProjects.filter(p => p.featured)
        }
    } catch (error) {
        console.error('Error fetching featured projects from Hygraph:', error)
        console.log('Falling back to static data')
        return getFallbackProjects().filter(p => p.featured)
    }
}

// Fallback data when Hygraph is not configured
function getFallbackProjects(): Project[] {
    return [
        {
            id: "1",
            title: "LMS Platform",
            slug: "lms-platform",
            description: "A comprehensive Learning Management System with real-time collaboration features and advanced analytics.",
            caseStudy: "Built a scalable LMS platform serving 10,000+ students with real-time notifications and progress tracking.",
            category: "fullstack",
            featured: true,
            publishedAt: "2024-01-15T00:00:00.000Z",
            updatedAt: "2024-01-15T00:00:00.000Z",
            tags: ["React", "NestJS", "PostgreSQL", "WebSocket"],
            technologies: ["React", "NestJS", "PostgreSQL", "WebSocket", "TypeScript"],
            liveUrl: "#",
            githubUrl: "#",
            coverImage: "/lms-dashboard.png"
        },
        {
            id: "2",
            title: "Multi-tenant SaaS",
            slug: "multi-tenant-saas",
            description: "Enterprise SaaS platform with multi-tenancy, role-based access control, and advanced billing integration.",
            caseStudy: "Architected a multi-tenant system handling 50+ enterprise clients with isolated data and custom workflows.",
            category: "fullstack",
            featured: true,
            publishedAt: "2024-01-10T00:00:00.000Z",
            updatedAt: "2024-01-10T00:00:00.000Z",
            tags: ["Next.js", "NestJS", "MongoDB", "Stripe"],
            technologies: ["Next.js", "NestJS", "MongoDB", "Stripe", "TypeScript"],
            liveUrl: "#",
            githubUrl: "#",
            coverImage: "/saas-dashboard-multi-tenant.jpg"
        },
        {
            id: "3",
            title: "Newsletter Builder",
            slug: "newsletter-builder",
            description: "Drag-and-drop email newsletter builder with template library and campaign analytics.",
            caseStudy: "Created an intuitive drag-and-drop interface enabling non-technical users to build professional newsletters.",
            category: "frontend",
            featured: false,
            publishedAt: "2024-01-05T00:00:00.000Z",
            updatedAt: "2024-01-05T00:00:00.000Z",
            tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
            liveUrl: "#",
            githubUrl: "#",
            coverImage: "/email-newsletter-builder-interface.jpg"
        },
        {
            id: "4",
            title: "Media Mart Platform",
            slug: "media-mart-platform",
            description: "E-commerce platform for digital media with advanced search, filtering, and recommendation engine.",
            caseStudy: "Optimized search performance using Elasticsearch, reducing query time by 80% for 1M+ products.",
            category: "fullstack",
            featured: true,
            publishedAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
            tags: ["Next.js", "PostgreSQL", "Elasticsearch", "Redis"],
            technologies: ["Next.js", "PostgreSQL", "Elasticsearch", "Redis", "TypeScript"],
            liveUrl: "#",
            githubUrl: "#",
            coverImage: "/ecommerce-media-marketplace.jpg"
        },
        {
            id: "5",
            title: "Motion Design Library",
            slug: "motion-design-library",
            description: "Reusable component library with advanced animation patterns and accessibility features.",
            caseStudy: "Developed a comprehensive motion design system reducing development time by 40% across projects.",
            category: "frontend",
            featured: false,
            publishedAt: "2023-12-20T00:00:00.000Z",
            updatedAt: "2023-12-20T00:00:00.000Z",
            tags: ["React", "Framer Motion", "Storybook", "TypeScript"],
            technologies: ["React", "Framer Motion", "Storybook", "TypeScript"],
            liveUrl: "#",
            githubUrl: "#",
            coverImage: "/component-library-ui-design-system.jpg"
        },
        {
            id: "6",
            title: "Analytics Dashboard",
            slug: "analytics-dashboard",
            description: "Real-time analytics dashboard with interactive charts, data visualization, and custom reporting.",
            caseStudy: "Built real-time dashboard processing 100K+ events per minute with sub-second query response times.",
            category: "fullstack",
            featured: false,
            publishedAt: "2023-12-15T00:00:00.000Z",
            updatedAt: "2023-12-15T00:00:00.000Z",
            tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
            technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "TypeScript"],
            liveUrl: "#",
            githubUrl: "#",
            coverImage: "/analytics-dashboard-charts.png"
        }
    ]
}
