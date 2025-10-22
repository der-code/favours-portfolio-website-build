import { NextRequest, NextResponse } from 'next/server'
import { fetchHashnodePosts } from '@/lib/hashnode'

export async function GET(request: NextRequest) {
    try {
        console.log('[v0] API Route: Starting Hashnode fetch')

        const posts = await fetchHashnodePosts()

        console.log('[v0] API Route: Successfully fetched posts:', posts.length)

        return NextResponse.json({
            success: true,
            posts,
            count: posts.length
        })
    } catch (error) {
        console.error('[v0] API Route: Error fetching posts:', error)

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            posts: []
        }, { status: 500 })
    }
}
