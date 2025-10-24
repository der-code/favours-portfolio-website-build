// Hashnode service following hashnode-next pattern
import {
    HashnodePost,
    HashnodeResponse,
    GET_PUBLICATION_POSTS,
    GET_POST_BY_SLUG,
    GET_PUBLICATION_INFO
} from './graphql'

const HASHNODE_API_URL = 'https://gql.hashnode.com'

// Get username dynamically at runtime
const getHashnodeUsername = () => {
    if (process.env.NEXT_PUBLIC_HASHNODE_USERNAME) {
        return process.env.NEXT_PUBLIC_HASHNODE_USERNAME
    }
    return "kells" // fallback
}

// Convert Hashnode post to our blog post format
export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    contentHtml: string
    category: string
    date: string
    readTime: number
    tags: string[]
    coverImage?: string
    author: {
        name: string
        username: string
        profilePicture?: string
    }
    url: string
    publishedAt: string
}

export function transformHashnodePost(post: HashnodePost): BlogPost {
    return {
        id: post.slug,
        title: post.title,
        slug: post.slug,
        excerpt: post.brief || post.subtitle || '',
        content: post.content.markdown,
        contentHtml: post.content.html,
        category: post.tags[0]?.name || 'General',
        date: new Date(post.publishedAt).toISOString().split('T')[0],
        readTime: post.readTimeInMinutes || 5,
        tags: post.tags.map(tag => tag.name),
        coverImage: post.coverImage?.url,
        author: {
            name: post.author.name,
            username: post.author.username,
            profilePicture: post.author.profilePicture
        },
        url: post.url,
        publishedAt: post.publishedAt
    }
}

// Fetch posts from Hashnode API
export async function fetchHashnodePosts(first: number = 10, after?: string): Promise<{
    posts: BlogPost[]
    hasNextPage: boolean
    endCursor?: string
}> {
    try {
        const username = getHashnodeUsername()

        if (!username) {
            throw new Error('Hashnode username not configured')
        }

        const variables = {
            host: `${username}.hashnode.dev`,
            first,
            after
        }

        const response = await fetch(HASHNODE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-Blog/1.0'
            },
            body: JSON.stringify({
                query: GET_PUBLICATION_POSTS,
                variables
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: HashnodeResponse = await response.json()

        if (data.errors) {
            console.error('GraphQL errors:', data.errors)
            throw new Error(data.errors[0].message)
        }

        if (!data.data?.publication) {
            throw new Error('No publication found')
        }

        const posts = data.data.publication.posts.edges.map(edge =>
            transformHashnodePost(edge.node)
        )

        return {
            posts,
            hasNextPage: data.data.publication.posts.pageInfo.hasNextPage,
            endCursor: data.data.publication.posts.pageInfo.endCursor
        }
    } catch (error) {
        console.error('Error fetching Hashnode posts:', error)
        throw error
    }
}

// Fetch single post by slug
export async function fetchHashnodePost(slug: string): Promise<BlogPost | null> {
    try {
        const username = getHashnodeUsername()

        if (!username) {
            throw new Error('Hashnode username not configured')
        }

        const variables = {
            host: `${username}.hashnode.dev`,
            slug
        }

        const response = await fetch(HASHNODE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-Blog/1.0'
            },
            body: JSON.stringify({
                query: GET_POST_BY_SLUG,
                variables
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: HashnodeResponse = await response.json()

        if (data.errors) {
            console.error('GraphQL errors:', data.errors)
            throw new Error(data.errors[0].message)
        }

        if (!data.data?.publication?.post) {
            return null
        }

        return transformHashnodePost(data.data.publication.post)
    } catch (error) {
        console.error('Error fetching Hashnode post:', error)
        throw error
    }
}

// Fetch publication info
export async function fetchPublicationInfo(): Promise<{
    title: string
    about?: string
    url: string
} | null> {
    try {
        const username = getHashnodeUsername()

        if (!username) {
            throw new Error('Hashnode username not configured')
        }

        const variables = {
            host: `${username}.hashnode.dev`
        }

        const response = await fetch(HASHNODE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-Blog/1.0'
            },
            body: JSON.stringify({
                query: GET_PUBLICATION_INFO,
                variables
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: HashnodeResponse = await response.json()

        if (data.errors) {
            console.error('GraphQL errors:', data.errors)
            throw new Error(data.errors[0].message)
        }

        if (!data.data?.publication) {
            return null
        }

        return {
            title: data.data.publication.title,
            about: data.data.publication.about?.text,
            url: data.data.publication.url
        }
    } catch (error) {
        console.error('Error fetching publication info:', error)
        throw error
    }
}
