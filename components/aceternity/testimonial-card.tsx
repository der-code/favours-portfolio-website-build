"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TestimonialCard = ({
    quote,
    name,
    title,
    company,
    className,
}: {
    quote: string
    name: string
    title: string
    company: string
    className?: string
}) => {
    return (
        <div
            className={cn(
                "relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:-translate-y-1",
                className
            )}
        >
            <div className="space-y-4">
                {/* Quote */}
                <div className="relative">
                    <svg
                        className="absolute -top-2 -left-2 h-8 w-8 text-primary/20"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                    >
                        <path d="M9.352 4C4.456 4 0 8.456 0 13.352c0 4.896 4.456 9.352 9.352 9.352 1.888 0 3.648-.592 5.088-1.6l-.8-2.4c-1.12.384-2.32.576-3.52.576-3.456 0-6.24-2.784-6.24-6.24s2.784-6.24 6.24-6.24c1.12 0 2.24.192 3.2.576l.8-2.4c-1.44-1.008-3.2-1.6-5.088-1.6z" />
                    </svg>
                    <p className="text-muted-foreground leading-relaxed pl-6">{quote}</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold">
                        {name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{name}</p>
                        <p className="text-sm text-muted-foreground">
                            {title} at {company}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const TestimonialsGrid = ({
    testimonials,
    className,
}: {
    testimonials: Array<{
        quote: string
        name: string
        title: string
        company: string
    }>
    className?: string
}) => {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={index}
                    quote={testimonial.quote}
                    name={testimonial.name}
                    title={testimonial.title}
                    company={testimonial.company}
                />
            ))}
        </div>
    )
}
