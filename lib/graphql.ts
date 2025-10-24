// GraphQL types and queries following hashnode-next pattern
export interface HashnodePost {
  id: string
  title: string
  slug: string
  subtitle?: string
  brief?: string
  content: {
    markdown: string
    html: string
  }
  publishedAt: string
  readTimeInMinutes: number
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
  coverImage?: {
    url: string
  }
  author: {
    name: string
    username: string
    profilePicture?: string
  }
  url: string
}

export interface HashnodePublication {
  id: string
  title: string
  about?: {
    text: string
  }
  url: string
  posts: {
    edges: Array<{
      node: HashnodePost
    }>
    pageInfo: {
      hasNextPage: boolean
      endCursor?: string
    }
  }
  post?: HashnodePost
}

export interface HashnodeResponse {
  data: {
    publication: HashnodePublication
  }
  errors?: Array<{
    message: string
  }>
}

// GraphQL Queries
export const GET_PUBLICATION_POSTS = `
  query GetPublicationPosts($host: String!, $first: Int = 10, $after: String) {
    publication(host: $host) {
      id
      title
      about {
        text
      }
      url
      posts(first: $first, after: $after) {
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
              id
              name
              slug
            }
            coverImage {
              url
            }
            author {
              name
              username
              profilePicture
            }
            url
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
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
          id
          name
          slug
        }
        coverImage {
          url
        }
        author {
          name
          username
          profilePicture
        }
        url
      }
    }
  }
`

export const GET_PUBLICATION_INFO = `
  query GetPublicationInfo($host: String!) {
    publication(host: $host) {
      id
      title
      about {
        text
      }
      url
      socialMedia {
        twitter
        github
        website
      }
    }
  }
`
