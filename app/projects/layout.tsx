import { Metadata } from "next"
import { projectsMetadata } from "@/lib/metadata"

export const metadata: Metadata = projectsMetadata

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
