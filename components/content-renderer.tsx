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
    // For Hashnode posts, use dangerouslySetInnerHTML directly
    return (
      <div
        className={cn("prose-headings:text-foreground prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:bg-muted prose-code:text-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-muted prose-pre:text-foreground prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-ul:list-disc prose-ol:list-decimal prose-li:text-muted-foreground prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-th:text-left prose-td:border prose-td:border-border prose-td:p-2", className)}
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
