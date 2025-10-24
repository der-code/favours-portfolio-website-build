"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Mdx } from "./mdx"

interface ContentRendererProps {
  content: string
  source: "hashnode" | "fallback"
  className?: string
}

export const ContentRenderer = ({ content, source, className }: ContentRendererProps) => {
  if (source === "hashnode") {
    // For Hashnode posts, use the MDX component for proper markdown rendering
    return (
      <div className={cn("mdx", className)}>
        <Mdx code={content} />
      </div>
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
    // For Hashnode posts, strip markdown formatting and truncate
    const cleanExcerpt = excerpt
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`([^`]+)`/g, '$1') // Remove inline code backticks
      .replace(/#{1,6}\s+/g, '') // Remove heading markers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markers
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic markers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim()
      .substring(0, maxLength) + '...'

    return (
      <p className={cn("text-muted-foreground leading-relaxed", className)}>
        {cleanExcerpt}
      </p>
    )
  }

  // For fallback posts, use plain text
  return (
    <p className={cn("text-muted-foreground leading-relaxed", className)}>
      {excerpt.length > maxLength ? excerpt.substring(0, maxLength) + '...' : excerpt}
    </p>
  )
}
