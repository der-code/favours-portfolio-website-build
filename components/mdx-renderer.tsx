"use client"

import { cn } from "@/lib/utils"
import ReactMarkdown, { Components } from "react-markdown"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const components: Components = {
    h1: ({ className, ...props }) => (
        <h1 className={cn("mb-6 mt-8 text-4xl font-bold text-foreground", className)} {...props} />
    ),
    h2: ({ className, ...props }) => (
        <h2 className={cn("mb-4 mt-8 text-3xl font-semibold text-foreground", className)} {...props} />
    ),
    h3: ({ className, ...props }) => (
        <h3 className={cn("mb-3 mt-6 text-2xl font-semibold text-foreground", className)} {...props} />
    ),
    h4: ({ className, ...props }) => (
        <h4 className={cn("mb-2 mt-4 text-xl font-semibold text-foreground", className)} {...props} />
    ),
    h5: ({ className, ...props }) => (
        <h5 className={cn("mb-2 mt-3 text-lg font-semibold text-foreground", className)} {...props} />
    ),
    h6: ({ className, ...props }) => (
        <h6 className={cn("mb-2 mt-3 text-base font-semibold text-foreground", className)} {...props} />
    ),
    a: ({ className, href, ...props }) => (
        <a
            className={cn("text-primary hover:underline", className)}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        />
    ),
    strong: ({ className, ...props }) => (
        <strong className={cn("font-semibold text-foreground", className)} {...props} />
    ),
    p: ({ className, ...props }) => (
        <p className={cn("mb-4 text-muted-foreground leading-relaxed", className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
        <ul className={cn("ml-4 list-disc space-y-2 mb-4", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
        <ol className={cn("ml-4 list-decimal space-y-2 mb-4", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
        <li className={cn("text-muted-foreground", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
        <blockquote
            className={cn("my-4 border-l-4 border-primary pl-4 italic text-muted-foreground", className)}
            {...props}
        />
    ),
    img: ({ className, alt, ...props }) => (
        <img
            className={cn("w-full h-auto rounded-lg border border-border mb-4", className)}
            alt={alt}
            {...props}
        />
    ),
    hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
    pre: ({ className, ...props }) => (
        <pre
            className={cn(
                "mb-4 mt-6 overflow-x-auto rounded-lg p-4 bg-muted text-foreground border border-border",
                className
            )}
            {...props}
        />
    ),
    code: ({ className, children, ...props }) => {
        const isMultiline = Array.isArray(children) && children.length > 1
        if (isMultiline) {
            return <code className={cn("hljs", className)} {...props}>{children}</code>
        }
        return (
            <code
                className={cn(
                    "bg-muted text-foreground px-2 py-1 rounded text-sm font-mono",
                    className
                )}
                {...props}
            >
                {children}
            </code>
        )
    },
    table: ({ className, ...props }) => (
        <div className="overflow-x-auto mb-4">
            <table
                className={cn("min-w-full border-collapse border border-border", className)}
                {...props}
            />
        </div>
    ),
    th: ({ className, ...props }) => (
        <th
            className={cn(
                "border border-border bg-muted p-2 text-left font-semibold text-foreground",
                className
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }) => (
        <td
            className={cn("border border-border p-2 text-muted-foreground", className)}
            {...props}
        />
    ),
}

interface MdxRendererProps {
    content: string
    className?: string
}

export function MdxRenderer({ content, className }: MdxRendererProps) {
    const transformEmbeds = (code: string) => code.replace(/%\[(.*?)\]/g, "$1")
    const removeAligns = (code: string) => code.replace(/align="(left|right|center)"/g, "")
    const sanitize = (code: string) => removeAligns(transformEmbeds(code))

    return (
        <div className={cn("prose prose-invert max-w-none", className)}>
            <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeRaw,
                    rehypeSlug,
                    rehypeAutolinkHeadings,
                    ...(content.includes("```") ? [[rehypeHighlight, { detect: true }]] : []),
                ]}
                className="mdx"
            >
                {sanitize(content)}
            </ReactMarkdown>
        </div>
    )
}