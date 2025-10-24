import { Metadata } from "next"
import { testimonialsMetadata } from "@/lib/metadata"

export const metadata: Metadata = testimonialsMetadata

export default function TestimonialsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
