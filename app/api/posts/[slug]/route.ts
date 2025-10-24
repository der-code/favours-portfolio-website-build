import { NextRequest, NextResponse } from 'next/server'
import { fetchHashnodePost } from '@/lib/hashnode-service'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params
        const { slug } = resolvedParams

        console.log('[v0] API Route: Fetching post by slug:', slug)

        const post = await fetchHashnodePost(slug)

        if (!post) {
            return NextResponse.json({
                success: false,
                error: 'Post not found',
                post: null
            }, { status: 404 })
        }

        console.log('[v0] API Route: Successfully fetched post:', post.title)

        return NextResponse.json({
            success: true,
            post
        })
    } catch (error) {
        console.error('[v0] API Route: Error fetching post:', error)

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            post: null
        }, { status: 500 })
    }
}
