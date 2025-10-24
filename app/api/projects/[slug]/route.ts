import { NextRequest, NextResponse } from 'next/server'
import { fetchProjectBySlug } from '@/lib/hygraph-simple'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params
        console.log(`[Project API] Starting project fetch for slug: ${resolvedParams.slug}`)

        const project = await fetchProjectBySlug(resolvedParams.slug)

        if (!project) {
            return NextResponse.json({
                success: false,
                error: 'Project not found'
            }, { status: 404 })
        }

        console.log('[Project API] Successfully fetched project:', project.title)

        return NextResponse.json({
            success: true,
            project
        })
    } catch (error) {
        console.error(`[Project API] Error fetching project:`, error)

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            project: null
        }, { status: 500 })
    }
}
