import { NextRequest, NextResponse } from 'next/server'
import { fetchProjects, fetchFeaturedProjects } from '@/lib/hygraph-simple'

export async function GET(request: NextRequest) {
    console.log('[Projects API] Starting projects fetch')
    console.log('[Projects API] Environment check:', {
        HYGRAPH_ENDPOINT: process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ? 'Set' : 'Missing',
        HYGRAPH_TOKEN: process.env.HYGRAPH_TOKEN ? 'Set' : 'Missing'
    })

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'

    try {
        let projects
        if (featured) {
            console.log('[Projects API] Fetching featured projects...')
            projects = await fetchFeaturedProjects()
            console.log('[Projects API] Successfully fetched featured projects:', projects.length)
        } else {
            console.log('[Projects API] Fetching all projects...')
            projects = await fetchProjects()
            console.log('[Projects API] Successfully fetched all projects:', projects.length)
        }

        console.log('[Projects API] Returning response with', projects.length, 'projects')

        return NextResponse.json({
            success: true,
            projects,
            count: projects.length,
            featured
        })
    } catch (error) {
        console.error('[Projects API] Error fetching projects:', error)
        console.error('[Projects API] Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace'
        })

        // Return fallback data instead of empty response
        console.log('[Projects API] Returning fallback data due to error')
        return NextResponse.json({
            success: true,
            projects: [
                {
                    id: "fallback-1",
                    title: "Sample Project 1",
                    slug: "sample-project-1",
                    description: "This is a fallback project when Hygraph is unavailable.",
                    caseStudy: "Fallback project for testing purposes.",
                    category: "fullstack",
                    featured: true,
                    publishedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tags: ["React", "TypeScript"],
                    technologies: ["React", "TypeScript", "Next.js"],
                    liveUrl: "#",
                    githubUrl: "#",
                    coverImage: "/placeholder.svg"
                }
            ],
            count: 1,
            featured,
            fallback: true
        })
    }
}
