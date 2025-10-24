// Hygraph CMS integration for projects
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

// GraphQL queries - Start with basic fields and expand
const GET_PROJECTS_BASIC = `
  query GetProjects {
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

const GET_PROJECTS_FULL = `
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

const GET_PROJECT_BY_SLUG = `
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

const GET_FEATURED_PROJECTS = `
  query GetFeaturedProjects {
    projects(where: { featured: true }, orderBy: createdAt_DESC) {
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
    }
  }
`

// TypeScript interfaces
export interface HygraphProject {
  id: string
  title: string
  slug: string
  description: string
  caseStudy: {
    raw: string
    html: string
    markdown: string
    text: string
  }
  category: string
  featured: boolean
  publishedAt: string
  updatedAt: string
  tags: string[]
  technologies: string[]
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
    raw: any
    html: string
    markdown: string
    text: string
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
  caseStudy: {
    raw: string
    html: string
    markdown: string
    text: string
  }
  category: string
  featured: boolean
  publishedAt: string
  updatedAt: string
  tags: string[]
  technologies: string[]
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
    raw: any
    html: string
    markdown: string
    text: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

// Transform Hygraph project to our format
export function transformHygraphProject(hygraphProject: HygraphProject): Project {
  return {
    id: hygraphProject.id,
    title: hygraphProject.title,
    slug: hygraphProject.slug,
    description: hygraphProject.description,
    caseStudy: hygraphProject.caseStudy ?? { raw: '', html: '', markdown: '', text: '' },
    category: hygraphProject.category,
    featured: hygraphProject.featured,
    publishedAt: hygraphProject.publishedAt,
    updatedAt: hygraphProject.updatedAt,
    tags: hygraphProject.tags,
    technologies: hygraphProject.technologies,
    liveUrl: hygraphProject.liveUrl,
    githubUrl: hygraphProject.githubUrl,
    coverImage: hygraphProject.coverImage?.url ? { id: hygraphProject.coverImage.id, url: hygraphProject.coverImage.url } : undefined,
    gallery: hygraphProject.gallery?.map(img => img.url ? { id: img.id, url: img.url } : undefined).filter(img => img !== undefined),
    content: hygraphProject.content?.html ? { raw: hygraphProject.content.raw || '', html: hygraphProject.content.html || '', markdown: hygraphProject.content.markdown || '', text: hygraphProject.content.text || '' } : undefined,
    seo: hygraphProject.seo
  }
}

// Service functions
export async function fetchProjects(): Promise<Project[]> {
  try {
    if (!HYGRAPH_ENDPOINT || !HYGRAPH_TOKEN) {
      console.warn('Hygraph configuration missing, using fallback data')
      return getFallbackProjects()
    }

    console.log('🔍 Attempting to fetch projects from Hygraph...')
    console.log('📍 Endpoint:', HYGRAPH_ENDPOINT)
    console.log('🔑 Token:', HYGRAPH_TOKEN ? 'Present' : 'Missing')

    // First try basic query to test connection
    try {
      console.log('🧪 Testing basic connection...')
      const basicData = await client.request<{ projects: any[] }>(GET_PROJECTS_BASIC)
      console.log('✅ Basic connection successful, found', basicData.projects.length, 'projects')

      // If basic works, try full query
      try {
        console.log('🔍 Attempting full query...')
        const fullData = await client.request<{ projects: HygraphProject[] }>(GET_PROJECTS_FULL)
        console.log('✅ Full query successful')
        return fullData.projects.map(transformHygraphProject)
      } catch (fullError) {
        console.warn('⚠️ Full query failed, using basic data:', fullError)
        // Transform basic data to our format
        return basicData.projects.map(project => ({
          id: project.id,
          title: project.title,
          slug: project.slug,
          description: project.description,
          caseStudy: { raw: '', html: '', markdown: '', text: '' },
          category: 'general',
          featured: false,
          publishedAt: project.createdAt,
          updatedAt: project.updatedAt,
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
    } catch (basicError) {
      console.error('❌ Basic connection failed:', basicError)
      throw basicError
    }
  } catch (error) {
    console.error('❌ Error fetching projects from Hygraph:', error)
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

    const data = await client.request<{ project: HygraphProject | null }>(GET_PROJECT_BY_SLUG, {
      slug
    })

    if (!data.project) {
      return null
    }

    return transformHygraphProject(data.project)
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

    const data = await client.request<{ projects: HygraphProject[] }>(GET_FEATURED_PROJECTS)

    return data.projects.map(transformHygraphProject)
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
      caseStudy: { raw: '', html: '', markdown: '', text: '' },
      category: "fullstack",
      featured: true,
      publishedAt: "2024-01-15T00:00:00.000Z",
      updatedAt: "2024-01-15T00:00:00.000Z",
      tags: ["React", "NestJS", "PostgreSQL", "WebSocket"],
      technologies: ["React", "NestJS", "PostgreSQL", "WebSocket", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      coverImage: { id: '', url: '/lms-dashboard.png' }
    },
    {
      id: "2",
      title: "Multi-tenant SaaS",
      slug: "multi-tenant-saas",
      description: "Enterprise SaaS platform with multi-tenancy, role-based access control, and advanced billing integration.",
      caseStudy: { raw: '', html: '', markdown: '', text: '' },
      category: "fullstack",
      featured: true,
      publishedAt: "2024-01-10T00:00:00.000Z",
      updatedAt: "2024-01-10T00:00:00.000Z",
      tags: ["Next.js", "NestJS", "MongoDB", "Stripe"],
      technologies: ["Next.js", "NestJS", "MongoDB", "Stripe", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      coverImage: { id: '', url: '/saas-dashboard-multi-tenant.jpg' }
    },
    {
      id: "3",
      title: "Newsletter Builder",
      slug: "newsletter-builder",
      description: "Drag-and-drop email newsletter builder with template library and campaign analytics.",
      caseStudy: { raw: '', html: '', markdown: '', text: '' },
      category: "frontend",
      featured: false,
      publishedAt: "2024-01-05T00:00:00.000Z",
      updatedAt: "2024-01-05T00:00:00.000Z",
      tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      coverImage: { id: '', url: '/email-newsletter-builder-interface.jpg' }
    },
    {
      id: "4",
      title: "Media Mart Platform",
      slug: "media-mart-platform",
      description: "E-commerce platform for digital media with advanced search, filtering, and recommendation engine.",
      caseStudy: { raw: '', html: '', markdown: '', text: '' },
      category: "fullstack",
      featured: true,
      publishedAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      tags: ["Next.js", "PostgreSQL", "Elasticsearch", "Redis"],
      technologies: ["Next.js", "PostgreSQL", "Elasticsearch", "Redis", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      coverImage: { id: '', url: '/ecommerce-media-marketplace.jpg' }
    },
    {
      id: "5",
      title: "Motion Design Library",
      slug: "motion-design-library",
      description: "Reusable component library with advanced animation patterns and accessibility features.",
      caseStudy: { raw: '', html: '', markdown: '', text: '' },
      category: "frontend",
      featured: false,
      publishedAt: "2023-12-20T00:00:00.000Z",
      updatedAt: "2023-12-20T00:00:00.000Z",
      tags: ["React", "Framer Motion", "Storybook", "TypeScript"],
      technologies: ["React", "Framer Motion", "Storybook", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      coverImage: { id: '', url: '/component-library-ui-design-system.jpg' }
    },
    {
      id: "6",
      title: "Analytics Dashboard",
      slug: "analytics-dashboard",
      description: "Real-time analytics dashboard with interactive charts, data visualization, and custom reporting.",
      caseStudy: { raw: '', html: '', markdown: '', text: '' },
      category: "fullstack",
      featured: false,
      publishedAt: "2023-12-15T00:00:00.000Z",
      updatedAt: "2023-12-15T00:00:00.000Z",
      tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      coverImage: { id: '', url: '/analytics-dashboard-charts.png' }
    }
  ]
}
