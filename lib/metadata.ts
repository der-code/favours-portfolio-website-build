import { Metadata } from "next"

interface PageMetadataProps {
    title: string
    description: string
    path: string
    keywords?: string[]
    image?: string
}

export function generatePageMetadata({
    title,
    description,
    path,
    keywords = [],
    image = "/logo.png"
}: PageMetadataProps): Metadata {
    const baseUrl = "https://favour-portfolio.com"
    const fullUrl = `${baseUrl}${path}`

    const defaultKeywords = [
        "Web Developer",
        "React Developer",
        "NestJS Developer",
        "Full Stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "UX Motion Design",
        "TypeScript",
        "Next.js",
        "Portfolio",
        "Favour Max-Oti",
        "Web Experience Engineer"
    ]

    return {
        title,
        description,
        keywords: [...defaultKeywords, ...keywords],
        openGraph: {
            title,
            description,
            url: fullUrl,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${title} - Favour Max-Oti`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: fullUrl,
        },
    }
}

// Pre-defined metadata for common pages
export const homeMetadata = generatePageMetadata({
    title: "Favour Max-Oti | Web Experience Engineer",
    description: "Web Experience Engineer specializing in React, NestJS, and UX motion design. Crafting immersive digital experiences that blend thoughtful design with robust engineering.",
    path: "/",
})

export const aboutMetadata = generatePageMetadata({
    title: "About | Favour Max-Oti",
    description: "Learn about Favour Max-Oti's journey as a Web Experience Engineer. Discover my passion for building things and creating better ways to handle tasks.",
    path: "/about",
    keywords: ["About", "Biography", "Experience", "Skills", "Background"]
})

export const projectsMetadata = generatePageMetadata({
    title: "Projects | Favour Max-Oti",
    description: "Explore Favour Max-Oti's portfolio of web development projects. Full-stack applications built with React, NestJS, and modern technologies.",
    path: "/projects",
    keywords: ["Projects", "Portfolio", "Web Applications", "Case Studies", "Work"]
})

export const blogMetadata = generatePageMetadata({
    title: "Blog | Favour Max-Oti",
    description: "Read Favour Max-Oti's thoughts on web development, technology, and engineering. Insights from a Web Experience Engineer.",
    path: "/blog",
    keywords: ["Blog", "Articles", "Web Development", "Technology", "Insights"]
})

export const testimonialsMetadata = generatePageMetadata({
    title: "Testimonials | Favour Max-Oti",
    description: "What clients and colleagues say about working with Favour Max-Oti. Testimonials from successful collaborations.",
    path: "/testimonials",
    keywords: ["Testimonials", "Reviews", "Client Feedback", "Recommendations"]
})

export const contactMetadata = generatePageMetadata({
    title: "Contact | Favour Max-Oti",
    description: "Get in touch with Favour Max-Oti for your next web development project. Available for freelance and full-time opportunities.",
    path: "/contact",
    keywords: ["Contact", "Hire", "Freelance", "Collaboration", "Opportunities"]
})
