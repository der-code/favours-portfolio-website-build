import { NextRequest, NextResponse } from 'next/server'
import { fetchHashnodePosts } from '@/lib/hashnode-service'

export async function GET(request: NextRequest) {
    try {
        console.log('[v0] API Route: Starting Hashnode fetch')

        const { searchParams } = new URL(request.url)
        const first = parseInt(searchParams.get('first') || '10')
        const after = searchParams.get('after') || undefined

        const result = await fetchHashnodePosts(first, after)

        console.log('[v0] API Route: Successfully fetched posts:', result.posts.length)

        return NextResponse.json({
            success: true,
            posts: result.posts,
            hasNextPage: result.hasNextPage,
            endCursor: result.endCursor,
            count: result.posts.length
        })
    } catch (error) {
        console.error('[v0] API Route: Error fetching posts:', error)

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            posts: [],
            hasNextPage: false,
            endCursor: null
        }, { status: 500 })
    }
}
