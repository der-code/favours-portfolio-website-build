import { Metadata } from "next"
import { homeMetadata } from "@/lib/metadata"

export const metadata: Metadata = homeMetadata

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
