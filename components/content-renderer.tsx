"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface ContentRendererProps {
    content: string
    source: "hashnode" | "fallback"
    className?: string
}

export const ContentRenderer = ({ content, source, className }: ContentRendererProps) => {
    if (source === "hashnode") {
        return (
            <div
                className={cn("prose prose-invert max-w-none", className)}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        )
    }

    // Fallback content rendering for non-Hashnode posts
    return (
        <div className={cn("prose prose-invert max-w-none", className)}>
            {content.split("\n\n").map((paragraph, idx) => (
                <div key={idx}>
                    {paragraph.startsWith("##") ? (
                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                            {paragraph.replace("## ", "")}
                        </h2>
                    ) : paragraph.startsWith("-") ? (
                        <ul className="space-y-2 ml-4">
                            {paragraph
                                .split("\n")
                                .filter((line) => line.startsWith("-"))
                                .map((line, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span>{line.replace("- ", "")}</span>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p className="leading-relaxed">{paragraph}</p>
                    )}
                </div>
            ))}
        </div>
    )
}

interface ExcerptRendererProps {
    excerpt: string
    source: "hashnode" | "fallback"
    maxLength?: number
    className?: string
}

export const ExcerptRenderer = ({
    excerpt,
    source,
    maxLength = 200,
    className
}: ExcerptRendererProps) => {
    if (source === "hashnode") {
        // For Hashnode posts, strip HTML tags and truncate
        const cleanExcerpt = excerpt.replace(/<[^>]*>/g, '').substring(0, maxLength) + '...'
        return (
            <div
                className={cn("prose prose-sm max-w-none", className)}
                dangerouslySetInnerHTML={{ __html: cleanExcerpt }}
            />
        )
    }

    // For fallback posts, use plain text
    return (
        <p className={cn("text-muted-foreground leading-relaxed", className)}>
            {excerpt.length > maxLength ? excerpt.substring(0, maxLength) + '...' : excerpt}
        </p>
    )
}
