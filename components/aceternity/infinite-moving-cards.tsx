"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
    quote: string
    name: string
    title: string
    company: string
    className?: string
}

const TestimonialCard = ({
    quote,
    name,
    title,
    company,
    className,
}: TestimonialCardProps) => {
    return (
        <div
            className={cn(
                "relative p-8 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all",
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
                    <p className="text-muted-foreground leading-relaxed pl-6 text-lg">{quote}</p>
                </div>

                {/* Author */}
                <div className="pl-6">
                    <p className="font-semibold text-foreground text-lg">{name}</p>
                    <p className="text-muted-foreground">
                        {title} @ {company}
                    </p>
                </div>
            </div>
        </div>
    )
}

interface InfiniteMovingCardsProps {
    testimonials: Array<{
        quote: string
        name: string
        title: string
        company: string
    }>
    direction?: "left" | "right"
    speed?: "slow" | "normal" | "fast"
    pauseOnHover?: boolean
    className?: string
}

export const InfiniteMovingCards = ({
    testimonials,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: InfiniteMovingCardsProps) => {
    const speedMap = {
        slow: 20,
        normal: 15,
        fast: 10,
    }

    const duration = speedMap[speed]

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased",
                className
            )}
        >
            <div className="relative flex w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-lg border border-border bg-background/50 backdrop-blur-sm">
                <div className="mb-4 text-center">
                    <h2 className="text-3xl font-bold text-foreground">What People Say</h2>
                    <p className="text-muted-foreground mt-2">
                        Testimonials from clients and colleagues
                    </p>
                </div>

                <div className="relative flex w-full overflow-hidden">
                    <motion.div
                        className="flex gap-4"
                        animate={{
                            x: direction === "left" ? [0, -50 * testimonials.length] : [0, 50 * testimonials.length],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: duration,
                                ease: "linear",
                            },
                        }}
                        style={{
                            width: `${testimonials.length * 2}00px`,
                        }}
                    >
                        {/* First set of testimonials */}
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 w-[500px]"
                                style={{
                                    animationPlayState: pauseOnHover ? "running" : "running",
                                }}
                            >
                                <TestimonialCard
                                    quote={testimonial.quote}
                                    name={testimonial.name}
                                    title={testimonial.title}
                                    company={testimonial.company}
                                />
                            </div>
                        ))}

                        {/* Second set of testimonials for seamless loop */}
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 w-[500px]"
                                style={{
                                    animationPlayState: pauseOnHover ? "running" : "running",
                                }}
                            >
                                <TestimonialCard
                                    quote={testimonial.quote}
                                    name={testimonial.name}
                                    title={testimonial.title}
                                    company={testimonial.company}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
